import {
  Body,
  Controller,
  Delete,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  Req,
  Patch,
  BadRequestException,
} from '@nestjs/common';
import { ChatService } from './service/chat.service';
import { MessageService } from './service/message.service';
import { Get, Query } from '@nestjs/common';
import { MessageEntity } from './entities/message.entity';
import { GroupInfo } from './entities/group.entity';
import { UserService } from 'src/user/user.service';


@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly messageService: MessageService,
    private readonly userService: UserService

  ) {}

  @Post('/deleteAllMessageChat')
  async marcarMensajesComoEliminados(
    @Body() body: { senderId: string; receiverId: string; room: string },
  ) {
    try {
      await this.messageService.marcarMensajesComoEliminados(
        body.senderId,
        body.receiverId,
        body.room,
      );
      return { message: 'Mensajes marcados como eliminados exitosamente.' };
    } catch (error) {
      console.error('Error al marcar mensajes como eliminados:', error);
      throw new InternalServerErrorException('Error interno del servidor.');
    }
  }

  @Get('/room')
  public async getChat(@Req() req: any) {
    const { senderId, receiverId, createdAt } = req.query;
    const room = this.chatService.roomIdGenerator(senderId, receiverId);
    return await this.messageService.getMessagesForRoom(
      room,
      senderId,
      receiverId,
      createdAt,
    );
  }

  @Get('/receiver')
  public async getMessagesForReceiver(@Req() req: any) {
    const { receiverId, createdAt } = req.query;
    return await this.messageService.getMessagesForReceiver(receiverId, createdAt);
  }

  @Put('readed/:id')
  async markAsRead(@Param('id') id: string): Promise<MessageEntity> {
    return this.messageService.markAsRead(id);
  }

  @Post('/user-mensagge')
  public async getUserMessage(@Body() body: { userId: string }) {
    try {
      const chats = await this.chatService.getChatsForUser(body.userId);
      return chats;
    } catch (error) {
      console.error('Error al obtener los chats del usuario:', error);
      throw new InternalServerErrorException('Error interno del servidor.');
    }
  }

  @Post('chats')
  public async getUserChat(@Body() body: { userId: string }) {
    return this.chatService.getUserChats(body.userId);
  }
  //   @Get('/visible-messages/:senderId/:receiverId')
  // async getVisibleMessages(
  //   @Param('senderId') senderId: string,
  //   @Param('receiverId') receiverId: string
  // ): Promise<MessageEntity[]> {
  //   try {
  //     return await this.messageService.getVisibleMessages(senderId, receiverId);
  //   } catch (error) {
  //     throw new Error('Failed to fetch visible messages.');
  //   }
  // }

  //   @Delete('/user/:senderId/messages/:receiverId')
  // async deleteMessagesBetweenUsers(
  //   @Param('senderId') senderId: string,
  //   @Param('receiverId') receiverId: string
  // ): Promise<{ message: string }> {
  //   try {
  //     await this.messageService.deleteMessagesBetweenUsers(senderId, receiverId);
  //     return { message: 'Messages deleted successfully.' };
  //   } catch (error) {
  //     throw new Error('Failed to delete messages.');
  //   }
  // }

   //----------------
  //  @Get('/group/:room')
  //  public async getGroupChat(@Param('room') room: string) {
  //    return await this.messageService.getMessagesForGroupRoom(room);
  //  }

  //  @Put('/group/:room')
  //  public async getGroupChatPut(@Param('room') room: string) {
  //    return await this.messageService.getMessagesForGroupRoom(room);
  //  }

  //  @Delete('/group/:room')
  //  public async getGroupChatDelete(@Param('room') room: string) {
  //    return await this.messageService.getMessagesForGroupRoom(room);
  //  }
   //----------------



