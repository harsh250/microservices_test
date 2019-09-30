## Ticket Monster Backend V1

This `backend` module contains the monolith Ticket Monster service **without** the UI. Use an external UI to connect to the REST API that this service exposes.

## Prerequisites

* Requires access to a PCF Cluster
* Make sure you have [Cloud Foundry CLI](https://docs.cloudfoundry.org/cf-cli/install-go-cli.html) installed 
* You need [Maven](https://maven.apache.org/) to build the monolith
* You need [Docker](https://www.docker.com/community-edition) to create a Docker image 
* [Sign In](https://hub.docker.com/) to your DockerHub Account

## Instructions

**0. [Clone the repository](https://github.com/dynatrace-innovationlab/monolith-to-microservice-cloudfoundry#instructions) and change directory**
```sh
$ cd backend-v1
```

**1. Make sure to have a `mysql` Cloud Foundry service instance described [here]()**

If you don't have a ticketMonster-mysql service, create one using:
```sh
$ cf create-service p-mysql 100mb ticketMonster-mysql
```

**2. Build the latest version of the backend-v1 as Docker image**
```sh
$ mvn clean install -P mysql fabric8:build -D docker.image.name=<your dockerhub account>/backend:v1
```

**3. Move to Dockerfile and push Docker image to DockerHub**
```sh
$ cd .\target\docker\<your dockerhub account>\backend\v1\build\
$ docker push <your dockerhub account>/backend:v1
```

**4. Push the application to Cloud Foundry by refering to the container image on DockerHub**
```sh
cf push backend-v1 -o <your dockerhub account>/backend:v1
```

**5. Bind the `mysql` service instance to the application**
```sh
$ cf bind-service backend-v1 ticketMonster-mysql
```

**6. Get binding information (jdbcUrl, name and password) and set environment variables: database connection-url, user-name, and password to these values**
```sh
$ cf env backend-v1
$ cf set-env backend-v1 CONNECTION-URL jdbc:mysql://***
$ cf set-env backend-v1 USER-NAME ***
$ cf set-env backend-v1 PASSWORD ***
```

**7. Restage application to ensure your environment variable changes take effect**
```sh
$ cf restage backend-v1
```