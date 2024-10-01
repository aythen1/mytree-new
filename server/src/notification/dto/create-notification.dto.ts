import { IsOptional, IsString, IsBoolean, IsArray } from 'class-validator';

export class CreateNotificationDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  message?: string;

  @IsOptional()
  @IsString()
  senderId?: string;

  @IsOptional()
  @IsString()
  receiverId?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsString()
  relationship?: string;

  @IsOptional()
  @IsBoolean()
  readed?: boolean;

  @IsOptional()
  @IsArray()
  photos?: string[];

  @IsOptional()
  extraData?: Record<string, any>; // Puede ser cualquier objeto
}
