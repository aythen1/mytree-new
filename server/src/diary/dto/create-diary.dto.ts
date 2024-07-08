import { IsArray, IsDateString, IsOptional, IsString, Length } from 'class-validator';

export class CreateDiaryDto {
  @IsArray()
  @IsOptional()
  images?: string[];

  @IsArray()
  @IsOptional()
  videos?: string[];

  @IsDateString()
  @IsOptional()
  date?: Date;

  @IsString()
  @Length(1, 255)
  title: string;

  @IsString()
  creatorId: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  @Length(1, 50)
  privacyMode?: string;

  @IsArray()
  @IsOptional()
  taggedUsers?: string[];

  @IsString()
  @IsOptional()
  @Length(1, 100)
  category?: string;
}
