---
title: "firewall"
date: todo
---

Just a nasty little adhoc firewall script I use to quickly secure a box for any ports it has open.

Only specific networks are allowed.

```
#!/bin/bash
#set -x

iptables -P INPUT ACCEPT
iptables -P FORWARD ACCEPT
iptables -P OUTPUT ACCEPT

iptables -F INPUT
#iptables -F FORWARD
#iptables -F OUTPUT

function clean_networks {
   grep -v ^# | awk '{print $1}' |grep -v ^$
}

# Quick and dirty iptables firewall
# We want to drop traffic for any open port if its not in the allowed list of IP addresses
#
function list_allowed_networks {

# the 1918 subnets
cat << EOF | clean_networks
10.0.0.0/8
172.16.0.0/12
192.168.0.0/16
EOF

cat << EOF | clean_networks
10.0.0.0/8
127.0.0.0/8
EOF
}

function list_open_ports {
	# ipv4
	netstat -lntu |awk '/^tcp / {print $4}' |awk -F: '{print $2}'
	# ipv6
	netstat -lntu |awk '/^tcp6 / {print $4}' |awk -F: '{print $4}'
}
function list_ports {
	list_open_ports
	echo 22
}
function list_networks {
	for N in $(list_allowed_networks)
	do
		echo $N
	done
	if [ -f /etc/firewall/networks.list ] ; then
		cat /etc/firewall/networks.list
	fi

	# All local addresses
	ip addr | awk -F'[ /]+' '/inet / {print $3}'

	# Let all your connected subnets in..
	# ip addr | awk  '/inet / {print $2}'
}

function prepare_iptables {

	# Create drop logged chain
	if ! iptables -L drop_logged >/dev/null 2>&1 ; then
		iptables -N drop_logged
	fi
	iptables -F drop_logged
	iptables -A drop_logged -j LOG --log-prefix "iptables-dropped: " --log-level 4
	iptables -A drop_logged -j DROP
}



#
# Begin building the firewall
#
prepare_iptables

list_networks | while read N
do
	echo "netowrk $N"
        iptables -A INPUT -s $N -j ACCEPT
done

list_ports | while read P
do
	echo "securing port $P"
        iptables -A INPUT -p tcp --dport $P -j drop_logged
done



```
