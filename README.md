# Introduction
- This template was built according to:
  - Inversion of Control
  - Repository Pattern
  - Command Query Responsibility Separation
  - Saga
  - Mono repositories

- Using MVC design pattern, with controller(api layer), services(service layer) and repository(database layer)

# Technology stack
#nestjs #monorepo #objection #knex #kafka #redis #jest #postgresql #docker

# How to run template ?

## Prepare
```sh
git clone https://github.com/kiyoshitaro/be-microservice-boilerplate.git
cd be-microservice-boilerplate
```
## Initialize
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
## Create service
- Run below script to create new service , which will auto:
  - Copy service codebase following template
  - Add env compose.local , docker-compose.local but must set specific port&host  
  - Store host/post config in libs/shared/src/configs/service-configs.ts
- Should be care about: 
  - Declare related service in providers with config
  - Add related service in healthcheck

```sh
bash new-service.sh user (name of service)
``` 
- Set **DB_DATABASE=user_service** in .env.dev of service
- Remove service inside container **be-microservice-boilerplate** and restart this service
```sh
bash restart-service.sh user-service
``` 

- **NOTE**: 
  - in window wsl should comment ***npm install --verbose*** in docker/nest/dev.dockerfile then install after connect to container
  - Add port/host in test api file, docker-compose.dev.yml manually
## Create database
- Create db user_service in host
- Connect service and run  
```sh
bash migrate.sh user-service
``` 

## Testing
- Run test gateway outside docker and test service inside docker
```sh
npm run test:api platform-gateway

connect ....
npm run test:api game-service
``` 

- **CODE NOTE**: 
  - Dynamic module: registerAsync, forRootAsync (async when need to inject) <-- in **forRootAsync** function of module need to pass variable <-- inject **ConfigService** to this params <-- **ConfigService** from **ConfigModule** which load some custom config <-- custom config defined by **registerAs**
  - docker-compose.local.yml shoould comment all without base service like : redis, db, kafka to run start-local
## Monitor
- Platform docs: http://localhost:3400/api
- Kafka UI: http://localhost:9000/cluster
- Redis Commander: http://localhost:8081
- Elasticsearch kibana: http://localhost:5601/app/home

# Architecture

- Auto gencode with [hygen](https://www.hygen.io/)

- **Build ORM**: [Objection module](libs/shared/src/modules/objection) & [Base model](libs/shared/src/modules/objection/base-model.ts) & [Query logger](libs/shared/src/modules/objection/knex-logging.ts)

- **Repository**: Build [repository](libs/shared/src/modules/objection/repositories/repository.ts) with common function (transaction, update, insert, ...)

- Design reusable **query**: Filtering, Sorting, and Pagination

- [**Transformer**](libs/shared/src/transformers/transformer.ts): format data from output of repository

- **Service**: Setup queryBus, commandBus in **CQRS** to execute query, command  

- **Event-driven**: 
  - Central-event-innerservice (eventBus) 
  - **Publish & Consume** event [module](libs/shared/src/modules/m-event-publisher) by Kafka message queue (kafka Bootstrap Server: kafka:9092,kafka:9093) or Redis Pub/Sub 
  - Setup **sagas pattern**

- **Exception** over service: Summarize in [MicroserviceExceptionFilter](libs/shared/src/exceptions/microservice-exception-filter.ts) to full control over the exceptions layer. can add logging or use a different JSON schema based on some dynamic factors

- Setup [**message-pattern**](libs/shared/src/microservices) to communicate between services

- **Cache**: Design key & ttl internal service by Redis, see [1](libs/shared/src/interceptors/MicroserviceCacheInterceptor.ts) and [2](libs/shared/src/cache/MicroserviceCacheFactory.ts)   

- **Notification** system: Implement [NotificationBus](libs/shared/src/modules/notification) with socket to client and persist db

- **Validator**: Pipe-validate in gateway & error-template

- Provide **Elasticsearch** module (continue...)

- Guard, Auth: have access to the ExecutionContext instance, and thus know exactly what's going to be executed next() while middleware auth not 

- Oauth ( upcoming...)

- **Metric**: Add [MetricMiddleware](libs/shared/src/modules/metric) module and plug in gateway

- **Logger**: Provide [logger module](libs/shared/src/modules/loggers) and log error in inceptor

- **Testing**: e2e test with **jest** provided by nx 

- **Project structure**: Setup **Monorepo** with [nx](https://nx.dev/) library, docker-compose to manage tools

- Add Eslint to **format code**
