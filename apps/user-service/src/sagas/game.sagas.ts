import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { map, Observable } from 'rxjs';
import { AddGameToUserCommand } from '../commands/impl';
import { AddGameToUserEvent } from '../events/impl';

@Injectable()
export class GameSagas {
  constructor() {}
  @Saga()
  addGameToUserEvent = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(AddGameToUserEvent),
      map((event) => new AddGameToUserCommand(event.data))
    );
  };
}
