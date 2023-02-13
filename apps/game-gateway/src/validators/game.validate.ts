import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { GetGamesQueryDto } from '../dtos';

@Injectable()
export class GameValidationPipe implements PipeTransform<any> {
  async transform(value: GetGamesQueryDto, { metatype }: ArgumentMetadata) {
    return {
      ...value,
      limit: value.limit && Number(value.limit),
      page: value.page && Number(value.page)
    };
  }
}