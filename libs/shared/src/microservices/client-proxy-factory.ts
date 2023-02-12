import {
  ClientOptions,
  ClientProxyFactory,
  Closeable,
} from '@nestjs/microservices';
import { ClientAppProxy } from './client-proxy';
import { firstValueFrom } from 'rxjs';

export class ClientProxyAppFactory {
  public static create(
    clientOptions: ClientOptions
  ): ClientAppProxy & Closeable {
    const clientProxy = ClientProxyFactory.create(
      clientOptions
    ) as ClientAppProxy;
    clientProxy.sendAwait = async (messagePattern: string, data: any) => {
      return await firstValueFrom(clientProxy.send(messagePattern, data));
    };
    return clientProxy;
  }
}
