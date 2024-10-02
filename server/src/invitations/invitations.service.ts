import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { UpdateInvitationDto } from './dto/update-invitation.dto';
import { Invitations } from './entities/invitation.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Event } from 'src/event/entities/event.entity';
import { NotificationService } from 'src/notification/notification.service';

@Injectable()
export class InvitationsService {
  constructor(
    @InjectRepository(Invitations)
    private invitationsRepository: Repository<Invitations>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>, // Inyecta el repositorio de usuarios

    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    private readonly notificationService: NotificationService,
  ) {}

  async create(createInvitationDto: CreateInvitationDto): Promise<Invitations> {
    // Busca el usuario en la base de datos
    const user = await this.userRepository.findOne({
      where: { id: createInvitationDto.userId },
    });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // Busca el evento en la base de datos (si es necesario)
    const event = await this.eventRepository.findOne({
      where: { id: createInvitationDto.eventId },
    });
    if (!event) {
      throw new NotFoundException('Evento no encontrado');
    }

    // Crea la invitación y asigna el usuario y evento
    const invitation = this.invitationsRepository.create({
      event: event,
      user: user,
      status: 'pending', // Puedes ajustar esto si el estado es dinámico
    });

    // Guarda la invitación en la base de datos
    const save = await this.invitationsRepository.save(invitation);
    await this.notificationService.create({
      title: 'Nueva Invitación',
      message: `Has sido invitado a ${event.type === 'special' ? 'una fecha especial' : 'un evento'}: ${event.title}`,
      senderId: event.creatorId, // El creador del evento como emisor de la notificación
      receiverId: user.id, // El usuario invitado como receptor de la notificación
      type: 'invitation',
      readed: false,
    });
    return save;
  }

  async findAll(): Promise<Invitations[]> {
    return await this.invitationsRepository.find();
  }

  async findOne(id: string): Promise<Invitations> {
    return await this.invitationsRepository.findOne({ where: { id } });
  }

  async update(
    id: string,
    updateInvitationDto: UpdateInvitationDto,
  ): Promise<Invitations> {
    await this.invitationsRepository.update(id, updateInvitationDto);
    return await this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.invitationsRepository.delete(id);
  }

  async findByUserId(userId: string): Promise<Invitations[]> {
    return await this.invitationsRepository.find({
      where: { userId },
      relations: ['event', 'event.wishListItems'],
    });
  }
}
