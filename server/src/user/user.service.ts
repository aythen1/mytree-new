import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Post } from 'src/posts/entities/post.entity';
import * as nodemailer from 'nodemailer';
import { ChatGateway } from 'src/chat/chat.gateway';

@Injectable()
export class UserService {
  private transporter: nodemailer.Transporter;
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private chatGateway: ChatGateway,
  ) {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // o true si usas SSL
      auth: {
        user: 'azschiaffino@gmail.com',
        pass: 'ccuk lafv fpmh bijv',
      },
    });
  }

  // BUSCA UN USUARIO
  async findOne(id: string): Promise<User> {
    console.log(`Buscando usuario con ID ${id}...`);
    try {
      const usuario = await this.userRepository.findOne({
        where: { id: id },
      });
      if (!usuario) {
        throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
      }
      return usuario;
    } catch (error) {
      console.error(`Error al buscar usuario: ${error.message}`);
      throw error;
    }
  }

  async sendMail(to: string, subject: string, body: string) {
    const mailOptions = {
      from: 'sportsmatchapp@gmail.com',
      to,
      subject,
      html: body,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      return { message: 'Correo enviado exitosamente' };
    } catch (error) {
      return { message: 'Error al enviar correo', error };
    }
  }

  // CREA CREA USUARIO
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const { email } = createUserDto;
      const { phone } = createUserDto;

      const existingUser = await this.userRepository.findOne({
        where: { email: email },
      });
      if (existingUser) {
        throw new ConflictException('Email already exists');
      }
      const html = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Bienvenido</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f2f2f2;
            padding: 20px;
          }
          
          .container {
            background-color: #fff;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          
          .title {
            font-size: 24px;
            color: #333;
            margin-bottom: 10px;
          }
          
          .message {
            font-size: 18px;
            color: #666;
            margin-bottom: 20px;
          }
          
          .button {
            background-color: #4CAF50;
            color: #fff;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }
          
          .button:hover {
            background-color: #3e8e41;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h2 class="title">Bienvenido, ${createUserDto.username}!</h2>
          <p class="message">Gracias por utilizar SportsMatch.</p>
          <button class="button">Comenzar</button>
        </div>
      </body>
      </html>
    `;

      // this.sendMail(email, 'SportsMatch', html);
      const user = this.userRepository.create(createUserDto);
      return await this.userRepository.save(user);
    } catch (error) {
      throw new Error(error);
    }
  }

  // TRAE TODOS LOS USUARUIS
  async getUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  // BUSCA UN USUARIO POR ID
  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: id },
      relations: [
        'brothers',
        'cousins',
        'childrens',
        'uncles',
        'grandchildrens',
        'closeFriends',
        'schoolFriends',
        'workFriends',
        'universityFriends',
        'hobbyFriends',
        'nephews',
      ], // Cargar todas las relacion
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async searchUsers(query: string): Promise<User[]> {
    return await this.userRepository
      .createQueryBuilder('user')
      .where('user.username ILIKE :query', { query: `%${query}%` }) // Buscar coincidencias en el nombre
      .orWhere('user.apellido ILIKE :query', { query: `%${query}%` }) // Buscar coincidencias en el apellido
      .getMany();
  }

  // ACTUALIZA UN USUARIO POR ID
  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    // Actualizar el usuario con los nuevos valores del DTO
    Object.assign(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  // ELIMINA UN USUARIO POR ID
  async deleteUser(id: string): Promise<void> {
    const user = await this.getUserById(id);
    await this.userRepository.remove(user);
  }

  // AGREGA UN AMIGO A UN USUARIO CON SUS ID
  async addFriend(userId: string, friendId: number): Promise<void> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.friends', 'friends')
      .where('user.id = :userId', { userId })
      .getOne();

    const friend = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.friends', 'friends')
      .where('user.id = :friendId', { friendId })
      .getOne();

    if (!user || !friend) {
      throw new Error('Usuario o amigo no encontrado');
    }

    // Si los amigos no están inicializados, inicializarlos como un array vacío
    if (!user.friends) {
      user.friends = [];
    }
    if (!friend.friends) {
      friend.friends = [];
    }

    user.friends.push(friend);
    friend.friends.push(user);

    await this.userRepository.save(user);
    await this.userRepository.save(friend);
  }

  // ELIMINA UN AMIGO DE UN USUARIO POR SUS ID
  async removeFriend(userId: string, friendId: string): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['friends'],
    });
    const friend = await this.userRepository.findOne({
      where: { id: friendId },
      relations: ['friends'],
    });

    if (!user || !friend) {
      throw new Error('Usuario o amigo no encontrado');
    }

    // Buscamos la relación de amistad en la tabla intermedia y la eliminamos
    user.friends = user.friends.filter((f) => f.id !== friendId);
    friend.friends = friend.friends.filter((f) => f.id !== userId);

    // Guardamos los cambios en la tabla intermedia
    await this.userRepository.save(user);
    await this.userRepository.save(friend);
  }

  async addFamilyMemberr(
    userId: string,
    familiarId: string,
    relationship: 'brother' | 'cousin' | 'child' | 'uncle' | 'grandchild',
  ): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: [relationship + 's'], // Fetches the correct relation dynamically
    });
    const familiar = await this.userRepository.findOne({
      where: { id: familiarId },
    });

    if (!user || !familiar) {
      throw new NotFoundException('Usuario o familiar no encontrado');
    }

    // Check if the familiar is already added
    const isAlreadyAdded = user[relationship + 's'].some(
      (fam: User) => fam.id === familiarId,
    );
    if (isAlreadyAdded) {
      throw new Error(`El ${relationship} ya está agregado a este usuario`);
    }

    // Add the familiar to the correct relationship array
    user[relationship + 's'].push(familiar);

    // Save the updated user in the database
    await this.userRepository.save(user);
  }

  // Eliminar familiar según la relación
  async removeFamilyMemberr(
    userId: string,
    familiarId: string,
    relationship:
      | 'brother'
      | 'cousin'
      | 'child'
      | 'uncle'
      | 'grandchild'
      | 'closeFriends'
      | 'schoolFriends'
      | 'workFriends'
      | 'universityFriends'
      | 'hobbyFriends',
  ): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: [relationship + 's'], // Fetches the correct relation dynamically
    });
    const familiar = await this.userRepository.findOne({
      where: { id: familiarId },
    });

    if (!user || !familiar) {
      throw new NotFoundException('Usuario o familiar no encontrado');
    }

    // Verificamos si el familiar está en la lista
    const familiarIndex = user[relationship + 's'].findIndex(
      (fam: User) => fam.id === familiarId,
    );
    if (familiarIndex === -1) {
      throw new Error(`El ${relationship} no está en la lista de este usuario`);
    }

    // Eliminar el familiar de la lista correspondiente
    user[relationship + 's'].splice(familiarIndex, 1);

    // Guardar los cambios en la base de datos
    await this.userRepository.save(user);
  }

  // ELIMINA UN POST LIKE
  async dislikePost(userId: string, postId: number): Promise<void> {
    console.log('si pasa');
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.likedPosts', 'likedPost')
      .where('user.id = :userId', { userId })
      .getOne();

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    // Encontrar el índice del post en los likedPosts del usuario
    const index = user.likedPosts.findIndex(
      (likedPost) => likedPost.id === postId,
    );
    if (index !== -1) {
      // Si se encuentra, quitar el post de los likedPosts
      user.likedPosts.splice(index, 1);
    }

    await this.userRepository.save(user);
  }
  // AGREGA UN POST FAVORITO A UN USUARIO
  async addToFavorites(userId: string, postId: number): Promise<void> {
    try {
      // Buscar al usuario por su ID, junto con sus favoritos
      const user = await this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.favorites', 'favorites')
        .where('user.id = :userId', { userId })
        .getOne();

      // Buscar el posteo por su ID
      const post = await this.postRepository.findOne({ where: { id: postId } });

      if (!user || !post) {
        // Si el usuario o el posteo no se encuentran, lanzar una excepción
        throw new Error('Usuario o post no encontrado');
      }
      console.log('11111111111111');

      // Verificar si el post ya está en la lista de favoritos del usuario
      const index = user.favorites.findIndex(
        (favorite) => favorite.id === postId,
      );
      if (index !== -1) {
        // Si el post ya está en la lista de favoritos, eliminarlo
        user.favorites.splice(index, 1);
        console.log(
          `Post con ID ${postId} eliminado de favoritos del usuario con ID ${userId}`,
        );
      } else {
        // Si el post no está en la lista de favoritos, agregarlo
        user.favorites.push(post);
        console.log(
          `Post con ID ${postId} agregado a favoritos del usuario con ID ${userId}`,
        );
      }

      // Guardar los cambios en la base de datos
      await this.userRepository.save(user);
    } catch (error) {
      // Manejar cualquier error que ocurra durante el proceso
      console.error(
        'Error al agregar/eliminar el posteo a/de favoritos:',
        error.message,
      );
      throw error;
    }
  }

  // ELIMINA UN POST DE LOS FAVORITOS DE UN USUARIO

  async removeFromFavorites(userId: string, postId: number): Promise<void> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.favorites', 'favorites')
      .where('user.id = :userId', { userId })
      .getOne();

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    user.favorites = user.favorites.filter(
      (favorite) => favorite.id !== postId,
    );

    await this.userRepository.save(user);
  }

  // BUSCA UN USUARIO POR EL CELULAR EN LA BASE DE DATOS

  async findUserByCellphone(phone: string): Promise<User> {
    try {
      console.log(`Buscando usuario con número de teléfono: ${phone}`);
      const user = await this.userRepository.findOne({
        where: { phone: phone },
      });
      if (!user) {
        console.log(`Usuario con número de teléfono ${phone} no encontrado`);
        throw new Error(
          `Usuario con número de teléfono ${phone} no encontrado`,
        );
      }
      console.log(`Usuario con número de teléfono ${phone} encontrado:`, user);
      return user;
    } catch (error) {
      console.error(
        'Error al buscar usuario por número de teléfono:',
        error.message,
      );
      throw error;
    }
  }
  // BUSCA UN USUARIO POR EL CORREO EN LA BASE DE DATOS

  async findUserByEmail(email: string): Promise<User> {
    try {
      console.log(`Buscando usuario con correo electrónico: ${email}`);
      const user = await this.userRepository.findOne({
        where: { email: email },
        relations: [
          'brothers',
          'cousins',
          'childrens',
          'uncles',
          'grandchildrens',
          'closeFriends',
          'schoolFriends',
          'workFriends',
          'universityFriends',
          'hobbyFriends',
          'nephews',
        ], // Cargar todas las relacion
      });
      if (!user) {
        console.log(`Usuario con correo electrónico ${email} no encontrado`);
        throw new Error(
          `Usuario con correo electrónico ${email} no encontrado`,
        );
      }
      console.log(`Usuario con correo electrónico ${email} encontrado:`, user);
      return user;
    } catch (error) {
      console.error(
        'Error al buscar usuario por correo electrónico:',
        error.message,
      );
      throw error;
    }
  }

  // TRAE LAS NOTIFICACIONES DE UN AMIGO
  async getUserNotifications(userId: string): Promise<any[]> {
    try {
      console.log(
        `Obteniendo notificaciones para el usuario con ID: ${userId}`,
      );

      // Utilizar createQueryBuilder para incluir la relación 'notifications'
      const user = await this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.notifications', 'notifications')
        .where('user.id = :userId', { userId })
        .getOne();

      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      console.log(
        `Notificaciones encontradas para el usuario con ID ${userId}:`,
        user.notifications,
      );
      return user.notifications;
    } catch (error) {
      console.error(
        'Error al obtener las notificaciones del usuario:',
        error.message,
      );
      throw error;
    }
  }

  // TRAE LOS AMIGOS DE UN USUARIO
  async getUserFriends(userId: string): Promise<User[]> {
    // Obtener al usuario y cargar sus amigos con las relaciones de favoritos
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.friends', 'friends')
      .leftJoinAndSelect('friends.favorites', 'favorites')
      .where('user.id = :userId', { userId })
      .getOne();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    console.log(
      'Estos son los amigos del usuario con sus relaciones de favoritos:',
    );
    console.log(user.friends);

    return user.friends;
  }

  // TRAE LOS POST DE UN USUARIO
  async getUserPosts(userId: string): Promise<any[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['posts'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user.posts;
  }

  // TRAE LAS BUSQUEDAS RECIENTES DE UN USUARIO
  async getUserRecentSearches(userId: string): Promise<string[]> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user.recentSearches || [];
  }

  // AGREGA LAS BUSQUEDAS RECIENTES DE UN USUARIO

  async addRecentSearch(userId: string, searchTerm: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (!user.recentSearches) {
      user.recentSearches = [];
    }
    // Agregar la nueva búsqueda al array de recentSearches
    user.recentSearches.push(searchTerm);
    await this.userRepository.save(user);
  }

  async googleSignIn(googleData: any): Promise<any> {}

  async facebookSignIn(facebookData: any): Promise<any> {}

  async getUserFeedWithOptions(
    userId: string,
    option: string,
    param1?: string,
    param2?: string,
    param3?: string,
  ): Promise<any[]> {
    // Obtener el usuario por su ID
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['posts', 'favorites', 'friends'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    // Lógica para el feed según la opción seleccionada
    switch (option) {
      case 'first':
        // Lógica para la opción 'first' (primera)
        // Ejemplo: devolver los primeros N posts del usuario
        return user.posts.slice(0, parseInt(param1)); // param1 podría ser el número de posts a devolver
      case 'second':
        // Lógica para la opción 'second' (segunda)
        // Ejemplo: devolver los posts favoritos del usuario
        return user.favorites;
      case 'third':
        // Lógica para la opción 'third' (tercera)
        // Ejemplo: devolver los posts de los amigos del usuario
        return user.friends.reduce(
          (posts, friend) => posts.concat(friend.posts),
          [],
        );
      case 'fourth':
        // Lógica para la opción 'fourth' (cuarta)
        // Ejemplo: devolver los posts del usuario ordenados por fecha de publicación
        return user.posts.sort(
          (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime(),
        );
      case 'fifth':
      default:
        // Opción por defecto en caso de que la opción proporcionada no sea válida
        throw new NotFoundException('Invalid option');
    }
  }

  async getUserFavorites(userId: string): Promise<any[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['favorites'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user.favorites;
  }

  //AGREGA O ELIMINA EN UN USUARIO EL LIKE A UN POST

  async toggleLike(userId: string, postId: number): Promise<void> {
    try {
      // Buscar al usuario y cargar sus likedPosts
      console.log(
        `Buscando al usuario con ID ${userId} y sus posts que le han gustado...`,
      );
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['likedPosts'],
      });

      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
      }

      // Buscar el posteo por su ID
      console.log(`Buscando el posteo con ID ${postId}...`);
      const post = await this.postRepository.findOne({ where: { id: postId } });

      if (!post) {
        throw new NotFoundException('Post no encontrado');
      }

      // Verificar si el posteo ya está en los likedPosts del usuario
      const index = user.likedPosts.findIndex((post) => post.id === postId);
      if (index !== -1) {
        // Si el posteo ya está en los likedPosts, quitar el like
        user.likedPosts.splice(index, 1);
        console.log('El post fue eliminado de los favoritos');
      } else {
        // Si el posteo no está en los likedPosts, agregar el like
        user.likedPosts.push(post);
        console.log('El post fue agregado a favoritos');
      }

      // Guardar los cambios en la base de datos
      console.log('Guardando los cambios en la base de datos...');
      await this.userRepository.save(user);
    } catch (error) {
      console.error(`Error en toggleLike: ${error.message}`);
      throw error;
    }
  }

  async findInfoRelation(userId: string, relations: string[]): Promise<any> {
    const validRelations = this.validateRelations(relations);

    // Verificar si hay al menos una relación válida
    if (validRelations.length === 0) {
      throw new Error('No se han proporcionado relaciones válidas.');
    }

    // Construir objeto de opciones para la consulta
    const options: any = { where: { id: userId }, relations: validRelations };
    console.log('options es', options);
    // Realizar la consulta del post con las relaciones especificadas
    const user = await this.userRepository.findOne(options);

    if (!user) {
      throw new NotFoundException(
        `No se encontró ningún post con el ID ${userId}.`,
      );
    }

    return user;
  }

  private validateRelations(relations: string[]): string[] {
    const validRelations: string[] = [];

    // Definir relaciones válidas permitidas en la entidad Post
    const allowedRelations = [
      'likedPosts',
      'favorites',
      'comments',
      'histories',
      'posts',
      'notifications',
      'friends',
    ];
    // Filtrar relaciones válidas
    relations.forEach((relation) => {
      if (allowedRelations.includes(relation)) {
        validRelations.push(relation);
      }
    });

    return validRelations;
  }

  //agrega a amigos o familiares
  async addFamilyMember(
    userId: string,
    property: string,
    memberIds: string[],
  ): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // Verificar si la propiedad es válida y manejarla en consecuencia
    switch (property) {
      case 'momId':
      case 'dadId':
        user[property] = memberIds[0]; // Tomar solo el primer ID en caso de propiedades únicas
        break;
      case 'brotherIds':
      case 'unclesIds':
      case 'grandparentsIds':
      case 'cousinsIds':
      case 'familyIds':
      case 'friendsIds':
        if (Array.isArray(user[property])) {
          // Filtrar los IDs que ya existen en la propiedad
          const newMemberIds = memberIds.filter(
            (id) => !user[property].includes(id),
          );
          user[property] = [...user[property], ...newMemberIds]; // Concatenar solo los IDs nuevos
        } else {
          user[property] = memberIds; // Asignar directamente el array de IDs
        }
        break;
      default:
        throw new Error('La propiedad especificada no es válida');
    }

    // Guardar los cambios en la base de datos
    await this.userRepository.save(user);

    return user;
  }

  async removeFamilyMember(userId: string, property: string, memberId: string) {
    try {
      // Buscar al usuario
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
      }

      // Verificar el tipo de propiedad y manejarlo en consecuencia
      if (typeof user[property] === 'string') {
        // Si es una propiedad de tipo string, eliminarla si coincide con el ID a eliminar
        if (user[property] === memberId) {
          user[property] = null;
        }
      } else if (Array.isArray(user[property])) {
        // Si es una propiedad de tipo array, filtrar el ID a eliminar del arreglo
        user[property] = user[property].filter((id) => id !== memberId);
      } else {
        throw new Error('El tipo de propiedad no es compatible');
      }

      // Guardar el usuario actualizado
      await this.userRepository.save(user);
      return { message: 'Miembro eliminado correctamente' };
    } catch (error) {
      throw new Error('Ocurrió un error al eliminar el miembro de la familia');
    }
  }

  async getFriendsAndFamilyInfo(userId: string): Promise<any[]> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${userId} no encontrado.`);
    }

    const usersInfo = [];

    const getUserInfo = async (id: string) => {
      const userInfo = await this.userRepository.findOne({ where: { id: id } });
      if (userInfo) {
        usersInfo.push({
          id: userInfo.id,
          profilePicture: userInfo.profilePicture,
          username: userInfo.username,
        });
      }
    };

    // Verificar amigos
    if (user.friendsIds && user.friendsIds.length > 0) {
      for (const friendId of user.friendsIds) {
        await getUserInfo(friendId);
      }
    }

    // Verificar familiares (familyIds)
    if (user.familyIds && user.familyIds.length > 0) {
      for (const familyId of user.familyIds) {
        await getUserInfo(familyId);
      }
    }

    // Verificar madre (momId)
    if (user.momId) {
      await getUserInfo(user.momId);
    }

    // Verificar padre (dadId)
    if (user.dadId) {
      await getUserInfo(user.dadId);
    }

    // Verificar hermanos (brotherIds)
    if (user.brotherIds && user.brotherIds.length > 0) {
      for (const brotherId of user.brotherIds) {
        await getUserInfo(brotherId);
      }
    }

    // Verificar tíos (unclesIds)
    if (user.unclesIds && user.unclesIds.length > 0) {
      for (const uncleId of user.unclesIds) {
        await getUserInfo(uncleId);
      }
    }

    // Verificar abuelos (grandparentsIds)
    if (user.grandparentsIds && user.grandparentsIds.length > 0) {
      for (const grandparentId of user.grandparentsIds) {
        await getUserInfo(grandparentId);
      }
    }

    // Verificar primos (cousinsIds)
    if (user.cousinsIds && user.cousinsIds.length > 0) {
      for (const cousinId of user.cousinsIds) {
        await getUserInfo(cousinId);
      }
    }

    // Si no se encontró ningún contacto, devolver mensaje
    if (usersInfo.length === 0) {
      usersInfo.push({
        message: 'Aún no tienes contactos.',
      });
    }

    return usersInfo;
  }

  async getFriendsAndFamilyLength(userId: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${userId} no encontrado.`);
    }

    const usersInfo = [];
    let friendsCount = 0;
    let familyCount = 0;

    const getUserInfo = async (id: string) => {
      if (
        !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(
          id,
        )
      ) {
        return; // Ignorar si no es un UUID
      }

      const userInfo = await this.userRepository.findOne({ where: { id: id } });
      if (userInfo) {
        usersInfo.push({
          id: userInfo.id,
          profilePicture: userInfo.profilePicture,
          username: userInfo.username,
        });
      }
    };

    // Verificar amigos
    if (user.friendsIds && user.friendsIds.length > 0) {
      friendsCount += user.friendsIds.length;
      for (const friendId of user.friendsIds) {
        await getUserInfo(friendId);
      }
    }

    // Verificar familiares (familyIds)
    if (user.familyIds && user.familyIds.length > 0) {
      familyCount += user.familyIds.length;
      for (const familyId of user.familyIds) {
        await getUserInfo(familyId);
      }
    }

    // Verificar madre (momId)
    if (user.momId) {
      familyCount += 1;
      await getUserInfo(user.momId);
    }

    // Verificar padre (dadId)
    if (user.dadId) {
      familyCount += 1;
      await getUserInfo(user.dadId);
    }

    // Verificar hermanos (brotherIds)
    if (user.brotherIds && user.brotherIds.length > 0) {
      familyCount += user.brotherIds.length;
      for (const brotherId of user.brotherIds) {
        await getUserInfo(brotherId);
      }
    }

    // Verificar tíos (unclesIds)
    if (user.unclesIds && user.unclesIds.length > 0) {
      familyCount += user.unclesIds.length;
      for (const uncleId of user.unclesIds) {
        await getUserInfo(uncleId);
      }
    }

    // Verificar abuelos (grandparentsIds)
    if (user.grandparentsIds && user.grandparentsIds.length > 0) {
      familyCount += user.grandparentsIds.length;
      for (const grandparentId of user.grandparentsIds) {
        await getUserInfo(grandparentId);
      }
    }

    // Verificar primos (cousinsIds)
    if (user.cousinsIds && user.cousinsIds.length > 0) {
      familyCount += user.cousinsIds.length;
      for (const cousinId of user.cousinsIds) {
        await getUserInfo(cousinId);
      }
    }

    // Si no se encontró ningún contacto, devolver mensaje
    if (usersInfo.length === 0) {
      usersInfo.push({
        message: 'Aún no tienes contactos.',
      });
    }

    return {
      usersInfo,
      friendsCount,
      familyCount,
    };
  }

  // Servicio para agregar un familiar o amigo según el tipo de relación
  async addRelation(
    userId: string,
    relationId: string,
    relationship:
      | 'brother'
      | 'cousin'
      | 'child'
      | 'uncle'
      | 'grandchild'
      | 'closeFriend'
      | 'schoolFriend'
      | 'workFriend'
      | 'universityFriend'
      | 'hobbyFriend'
      | 'nephew',
  ): Promise<void> {
    try {
      // Encontrar al usuario A
      const userA = await this.userRepository.findOne({
        where: { id: userId },
        relations: [
          'brothers',
          'cousins',
          'childrens',
          'uncles',
          'grandchildrens',
          'closeFriends',
          'schoolFriends',
          'workFriends',
          'universityFriends',
          'hobbyFriends',
          'nephews',
        ], // Cargar todas las relaciones existentes
      });

      // Encontrar al usuario B
      const userB = await this.userRepository.findOne({
        where: { id: relationId },
        relations: [
          'brothers',
          'cousins',
          'childrens',
          'uncles',
          'grandchildrens',
          'closeFriends',
          'schoolFriends',
          'workFriends',
          'universityFriends',
          'hobbyFriends',
          'nephews',
        ], // Cargar todas las relaciones de usuario B
      });

      if (!userA || !userB) {
        throw new NotFoundException('Usuario o relación no encontrado');
      }

      // Verificar si ya existe en alguna relación del usuario A
      const alreadyInAnotherRelationA =
        userA.brothers.some((rel) => rel.id === relationId) ||
        userA.cousins.some((rel) => rel.id === relationId) ||
        userA.childrens.some((rel) => rel.id === relationId) ||
        userA.uncles.some((rel) => rel.id === relationId) ||
        userA.grandchildrens.some((rel) => rel.id === relationId) ||
        userA.closeFriends.some((rel) => rel.id === relationId) ||
        userA.schoolFriends.some((rel) => rel.id === relationId) ||
        userA.workFriends.some((rel) => rel.id === relationId) ||
        userA.universityFriends.some((rel) => rel.id === relationId) ||
        userA.hobbyFriends.some((rel) => rel.id === relationId) ||
        userA.nephews.some((rel) => rel.id === relationId);

      // Verificar si ya existe en alguna relación del usuario B
      const alreadyInAnotherRelationB =
        userB.brothers.some((rel) => rel.id === userId) ||
        userB.cousins.some((rel) => rel.id === userId) ||
        userB.childrens.some((rel) => rel.id === userId) ||
        userB.uncles.some((rel) => rel.id === userId) ||
        userB.grandchildrens.some((rel) => rel.id === userId) ||
        userB.closeFriends.some((rel) => rel.id === userId) ||
        userB.schoolFriends.some((rel) => rel.id === userId) ||
        userB.workFriends.some((rel) => rel.id === userId) ||
        userB.universityFriends.some((rel) => rel.id === userId) ||
        userB.hobbyFriends.some((rel) => rel.id === userId) ||
        userB.nephews.some((rel) => rel.id === userId);

      if (alreadyInAnotherRelationA || alreadyInAnotherRelationB) {
        throw new Error(
          'Este usuario ya está relacionado en otra categoría para al menos uno de los dos usuarios. Las relaciones deben ser únicas.',
        );
      }

      // Verificar si ya está agregado en la relación actual del usuario A
      const isAlreadyAddedA = userA[relationship + 's'].some(
        (rel: User) => rel.id === relationId,
      );
      if (isAlreadyAddedA) {
        throw new Error(
          `El ${relationship} ya está agregado en esta lista del usuario A`,
        );
      }

      // Verificar si ya está agregado en la relación actual del usuario B
      const isAlreadyAddedB = userB[relationship + 's'].some(
        (rel: User) => rel.id === userId,
      );
      if (isAlreadyAddedB) {
        throw new Error(
          `El ${relationship} ya está agregado en esta lista del usuario B`,
        );
      }

      // Agregar la relación de A -> B
      await userA[relationship + 's'].push(userB);

      // Guardar el usuario A primero
      await this.userRepository.save(userA);

      // Asegurarse de que el usuario B esté actualizado y volver a cargarlo

      // Agregar la relación de B -> A
      await userB[relationship + 's'].push(userA);

      // Guardar el usuario B actualizado
      await this.userRepository.save(userB);
      console.log(userA, userB, 'usuarios');
      this.chatGateway.sendNotificationToUser(relationId, 'relationship', {
        message: 'Hello!',
      });
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  // Servicio para eliminar un familiar o amigo según la relación
  async removeRelation(
    userId: string,
    relationId: string,
    relationship:
      | 'brother'
      | 'cousin'
      | 'child'
      | 'uncle'
      | 'grandchild'
      | 'closeFriend'
      | 'schoolFriend'
      | 'workFriend'
      | 'universityFriend'
      | 'hobbyFriend'
      | 'nephew',
  ): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: [relationship + 's'], // Trae la relación correcta dinámicamente
    });
    const relation = await this.userRepository.findOne({
      where: { id: relationId },
    });

    if (!user || !relation) {
      throw new NotFoundException('Usuario o relación no encontrado');
    }

    // Verificar si la relación existe en la lista
    const relationIndex = user[relationship + 's'].findIndex(
      (rel: User) => rel.id === relationId,
    );
    if (relationIndex === -1) {
      throw new Error(`El ${relationship} no está en la lista del usuario`);
    }

    // Eliminar la relación de la lista
    user[relationship + 's'].splice(relationIndex, 1);

    // Guardar el usuario actualizado
    await this.userRepository.save(user);
  }
}
