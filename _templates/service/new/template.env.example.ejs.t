---
to: apps/<%=name%>-service/env.example
---
DB_DATABASE=<%= h.changeCase.snakeCase(name) %>_service