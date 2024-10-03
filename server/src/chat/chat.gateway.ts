import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { MessageService } from './service/message.service';
import { ChatService } from './service/chat.service';

@WebSocketGateway(3010)
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly messageService: MessageService,
    private chatService: ChatService,
  ) {}

  @WebSocketServer()
  server: Server;

  private connectedUsers: Map<string, string> = new Map();
  // eslint-disable-next-line
  afterInit(server: any) {
    console.log('inicio');
  }
  // eslint-disable-next-line
  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId;
    if (userId) {
      this.connectedUsers.set(userId.toLocaleString(), client.id);
      console.log(`Usuario ${userId} conectado`);
    }
  }

  handleDisconnect(client: Socket) {
    const userId = Array.from(this.connectedUsers.keys()).find(
      (key) => this.connectedUsers.get(key) === client.id,
    );
    if (userId) {
      this.connectedUsers.delete(userId);
      console.log(`Usuario ${userId} desconectado`);
    }
  }

  @SubscribeMessage('message')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: {
      sender: string;
      receiver: string;
      message: string;
      isGroup?: boolean;
    },
  ): Promise<any> {
    let newMessage;

    if (data.isGroup) {
      // Si es un mensaje para un grupo
      const group = await this.messageService.getGroupWithMessages(
        data.receiver,
      );

      if (!group) {
        throw new Error('Group not found');
      }

      // Guardar el mensaje relacionado al grupo
      newMessage = await this.messageService.saveMessageToGroup(
        data.sender,
        data.receiver, // ID del grupo como "room"
        data.message,
        group,
      );

      // Unir al cliente a la sala del grupo si no está unido
      if (!client.rooms.has(group.id)) {
        client.join(group.id);
      }

      // Emitir el mensaje a todos los miembros del grupo
      client.to(group.id).emit('message-server', newMessage); // Emitir solo una vez a la sala
    } else {
      // Si es un mensaje entre usuarios (chat directo)
      let chat = await this.chatService.findChatBetweenUsers(
        data.sender,
        data.receiver,
      );

      if (!chat) {
        chat = await this.chatService.createChat(data.sender, data.receiver);
      }

      // Guardar el mensaje relacionado al chat
      newMessage = await this.messageService.saveMessage(
        data.sender,
        data.receiver,
        chat.id, // Usa el ID del chat como "room"
        data.message,
        chat,
      );

      // Asegurarse de que el cliente esté en la sala adecuada (chat.id)
      if (!client.rooms.has(chat.id)) {
        client.join(chat.id);
      }

      // Emitir el mensaje solo al receptor
      client.to(chat.id).emit('message-server', newMessage); // Emitir solo una vez a la sala
    }

    return newMessage;
  }

  @SubscribeMessage('joinRoom')
  handleRoomJoin(client: Socket, data: { sender: string; receiver: string }) {
    const room = this.chatService.roomIdGenerator(data.sender, data.receiver);
    client.join(room);
    client.emit('joinedRoom', room);
    console.log('joinedRoom', room);
  }

  @SubscribeMessage('leaveRoom')
  handleRoomLeave(client: Socket, data: { room: string }) {
    client.leave(data.room);
    client.emit('leaveRoom', data.room);
    console.log('leaveRoom', data.room);
  }

  // @SubscribeMessage('groupMessage')
  // async handleGroupMessage(
  //   @ConnectedSocket() client: Socket,
  //   @MessageBody() data: { sender: string; room: string; message: string }
  // ): Promise<any> {
  //   const { sender, room, message } = data;
  //   const receiverIds = await this.chatService.getUsersInGroup(room); // Implementa este método en ChatService

  //   // // Guarda el mensaje para cada receptor en la sala
  //   // const savedMessages = await this.messageService.saveGroupMessage(sender, room, message, receiverIds);

  //   // Emite el mensaje a todos los usuarios en la sala
  //   this.server.to(room).emit('groupMessage-server', savedMessages);
  //   console.log('Group message sent to room:', room);
  //   return ;
  // }

  sendNotificationToUser(userId: string, event: string, data: any) {
    const socketId = this.connectedUsers.get(userId);
    if (socketId) {
      this.server.to(socketId).emit(event, data);
    }
  }

  @SubscribeMessage('sendNotification')
  handleNotification(
    @MessageBody() notification: { receiverId: string; content: string },
  ) {
    const { receiverId, content } = notification;
    this.sendNotificationToUser(receiverId, 'notification', { content });
  }

  @SubscribeMessage('joinGroup')
  async handleGroupJoin(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { room: string },
  ) {
    const { room } = data;
    client.join(room);
    client.emit('joinedGroup', room);
    console.log('Client joined group:', room);
  }

  @SubscribeMessage('leaveGroup')
  handleGroupLeave(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { room: string },
  ) {
    const { room } = data;
    client.leave(room);
    client.emit('leftGroup', room);
    console.log('Client left group:', room);
  }
  //----------------
}
