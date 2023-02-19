+++
date = "2015-02-03T11:59:36-08:00"
draft = false
title = "convenient cli tookit using python"
tags = [ "programming", "python", "misc" ]

+++


python is a incredibly useful language and has a powerful type system which
can be pretty convenient. I've written python for many years now and when
I need a quick tool, most the time I write it in python.

These tools have built up over time and i've been collecting them organically
into a python startup file as a set of libraries and functions.

create a file in $HOME/**.pythonstartup** and cherry pick anything below that you find 
useful. 

The code below is missing the imports used.. instead copy the text from the imports section

tab completion and history
------------------------------------

      # Tab completion
      import rlcompleter
      import readline
      readline.parse_and_bind("tab: complete")

      # History
      histfile = os.path.join(os.path.expanduser("~"), ".pyhist")
      try:
          readline.read_history_file(histfile)
      except IOError:
          pass
      atexit.register(readline.write_history_file, histfile)
      del histfile


imports
------------------------------------
i'm going to just drop a list of imports used. I'll let you
sort out which ones are unused with a linter (pyflakes peraps?).

      import os
      import sys
      import json
      import time
      import atexit
      import urllib
      import urlparse
      import uuid
      import hashlib
      import hmac
      import base64
      import binascii
      import struct
      import os
      from urllib import quote_plus,unquote,quote


custom prompt and line counter
------------------------------------

    # use a custom prompt
    class LineCounter(object):
        def __init__(self):
            self.count = 0
        def __str__(self):
            self.count += 1
            return '>>> '
    line = LineCounter()
    sys.ps1 = line

this makes it possible to interact with the line object like this and whatever you return from __str__ will be your prompt.

    >>> line.count
    6

handy string functions
------------------------------------

      def safe_str(s):
          try:
              return str(s)
          except UnicodeEncodeError:
              return unicode(s).encode('utf-8')

      quote = lambda s: urllib.quote(s)
      unquote = lambda s: urllib.unquote(s)


file size utilities
------------------------------------

format bytes as a human printable form

      def formatSize(bytes, base=1024, precision=2):
          units = [ 'b', 'kb', 'mb', 'gb', 'tb', 'pb', 'eb', 'xb', 'yb' ]
          nunits = len(units)
          for n in xrange(nunits, -1, -1):
              if bytes > base ** n:
                  break
          v = round(float(bytes) / (base ** n), precision)
          return (v, units[n])

convert bytes between units

      class ConvertSize:
         def __init__(self, base=1024):
            B = 1
            KB = B * base
            MB = KB * base
            GB = MB * base
            TB = GB * base
            PB = TB * base
            EB = PB * base
            ZB = EB * base
            YB = ZB * base
            base = base
            _sym = 'B KB MB GB TB PB EB ZB YB'.split()
            self.__dict__.update(locals())

         def _install(self, units, g):
            for n, unit in enumerate(units.split()):
               g[unit]=getattr(self, '_'+self._sym[n])
         def _B(self, v):  return v * self.B
         def _KB(self, v): return v * self.KB
         def _MB(self, v): return v * self.MB
         def _GB(self, v): return v * self.GB
         def _TB(self, v): return v * self.TB
         def _PB(self, v): return v * self.PB
         def _EB(self, v): return v * self.EB
         def _ZB(self, v): return v * self.ZB
         def _YB(self, v): return v * self.YB

      units = 'byte kilobyte megabyte gigabyte terabyte petabyte exabyte zettabyte yottabyte'
      ConvertSize(1000)._install(units, globals())

      units = 'bit kibibyte mebibyte gibibyte tebibyte pebibyte exbibyte zebibyte yobibyte'
      ConvertSize(1024)._install(units, globals())



time utilities
------------------------------------

      def formatTime(s, legend = [  'd', 'h', 'm', 's' ]):
          units = [  86400, 3600, 60, 1 ]
          r = s
          ret = []
          for u, l in zip(units, legend):
              if r >= u:
                  ret.append("%d%s" % (r / u, l))
                  r -= u * int(r / u)
              if r == 0:
                  break
          if len(ret) == 0:
              return '0s'
          return "".join(ret)

      class ConvertTimeUtil:
         """
         convert time tool expected to be used in interactive cli
         everything is stored in nanoseconds internally
         then converted to the appropriate format on output in the ConvertTimeTo class

         picosecond          1,000,000,000,000     one trillionth of a second.    10 ^ -9
         nanosecond          1,000,000,000         one billionth of a second.    10 ^ -9
         microsecond         1,000,000             one millionth of a second.    10 ^ -6
         millisecond         1,000                 one thousandth of a second.   10 ^ -3

         >>> ConvertTime.nanoseconds(6606999).to_seconds()
         0.006606999

         """
         Nanosecond  = 1
         Microsecond          = 1000 * Nanosecond
         Millisecond          = 1000 * Microsecond
         Second               = 1000 * Millisecond
         Minute               = 60 * Second
         Hour                 = 60 * Minute
         Day                  = 24 * Hour

         def nanoseconds(self, v): return ConvertTimeTo(v)
         def microseconds(self, v): return ConvertTimeTo(v * self.Microsecond)
         def milliseconds(self, v): return ConvertTimeTo(v * self.Millisecond)
         def seconds(self, v): return ConvertTimeTo(v * self.Second)
         def minutes(self, v): return ConvertTimeTo(v * self.Minute)
         def hours(self, v): return ConvertTimeTo(v * self.Hour)
         def days(self, v): return ConvertTimeTo(v * self.Day)

      class ConvertTimeTo:
         def __init__(self, v):
            self.v = float(v)
         def to_nanoseconds(self): return self.v
         def to_microseconds(self): return self.v / ConvertTimeUtil.Microsecond
         def to_milliseconds(self): return self.v / ConvertTimeUtil.Millisecond
         def to_seconds(self): return self.v / ConvertTimeUtil.Second
         def to_minutes(self): return self.v / ConvertTimeUtil.Minute
         def to_hours(self): return self.v / ConvertTimeUtil.Hour
         def to_days(self): return self.v / ConvertTimeUtil.Day

         def __repr__(self):
            return "<%s v=%s>" % (self.__class__.__name__, self.v)

      ConvertTime = ConvertTimeUtil()

      nanoseconds = ConvertTime.nanoseconds
      microseconds = ConvertTime.microseconds
      milliseconds = ConvertTime.milliseconds
      seconds = ConvertTime.seconds
      minutes = ConvertTime.minutes
      hours = ConvertTime.hours
      days = ConvertTime.days



misc utilities
------------------------------------

      def to_hex(t, nbytes):
          "Format text t as a sequence of nbyte long values separated by spaces."
          chars_per_item = nbytes * 2
          hex_version = binascii.hexlify(t)
          num_chunks = len(hex_version) / chars_per_item
          def chunkify():
              for start in xrange(0, len(hex_version), chars_per_item):
                  yield hex_version[start:start + chars_per_item]
          return ' '.join(chunkify())


display hooks
------------------------------------

this display hook will automatically pretty print returned values from cli expressions

      # display hook hack to pretty print everything by default
      # use pprint_on or pprint_off to enable/disable pretty printing
      import pprint
      import sys

      orig_displayhook = sys.displayhook

      def myhook(value):
          if value != None:
              __builtins__._ = value
              pprint.pprint(value)

      __builtins__.pprint_on = lambda: setattr(sys, 'displayhook', myhook)
      __builtins__.pprint_off = lambda: setattr(sys, 'displayhook', orig_displayhook)
      # end display hook hack to pretty print everything

