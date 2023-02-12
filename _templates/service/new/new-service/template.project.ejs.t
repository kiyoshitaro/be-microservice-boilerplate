---
to: apps/<%=name%>-service/project.json
---
{
  "name": "<%=name%>-service",
  "$schema": "../../node_modules/nx/schemas/project-schema.json",
  "sourceRoot": "apps/<%=name%>-service/src",
  "projectType": "application",
  "targets": {
    "build": {
      "executor": "@nrwl/webpack:webpack",
      "outputs": ["{options.outputPath}"],
      "options": {
        "target": "node",
        "compiler": "tsc",
        "outputPath": "apps/<%=name%>-service/build",
        "main": "apps/<%=name%>-service/src/main.ts",
        "tsConfig": "apps/<%=name%>-service/tsconfig.app.json",
        "assets": [
          "apps/<%=name%>-service/src/database",
          "apps/<%=name%>-service/src/configs/knex.ts"
        ],
        "generatePackageJson": true
      },
      "configurations": {
        "production": {
          "optimization": true,
          "extractLicenses": true,
          "inspect": false,
          "fileReplacements": [
            {
              "replace": "apps/<%=name%>-service/src/environments/environment.ts",
              "with": "apps/<%=name%>-service/src/environments/environment.prod.ts"
            }
          ]
        }
      }
    },
    "serve": {
      "executor": "@nrwl/js:node",
      "options": {
        "buildTarget": "<%=name%>-service:build"
      },
      "configurations": {
        "production": {
          "buildTarget": "<%=name%>-service:build:production"
        }
      }
    },
    "lint": {
      "executor": "@nrwl/linter:eslint",
      "outputs": ["{options.outputFile}"],
      "options": {
        "lintFilePatterns": ["apps/<%=name%>-service/**/*.ts"]
      }
    },
    "test": {
      "executor": "@nrwl/jest:jest",
      "outputs": ["{workspaceRoot}/coverage/{projectRoot}"],
      "options": {
        "jestConfig": "apps/<%=name%>-service/jest.config.ts",
        "passWithNoTests": true
      }
    }
  },
  "tags": []
}