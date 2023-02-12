---
to: apps/<%=name%>-service/src/queries/query.ts
---
export class BaseQuery {
  constructor(public readonly include: string = '') {}
}