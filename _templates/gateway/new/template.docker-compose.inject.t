---
inject: true
to: docker-compose.yml
after: services
---
  <%=name%>-gateway:
    image: microservice-platform-<%=name%>-gateway:1.0.0
    container_name: microservice-platform-<%=name%>-gateway
    env_file:
      - .env.global.dev
      - apps/<%=name%>-gateway/.env.dev
    environment:
      APP_ENV: dev
    networks:
      - microservice-platform-network
      