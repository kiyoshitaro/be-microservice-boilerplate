import { Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { MEventPublisher } from './publisher';
import { EventPublisherOptions } from './options';
import { EVENT_PUBLISHER_OPTIONS } from './constants';

@Injectable()
export class MNotificationPublisher {
  @Inject(MEventPublisher)
  private readonly mEventPublisher: MEventPublisher;

  @Inject(EVENT_PUBLISHER_OPTIONS)
  private readonly options: EventPublisherOptions;

  wsWebPlatformPublish(data: Record<string, any>) {
    this.mEventPublisher.publish(
      this.options.notification.wsWebPlatformEvent,
      data
    );
  }

  notify<TResult, TInput>(name: string, data: TInput): Observable<TResult> {
    return this.mEventPublisher.publish<TResult, TInput>(name, data);
  }
}
