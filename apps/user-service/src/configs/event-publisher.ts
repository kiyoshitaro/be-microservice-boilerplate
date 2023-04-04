import { registerAs } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

export const configEventPublisher = registerAs('event-publisher', () => ({
  isGlobal: true,
  default: process.env.EVENT_PUBLISHER_DRIVER || 'redis',
  connections: {
    redis: {
      transport: Transport.REDIS,
      options: {
        host: process.env.EVENT_PUBLISHER_HOST,
        port: Number(process.env.EVENT_PUBLISHER_PORT),
      },
    },
    kafka: {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'm-event',
          brokers: [
            `${process.env.EVENT_PUBLISHER_HOST}:${process.env.EVENT_PUBLISHER_PORT}`,
          ],
        },
        producerOnlyMode: true,
        consumer: {
          groupId: 'm-user-service-event-consumer',
        },
      },
    },
  },
}));
