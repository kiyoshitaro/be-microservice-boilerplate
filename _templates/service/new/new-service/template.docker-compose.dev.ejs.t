---
to: apps/<%=name%>-service/docker-compose.dev.yml
---
version: "3.8"
services:
  <%=name%>-service:
    image: microservice-platform-<%=name%>-service:1.0.0-dev
    container_name: microservice-platform-<%=name%>-service-dev
    build:
      context: ../../
      dockerfile: docker/nest/dev.dockerfile
    working_dir: /home/node/workspace
    command: npx nx serve <%=name%>-service
    restart: unless-stopped
    tty: true
    volumes:
      - ../../:/home/node/workspace
      - /home/node/workspace/apps/
      - .:/home/node/workspace/apps/<%=name%>-service
      - /home/node/workspace/node_modules
    networks:
      - be-microservice-boilerplate_microservice-platform-network
    env_file:
      - ../../.env.global.dev
      - .env.dev

networks:
  be-microservice-boilerplate_microservice-platform-network:
    external: true