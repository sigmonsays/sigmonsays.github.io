+++
date = "2023-12-17T01:23:45-07:00"
draft = true
title = "nixos networking"

tags = [ "nixos", "networking" ]
+++


I recently switched my main desktop from ubuntu to nixos. So I started down the road of attempting 
to run virtual machines on nixos as a development stack.

`All I want for christmas is a bridged network`

all I wanted is a bridged network to have VMs DHCP on my LAN.

One development stack I use is a VM filled with a bunch of services. That way I can setup 
and install the machine just like a production node. Acurately representing the deployment 
makes development and testing easier. Often this setup is used as some type of integration
testing or performance testing.

I ran into some things that really began to bother me

`TODO`

`nixos-rebuild switch` took really long to configure networkd. 

- first i tried 'networking.search' and that did nothing
- then i tried 'services.resolved.domains = [ "lan" ]' and that didn't work
- then i tried 'systemd.network.networks.<name>.domains' and that finally worked

- nixos networking documentation is subpar, atleast very confusing at the minimum
- documentation is pretty much missing
- i first looked for bridged networking using the networking.* set of options but was unable to find a complete example
- 

nixos-rebuild switch does not always work. This is the first time the configuration was not applied

## dns fun

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



