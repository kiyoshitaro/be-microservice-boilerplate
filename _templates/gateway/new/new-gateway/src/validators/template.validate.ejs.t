---
to: apps/<%=name%>-gateway/src/validators/<%=name%>.validate.ts
---
import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common"

@Injectable()
export class <%= h.changeCase.pascalCase(name) %>ValidationPipe implements PipeTransform<any> {
    async transform(value: any, { metatype }: ArgumentMetadata){
        return value
    }
}