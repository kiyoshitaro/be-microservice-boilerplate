---
inject: true
to: .env.global.dev
append: true
---
<%= h.changeCase.constantCase(name) %>_GATEWAY_PORT=