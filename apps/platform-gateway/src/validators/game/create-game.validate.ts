import { GameErrors } from '@microservice-platform/shared/constants';
import { CreateGameDto } from '@microservice-platform/shared/dtos';
import { ClientAppProxy } from '@microservice-platform/shared/microservices';
import { formatString } from '@microservice-platform/shared/utils';
import {
  ArgumentMetadata,
  BadRequestException,
  Inject,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class CreateGameValidationPipe implements PipeTransform<any> {
  @Inject('USER_SERVICE')
  private userService: ClientAppProxy;

  @Inject('REQUEST')
  private request: any;

  async transform(data: CreateGameDto, metadata: ArgumentMetadata) {
    const userData = await this.userService.sendAwait('get_user_by_id', {
      id: data.client_id,
    });
    if (!userData || !userData.data) {
      throw new BadRequestException(
        formatString(GameErrors.NOT_EXISTED_USER, data.client_id)
      );
    }
    return data;
  }
}
