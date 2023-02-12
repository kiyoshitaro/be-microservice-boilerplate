---
to: apps/<%=name%>-gateway/tsconfig.spec.json
---
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "../../dist/out-tsc",
    "module": "commonjs",
    "types": ["jest", "node"]
  },
  "include": ["jest.config.ts", "**/*.test.ts", "**/*.spec.ts", "**/*.d.ts"]
}