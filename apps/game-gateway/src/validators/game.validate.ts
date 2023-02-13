import { GetGamesDto } from '@microservice-platform/shared/dtos';
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class GameValidationPipe implements PipeTransform<any> {
  async transform(value: GetGamesDto, { metatype }: ArgumentMetadata) {
    return {
      ...value,
      limit: value.limit && Number(value.limit),
      offset: value.offset && Number(value.offset)
    };
  }
}