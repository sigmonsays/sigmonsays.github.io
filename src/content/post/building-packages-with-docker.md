+++
date = "2014-09-11T15:32:44-07:00"
draft = false
title = "building packages with docker"
aliases = [
   "building-packages-with-docker"
]

+++

This is a simple idea I had while waiting for a build to complete. 

**The background**
Its common to use dpkg-buildpackage inside of a chroot managed by pdebuild. The pdebuild script
takes a minimal base image tarball and installs all dependencies in it required to
build your package.

The build dependencies come from debian/control Build-Depends section. The package being
built is a python application using virtualenv. A lot of the packages come from apt however.
There is a bunch of python pip/easy install work performed too.

Needless to say this takes quite some time to do since extracting a .deb and installing
it is a pretty expensive operation when there is a lot of dependencies.

Obverve the following times

- pdebuild - 2m35.113s
- dpkg-buildpackage - 0m55.480s
- docker - 0m37.421s

because i'm not interested in explaining how the other 2 method work, i'll leave that out. However, let me
explain how the docker build works.

docker
-------------
The idea is to exploit the layered file system of containers to provide build dependencies. Since
its a copy on write file system, this means providing a container with all build deps present is 
incredibly fast.

**Dockerfile**
```
FROM ubuntu
RUN apt-get update \
   && apt-get install -y dpkg-dev


# This is the key line, it installs the build dependencies for your application!
RUN apt-get build-dep -y --force-yes YOUR_PACKAGE

RUN useradd packaging \
   && mkdir -p /packaging \
   && chown packaging /packaging

USER packaging
ADD build.sh /bin/build.sh

ENTRYPOINT [ "/bin/build.sh" ]

```
**build.sh**
```
#!/bin/bash

echo "[build.sh] $@"

set -x

cd /packaging
pwd
tar vzxf -
cd package
dpkg-buildpackage
```

Then to invoke the build we stream the contents at a tar.gz into the container which streams
it to disk and builds the package.

```
package_stream () 
{ 
    git archive HEAD --format tar --prefix=package/ | gzip -9
}
```

Finally, this is the final command that runs the build

      time package_stream | docker run -i debbie 



