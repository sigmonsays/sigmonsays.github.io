+++
date = "2016-10-16T14:50:29-07:00"
draft = false
title = "interesting tech"
tags = [ "notes" ]
promo = "nopromo"

+++


There is a [index](#index) which lists all the sections. The newest is at the top.

# Jan 2018

| Link                                                           | Description          |
| ---                                                            | ---                  |
| https://github.com/lewish/asciiflow2 and http://asciiflow.com/ | ascii art draw tool. | 


# Oct 2016

gmx - similar to jmx but for go 
https://github.com/davecheney/gmx


## hitless haproxy reload

https://github.com/sorah/sandbox/tree/master/ruby/haproxy-master

## go jira

https://github.com/Netflix-Skunkworks/go-jira

I currently use this program in a very limited fashion for managing development workflow. it becomes very handy to build a 
shell script environment for aiding in common development process. Right now its only used to view jira tasks and comment on
them. 

This is powerful enough for the time being

## http2 keylog

with the growing popularity of http/2 you can't be without the ability to inspect the payload. 

This looks really useful in tracing http/2 (even grpc) with wireshark

https://github.com/joneskoo/http2-keylog/
 
## xo

generate idomatic go code for SQL databases (Please do not confuse this with an ORM!)

https://github.com/knq/xo

## teleport

its a pretty impressive ssh daemon setup that has temporary certs for ssh access through a central auth system, with 2-factor 
auth built in. Every "teleport node" registers itself too so you can just list specific nodes 

I can imagine something like this becoming "the normal" in a cloud computing environment

https://github.com/gravitational/teleport


## sftp server library in go

SFTP server library in Go, https://github.com/taruti/sftpd


## toasteroid

1. print stuff on your toast. 
2. Print Ads on your toast.
3. Profit. What!? 

See https://toasteroid.com/

I imagine a (dystopian?) future where you have to pay a subscription fee to remove ads from your toast in the morning

This could be the IoT future we all hate.

## httpcache

A Transport for http.Client that will cache responses according to the HTTP RFC

https://github.com/gregjones/httpcache

# Feb 2016

- asciinema - record your terminal in plain text and replay it!
  - website - https://asciinema.org/

- find unused packages in a go repository - https://github.com/nf/deadleaves

- AppImages is a interesting format that is similar to other "self contained" technologies like 
  CDE (http://www.pgbovine.net/cde.html). I havn't read into it yet but lets hope it does better
  than everyone else...

  AppImage is at https://github.com/probonopd/AppImageKit/wiki/Creating-AppImages

- The web of names, hashes and UUIDs - https://joearms.github.io/2015/03/12/The_web_of_names.html

  This isnt the first time I read this but I came across it again recently and wanted to save it here

# Jan 2016

- MQTT - http://mqtt.org/

  MQTT is a machine-to-machine messaging protocol designed for IoT. Its design goals are small code and resource footprint is required (network, memory, etc) making
  it very interesting for mobile (and more) development.


- sheepdog - distributed block storage for qemu - http://sheepdog.github.io/sheepdog/

- snap - https://github.com/intelsdi-x/snap

- thermal cameras - http://www.thermal.com/thermal-cameras/

- debops - http://docs.debops.org/en/latest/index.html - automate installation of all your data center components

- api.data.gov


# Nov 2015

- tenus - linux networking in golang
  - website https://github.com/milosgajdos83/tenus
  - mentioned in article - http://containerops.org/2014/07/30/tenus-golang-powered-linux-networking/

- Task Spooler - http://vicerveza.homeunix.net/~viric/soft/ts/

  An oldie but a goodie.. I had used this many years ago but forgot its name and wanted it again.. Here's to remembering!


- hound - https://github.com/etsy/Hound

- silver surfer - http://geoff.greer.fm/ag/
  - https://github.com/ggreer/the_silver_searcher

- microservices future 
  - http://blog.giantswarm.io/docker-and-related-services-enable-a-future-of-microservices-for-everyone




# Jan 2015

- otro - javascript interpreter in Go - https://github.com/robertkrimen/otto

- C10M - http://c10m.robertgraham.com/p/manifesto.html

- Completely decentralized cloud messaging - http://iris.karalabe.com
  decentralized cloud messaging with broadcast, request/reply and pubsub messaging with literally zero configuration.

- Fast and Simple Open Source "Github" - https://github.com/gogits/gogs

- Quick VPN using SSH - http://backreference.org/2009/11/13/openssh-based-vpns/

- Rudder - Software Defined Networks - https://github.com/coreos/rudder 


# Index

| Section                                     | Description                                                              |
| ---                                         | ---                                                                      |
| [Jan 2018]({{< ref "#jan-2018" >}})         |                                                                          |
| [October 2016]({{< ref "#oct-2016" >}})     |                                                                          |
|                                             | [haproxy hitless reload]({{< relref "#hitless-haproxy-reload" >}})       |
| [Feb 2016]({{< relref "#feb-2016" >}})      |                                                                          |
| [Jan 2016]({{< relref "#jan-2016" >}})      |                                                                          |
| [November 2015]({{< relref "#nov-2015" >}}) |                                                                          |
|                                             | [go jira]({{< relref "#go-jira" >}})                                     |
| [Jan 2015]({{< relref "#jan-2015" >}})      |                                                                          |
| Unsorted                                    |                                                                          |
|                                             | [xo]({{< relref "#xo" >}})                                               |
|                                             | [teleport]({{< relref "#teleport" >}}) ssh server                        |
|                                             | [sftp server library in go]({{< relref "#sftp-server-library-in-go" >}}) |
|                                             | [toasteroid]({{< relref "#toasteroid" >}})                               |
|                                             | [httpcache]({{< relref "#httpcache" >}})                                 |
|                                             |                                                                          |
