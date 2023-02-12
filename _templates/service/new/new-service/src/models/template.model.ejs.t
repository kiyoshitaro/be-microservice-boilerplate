---
to: apps/<%=name%>-service/src/models/<%=name%>.model.ts
---
import { BaseModel } from '@microservice-platform/shared/objection';

class <%= h.changeCase.pascalCase(name) %>Model extends BaseModel {
  static tableName = '<%= h.changeCase.snakeCase(name) %>';
  static connection = "postgres";
  id!: string;
  created_at?: Date | null;
  updated_at?: Date | null;
  deleted_at?: Date | null;

  static jsonSchema = {
    type: 'object',

    properties: {
      id: { type: 'string' },
      created_at: { type: ['string', 'null'], format: 'date-time' },
      updated_at: { type: ['string', 'null'], format: 'date-time' },
      deleted_at: { type: ['string', 'null'], format: 'date-time' },
    },
  };
}

export default <%= h.changeCase.pascalCase(name) %>Model;

<%= h.changeCase.pascalCase(name) %>Model.relationMappings = {};
