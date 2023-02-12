---
to: apps/<%=name%>-service/src/models/index.ts
---
import <%= h.changeCase.pascalCase(name) %>Model from './<%=name%>.model';

export { <%= h.changeCase.pascalCase(name) %>Model };