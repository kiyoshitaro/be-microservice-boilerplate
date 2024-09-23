# Microservice Boilerplate

## Table of Contents
- [Microservice Boilerplate](#microservice-boilerplate)
  - [Table of Contents](#table-of-contents)
- [Introduction](#introduction)
- [Technology stack](#technology-stack)
- [How to run template ?](#how-to-run-template-)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Setup](#setup)
    - [Creating a New Service](#creating-a-new-service)
    - [Database Setup](#database-setup)
    - [Testing](#testing)
  - [Monitoring](#monitoring)
  - [Architecture Overview](#architecture-overview)

# Introduction
This microservice boilerplate is built on modern architectural principles and design patterns:

- **Inversion of Control (IoC)**: A design principle that inverts the flow of control in a system, allowing for loose coupling between components and improved modularity.

- **Repository Pattern**: An abstraction layer between the domain and data mapping layers, providing a collection-like interface for accessing domain objects and encapsulating the data access logic.

- **Command Query Responsibility Separation (CQRS)**: A pattern that separates read and update operations for a data store, allowing for optimized performance, scalability, and security.

- **Saga Pattern**: A way to manage distributed transactions and maintain data consistency across microservices, especially useful in eventual consistency scenarios.

- **Monorepo Architecture**: A software development strategy where multiple projects or components are stored in a single repository, facilitating code sharing and versioning.

The project follows the Model-View-Controller (MVC) design pattern, with clear separation between:

- **API Layer (Controllers)**: Handles incoming requests and returns responses.
- **Service Layer**: Contains business logic and orchestrates data flow.
- **Database Layer (Repositories)**: Manages data persistence and retrieval.

This separation of concerns promotes maintainability, testability, and scalability of the application.

# Technology stack
#nestjs #monorepo #objection #knex #kafka #redis #jest #postgresql #docker

# How to run template ?

## Getting Started

### Prerequisites

- Git
- Node.js
- Docker and Docker Compose

### Setup

1. Clone the repository:
```sh
git clone https://github.com/kiyoshitaro/be-microservice-boilerplate.git
cd be-microservice-boilerplate
```

2. Initialize the project:
- Replace **be-microservice-boilerplate** network with real name of project
- Remove all .env.dev in all service to run it and provide execute permission all .sh file 
```sh
find . -name "*.env.dev" -type f -delete
chmod 775 *.sh
```

- copy **env.global.sample** to **.env.global.dev** and run: 
```sh
bash init-project.sh 
(npm i maybe stuck just cancel and do again)
``` 
### Creating a New Service

1. Run the service creation script:
```sh
bash new-service.sh user (name of service)
``` 
This script will:
  - Copy the service codebase template
  - Add environment and Docker Compose configurations
  - Update service configs in `libs/shared/src/configs/service-configs.ts`
- Should be care about: 
  - Declare related service in providers with config
  - Add related service in healthcheck

2. Set the database name in the service's `.env.dev` file:
- Set **DB_DATABASE=user_service** in .env.dev of service
- Remove service inside container **be-microservice-boilerplate** and restart this service

3. Restart the service:
```sh
bash restart-service.sh user-service
``` 

4. **NOTE**: 
  - in window wsl should comment ***npm install --verbose*** in docker/nest/dev.dockerfile then install after connect to container
  - Add port/host in test api file, docker-compose.dev.yml manually

### Database Setup
1. Create the database on the host machine:
   ```sql
   CREATE DATABASE user_service;
   ```

2. Run migrations:
   ```sh
   bash migrate.sh user-service
   ```

### Testing

- Run API tests for the gateway outside Docker:
  ```sh
  npm run test:api platform-gateway
  ```
- Run service tests inside Docker:
  ```sh
  # Connect to the container first
  npm run test:api game-service
  ```

- **CODE NOTE**: 
  - Dynamic module: registerAsync, forRootAsync (async when need to inject) <-- in **forRootAsync** function of module need to pass variable <-- inject **ConfigService** to this params <-- **ConfigService** from **ConfigModule** which load some custom config <-- custom config defined by **registerAs**
  - docker-compose.local.yml shoould comment all without base service like : redis, db, kafka to run start-local

## Monitoring
- API Documentation: http://localhost:3400/api
- Kafka UI: http://localhost:9000/cluster
- Redis Commander: http://localhost:8081
- Elasticsearch Kibana: http://localhost:5601/app/home

## Architecture Overview

- Auto gencode with [hygen](https://www.hygen.io/)

- **Build ORM**: Custom Objection.js module with base model and query logger: [Objection module](libs/shared/src/modules/objection), [Base model](libs/shared/src/modules/objection/base-model.ts), [Query logger](libs/shared/src/modules/objection/knex-logging.ts)

- **Repository**: Build [repository](libs/shared/src/modules/objection/repositories/repository.ts) with common function (transaction, update, insert, ...)

- Design reusable **query**: Reusable queries for filtering, sorting, and pagination

- [**Transformer**](libs/shared/src/transformers/transformer.ts): Data formatting from repository output

- **Service**: Setup queryBus, commandBus in **CQRS** to execute query, command  

- **Event-Driven Architecture**: 
  - Central event bus for inner-service communication
  - **Publish & Consume** event [module](libs/shared/src/modules/m-event-publisher) by Kafka message queue (kafka Bootstrap Server: kafka:9092,kafka:9093) or Redis Pub/Sub 
  - Setup **sagas pattern** for distributed transactions

- **Exception Handling** over service: Summarize in [MicroserviceExceptionFilter](libs/shared/src/exceptions/microservice-exception-filter.ts) to full control over the exceptions layer. Can add logging or use a different JSON schema based on some dynamic factors

- **Inter-Service Communication**:  [**Message patterns**](libs/shared/src/microservices) for service-to-service calls

- **Caching**: Redis-based caching with custom key and TTL management, see [1](libs/shared/src/interceptors/MicroserviceCacheInterceptor.ts) and [2](libs/shared/src/cache/MicroserviceCacheFactory.ts)   

- **Notification System** : Implement [NotificationBus](libs/shared/src/modules/notification) with socket to client and persist db

- **Validator**: Pipe-validate in gateway & error-template

- Provide **Elasticsearch** module (continue...)

- Guard, Auth: have access to the ExecutionContext instance, and thus know exactly what's going to be executed next() while middleware auth not 

- Oauth ( upcoming...)

- **Metric**: Custom [MetricMiddleware](libs/shared/src/modules/metric) for performance monitoring

- **Logger**: Centralized [logger module](libs/shared/src/modules/loggers) with error interception

- **Testing**: E2E tests with **Jest**, provided by Nx

- **Project structure**: Set up **Monorepo** with [nx](https://nx.dev/) library and docker-compose to manage tools
  
- **Code Quality**: ESLint for code formatting and best practices

