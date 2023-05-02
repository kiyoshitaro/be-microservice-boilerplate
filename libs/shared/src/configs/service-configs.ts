import { Transport } from '@nestjs/microservices';

export class ConfigAppService {
  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
    this.envConfig = {};
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
    this.envConfig.gameUserGatewayPort = process.env.GAME_USER_GATEWAY_PORT;
    this.envConfig.gameGatewayPort = process.env.GAME_GATEWAY_PORT;
    this.envConfig.gameService = {
      options: {
        port: process.env.GAME_SERVICE_PORT,
        host: process.env.GAME_SERVICE_HOST,
      },
    };
    this.envConfig.platformGatewayPort = process.env.PLATFORM_GATEWAY_PORT;
    // this.envConfig.orchestratorService = {
    //   options: {
    //     port: process.env.ORCHESTRATOR_SERVICE_PORT,
    //     host: process.env.ORCHESTRATOR_SERVICE_HOST,
    //   },
    //   transport: Transport.TCP,
    // };
    this.envConfig.userService = {
      options: {
        port: process.env.USER_SERVICE_PORT,
        host: process.env.USER_SERVICE_HOST,
      },
      transport: Transport.TCP,
    };
    // this.envConfig.templateService = {
    //   options: {
    //     port: process.env.TEMPLATE_SERVICE_PORT,
    //     host: process.env.TEMPLATE_SERVICE_HOST,
    //   },
    //   transport: Transport.TCP,
    // };
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}
