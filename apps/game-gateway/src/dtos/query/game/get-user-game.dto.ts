import { UserGameFilter } from '@microservice-platform/shared/filters/user-service';
import { OmitType } from '@nestjs/swagger';

// export class GetUserGamesQueryDto extends UserGameFilter { }
export class GetUserGamesQueryDto extends OmitType(UserGameFilter, [
  'ids',
] as const) {
  
}
