---
inject: true
to: env.global.sample
append: true
---
<%= h.changeCase.constantCase(name) %>_GATEWAY_PORT=