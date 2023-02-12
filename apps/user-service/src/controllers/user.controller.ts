import { UserService } from '@microservice-platform/user-service/services';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserFilter } from '@microservice-platform/user-service/filters';
import { Controller, HttpStatus } from '@nestjs/common';
import {
  CreateUserDto,
  GetUserDto,
  ServiceResponseDto,
} from '@microservice-platform/shared/dtos';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @MessagePattern('get_all')
  async getData(filters?: UserFilter): Promise<ServiceResponseDto> {
    const result = await this.userService.list(filters);
    return {
      statusCode: HttpStatus.OK,
      data: result,
    };
  }

  @MessagePattern('get_user_by_id')
  async get(@Payload() data: GetUserDto): Promise<ServiceResponseDto> {
    const result = await this.userService.list({ ids: [data.id] });
    return {
      statusCode: HttpStatus.OK,
      data: result.length ? result[0] : null,
    };
  }

  @MessagePattern('register')
  async createUser(
    @Payload() data: CreateUserDto
  ): Promise<ServiceResponseDto> {
    const result = await this.userService.create(data);
    return {
      statusCode: HttpStatus.OK,
      data: result,
    };
  }
}
