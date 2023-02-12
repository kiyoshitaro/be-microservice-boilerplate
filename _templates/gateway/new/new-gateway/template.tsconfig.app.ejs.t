---
to: apps/<%=name%>-gateway/tsconfig.app.json
---
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "../../dist/out-tsc",
    "module": "commonjs",
    "types": ["node"],
    "emitDecoratorMetadata": true,
    "target": "es2015"
  },
  "exclude": ["jest.config.ts", "**/*.spec.ts", "**/*.test.ts"],
  "include": ["**/*.ts"]
}