import { Controller, Post, Get, Param, Delete, Patch, Body, Query } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventService) {}

  @Post()
  async create(@Body() createEventDto: CreateEventDto) {
    try {
      const event = await this.eventsService.create(createEventDto);
      return event;
    } catch (error) {
      return { error: 'No se pudo crear el evento',message:error };
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

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const event = await this.eventsService.remove(id);
      return event;
    } catch (error) {
      return { error: 'No se pudo eliminar el evento' };
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
}
