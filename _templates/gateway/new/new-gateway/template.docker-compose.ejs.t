---
to: apps/<%=name%>-gateway/docker-compose.yml
---
version: "3.8"
services:
  <%=name%>-gateway:
    image: microservice-platform-<%=name%>-gateway:1.0.0
    container_name: microservice-platform-<%=name%>-gateway
    build:
      context: ./
      dockerfile: ../../docker/nest/Dockerfile
    restart: unless-stopped
    ports:
      - 3333:8100
