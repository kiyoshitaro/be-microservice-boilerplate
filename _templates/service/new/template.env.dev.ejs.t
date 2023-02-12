---
to: apps/<%=name%>-service/.env.dev
---
DB_DATABASE=<%= h.changeCase.snakeCase(name) %>_service