---
title: "nixos networking"
date: 2023/12/16
---


# Bridged Networking

I recently switched my main desktop from ubuntu to nixos. So I started down the road of attempting
to run virtual machines on nixos as a development stack.

`All I want for christmas is a bridged network`

all I wanted is a bridged network to have VMs DHCP on my LAN.

One development stack I use is a VM filled with a bunch of services. That way I can setup
and install the machine just like a production node. Acurately representing the deployment
makes development and testing easier. Often this setup is used as some type of integration
testing or performance testing.

But enough about that... and onto setting up a bridged network on nixos!

So I spent a little looking around on how to setup bridged networking with very
little fruitful results. I didn't want to use networkd right away but i was guided
that way on the nixos chat because the configuration directives are documented
by networkd and we all know the state of nixos documentation.

I ran into some issues along the way

- `nixos-rebuild switch` took really long to configure networkd. This made feedback painful because trying things took a while.
- nixos networking documentation is subpar, atleast very confusing at the minimum
- documentation is pretty much missing on setting up common deployments. You're forced to look at
a set of options and put them together to make something that works.
- i first looked for bridged networking using the networking.* set of options but was unable to find a complete example
- nixos-rebuild switch does not always work. This is the first time the configuration was not applied to the running system.

**More on configuration not being applied to the running system**

whatever happened i'm not sure, i had to reboot the box for the network to come up properly. I discovered this by making a nixos VM and configuring it just like I did before. miraculously
it worked!

I thought WTH did i do wrong... At the end of the day I was fed up with the amount of time I put into it and wanted to move on. So I did.

## dns fun

Second big woes was DNS

- first i tried 'networking.search' and that did nothing
- then i tried 'services.resolved.domains = [ "lan" ]' and that didn't work
- then i tried 'systemd.network.networks.<name>.domains' and that finally worked
- getting 'search lan' functionality is surprisingly difficult
- somehow i was automatically switched over to 'resolved' functionality (services.resolved.enable) when enabling systemd.network

# Working configuration

The final configration that setup bridged networking for my host

        # This network config uses sytemd networkd with a bridge
        {
        networking.hostName = "desktop3";
        networking = {
            useDHCP = false;
            useNetworkd = true;
        };
        systemd.network = {
            enable = true;
            netdevs = {
                "25-br0" = {
                    netdevConfig = {
                        Kind = "bridge";
                        Name = "br0";
                    };
                };
            };
            networks = {
                "30-br0" = {
                    matchConfig.Name = "en*";
                    networkConfig = {
                        Bridge = "br0";
                    };
                };
                "40-br0" = {
                    DHCP = "yes";
                    matchConfig.Name = "br0";
                };
            };
        };

        # Wait for any interface to become available, not for all
        systemd.services."systemd-networkd-wait-online".serviceConfig.ExecStart = [
            "" "${config.systemd.package}/lib/systemd/systemd-networkd-wait-online --any"
        ];
        }



# Final Thoughts

I think that nixos might be the best OS i've used in terms of reproducibility.

I usually dont have a lot of problem these days with ubuntu but having to upgrade between distributions and set everything back up was a pain. Mostly because I didn't remember what
I wanted until I needed it right away. There was some things that were old on ubuntu like i3, tmux and polybar that I would compile from source.

I dont even have a complete list of everything.

I've attempted to salt or ansible my desktop and development environments but those tools
required more effort than I was willing to put in.

So all that being said, I hope this blog post helps someone on their nixos adventures.
