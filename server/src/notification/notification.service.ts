import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Notification } from './entities/notification.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
  ) {}

  async create(
    createNotificationDto: CreateNotificationDto,
  ): Promise<Notification> {
    const notification = this.notificationRepository.create(
      createNotificationDto,
    );
    return await this.notificationRepository.save(notification);
  }

  async update(
    id: number,
    updateNotificationDto: UpdateNotificationDto,
  ): Promise<Notification | undefined> {
    const existingNotification = await this.notificationRepository.findOne({
      where: { id: id },
    });
    if (!existingNotification) {
      return undefined;
    }
    const updatedNotification = {
      ...existingNotification,
      ...updateNotificationDto,
    };
    return await this.notificationRepository.save(updatedNotification);
  }

  async findAll(): Promise<Notification[]> {
    return await this.notificationRepository.find();
  }

  async findOne(id: number): Promise<Notification> {
    const notification = await this.notificationRepository.findOne({
      where: { id: id },
    });

    if (!notification) {
      throw new NotFoundException(`Notificación con ID ${id} no encontrada`);
    }

    return notification;
  }

  async remove(id: number): Promise<void> {
    const notification = await this.notificationRepository.findOne({
      where: { id: id },
    });

    if (!notification) {
      throw new NotFoundException(`Notificación con ID ${id} no encontrada`);
    }

    await this.notificationRepository.remove(notification);
  }

  async findInfoRelation(notifId: number, relations: string[]): Promise<any> {
    const validRelations = this.validateRelations(relations);

    // Verificar si hay al menos una relación válida
    if (validRelations.length === 0) {
      throw new Error('No se han proporcionado relaciones válidas.');
    }

    // Construir objeto de opciones para la consulta
    const options: any = { where: { id: notifId }, relations: validRelations };
    console.log('options es', options);
    // Realizar la consulta del post con las relaciones especificadas
    const notif = await this.notificationRepository.findOne(options);

    if (!notif) {
      throw new NotFoundException(
        `No se encontró ningún post con el ID ${notifId}.`,
      );
    }

    return notif;
  }

  private validateRelations(relations: string[]): string[] {
    const validRelations: string[] = [];

    // Definir relaciones válidas permitidas en la entidad Post
    const allowedRelations = ['user'];
    // Filtrar relaciones válidas
    relations.forEach((relation) => {
      if (allowedRelations.includes(relation)) {
        validRelations.push(relation);
      }
    });

    return validRelations;
  }

  async findByReceiverId(receiverId: string): Promise<Notification[]> {
    return await this.notificationRepository.find({
      where: { receiverId: receiverId },
    });
  }
}
