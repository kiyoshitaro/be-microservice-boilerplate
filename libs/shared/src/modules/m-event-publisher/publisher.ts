import { Injectable, OnModuleInit } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class MEventPublisher implements OnModuleInit {
  private readonly eventBus: ClientProxy;

  constructor(eventBus: ClientProxy) {
    this.eventBus = eventBus;
  }

  async onModuleInit() {
    await this.eventBus.connect();
  }

  publish<TResult, TInput>(name: string, data: TInput): Observable<TResult> {
    return this.eventBus.emit<TResult, TInput>(name, data);
  }
}
