import { CreateNotificationDto } from '@microservice-platform/shared/dtos';

export class CreateNotificationCommand {
  constructor(public readonly data: CreateNotificationDto) {}
}
