+++
date = "2018-01-05T10:38:37-07:00"
draft = true
title = "System latencies for software developers"
tags = [ "development" ]
_promo = [ "nopromo" ]

+++

Approximate timing for various operations on a typical PC:

| operation                           | latency                                |
| ---                                 | ---                                    |
| execute typical instruction         | 1/1,000,000,000 sec = 1 nanosec        |
| fetch from L1 cache memory          | 0.5 nanosec                            |
| branch misprediction                | 5 nanosec                              |
| fetch from L2 cache memory          | 7 nanosec                              |
| Mutex lock/unlock                   | 25 nanosec                             |
| fetch from main memory              | 100 nanosec                            |
| send 2K bytes over 1Gbps network    | 20,000 nanosec                         |
| read 1MB sequentially from memory   | 250,000 nanosec                        |
| fetch from new disk location (seek) | 8,000,000 nanosec                      |
| read 1MB sequentially from disk     | 20,000,000 nanosec                     |
| send packet US to Europe and back   | 150 milliseconds = 150,000,000 nanosec |
