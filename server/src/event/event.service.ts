import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { Invitations } from 'src/invitations/entities/invitation.entity';
import { WishListItems } from 'src/whish-list-items/entities/whish-list-item.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(Invitations)
    private inviteRepository: Repository<Invitations>,
    @InjectRepository(WishListItems)
    private wishListItemRepository: Repository<WishListItems>,
  ) {}

  async create(createEventDto: CreateEventDto): Promise<Event> {
    return await this.eventRepository.save(createEventDto);
  }

  async findAll(): Promise<Event[]> {
    return await this.eventRepository.find();
  }

  async findByUser(creatorId: string): Promise<Event[]> {
    return this.eventRepository.find({ where: { creatorId } });
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

//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||NUEVO|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

  async inviteUser(eventId: string, userId: string): Promise<Invitations> {
    const event = await this.eventRepository.findOne({where:{id:eventId}});
    const invite = this.inviteRepository.create({ event, userId, status: 'pending' });
    return this.inviteRepository.save(invite);
}

async respondToInvite(inviteId: string, response: 'accepted' | 'rejected'): Promise<Invitations> {
    const invite = await this.inviteRepository.findOne({where:{id:inviteId}});
    invite.status = response;
    return this.inviteRepository.save(invite);
}

async addWishListItem(eventId: string, description: string): Promise<WishListItems> {
    const event = await this.eventRepository.findOne({where:{id:eventId}});
    const item = this.wishListItemRepository.create({ event, description });
    return this.wishListItemRepository.save(item);
}

async takeWishListItem(itemId: string, userId: string): Promise<WishListItems> {
    const item = await this.wishListItemRepository.findOne({where:{id:itemId}});
    item.takenBy = userId;
    return this.wishListItemRepository.save(item);
}

}
