+++
date = "2015-05-04T18:38:37-07:00"
draft = true
title = "Docker is not what I want"
slug = "what-docker-is-not"
tags = [ "docker", "misc" ]


+++

I have used docker for a while now and consider it a useful piece of software. It helped introduce
containers to the masses but the projects scope has changed and the software is suffering.

Docker is not what I want and here is a quick summary and then I will explain each in detail

- The future of your app is tied to the future of Docker
- Docker is insecure, the entire daemon runs as root
- When docker crashes so does every one of your containers
- Docker is missing features
- Docker is greedy for market 
- Project is ignoring bugs and performance issues


**The future of your app is tied to the future of docker**

docker has stopped focusing on fixing bugs or performance improvements and instead is
moving into clustering (swarm) or provisioning (machine). While these are necessary features it just shows that docker
is greey for market share and not really trying to make quality software.

**docker is insecure, the entire daemon runs as root**

not much else to say here, running complete applications as root is not safe.

Any exploit in the daemon gives root access. Containers are not secure and more work is needed to make them secure. Running
all containers as root leaves little to no security. Breaking out of a container from an application is pretty easy so you
can not really trust third party containers.

Containers can run as unprivelleged users but docker does not support it. 



**When docker crashes so does every one of your containers**

a namespace will exist as long as a single process in it does. This means that you do not need a single
daemon running as a parent of all your containers. When you stop or restart the docker daemon all your containers
will die. Any bug in the docker daemon which causes it to crash or run out of memory will kill all your containers.

That is unacceptable.


**Docker is already missing features**

For docker getting the head start is is missing a lot of features. Since it decided to drop lxc it is already missing 
valuable features like unprivileged containers or CRIU.

**Docker is greedy for market**

They removed their manifesto and are already focusing on building more poor quality software to get the market share

They market that docker images are "like git" but this is far from the truth. The project provides no features what so 
ever that git does. Adopting the terminology push and pull almost seems like a clever marketing decision. So me how
to branch an image or show a unified diff that someone can merge into their "repo" if you even had some a thing.


**Project is ignoring bugs and critical performance issues**

- docker-proxy performs software proxy

docker-proxy is a socket server which is spawned for each container. It performs software proxy between container ports 
host ports in specific cases. It performs so poorly that you see up to a 40x penalty when talking to nginx.


**Freedom is key**

Containers are gaining popularity so quickly because it allows freedom to move applications between
cloud providers with no extra overhead. Docker is not spending any time contributing any standards for future
interoperation and freedom and instead is focusing only on market share.

Freedom of container solution is also key. As always you must use the right tool for the job. Supporting
more than one container format is important.


alternatives
========================
there are a some alternatives thankfully

- lxc and lxd - https://github.com/lxc
- rocket - https://github.com/coreos/rkt