//crear grupo --
@Post('/createGroup')
async createGroup(@Body() groupInfoData: Partial<GroupInfo>) {
  try {
    console.log('Datos recibidos:', groupInfoData);

    // Verifica si membersIds está definido y tiene al menos dos elementos
    if (!groupInfoData.membersIds || groupInfoData.membersIds.length < 2) {
      throw new BadRequestException('Se requieren al menos dos IDs de miembros para generar la sala.');
    }

    // Generar el ID de la sala usando los primeros dos IDs de miembros
    const roomId = this.chatService.roomIdGenerator(
      groupInfoData.membersIds[0], // Asegúrate de que estos IDs están disponibles
      groupInfoData.membersIds[1]  // Ajusta según sea necesario
    );

    console.log('roomId generado:', roomId);

    // Agregar el ID de la sala al grupo
    groupInfoData.room = roomId;

    // Crear el grupo usando el servicio
    const newGroup = await this.messageService.createGroupInfo(groupInfoData);

    return {
      statusCode: 201,
      message: 'Grupo creado exitosamente',
      data: newGroup,
    };
  } catch (error) {
    console.error('Error al crear el grupo:', error);
    throw new InternalServerErrorException({
      statusCode: 500,
      message: 'Error al crear el grupo.',
    });
  }
}




// traer todos los usuarios de un grupo
@Get('/usersGrup/:groupId')
async getGroupMembers(@Param('groupId') groupId: string) {
  try {
    const members = await this.messageService.getGroupMembers(groupId);
    return {
      statusCode: 200,
      message: 'Miembros del grupo obtenidos exitosamente',
      data: members,
    };
  } catch (error) {
    console.error('Error al obtener los miembros del grupo:', error);
    throw new InternalServerErrorException({
      statusCode: 500,
      message: 'Error al traer los miembros de un grupo.',
    });
  }
}



  // traer todos los grupos de un usuario
  @Get('/grupsUser/:userId')
  async getUserGroups(@Param('userId') userId: string) {

    try {
      console.log("entra")
      const groups = await this.messageService.getUserGroups(userId);
      return groups;
    } catch (error) {
      console.error('Error al obtener los miembros del grupo:', error);
      throw new InternalServerErrorException({
        statusCode: 404,
        message: 'Error al traer los grupos de un usuario.',
      });
    }
  }





// // traer todos los grupos de un usuario
//    @Get(':userId')
//    async findAllGroupsOfUser(@Param('userId') userId: number): Promise<GroupInfo[]> {
//      return this.groupService.findAllGroupsOfUser(userId);
//    }
 

//    //traer todos los usuarios de un grupo
//    @Get('members/:groupId')
//    async findAllMembersOfGroup(@Param('groupId') groupId: number): Promise<User[]> {
//      return this.groupService.findAllMembersOfGroup(groupId);
//    }


 // crear mensaje para grupo
  //  @Post('group')
  //  async createGroupMessage(@Body() body: any): Promise<MessageEntity[]> {
  //    const { senderId, room, message, receiverIds } = body;
   
  //    if (!senderId || !room || !message || !receiverIds || !Array.isArray(receiverIds) || receiverIds.length === 0 || receiverIds.some(id => typeof id !== 'string')) {
  //      throw new Error('Sender ID, room, message, and a non-empty array of receiver IDs are required.');
  //    }
   
  //    return await this.messageService.saveGroupMessage(senderId, room, message, receiverIds);
  //  }
   
  //  // marcar como leido los mensajes de un grupo
  // @Patch('group/:room/:userId')
  // async markGroupMessagesAsRead(@Param('room') room: string, @Param('userId') userId: string): Promise<void> {
  //   return await this.messageService.markGroupMessagesAsRead(room, userId);
  // }

  // //Ruta pára eliminar grupo
  // @Delete('group/:room/:userId')
  // async deleteGroupChat(@Param('room') room: string, @Param('userId') userId: string): Promise<void> {
  //   return await this.messageService.deleteGroupChat(room, userId);
  // }

  //   // Ruta para agregar usuarios a un grupo
  // @Patch('group/:room/add-users')
  // async addUsersToGroup(
  //   @Param('room') room: string,
  //   @Body('userIds') userIds: string[]
  // ): Promise<void> {
  //   await this.messageService.addUsersToGroup(room, userIds);
  // }

  // // Ruta para eliminar usuarios de un grupo
  // @Patch('group/:room/remove-users')
  // async removeUsersFromGroup(
  //   @Param('room') room: string,
  //   @Body('userIds') userIds: string[]
  // ): Promise<void> {
  //   await this.messageService.removeUsersFromGroup(room, userIds);
  // }
}
