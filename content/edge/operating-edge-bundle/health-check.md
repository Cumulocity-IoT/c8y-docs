---
weight: 20
title: Health check
layout: bundle
sector:
  - edge_server
---

### Network {#network}

The following instructions show how to check the network connectivity of the platform.

#### Check network interface of the node {#check-network-interface-of-the-node}

The following commands will show the interface and network settings of the machine:

```shell
ip a
```

This will list all interfaces and its current configuration.

Example:

	[admin@iot-edge-server ~]$ ip a

	1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host
       valid_lft forever preferred_lft forever

	2: enp0s3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP group default qlen 1000
    link/ether 08:00:27:88:e7:de brd ff:ff:ff:ff:ff:ff
    inet 10.0.2.15/24 brd 10.0.2.255 scope global noprefixroute dynamic enp0s3
       valid_lft 85338sec preferred_lft 85338sec
    inet6 fe80::a00:27ff:fe88:e7de/64 scope link noprefixroute
       valid_lft forever preferred_lft forever

	3: enp0s8: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP group default qlen 1000
    link/ether 08:00:27:81:fe:9d brd ff:ff:ff:ff:ff:ff
    inet 192.168.56.120/24 brd 192.168.56.255 scope global noprefixroute enp0s8
       valid_lft forever preferred_lft forever
    inet6 fe80::5b3a:bc65:40b5:f9ea/64 scope link noprefixroute
       valid_lft forever preferred_lft forever

You must make sure that the node has an external interface (ethX) and the loopback interface configured (lo). The loopback interface must have the fixed IP 127.0.0.1 with subnet mask 255.0.0.0, and the IP address of the external interface must reside in the correct subnet with the correct subnet mask (in this example 255.255.252.0).

The following command lists the local routing information.

```shell
netstat -rn
```

Example:

	[admin@iot-edge-server ~]$ netstat -rn
	Kernel IP routing table
	Destination     Gateway         Genmask         Flags   MSS Window  irtt Iface
	0.0.0.0         10.0.2.2        0.0.0.0         UG        0 0          0 enp0s3
	10.0.2.0        0.0.0.0         255.255.255.0   U         0 0          0 enp0s3
	192.168.56.0    0.0.0.0         255.255.255.0   U         0 0          0 enp0s8

Make sure you have the destination 0.0.0.0 in the list which then also has the gateway flag (G) set.

#### Check access to the internet {#check-access-to-the-internet}

Try to reach a well-known address in the internet with the following command:

```shell
ping -s 1500 8.8.8.8
```

Example:
	[admin@iot-edge-server ~]$ ping -s 1500 8.8.8.8
	PING 8.8.8.8 (8.8.8.8) 1500(1528) bytes of data.
	64 bytes from 8.8.8.8: icmp_seq=1 ttl=56 time=2.61 ms
	64 bytes from 8.8.8.8: icmp_seq=2 ttl=56 time=2.80 ms
	64 bytes from 8.8.8.8: icmp_seq=3 ttl=56 time=2.82 ms
	64 bytes from 8.8.8.8: icmp_seq=4 ttl=56 time=2.75 ms
	64 bytes from 8.8.8.8: icmp_seq=5 ttl=56 time=2.79 ms

As when checking the internal reach ability, you must make sure that you can see the replies from the address you tried to reach. Use Ctrl-C to end the ping command.

### Processing {#processing}

This section lists the required services and processes on the Edge appliance.

#### Check platform status {#check-platform-status}

