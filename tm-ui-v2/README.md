## Ticket Monster UI - Version 2

This proxy helps us keep friendly URLs even when there are composite UIs or composite microservice REST APIs.
Ticket Monster UI uses a simple HTTP server (Apache) to serve the static content and then use the reverse proxy plugins to proxy REST calls to the appropriate microservice:

*Reverse proxy defined in httpd.conf:*
```
# proxy for the admin microserivce
ProxyPass "/rest" "http://backend-v1.YOUR-SYSTEM-DOMAIN.com/rest"
ProxyPassReverse "/rest" "http://backend-v1.YOUR-SYSTEM-DOMAIN.com/rest"
```

## Prerequisites

* Requires access to a PCF Cluster
* Make sure you have [Cloud Foundry CLI](https://docs.cloudfoundry.org/cf-cli/install-go-cli.html) installed 
* You need [Docker](https://www.docker.com/community-edition) to create a Docker image 
* [Sign In](https://hub.docker.com/) to your DockerHub Account

## Rules for Apigee Edge API Proxy

### cf-dark-launch.js
This rule routes traffic to tm-ui-v2 if the http request header X-Dark-Launch is set to 'internal'.

### cf-canary-release.js
This rule routes traffic to tm-ui-v2 if the http request header X-Dark-Launch is set to 'internal'. Additionally, it takes off 25% of traffic from tm-ui-v1 and redirects it to tm-ui-v2.

## Instructions

**0. [Clone the repository](https://github.com/dynatrace-innovationlab/monolith-to-microservice-cloudfoundry#instructions) and change directory**
```sh
$ cd tm-ui-v2
```

**1. Build Docker image**
```sh
$ docker build -t <your dockerhub account>/tm-ui:backend .
```

**2. Push Docker image to DockerHub**
```sh
$ docker push <your dockerhub account>/tm-ui:backend
```

**3. Push the application to Cloud Foundry by refering to the image on DockerHub**
```sh
$ cf push tm-ui-v2 -o <your dockerhub account>/tm-ui:backend
```