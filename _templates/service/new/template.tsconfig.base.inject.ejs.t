---
inject: true
to: tsconfig.base.json
after: paths
prepend: true
---
      "@microservice-platform/<%=name%>-service/*": ["apps/<%=name%>-service/src/*"],
