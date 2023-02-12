---
inject: true
to: libs/shared/src/dtos/index.ts
append: true
---
export * from './<%=name%>-service/create-<%=name%>.dto';