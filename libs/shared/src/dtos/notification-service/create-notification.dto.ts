import {
  IsIn,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import {
  ENotificationCategory,
  ENotificationStatus,
} from '@microservice-platform/shared/constants';

export class CreateNotificationDto {
  @IsNotEmpty()
  @MaxLength(255)
  @IsUUID()
  user_id: string;

  @IsOptional()
  @IsJSON()
  data?: object;

  @IsString()
  @MaxLength(255)
  name: string;

  @IsString()
  @MaxLength(255)
  title: string;

  @IsString()
  content: string;

  @IsString()
  @MaxLength(255)
  @IsIn(Object.values(ENotificationStatus))
  status: string;

  @IsString()
  @MaxLength(255)
  @IsIn(Object.values(ENotificationCategory))
  category: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  browser_url?: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  deeplink?: string;
}
