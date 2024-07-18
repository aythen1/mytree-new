import { Injectable } from '@nestjs/common';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { UpdateInvitationDto } from './dto/update-invitation.dto';
import { Invitations } from './entities/invitation.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class InvitationsService {
  constructor(
    @InjectRepository(Invitations)
    private invitationsRepository: Repository<Invitations>,
  ) {}

  async create(createInvitationDto: CreateInvitationDto): Promise<Invitations> {
    const invitation = this.invitationsRepository.create(createInvitationDto);
    return await this.invitationsRepository.save(invitation);
  }

  async findAll(): Promise<Invitations[]> {
    return await this.invitationsRepository.find();
  }

  async findOne(id: string): Promise<Invitations> {
    return await this.invitationsRepository.findOne({ where: { id } });
  }

  async update(id: string, updateInvitationDto: UpdateInvitationDto): Promise<Invitations> {
    await this.invitationsRepository.update(id, updateInvitationDto);
    return await this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.invitationsRepository.delete(id);
  }

  async findByUserId(userId: string): Promise<Invitations[]> {
    return await this.invitationsRepository.find({ where: { userId },relations:['event'] });
  }
}
