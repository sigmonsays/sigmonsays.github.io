+++
date = "2014-09-12T08:28:52-07:00"
draft = true
title = "restructured text primer"

tags = [ "cheatsheat", "rst2html", "hugo" ]

+++
restructured text primer
****************************



references
============================

See <http://docutils.sf.net/docs/ref/rst/directives.html> for full info.


- cheatsheet - http://docutils.sourceforge.net/docs/user/rst/cheatsheet.txt



quickstart
----------------

install::

   apt-get install -y python-docutils
   sudo ln -sf /usr/bin/rst2html /usr/bin/rst2html.py


links
=================

http://docutils.sourceforge.net/docs/ref/rst/restructuredtext.html#hyperlink-references

- Just put an underscore at the end of the word to make a link
- `Building packages with docker </building-packages-with-docker>`_




lists
=================

- whatever 1
- whatever 2
- whatever 3

* num 1
* num 2
* num 3


footnotes
===========

Please RTFM [1]_.


tables
======

+--------------------+---------------------------------------+
| item               | desc                                  |
+====================+=======================================+
| bacon              |                                       |
+--------------------+---------------------------------------+
| eggs               |                                       |
+--------------------+---------------------------------------+
| coffee             |                                       |
+--------------------+---------------------------------------+


.. [1] Read The Fine Manual
