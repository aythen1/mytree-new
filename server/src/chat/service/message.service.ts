import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageEntity } from '../entities/message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private messageRepository: Repository<MessageEntity>
  ) {}

  async saveMessage(
    senderId: string,
    receiverId: string,
    room: string,
    message: string
  ): Promise<MessageEntity> {
    const newMessage = this.messageRepository.create({
      senderId,
      receiverId,
      room,
      message,
      isReaded: false
    });
    return await this.messageRepository.save(newMessage);
  }

  async getMessagesForRoom(
    room: string,
    createdAt?: Date,
    limit: number = 10
  ): Promise<MessageEntity[]> {
    try {
      console.log('data from backend:', createdAt, limit);
      let query = this.messageRepository
        .createQueryBuilder('message')
        .where('message.room = :room', { room })
        .orderBy('message.createdAt', 'DESC')
        .limit(limit);

      if (createdAt) {
        const date = new Date(createdAt);
        query = query.andWhere('message.createdAt < :createdAt', {
          createdAt: date
        });
        query = query.orderBy('message.createdAt', 'DESC');
      }
      const roomMessages = await query.getMany();

      return roomMessages;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getMessagesBetweenUsers(
    senderId: string,
    receiverId: string,
    room: string
  ): Promise<MessageEntity[]> {
    try {
      const messageList = await this.messageRepository.find({
        where: [
          { senderId, receiverId, room },
          { senderId: receiverId, receiverId: senderId, room }
        ]
      });

      return messageList;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async markAsRead(id: string): Promise<MessageEntity> {
    try {
      const messageToUpdate = await this.messageRepository
        .createQueryBuilder('message')
        .where({ id })
        .getOne();
      messageToUpdate.isReaded = true;
      return this.messageRepository.save(messageToUpdate);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
