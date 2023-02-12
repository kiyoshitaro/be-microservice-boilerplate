---
to: apps/<%=name%>-service/src/filters/<%=name%>.filters.ts
---
import { BaseFilter } from '@microservice-platform/shared/objection';
export declare type <%= h.changeCase.pascalCase(name) %>Filter = BaseFilter & {
  ids?: (string | number)[];
};