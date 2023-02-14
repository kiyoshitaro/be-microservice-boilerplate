---
to: apps/<%=name%>-gateway/docker-compose.dev.yml
---
version: "3.8"
services:
  <%=name%>-gateway:
    image: microservice-platform-<%=name%>-gateway:1.0.0-dev
    container_name: microservice-platform-<%=name%>-gateway-dev
    build:
      context: ../../
      dockerfile: docker/nest/dev.dockerfile
    working_dir: /home/node/workspace
    command: npx nx serve <%=name%>-gateway
    restart: unless-stopped
    tty: true
    volumes:
      - ../../:/home/node/workspace
      - /home/node/workspace/apps/
      - .:/home/node/workspace/apps/<%=name%>-gateway
      - /home/node/workspace/node_modules
    networks:
      - microservice-platform-server_microservice-platform-network
    ports:
      - 3333:8000
    env_file:
      - ../../.env.global.dev
      - .env.dev

networks:
  microservice-platform-server_microservice-platform-network:
    external: true