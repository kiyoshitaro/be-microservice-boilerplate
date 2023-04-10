---
to: apps/<%=name%>-service/src/loaders/import-library.ts
---
export const importLibrary = async () => {
  //Import all module when the package is not found in the package.json
  await import('pg');
  await import('cache-manager');
}