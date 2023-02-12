import { EventPublisherOptions } from './options';
import { ClientOptions } from '@nestjs/microservices';

export const getConnection = (
  options: EventPublisherOptions,
  conName?: string
): ClientOptions => {
  // check if conName is a valid connection name
  conName = conName || options.default;

  const isConNameValid = Object.keys(options.connections).includes(conName);

  if (conName && !isConNameValid) {
    throw new Error(`EventPublisherModule not found connection '${conName}'`);
  }

  return options.connections[conName ? conName : options.default];
};
