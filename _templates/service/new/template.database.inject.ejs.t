---
inject: true
to: docker/postgres/database.sql
append: true 
---
CREATE DATABASE <%= h.changeCase.snakeCase(name) %>_service;