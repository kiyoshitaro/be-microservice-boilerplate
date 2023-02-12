import { ClientProxy } from '@nestjs/microservices';

export abstract class ClientAppProxy extends ClientProxy {
  abstract sendAwait(messagePattern: string, data: any): Promise<any>;
}
