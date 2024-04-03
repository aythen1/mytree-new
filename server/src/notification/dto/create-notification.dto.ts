import { IsString, IsArray, IsDate, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateUserDto } from '../../user/dto/create-user.dto';

export class CreateNotificationDto {
    @IsString()
    @IsOptional()
    description?: string;

    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    photos?: string[];

    @IsDate()
    @IsOptional()
    createdAt?: Date;

    @ValidateNested()
    @Type(() => CreateUserDto)
    user: CreateUserDto;
}
