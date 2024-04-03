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

  async createNotification(userId: number, description: string, photos: string[]): Promise<Notification> {
    const user = await this.userRepository.findOne({where:{id:userId}});

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    const notification = new Notification();
    notification.description = description;
    notification.photos = photos;
    notification.user = user;

    // Agregar fecha y hora de creación
    notification.createdAt = new Date();

    return await this.notificationRepository.save(notification);
  }

  async findAll(): Promise<Notification[]> {
    return await this.notificationRepository.find();
  }

  async findOne(id: number): Promise<Notification> {
    const notification = await this.notificationRepository.findOne({ where: { id: id } });

    if (!notification) {
      throw new NotFoundException(`Notificación con ID ${id} no encontrada`);
    }

    return notification;
  }

  async update(id: number, updateNotificationDto: UpdateNotificationDto): Promise<Notification> {
    const { description, photos } = updateNotificationDto;
    let notification = await this.notificationRepository.findOne({ where: { id: id } });

    if (!notification) {
      throw new NotFoundException(`Notificación con ID ${id} no encontrada`);
    }

    if (description) {
      notification.description = description;
    }

    if (photos) {
      notification.photos = photos;
    }

    notification = await this.notificationRepository.save(notification);

    return notification;
  }

  async remove(id: number): Promise<void> {
    const notification = await this.notificationRepository.findOne({ where: { id: id } });

    if (!notification) {
      throw new NotFoundException(`Notificación con ID ${id} no encontrada`);
    }

    await this.notificationRepository.remove(notification);
  }
}
