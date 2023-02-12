---
inject: true
to: tsconfig.base.json
after: paths
prepend: true
---
      "@microservice-platform/<%=name%>-gateway/*": ["apps/<%=name%>-gateway/src/*"],