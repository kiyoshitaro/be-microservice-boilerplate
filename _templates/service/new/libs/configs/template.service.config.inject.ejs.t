---
inject: true
to: libs/shared/src/configs/service-configs.ts
after: this.envConfig = {}
---
    this.envConfig.<%= h.changeCase.camelCase(name) %>Service = {
      options: {
        port: process.env.<%= h.changeCase.constantCase(name) %>_SERVICE_PORT,
        host: process.env.<%= h.changeCase.constantCase(name) %>_SERVICE_HOST,
      },
      transport: Transport.TCP,
    };