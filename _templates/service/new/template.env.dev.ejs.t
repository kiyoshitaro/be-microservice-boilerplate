---
to: apps/<%=name%>-service/.env.dev
---
DB_DATABASE=<%= h.changeCase.snakeCase(name) %>_service
APP_NAME=<%= h.changeCase.snakeCase(name) %>-service