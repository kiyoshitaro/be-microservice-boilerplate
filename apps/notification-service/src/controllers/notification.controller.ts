import { NotificationService } from '@microservice-platform/notification-service/services';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { NotificationFilter } from '@microservice-platform/notification-service/filters';
import {
  CacheTTL,
  Controller,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';
import {
  CreateNotificationDto,
  ServiceResponseDto,
} from '@microservice-platform/shared/dtos';
import { MicroserviceCacheFactory } from '@microservice-platform/shared/cache';
import { MicroserviceCacheInterceptor } from '@microservice-platform/shared/interceptors';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @CacheTTL(MicroserviceCacheFactory)
  @UseInterceptors(MicroserviceCacheInterceptor)
  @MessagePattern('get_all')
  async getData(filters?: NotificationFilter): Promise<ServiceResponseDto> {
    const result = await this.notificationService.list(filters);
    return {
      statusCode: HttpStatus.OK,
      data: result,
    };
  }

  @MessagePattern('create_notification')
  async createTemplate(
    @Payload() data: CreateNotificationDto
  ): Promise<ServiceResponseDto> {
    const result = await this.notificationService.create(data);
    return {
      statusCode: HttpStatus.OK,
      data: result,
    };
  }
}
