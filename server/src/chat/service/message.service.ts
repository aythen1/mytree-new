import { Injectable } from '@nestjs/common';
import { InjectRepository, } from '@nestjs/typeorm';
import { getRepository, In, Repository } from 'typeorm';
import { MessageEntity } from '../entities/message.entity';
import { GroupInfo } from '../entities/group.entity';

import { ErrorManager } from 'src/utils/error.manager';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(MessageEntity)
    private messageRepository: Repository<MessageEntity>,
    @InjectRepository(GroupInfo)
    private groupInfoRepository: Repository<GroupInfo>
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
    senderId: string,
    receiverId: string,
    createdAt?: Date
  ): Promise<MessageEntity[]> {
    try {
      console.log('room:', room);
      console.log('senderId', senderId);
      console.log('receiverId', receiverId);
      console.log('data from backend:', createdAt);

      let query = this.messageRepository
        .createQueryBuilder('message')
        // Llegando esto 268ccab8-45af-4050-8853-af15033d8ccc_9a27ac64-b0a4-42dc-aee5-a99a1641d5cd
        // Y me trae un mensaje con esta room 268ccab8-45af-4050-8853-af15033d8ccc_c6fed2c0-9b67-4527-883d-1bd70e763295
        .where('message.room = :room', { room })
        // .andWhere(
        //   '(message.senderId = :senderId AND message.receiverDelete IS NULL) OR (message.receiverId = :receiverId AND message.senderDelete IS NULL)',
        //   { senderId, receiverId }
        // ) // Pasando senderId y receiverId como parámetros
        .orderBy('message.createdAt', 'DESC');

      if (createdAt) {
        const date = new Date(createdAt); // Convierte la cadena de texto en un objeto Date
        query = query.andWhere('message.createdAt < :createdAt', {
          createdAt: date
        }); // Pasando createdAt como parámetro
        query = query.orderBy('message.createdAt', 'DESC'); // Re-ordenar por fecha de creación (descendente)
      }

      console.log('2');
      const roomMessages = await query.getMany();
      console.log('roomMessages', roomMessages);

      return roomMessages;
    } catch (error) {
      console.log('entra al catch');
      throw ErrorManager.createSignatureError(error.message);
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
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async markAsRead(id: string): Promise<MessageEntity> {
    const messageToUpdate = await this.messageRepository
      .createQueryBuilder('message')
      .where({ id })
      .getOne();
    messageToUpdate.isReaded = true;
    return this.messageRepository.save(messageToUpdate);
  }

  async deleteChatForUser(userId: string): Promise<void> {
    try {
      // Busca y elimina todos los mensajes donde el usuario es el remitente o el receptor
      await this.messageRepository
        .createQueryBuilder()
        .delete()
        .where('senderId = :userId OR receiverId = :userId', { userId })
        .execute();
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async getVisibleMessages(
    senderId: string,
    receiverId: string
  ): Promise<MessageEntity[]> {
    try {
      const messages = await this.messageRepository.find({
        where: {
          senderId,
          receiverId,
          senderDelete: null, // El mensaje no ha sido eliminado por el remitente
          receiverDelete: null // El mensaje no ha sido eliminado por el receptor
        }
      });
      return messages;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async marcarMensajesComoEliminados(
    senderId: string,
    receiverId: string,
    room: string
  ) {
    // Encuentra todos los mensajes entre los dos usuarios en la sala especificada
    const mensajes = await this.messageRepository.find({
      where: [
        { senderId, receiverId, room },
        { senderId: receiverId, receiverId: senderId, room }
      ]
    });

    // Marca los mensajes como eliminados para el usuario que desea eliminarlos
    mensajes.forEach((mensaje) => {
      if (mensaje.senderId === senderId) {
        mensaje.senderDelete = true;
      } else {
        mensaje.receiverDelete = true;
      }
    });

    // Guarda los cambios en la base de datos
    await this.messageRepository.save(mensajes);
  }

  
  //----------------
  // async saveGroupMessages(
  //   senderId: string,
  //   room: string,
  //   message: string
  // ): Promise<MessageEntity> {
  //   const newMessage = this.messageRepository.create({
  //     senderId,
  //     receiverId: null,
  //     room,
  //     message,
  //     isReaded: false
  //   });
  //   return await this.messageRepository.save(newMessage);
  // }



  // async getMessagesForGroupRoom(
  //   room: string
  // ): Promise<MessageEntity[]> {
  //   try {
  //     const messageList = await this.messageRepository.find({
  //       where: [
  //         { room },
  //         { room }
  //       ]
  //     });

  //     return messageList;
  //   } catch (error) {
  //     throw ErrorManager.createSignatureError(error.message);
  //   }
  // }
  //----------------


  // Crear grupo
  async createGroupInfo(groupInfoData: Partial<GroupInfo>): Promise<GroupInfo> {
    try {
      // Crear el grupo con los datos proporcionados
      const newGroup = this.groupInfoRepository.create({
        room: groupInfoData.room,
        photo: groupInfoData.photo,
        photos: groupInfoData.photos,
        groupName: groupInfoData.groupName,
        membersIds: groupInfoData.membersIds,
      });
  
      // Guardar el grupo en la base de datos
      const savedGroup = await this.groupInfoRepository.save(newGroup);
  
      // Si hay miembros, actualiza la relación en cada usuario
      if (groupInfoData.membersIds && groupInfoData.membersIds.length > 0) {
        const memberIds = groupInfoData.membersIds;
        
     
  
        // // Actualizar la relación de grupo en cada usuario
        // await Promise.all(users.map(async (user) => {
        //   user.groups = user.groups || []
        //   // Inicializar groups como un array vacío si es undefined
        //   user.groups = [...user.groups,savedGroup];
  
        //   // Agregar el nuevo grupo solo si no está ya en la lista
         
          
        //     await this.userRepository.save(user);
          
        // }));
  
        // Actualizar la relación de miembros en el grupo
        savedGroup.members = await this.userRepository.find({
          where: { id: In(memberIds) }
        });
        console.log(savedGroup)
        await this.groupInfoRepository.save(savedGroup);
      }
  
      // Devolver el grupo con la relación de miembros
      return savedGroup
    } catch (error) {
      console.error('Error al crear el grupo:', error);
      throw new Error('Error al crear el grupo.');
    }
  }
  

  //traer todos los usuarios de un grupo

  
  async getGroupMembers(groupId: string): Promise<GroupInfo[]> {
    try {
      console.log("entra");
      const group = await this.groupInfoRepository.find({
        where: { id: groupId },
        relations: ['members'],
      });
      console.log("group!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", group);
  
      if (!group) {
        throw new Error('Group not found');
      }
  
      // Devolver los miembros del grupo (como objetos de usuario)
      return group;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
     }


//trae todos los grupos de un usuario
async getUserGroups(userId: string): Promise<GroupInfo[]> {
  try {
    console.log("entra al servicio");

    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['groups'] // Incluye la relación con los grupos
    });

    console.log("usuario con los grupos", user);

    if (!user) {
      throw new Error('User not found');
    }

    return user.groups; 
  } catch (error) {
    console.error('Error al obtener los grupos del usuario:', error);
    throw ErrorManager.createSignatureError(error.message);
  }
}

    

  // async saveGroupMessage(senderId: string, room: string, message: string, receiverIds: string[]): Promise<MessageEntity[]> {
  //   try {
  //     const messages: MessageEntity[] = [];
  //     for (const receiverId of receiverIds) {
  //       const newMessage = this.messageRepository.create({
  //         senderId,
  //         receiverId,
  //         room,
  //         message,
  //         isReaded: false, // Por defecto no leído
  //         senderDelete: null,
  //         receiverDelete: null,
  //         prop1: null, 
  //         prop2: null, 
  //         prop3: null, 
  //         prop4: null, 
  //       });
  //       messages.push(await this.messageRepository.save(newMessage));
  //     }
  //     return messages;
  //   } catch (error) {
  //     throw new Error(`Failed to save group message: ${error.message}`);
  //   }
  // }
  

  // async markGroupMessagesAsRead(room: string, userId: string): Promise<void> {
  //   try {
  //     await this.messageRepository.update(
  //       { room, receiverId: userId },
  //       { isReaded: true }
  //     );
  //   } catch (error) {
  //     throw new Error(`Failed to mark group messages as read: ${error.message}`);
  //   }
  // }
  

  // // async deleteGroupChat(room: string, userId: string): Promise<void> {
  // //   try {
  // //     // Marcar mensajes como eliminados para el usuario
  // //     await this.messageRepository.update(
  // //       { room, receiverId: userId },
  // //       { receiverDelete: true }
  // //     );
  // //     // Puedes hacer lo mismo para senderDelete si es necesario
  
  // //     // Eliminar mensajes para los usuarios marcados como eliminados
  // //     await this.messageRepository.delete({ room, receiverDelete: true });
  
  // //     // Actualizar información del grupo, como miembros
  // //     const groupInfo = await this.groupInfoRepository.findOne({ where: {room: room} });
  // //     if (groupInfo) {
  // //       groupInfo.membersIds = groupInfoRepository.members.filter(memberId => memberId !== userId);
  // //       await this.groupInfoRepository.save(groupInfo);
  // //     }
  // //   } catch (error) {
  // //     throw new Error(`Failed to delete group chat: ${error.message}`);
  // //   }
  // // }
  

  // // async addUsersToGroup(room: string, userIds: string[]): Promise<void> {
  // //   try {
  // //     const groupInfo = await this.groupInfoRepository.findOne({ where: {room: room} });
  // //     if (groupInfo) {
  // //       groupInfo.members = [...new Set([...groupInfo.members, ...userIds])]; // Añadir usuarios únicos al grupo
  // //       await this.groupInfoRepository.save(groupInfo);
  // //     }
  // //   } catch (error) {
  // //     throw new Error(`Failed to add users to group: ${error.message}`);
  // //   }
  // // }
  

  // // async removeUsersFromGroup(room: string, userIds: string[]): Promise<void> {
  // //   try {
  // //     const groupInfo = await this.groupInfoRepository.findOne({ where: {room: room} });
  // //     if (groupInfo) {
  // //       groupInfo.members = groupInfo.members.filter(memberId => !userIds.includes(memberId));
  // //       await this.groupInfoRepository.save(groupInfo);
  // //     }
  // //   } catch (error) {
  // //     throw new Error(`Failed to remove users from group: ${error.message}`);
  // //   }
  // // }
  
}