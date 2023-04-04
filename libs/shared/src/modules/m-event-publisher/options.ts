import { ClientOptions } from '@nestjs/microservices';
import { ModuleMetadata, Type } from '@nestjs/common';

export interface EventPublisherOptions {
  isGlobal?: boolean;
  default: string;
  connections: Record<string, ClientOptions>;

  notification?: {
    wsWebPlatformEvent?: string;
    wsMobilePlatformEvent?: string;
  };
}

export interface EventPublisherAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  name?: string;
  isGlobal: boolean;
  useExisting?: Type<EventPublisherOptions>;
  useFactory?: (
    ...args: any[]
  ) => Promise<EventPublisherOptions> | EventPublisherOptions;
  inject?: any[];
}
