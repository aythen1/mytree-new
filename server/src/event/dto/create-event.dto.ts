export class CreateEventDto {
    type?: string; 
    creatorId?: string;
    description?: string;
    location?: string;
    date?: string | Date;
    invitedUsers?: string[];
    wishList?: any[];
    shared?: boolean;
    title?: string;
}
// es la estructura de los usuarios invitados, la prop de arriba, con esta filtramos los que la leyeron, los que la aceptaron, los que no.
export class InvitedUserDto {
    leida: boolean;
    aceptada: boolean;
    idUsuario: string;
  }
