---
to: apps/<%=name%>-service/docker-compose.yml
---
version: "3.8"
services:
  <%=name%>-service:
    image: microservice-platform-<%=name%>-service:1.0.0
    container_name: microservice-platform-<%=name%>-service
    build:
      context: ./
      dockerfile: ../../docker/nest/Dockerfile
    restart: unless-stopped
    ports:
      - 3333:8000
