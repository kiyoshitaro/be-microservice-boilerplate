---
inject: true
to: env.global.sample
append: true
---
<%= h.changeCase.constantCase(name) %>_SERVICE_PORT=
<%= h.changeCase.constantCase(name) %>_SERVICE_HOST=<%= name %>-service