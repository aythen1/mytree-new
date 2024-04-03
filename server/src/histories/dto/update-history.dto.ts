export class UpdateHistoryDto {
    nameUser?: string;
    description?: string;
    media?: string;
    etiquets?: any; // Array de IDs de usuarios etiquetados
    fecha?: string;
    hashtags?: string[];
  }
  