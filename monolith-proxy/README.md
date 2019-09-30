## Ticket Monster Proxy

This proxy helps us keep friendly URLs even when there are composite UIs or composite microservice REST APIs.
It uses a simple HTTP server (Apache) to serve the static content and then use the reverse proxy plugins to proxy REST calls to the appropriate microservice:

*Reverse proxy defined in httpd.conf:*
```
# proxy for the admin microserivce
ProxyPass "/rest" "http://ticket-monster.YOUR-SYSTEM-DOMAIN.com/rest"
ProxyPassReverse "/rest" "http://ticket-monster.YOUR-SYSTEM-DOMAIN.com/rest"
```

## Prerequisites

* Requires access to a PCF Cluster
* Make sure you have [Cloud Foundry CLI](https://docs.cloudfoundry.org/cf-cli/install-go-cli.html) installed 
* You need [Docker](https://www.docker.com/community-edition) to create a Docker image 
* [Sign In](https://hub.docker.com/) to your DockerHub Account

## Instructions

**0. [Clone the repository](https://github.com/dynatrace-innovationlab/monolith-to-microservice-cloudfoundry#instructions) and change directory**
```sh
$ cd monolith-proxy
```

**1. Build Docker image**
```sh
$ docker build -t <your dockerhub account>/monolith-proxy:v1 .
```

**2. Push Docker image to DockerHub**
```sh
$ docker push <your dockerhub account>/monolith-proxy:v1
```

**3. Push the application to Cloud Foundry by refering to the image on DockerHub**
```sh
$ cf push monolith-proxy -o <your dockerhub account>/monolith-proxy:v1
```