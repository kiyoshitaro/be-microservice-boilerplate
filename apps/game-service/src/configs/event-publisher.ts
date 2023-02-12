import { registerAs } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

export const configEventPublisher = registerAs('event-publisher', () => ({
  isGlobal: true,
  default: 'redis',
  connections: {
    redis: {
      transport: Transport.REDIS,
      options: {
        host: process.env.EVENT_PUBLISHER_HOST,
        port: Number(process.env.EVENT_PUBLISHER_PORT),
      },
    },
  },
}));
