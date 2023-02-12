---
inject: true
to: .env.global.dev
append: true
---
<%= h.changeCase.constantCase(name) %>_SERVICE_PORT=
<%= h.changeCase.constantCase(name) %>_SERVICE_HOST=<%= name %>-service