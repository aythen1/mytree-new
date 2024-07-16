import { Controller, Post, Get, Param, Delete, Patch, Body, Query, Put } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventService) { }

  @Post()
  async create(@Body() createEventDto: CreateEventDto) {
    try {
      const event = await this.eventsService.create(createEventDto);
      return event;
    } catch (error) {
      return { error: 'No se pudo crear el evento', message: error };
    }
  }

  @Get()
  async findAll() {
    try {
      const events = await this.eventsService.findAll();
      return events;
    } catch (error) {
      return { error: 'No se pudieron recuperar los eventos' };
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const event = await this.eventsService.findOne(id);
      return event;
    } catch (error) {
      return { error: 'No se pudo encontrar el evento' };
    }
  }

  @Get('by-creator/:creatorId')
  async findByCreator(@Param('creatorId') creatorId: string) {
    try {
      const events = await this.eventsService.findByCreator(creatorId);
      return events;
    } catch (error) {
      return { error: 'No se pudieron recuperar los eventos creados por el usuario' };
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const event = await this.eventsService.remove(id);
      return event;
    } catch (error) {
      return { error: 'No se pudo eliminar el evento' };
    }
  }

  @Get('user/:userId')
  async findByUser(@Param('user') userId: string) {
    try {
      const events = await this.eventsService.findByUser(userId);
      return events;
    } catch (error) {
      return { error: 'No se pudieron recuperar los eventos del usuario' };
    }
  }

  @Delete('deleteAll')
  async removeAll() {
    try {
      await this.eventsService.removeAll();
      return { message: 'Todos los eventos fueron eliminados' };
    } catch (error) {
      return { error: 'No se pudieron eliminar todos los eventos' };
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateEventDto: CreateEventDto) {
    try {
      const event = await this.eventsService.update(id, updateEventDto);
      return event;
    } catch (error) {
      return { error: 'No se pudo actualizar el evento' };
    }
  }

  //filtra para saber quienes leyeron la invitacion al evento, quienes la aceptan y quienes no. 
  //filtra segun los query, si son true o false. 
  @Get('invited')
  async findInvitedByStatus(@Query('leida') leida: boolean, @Query('aceptada') aceptada: boolean) {
    try {
      const invitedUsers = await this.eventsService.findInvitedByStatus(leida, aceptada);
      return invitedUsers;
    } catch (error) {
      return { error: 'No se pudieron recuperar los usuarios invitados' };
    }
  }

//|||||||||||||||||||||||||||||||||||||||||||||||||||||||nuevo|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

  @Post(':eventId/invite')
  async inviteUser(@Param('eventId') eventId: string, @Body('userId') userId: string) {
      return this.eventsService.inviteUser(eventId, userId);
  }

  @Put('invite/:inviteId/respond')
  async respondToInvite(@Param('inviteId') inviteId: string, @Body('response') response: 'accepted' | 'rejected') {
      return this.eventsService.respondToInvite(inviteId, response);
  }

  @Post(':eventId/wishlist')
  async addWishListItem(@Param('eventId') eventId: string, @Body('description') description: string) {
      return this.eventsService.addWishListItem(eventId, description);
  }

  @Put('wishlist/:itemId/take')
  async takeWishListItem(@Param('itemId') itemId: string, @Body('userId') userId: string) {
      return this.eventsService.takeWishListItem(itemId, userId);
  }

}
