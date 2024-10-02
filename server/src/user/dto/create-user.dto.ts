import { IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  username: string;
  email: string;
  apellido: string;
  password: string;
  @IsOptional()
  @IsString()
  brithDate: string;
  @IsOptional()
  @IsString()
  phone: string;
  @IsOptional()
  @IsString()
  city: string;
  @IsOptional()
  @IsString()
  address: string;
  @IsOptional()
  @IsString()
  badge?: string;
}
