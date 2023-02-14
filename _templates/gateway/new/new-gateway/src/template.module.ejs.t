---
to: apps/<%=name%>-gateway/src/<%=name%>-gateway.module.ts
---
import { Module } from '@nestjs/common';
import { <%= h.changeCase.pascalCase(name) %>Controller } from '@microservice-platform/<%=name%>-gateway/controllers';
import { ConfigAppService } from '@microservice-platform/shared/configs';
import { ClientProxyAppFactory } from '@microservice-platform/shared/microservices';
import {HealthModule} from "@microservice-platform/<%=name%>-gateway/health/health.module"



@Module({
    imports: [HealthModule],
    controllers: [<%= h.changeCase.pascalCase(name) %>Controller],
    providers : [
        ConfigAppService,
    ]
})
export class AppModule {}
