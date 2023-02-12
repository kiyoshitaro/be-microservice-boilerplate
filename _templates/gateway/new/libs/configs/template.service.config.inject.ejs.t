---
inject: true
to: libs/shared/src/configs/service-configs.ts
after: this.envConfig = {}
---
this.envConfig.<%= h.changeCase.camelCase(name) %>GatewayPort = process.env.<%= h.changeCase.constantCase(name) %>_GATEWAY_PORT