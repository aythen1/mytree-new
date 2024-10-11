import { User } from '../../user/entities/user.entity'; // Importa la clase User si es necesario

export class CreatePostDto {
  nameUser: string;
  fecha: string;
  privacyMode?: string;
  albums?: string[];
  album?: any;

  description?: string;
  photos?: any;
  etiquets?: User[];
  hashtags?: string[];
  tags?: string[];
  userId: string;
}
