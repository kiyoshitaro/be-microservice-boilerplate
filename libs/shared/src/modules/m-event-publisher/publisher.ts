import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { EVENT_PATTERN } from './constants';

@Injectable()
export class MEventPublisher {
  private readonly eventBus: ClientProxy;

  constructor(eventBus: ClientProxy) {
    this.eventBus = eventBus;
  }

  publish<T>(name: string, event: T): Observable<any> {
    return this.eventBus.emit<T>(EVENT_PATTERN, { name, event });
  }
}
