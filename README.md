## Introduction
- This template was built according to:
  - Inversion of Control
  - Repository Pattern
  - Command Query Responsibility Separation
  - Saga

- Using MVC design pattern, with controller(api layer), services(service layer) and repository(database layer)

## Technology stack


## How to run template ?

### Prepare
```sh
git clone https://github.com/kiyoshitaro/be-microservice-boilerplate.git
cd be-microservice-boilerplate
```
### Initialize
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
### Create service
- Run below script to create new service , which will auto:
  - Copy servn docker-cice codebase following template
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
### Create database
- Create db user_service in host
- Connect service and run  
```sh
bash migrate.sh user-service
``` 

### Testing
- Run test gateway outside docker and test service inside docker
```sh
npm run test:api game-gateway

connect ....
npm run test:api game-service
``` 

- **CODE NOTE**: 
  - Dynamic module: registerAsync, forRootAsync (async when need to inject) <-- in **forRootAsync** function of module need to pass variable <-- inject **ConfigService** to this params <-- **ConfigService** from **ConfigModule** which load some custom config <-- custom config defined by **registerAs**
  - docker-compose.local.yml shoould comment all without base service like : redis, db, kafka to run start-local

Auto gencode with hygen

Objection module & Base model 

Logging query from ORM

Repository

Filtering, Sorting, and Pagination design

Transformer

Service: Setup queryBus, commandBus in CQRS to execute query, command  

Event-driven: 
  - central-event-innerservice (eventBus) 
  - Transport event by kafka (kafka Bootstrap Server: kafka:9092,kafka:9093), redis in libs/shared/src/modules/m-event-publisher
  - Design sagas 
  - Auto-detect-event-from-decorator, notification-bus

MicroserviceExceptionFilter: full control over the exceptions layer. can add logging or use a different JSON schema based on some dynamic factors

Setup Message-pattern to communicate between services in /libs/shared/src/microservices with ConfigAppService

Setup Service Cache in Redis

Setup notification socket

Pipe-validate & error-template

Guard: have access to the ExecutionContext instance, and thus know exactly what's going to be executed next() while middleware auth not 

Oauth, auth

MetricMiddleware

Logger

Setup monoRepo with nx

Lint fix