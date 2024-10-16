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
    @MessageBody() data: { sender: string; receiver: string; message: string },
  ): Promise<any> {
    const room = this.chatService.roomIdGenerator(data.sender, data.receiver);
    const newMessage = await this.messageService.saveMessage(
      data.sender,
      data.receiver,
      room,
      data.message,
    );
    this.server.to(room).emit('message-server', newMessage);
    console.log('message', room);
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
  handleRoomLeave(client: Socket, data: { sender: string; receiver: string }) {
    const room = this.chatService.roomIdGenerator(data.sender, data.receiver);
    client.leave(room);
    client.emit('leaveRoom', room);
    console.log('leaveRoom', room);
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
