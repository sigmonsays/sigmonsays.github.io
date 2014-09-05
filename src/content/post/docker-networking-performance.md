+++
date = "2014-09-05T07:33:28-07:00"
draft = true
title = "docker networking performance"

+++

While trying to determine the performance overhead of a simple docker container setup, I discovered several
issues related to network performance.

two issues I have encountered

- docker-proxy handles local network traffic when using the hosts bridge IP (or localhost)
- connection tracking overhead of NAT increases memory usage


my setup
   
I am using docker containers as an easy way to deploy backends on a host. I wish to use
the hosts bridge IP as a backend to route requests from the load balancer. The load balancer
is just a haproxy instance running on port 8080 and it uses 500X as backend ports.  I had to
doctor up the output a little but this is still the output of **docker ps**.

    07 haproxy:0.0.1-8 X Up 2 days   0.0.0.0:443->443/tcp     dev1-haproxy-1      
                                     0.0.0.0:1983->1983/tcp
                                     0.0.0.0:8080->8080/tcp

    b6 api:4.2.0-2   X  Up 14 hours  0.0.0.0:5003->8080/tcp   dev1-api-3
    f0 api:4.2.0-2   X  Up 14 hours  0.0.0.0:5002->8080/tcp   dev1-api-2
    7f api:4.2.0-2   X  Up 15 hours  0.0.0.0:5001->8080/tcp   dev1-api-1

I've measured performance of docker-proxy process using nginx and timing the transfers and have seen
performance degrades around 40-50% due to docker having to reverse proxy the connection in software. 

I really believe that if performance is important, there should be a option of disabling docker-proxy, 
but I will focus on this more later if I really need to.




issues with docker-proxy
--------------------------

- software reverse proxy should not be enabled by default
- network performance degradation up to 50% is not acceptable when traffic is *accidently*
  routed through the proxy.


investigating the proxy history

https://github.com/docker/docker/search?utf8=%E2%9C%93&q=proxy
https://github.com/docker/docker/blob/master/pkg/proxy/proxy.go

UDPProxy and TCPProxy in udp_proxy.go at pkg/proxy/tcp_proxy.go 

shows NewProxy, which is used in the port mapping code, specifically map() function

https://github.com/docker/docker/blob/master/daemon/networkdriver/portmapper/mapper.go#L41

proxy was introduced in the following commits


      commit 930e9a7e430a3d78e09a95bb32d9fb6052e7dae1
      Author: Solomon Hykes <solomon@dotcloud.com>
      Date:   Fri Apr 19 19:35:44 2013 -0700

          Emulate DNAT in userland for loopback-to-loopback connections. This makes container ports available from localhost.

       network.go | 46 ++++++++++++++++++++++++++++++++++++++++++++++
       1 file changed, 46 insertions(+)

      commit 61259ab4b4bfe3404e75dd811a2da7c88e7c7133
      Author: Solomon Hykes <solomon@dotcloud.com>
      Date:   Fri Apr 19 19:32:32 2013 -0700

          Exclude loopback-to-loopback connections from DNAT rules, to allow userland proxying


which shows the following diff

git diff 61259a 930e9a 

      diff --git a/network.go b/network.go
      index 85c6083..54b8dbf 100644
      --- a/network.go
      +++ b/network.go
      @@ -4,6 +4,7 @@ import (
         "encoding/binary"
         "errors"
         "fmt"
      +	"io"
         "log"
         "net"
         "os/exec"
      @@ -221,10 +222,55 @@ func (mapper *PortMapper) Map(port int, dest net.TCPAddr) error {
         if err := mapper.iptablesForward("-A", port, dest); err != nil {
            return err
         }
      +
         mapper.mapping[port] = dest
      +	listener, err := net.Listen("tcp", fmt.Sprintf("127.0.0.1:%d", port))
      +	if err != nil {
      +		mapper.Unmap(port)
      +		return err
      +	}
      +	// FIXME: store the listener so we can close it at Unmap
      +	go proxy(listener, "tcp", dest.String())
         return nil
       }
       
      +// proxy listens for socket connections on `listener`, and forwards them unmodified
      +// to `proto:address`
      +func proxy(listener net.Listener, proto, address string) error {
      +	Debugf("proxying to %s:%s", proto, address)
      +	defer Debugf("Done proxying to %s:%s", proto, address)
      +	for {
      +		Debugf("Listening on %s", listener)
      +		src, err := listener.Accept()
      +		if err != nil {
      +			return err
      +		}
      +		Debugf("Connecting to %s:%s", proto, address)
      +		dst, err := net.Dial(proto, address)
      +		if err != nil {
      +			log.Printf("Error connecting to %s:%s: %s", proto, address, err)
      +			src.Close()
      +			continue
      +		}
      +		Debugf("Connected to backend, splicing")
      +		splice(src, dst)
      +	}
      +	return nil
      +}
      +
      +func halfSplice(dst, src net.Conn) error {
      +	_, err := io.Copy(dst, src)
      +	// FIXME: on EOF from a tcp connection, pass WriteClose()
      +	dst.Close()
      +	src.Close()
      +	return err
      +}
      +
      +func splice(a, b net.Conn) {
      +	go halfSplice(a, b)
      +	go halfSplice(b, a)
      +}
      +
       func (mapper *PortMapper) Unmap(port int) error {
         dest, ok := mapper.mapping[port]
         if !ok {
