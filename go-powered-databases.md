---
title: "go powered databases"
date: todo
---

- bolt - https://github.com/boltdb/bolt
- ledis - http://ledisdb.com/
- tiedot - https://github.com/HouzuoGuo/tiedot
- cockroachdb - https://github.com/cockroachdb/cockroach

bolt
-----------------
pure go key-value datastore

ledis
-----------------
redis like database written in go

attractive to embed redis like features directly into your application which
will reduce operational complexity.

tiedot
-----------------
JSON document database


cockrochdb
-----------------
A Scalable, Geo-Replicated, Transactional Datastore

design document https://docs.google.com/document/d/11k2EmhLGSbViBvi6_zFEiKzuXxYF49ZuuDJLe6O8gBU/edit

feature summary

- ACID transactional semantics
- versioned values
- primary design goal is consistency and survivability
- aims to tolerate disk, server, rack and datacenter failures

related technologies

- rocksdb (variant of leveldb) - http://rocksdb.org/
