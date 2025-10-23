---
title: "docker wishlist"
date: 2021/08/04
---

things I find that I wish docker supported


dockerfile
========================

- **store build context with the image**

   - provides ability to change original dockerfile for images you download
   - saves dockerfile and other build artifacts
   - similar in concept to a "source package"

- **support for variables**

  There is very little that the dockerfile actually supports beyond basic static directives.

  If dockerfile supported templates and variables, we could allow repetitive lines to be reduced to
  the bare minimum. This would allow snippets like this to be greatly reduced. We shouldn't have to
  repeat 0.1.3 everywhere, it should just be a variable!

    RUN curl http://example.net/package-0.1.3.tar.gz -o package-0.1.3.tar.gz
    RUN tar zxf package-0.1.3.tar.gz
    RUN cd package-0.1.3 && make && \
        cp package-0.1.3/bin/whatever /usr/bin/whatever
