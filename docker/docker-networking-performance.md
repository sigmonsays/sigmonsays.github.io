---
title: "docker networking performance"
date: 2021/08/04
---

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

i'm not entirely sure why the userland proxy is even required or why it was introduced.
investigating the proxy history shows proxy was introduced in Apr 2013, commit 930e9a7,
unfortunately it is not easy to determine the intention and why iptables was not just
used in the first place to handle local traffic. iptables is used to route the network
traffic externally, so I wonder, why the proxy in userland. It seems pointless but I
have yet to investigate it further.
