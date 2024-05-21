import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async create(createEventDto: CreateEventDto): Promise<Event> {
    return await this.eventRepository.save(createEventDto);
  }

  async findAll(): Promise<Event[]> {
    return await this.eventRepository.find();
  }

  async findOne(id: string): Promise<Event> {
    return await this.eventRepository.findOne({where: {id:id}});
  }

  async findByCreator(creatorId: string): Promise<Event[]> {
    return await this.eventRepository.find({ where: { creatorId } });
  }

  async remove(id: string): Promise<Event> {
    const event = await this.eventRepository.findOne({where: {id:id}});
    if (!event) {
      throw new Error('Evento no encontrado');
    }
    return await this.eventRepository.remove(event);
  }

  async removeAll(): Promise<void> {
    await this.eventRepository.delete({});
  }

  async update(id: string, updateEventDto: CreateEventDto): Promise<Event> {
    const event = await this.eventRepository.findOne({where: {id:id}});
    if (!event) {
      throw new Error('Evento no encontrado');
    }
    return await this.eventRepository.save({ ...event, ...updateEventDto });
  }


  async findInvitedByStatus(leida: boolean, aceptada: boolean): Promise<string[]> {
    const events = await this.eventRepository.find({ relations: ['invitedUsers'] });
    const invitedUsers = events.reduce((acc, curr) => [...acc, ...curr.invitedUsers], []);
    const filteredInvitedUsers = invitedUsers.filter(user => user.leida === leida && user.aceptada === aceptada);
    return filteredInvitedUsers.map(user => user.idUsuario);
  }
}
