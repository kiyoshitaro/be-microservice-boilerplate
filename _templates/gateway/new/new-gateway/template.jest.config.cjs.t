---
to: apps/<%=name%>-gateway/jest.config.ts
---
/* eslint-disable */
export default {
  displayName: '<%=name%>-gateway',
  preset: '../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/apps/<%=name%>-gateway',
};