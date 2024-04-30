import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Notification } from './entities/notification.entity';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}



  @Post()
  async create(@Body() createNotificationDto: CreateNotificationDto) {
    return await this.notificationService.create(createNotificationDto);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateNotificationDto: UpdateNotificationDto) {
    const updatedNotification = await this.notificationService.update(id, updateNotificationDto);
    if (!updatedNotification) {
      throw new NotFoundException(`Notification with ID ${id} not found.`);
    }
    return updatedNotification;
  }

  // @Post(':userId/create')
  // createNotification(
  //   @Param('userId') userId: string,
  //   @Body('description') description: string,
  //   @Body('photos') photos: string[]
  // ): Promise<Notification> {
  //   return this.notificationService.createNotification(+userId, description, photos);
  // }

  @Get()
  findAll() {
    return this.notificationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificationService.findOne(+id);
  }

 

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationService.remove(+id);
  }

  @Post(':notifId/info-relation')
  async findInfoRelation(
    @Param('notifId') notifId: number, 
    @Body() requestBody: { relations: string }
  ): Promise<any[]> {
    // Verificar si se proporcionaron relaciones
    if (!requestBody.relations || typeof requestBody.relations !== 'string') {
      throw new Error('Debe proporcionar al menos una relación como una cadena de texto.');
    }
  console.log(requestBody.relations)
    // Convertir las relaciones en un array
    const relationsArray = requestBody.relations.split(',');
  
    // Llamar al servicio para obtener la información relacionada
    return this.notificationService.findInfoRelation(notifId, relationsArray);
  }

  
}
