---
to: apps/<%=name%>-service/src/constants/repository.ts
---
export const REPOSITORIES = {
  <%= h.changeCase.constantCase(name) %>_REPOSITORY: '<%= h.changeCase.snakeCase(name) %>_repository',
};