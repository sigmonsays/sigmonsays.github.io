+++
date = "2017-12-01T10:38:37-07:00"
draft = false
title = "bash"
tags = [ "bash" ]
promo = [ "bash" ]

+++

I have been a bash hacker since I started with computers. That being said, I probably have some old habits on this page. This page
primarily serves as short snippets of bash recipes I often want to re-use.

- [Simple Logging Redirect]({{< relref "#simple-logging-redirect" >}})
- [Human Size]({{< relref "#human-size" >}})



### Simple Logging Redirect

If you have a bash script you wish to add logging to a simple approach is to use `exec` and redirect the output to a file.

     exec > >(tee mylog) 2>&1

This is straight from the bash FAQ [#106](http://mywiki.wooledge.org/BashFAQ/106) so go there for details.


### Human Size

This function converts a integer to the appropriate human size

      function human_size {
       local B=$1
       local S
       if [ "$B" -gt 1099511627776   ] ; then
         S="$(($B/1099511627776))tb"
       elif [ "$B" -gt 1073741824 ] ; then
         S="$(($B/1073741824))gb"
       elif [ "$B" -gt 1048576  ] ; then
         S="$(($B/1048576))mb"
       elif [ "$B" -gt 1024  ] ; then
         S="$(($B/1024))kb"
       else
         S="${B}b"
       fi
       echo $S
      }

