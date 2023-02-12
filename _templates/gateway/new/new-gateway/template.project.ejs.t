---
to: apps/<%=name%>-gateway/project.json
---
{
  "name": "<%=name%>-gateway",
  "$schema": "../../node_modules/nx/schemas/project-schema.json",
  "sourceRoot": "apps/<%=name%>-gateway/src",
  "projectType": "application",
  "targets": {
    "build": {
      "executor": "@nrwl/webpack:webpack",
      "outputs": ["{options.outputPath}"],
      "options": {
        "target": "node",
        "compiler": "tsc",
        "outputPath": "apps/<%=name%>-gateway/build",
        "main": "apps/<%=name%>-gateway/src/main.ts",
        "tsConfig": "apps/<%=name%>-gateway/tsconfig.app.json",
        "generatePackageJson": true
      },
      "configurations": {
        "production": {
          "optimization": true,
          "extractLicenses": true,
          "inspect": false,
          "fileReplacements": [
            {
              "replace": "apps/<%=name%>-gateway/src/environments/environment.ts",
              "with": "apps/<%=name%>-gateway/src/environments/environment.prod.ts"
            }
          ]
        }
      }
    },
    "serve": {
      "executor": "@nrwl/js:node",
      "options": {
        "buildTarget": "<%=name%>-gateway:build"
      },
      "configurations": {
        "production": {
          "buildTarget": "<%=name%>-gateway:build:production"
        }
      }
    },
    "lint": {
      "executor": "@nrwl/linter:eslint",
      "outputs": ["{options.outputFile}"],
      "options": {
        "lintFilePatterns": ["apps/<%=name%>-gateway/**/*.ts"]
      }
    },
    "test": {
      "executor": "@nrwl/jest:jest",
      "outputs": ["{workspaceRoot}/coverage/{projectRoot}"],
      "options": {
        "jestConfig": "apps/<%=name%>-gateway/jest.config.ts",
        "passWithNoTests": true
      }
    }
  },
  "tags": []
}