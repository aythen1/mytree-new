import { IsOptional, IsString } from "class-validator";

export class CreateUserDto {
    username: string;
    email: string;
    apellido: string;
    password: string;
    brithDate: string;
    phone: string;
    city: string;
    address: string;
    @IsOptional()
    @IsString()
    badge?: string; 

}
