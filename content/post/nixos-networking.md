+++
date = "2023-12-16:38:37-07:00"
draft = true
title = "nixos networking"

tags = [ "nixos", "networking" ]
+++



# brainstorm

I started down the road of attempting to run virtual machines on nixos as a development stack


All I want for christmas is a bridged network
- funny time based reference

all I wanted is a bridged network to have VMs DHCP on my LAN.
- One development stack I use is a VM filled with whatever. That way I can setup and install the machine just like a production node. Acurately representing the deployment makes development and testing easier.

`nixos-rebuild switch` took really long to configure networkd

This led to a interesting discovery

nixos networking is subpar, atleast very confusing at the minimum

documentation is pretty much missing
- i first looked for bridged networking using the networking.* set of options but was unable to find a complete example
- 

nixos-rebuild switch does not always work. This is the first time the configuration was not applied



