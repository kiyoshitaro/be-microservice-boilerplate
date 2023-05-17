import { Transport } from '@nestjs/microservices';

export class ConfigAppService {
  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
    this.envConfig = {};
    this.envConfig.notificationService = {
      options: {
        port: process.env.NOTIFICATION_SERVICE_PORT,
        host: process.env.NOTIFICATION_SERVICE_HOST,
      },
      transport: Transport.TCP,
    };
    this.envConfig.elasticsearchService = {
      options: {
        port: process.env.ELASTICSEARCH_SERVICE_PORT,
        host: process.env.ELASTICSEARCH_SERVICE_HOST,
      },
      transport: Transport.TCP,
    };
    this.envConfig.jobService = {
      options: {
        port: process.env.JOB_SERVICE_PORT,
        host: process.env.JOB_SERVICE_HOST,
      },
      transport: Transport.TCP,
    };
    this.envConfig.gameService = {
      options: {
        port: process.env.GAME_SERVICE_PORT,
        host: process.env.GAME_SERVICE_HOST,
      },
    };
    this.envConfig.platformGatewayPort = process.env.PLATFORM_GATEWAY_PORT;
    this.envConfig.userService = {
      options: {
        port: process.env.USER_SERVICE_PORT,
        host: process.env.USER_SERVICE_HOST,
      },
      transport: Transport.TCP,
    };
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}