You can check the status of the platform by running the following command:

	curl -v http://localhost:8181/tenant/health

	* About to connect() to localhost port 8181 (#0)
	*   Trying ::1...
	* Connected to localhost (::1) port 8181 (#0)
	> GET /tenant/health HTTP/1.1
	> User-Agent: curl/7.29.0
	> Host: localhost:8181
	> Accept: */*
	>
	< HTTP/1.1 200 OK
	< Content-Type: application/json
	< Date: Sat, 05 May 2018 18:13:28 GMT
	< Transfer-Encoding: chunked
	< Server: Jetty(8.1.19.v20160209)
	<
	* Connection #0 to host localhost left intact
	{
		"status": "UP",
		"services": {
			"details": {},
			"status": "UP"
		},
		"mongodb": {
			"details": {},
			"status": "UP"
		},
		"mongodb-cluster": {
			"details": {
				"mongodb-cluster-enabled": true
			},
			"noSuppressibleDown": false,
			"status": "UP"
		},
		"tenant": {
			"details": {},
			"status": "UP"
		}
	}


The 'status:"UP"' shows that all services are running.

If something fails, the endpoint should respond a different error code. The response should contain something like:


	{
	    "status":"DOWN",
	    "services":{
	        "details": {},
	        "status":"UP"
	    },
	    "mongodb":{
	        "details": {},
	        "status":"UP"
	    },
	    "mongodb-cluster": {
	        "details": {
	            "mongodb-cluster-enabled": true
	        },
	        "noSuppressibleDown": false,
	        "status": "UP"
	    },
	    "tenant":{
	      "details":{
	         "notFullyInitializedTenants":{
	            "savenindia":"PAYPAL_REFUND",
	            "nowa":"PAYPAL_REFUND",
	            "ttc":"PAYPAL_REFUND",
	            "controllogichh":"PAYPAL_REFUND",
	            "jonathan":"PAYPAL_REFUND",
	            "barcotrail":"PAYPAL_REFUND",
	            "ngservices":"PAYPAL_REFUND",
	            "sixsenses":"PAYPAL_REFUND",
	            "trav2":"PAYPAL_REFUND",
	            "lucaslocatrix":"PAYPAL_REFUND"
	         }
	      },
	      "status":"DOWN"
	   }
	}

The response contains checks for the most important components:

* services - status of OSGI services running within karaf container
* mongo - status of connection to mongo database (for clustered mongo shows status of connection to mongos)
* mongodb-cluster - status of mongo cluster, status DOWN doesn't have bad impact for overall health status (because it is marked as "noSuppressibleDown": false) Mongo-cluster shows status as follow:
    * "details": {"mongodb-cluster-enabled": true}, "status": "UP" - mongo cluster is enabled and works correctly
    * "details": {"mongodb-cluster-enabled": false}, "status": "DOWN" - mongo cluster is disabled and mongo works in single mode (for health status check section "mongo")
    * "details": {"mongodb-cluster-enabled": true}, "status": "DOWN" - mongo cluster is enabled and works incorrectly, additionally mongo exception is presented
* tenant - tenant initialization status

The list describes the tenants which on the core node have not been fully initialized and the initialization status they are in.

|Status|Description|
|:---|:---
|UNINITIALIZED|Tenant has not been initialized|
|DB_INITIALIZED|Database initialisation is performed|
|LOCAL&#95;APPLICATION_INITIALIZED|Local applications are deployed|
|CEP_INITIALIZED|CEP rules are been deployed|
|HEART&#95;BEAT&#95;MONITORING_INITIALIZED|Heartbeat monitoring for devices is been started|
|PAYPAL_REFUND|Failed PayPal operations are refunded (when tenant is using PayPal)|
|BULK&#95;OPERATION_INITIALIZED|Support for bulk operations is initialized|
|FULLY_INITIALIZED|Tenant is in working state (should not be displayed)|


### Checking the system services {#checking-the-system-services}

#### Checking REST API availability {#checking-rest-api-availability}

Run the following command to check the REST API availability:

```shell
curl -u 'edge/<username>:<password>' -v -X GET http://<base_url>/platform
```

	* About to connect() to <base_url> port 80 (#0)
	*   Trying 52.29.189.245... connected
	* Connected to <base_url> (52.29.189.245) port 80 (#0)
	* Server auth using Basic with user 'management/<username>'
	> GET /platform HTTP/1.1
	> Authorization: Basic bWFuYWdlbWVudC90c3NjaHVlbDohITQ3TmV1bjI3MQ==
	> User-Agent: curl/7.19.7 (x86_64-redhat-linux-gnu) libcurl/7.19.7 NSS/3.21 Basic ECC zlib/1.2.3 libidn/1.18 libssh2/1.4.2
	> Host: <base_url>
	> Accept: */*
	>
	< HTTP/1.1 200 OK
	< Server: nginx
	< Date: Tue, 23 Aug 2016 15:39:29 GMT
	< Content-Type: application/vnd.com.nsn.cumulocity.platformApi+json; charset=UTF-8; ver=0.9
	< Transfer-Encoding: chunked
	< Connection: keep-alive
	<
	{"alarm":{"alarms":{"alarms":null,"self":"http://management.<base_url>/alarm/alarms"},"alarmsForSource":"http://management.<base_url>/alarm/alarms?source={source}","alarmsForSourceAndStatus":"http://management.<base_url>/alarm/alarms?source={source}&status={status}","alarmsForSourceAndStatusAndTime":"http://management.<base_url>/alarm/alarms?source={source}&status={status}&dateFrom={dateFrom}&dateTo={dateTo}","alarmsForSourceAndTime":"http://management.<base_url>/alarm/alarms?source={source}&dateFrom={dateFrom}&dateTo={dateTo}","alarmsForStatus":"http://management.<base_url>/alarm/alarms?status={status}","alarmsForStatusAndTime":"http://management.<base_url>/alarm/alarms?status={status}&dateFrom={dateFrom}&dateTo={dateTo}","alarmsForTime":"http://management.<base_url>/alarm/alarms?dateFrom={dateFrom}&dateTo={dateTo}","self":"http://management.<base_url>/alarm"},…}

This example shows the correct response of the platform. The username and password must have full read access to the {{< management-tenant >}}. The &#60;base_url> must be given to connect to the correct platform and the {{< management-tenant >}} must not be blocked from outside.  
