import { registerAs } from '@nestjs/config';
import * as process from 'process';

export const configCache = registerAs('cache', () => ({
  isGlobal: true,
  host: process.env.CACHE_HOST || 'localhost',
  port: Number(process.env.CACHE_PORT) || 6379,
  database: Number(process.env.CACHE_DATABASE) || 0,
  ttl: Number(process.env.CACHE_TTL) || 10,
}));
