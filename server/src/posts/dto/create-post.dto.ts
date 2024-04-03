import { User } from '../../user/entities/user.entity'; // Importa la clase User si es necesario

export class CreatePostDto {
    nameUser: string;
    fecha: string;
    description?: string;
    photos?: string[];
    etiquets?: User[];
    hashtags?: string[];
    userId: number;
}
