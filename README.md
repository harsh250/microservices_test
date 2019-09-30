# Fearless Monolith to Microservices Migration – A guided journey

This repository is a clone from [ticket-monster-msa/monolith](https://github.com/ticket-monster-msa/monolith) maintained by Christian Posta, who gave permission to reuse it for this cloud migration showcase.

The repository is a monorepo of projects that illustrate migrating a monolith application (TicketMonster) to microservices on Cloud Foundry. For this journey, a blog post series explains the required concepts and best practices. Open the initial blog: [Fearless Monolith to Microservices Migration – A guided journey](https://www.dynatrace.com/news/blog/fearless-monolith-to-microservices-migration-a-guided-journey/) that guides you through the different stages in a structured manner. (A summary of the steps is shown in the Instructions section below.) 

## Overview

There are a series of projects* used to illustrate a migration to microservices from a Java EE monolith. (*more are coming as the blog series grows)

### monolith
The getting started experience begins with the `monolith` project. In this project we deploy our monolith application and understand the domain, architecture, and structure of the application that will be the foundation for successive iterations.
 
### tm-ui-v*
The `tm-ui-v*` folders contain different versions of the front-facing UI that we use as we migrate from a monolith to split out the UI to the set of microservices.

### backend-v*
The `backend-*` folders contain the monolith with the UI removed and successive iterations of evolution. With `backend-v1`, we have taken the monolith as it is and removed the UI. It contains a REST API that can be called from the UI. In `backend-v2` we've stated adding feature flags for controlling the introduction of a new microservice. See each respective sub project for more information.
 
### orders-service
The `orders-service` folder represents the repository of the microservice OrdersService. This microservices is extracted from the backend of TicketMonster and maintains its own data model. The endpoint of the service is /rest/bookings to GET and POST tickets. 

### load-generation
The `load-generation` folder contains load generation scripts that simulate end user actions on any UI of TicketMonster. The scripts are running on PhantomJS and the navigation is implemented in CasperJS. The `load-generation` folder provides a container image to execute the scripts without need to install PhantomJS or CasperJS.

## Instructions

**1. Clone the repository**
```sh
$ git clone https://github.com/dynatrace-innovationlab/monolith-to-microservice-cloudfoundry.git
```

**2. Lift-and-shift TicketMonster to Cloud Foundry**

* In directory `monolith`, follow the [Instructions](./monolith/README.md) to run TicketMonster on Cloud Foundry.

**3. Set a new UI in front of TicketMonster**

* In directory `tm-ui-v1`, follow the [Instructions](./tm-ui-v1/README.md) to set an independent UI in front of TicketMonster. 

**4. Deploy a new version of TicketMonster with the UI removed**

* In directory `backend-v1`, follow the [Instructions](./backend-v1/README.md) to run a TicketMonster without UI.

**5. Set a new UI in front of TicketMonster**

* In directory `tm-ui-v2`, follow the [Instructions](./tm-ui-v2/README.md) to set an independent UI in front of the new backend (`backend-v1`).

**6. Deploy the Microservice OrdersService**

* In directory `orders-service`, follow the [Instructions](./orders-service/README.md) to create the mysql instance for the microservice and to deploy the microservice.

**7. Deploy a new version of TicketMonster with (the UI removed and) the cability of calling the OrdersService**

* In directory `backend-v2`, follow the [Instructions](./backend-v2/README.md) to run a TicketMonster that calls OrdersService for booking tickets.



