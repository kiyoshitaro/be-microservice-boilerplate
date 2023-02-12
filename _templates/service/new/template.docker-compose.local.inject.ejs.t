---
inject: true
to: docker-compose.local.yml
after: services
---
  <%=name%>-service:
    image: microservice-platform-<%=name%>-service:1.0.0
    container_name: microservice-platform-<%=name%>-service
    env_file:
      - .env.global.dev
      - apps/<%=name%>-service/.env.dev
    environment:
      APP_ENV: dev
    networks:
      - microservice-platform-network
      