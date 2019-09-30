## OrderService a Microservice for TicketMonster

This module contains the microservice OrdersService that deals with TicketMonster's bounded conext of booking event tickets.
It has its own data model as specified in ./mysql-scripts/orders-schema.sql. To extend the data model to the microservice's domain model, the
Teiid framework is used in code. This framework allows to create a virtual database view on the top of multiple databases. In case of OrdersService the legacy
database of the monolith and its own database are merged to a virtual view.

## Prerequisites

* Requires access to a PCF Cluster
* Make sure you have [Cloud Foundry CLI](https://docs.cloudfoundry.org/cf-cli/install-go-cli.html) installed 
* You need [Maven](https://maven.apache.org/) to build the monolith
* You need [Docker](https://www.docker.com/community-edition) to create a Docker image 
* [Sign In](https://hub.docker.com/) to your DockerHub Account

## How to use Teiid Spring Boot  
**1. Add Teeid dependency to pom.xml**
```xml
<dependency>
    <groupId>org.teiid</groupId>
    <artifactId>teiid-spring-boot-starter</artifactId>
    <version>1.0.0</version>
</dependency>
```

**2. Define domain model in ./src/main/resources/application.properties**
```
spring.teiid.model.package=org.ticketmonster.orders.domain
```

**3. Define data sources in ./src/main/resources/application-mysql.properties**
```
$ spring.datasource.legacyDS.url=<connection-url to ticketMonster-mysql>
$ spring.datasource.legacyDS.username=<user-name>
$ spring.datasource.legacyDS.password=<password>
$ spring.datasource.legacyDS.driverClassName=com.mysql.jdbc.Driver

$ spring.datasource.ordersDS.url=<connection-url to orders-mysql>
$ spring.datasource.ordersDS.username=<user-name>
$ spring.datasource.ordersDS.password=<password>
$ spring.datasource.legacyDS.driverClassName=com.mysql.jdbc.Driver
```

**4. Create TeiidDataSources.java configuration class ./src/config/**

## Instructions

**0. [Clone the repository](https://github.com/dynatrace-innovationlab/monolith-to-microservice-cloudfoundry#instructions) and change directory**
```sh
$ cd order-service
```

**1. Deploy a `mysql` Cloud Foundry service instance using the 100mb plan**
```sh
$ cf create-service p-mysql 100mb orders-mysql
```

**2. Build the latest version of OrderService as Docker image**
```sh
$ mvn clean install -P mysql,kubernetes fabric8:build -D docker.image.name=<your dockerhub account>/orders-service:latest -D skipTests
```

**3. Move to Dockerfile and push Docker image to DockerHub**
```sh
$ cd .\target\docker\<your dockerhub account>\orders-service\latest\build\
$ docker push <your dockerhub account>/orders-service:latest
```

**4. Push the application to Cloud Foundry by refering to the container image on DockerHub**
```sh
$ cf push orders-service -o <your dockerhub account>/orders-service:latest
```

**5. Bind orders-mysql and ticketMonster-mysql to the application**
```sh
$ cf bind-service orders-service orders-mysql
$ cf bind-service orders-service ticketMonster-mysql
```

**6. Get binding information (jdbcUrl, name, and password) and set database connection-url, user-name, and password in application-mysql.properties**
```sh
$ cf env orders-service

$ spring.datasource.legacyDS.url=<connection-url to ticketMonster-mysql>
$ spring.datasource.legacyDS.username=<user-name>
$ spring.datasource.legacyDS.password=<password>
$ spring.datasource.legacyDS.driverClassName=com.mysql.jdbc.Driver

$ spring.datasource.ordersDS.url=<connection-url to orders-mysql>
$ spring.datasource.ordersDS.username=<user-name>
$ spring.datasource.ordersDS.password=<password>
$ spring.datasource.legacyDS.driverClassName=com.mysql.jdbc.Driver
```

**7. Restage application to ensure your environment variable changes take effect**
```sh
$ mvn clean install -P mysql,kubernetes fabric8:build -D docker.image.name=<your dockerhub account>/orders-service:latest -D skipTests
$ cd .\target\docker\<your dockerhub account>\orders-service\latest\build\
$ docker push <your dockerhub account>/orders-service:latest 
$ cf push orders-service -o <your dockerhub account>/orders-service:latest
```