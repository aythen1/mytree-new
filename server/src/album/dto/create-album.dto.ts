import { IsArray, IsDateString, IsOptional, IsString, Length } from 'class-validator';

export class CreateAlbumDto {
  @IsArray()
  @IsOptional()
  images?: string[];

  @IsArray()
  @IsOptional()
  videos?: string[];

  @IsString()
  @IsOptional()
  @Length(1, 255)
  location?: string;

  @IsString()
  @IsOptional()
  @Length(1, 100)
  albumCategory?: string;

  @IsString()
  creatorId: string;

  @IsDateString()
  @IsOptional()
  date?: Date;

  @IsString()
  @Length(1, 255)
  title: string;

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
}
