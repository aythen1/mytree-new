import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Post } from 'src/posts/entities/post.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) { }




  // BUSCA UN USUARIO 
  async findOne(id: number): Promise<User> {
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

    // CREA CREA USUARIO 
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { email } = createUserDto;
    const { phone } = createUserDto;

    const existingUser = await this.userRepository.findOne({ where: { email: email } });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }
    const existingUserPhone = await this.userRepository.findOne({ where: { phone: phone } });
    if (existingUserPhone) {
      throw new ConflictException('Phone already exists');
    }
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

    // TRAE TODOS LOS USUARUIS 
  async getUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

      // BUSCA UN USUARIO POR ID
  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

      // ACTUALIZA UN USUARIO POR ID
      async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.userRepository.findOne({where: {id:id}});
        if (!user) {
          throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
        }
        // Actualizar el usuario con los nuevos valores del DTO
        Object.assign(user, updateUserDto);
        return await this.userRepository.save(user);
      }

        // ELIMINA UN USUARIO POR ID
  async deleteUser(id: number): Promise<void> {
    const user = await this.getUserById(id);
    await this.userRepository.remove(user);
  }

        // AGREGA UN AMIGO A UN USUARIO CON SUS ID
  async addFriend(userId: number, friendId: number): Promise<void> {
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
  async removeFriend(userId: number, friendId: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['friends'] });
    const friend = await this.userRepository.findOne({ where: { id: friendId }, relations: ['friends'] });

    if (!user || !friend) {
      throw new Error('Usuario o amigo no encontrado');
    }

    // Buscamos la relación de amistad en la tabla intermedia y la eliminamos
    user.friends = user.friends.filter(f => f.id !== friendId);
    friend.friends = friend.friends.filter(f => f.id !== userId);

    // Guardamos los cambios en la tabla intermedia
    await this.userRepository.save(user);
    await this.userRepository.save(friend);
  }



// ELIMINA UN POST LIKE 
  async dislikePost(userId: number, postId: number): Promise<void> {
    console.log("si pasa")
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.likedPosts', 'likedPost')
      .where('user.id = :userId', { userId })
      .getOne();

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    // Encontrar el índice del post en los likedPosts del usuario
    const index = user.likedPosts.findIndex(likedPost => likedPost.id === postId);
    if (index !== -1) {
      // Si se encuentra, quitar el post de los likedPosts
      user.likedPosts.splice(index, 1);
    }

    await this.userRepository.save(user);
  }
// AGREGA UN POST FAVORITO A UN USUARIO
  async addToFavorites(userId: number, postId: number): Promise<void> {
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
        console.log("11111111111111")

        // Verificar si el post ya está en la lista de favoritos del usuario
        const index = user.favorites.findIndex(favorite => favorite.id === postId);
        if (index !== -1) {
            // Si el post ya está en la lista de favoritos, eliminarlo
            user.favorites.splice(index, 1);
            console.log(`Post con ID ${postId} eliminado de favoritos del usuario con ID ${userId}`);
        } else {
            // Si el post no está en la lista de favoritos, agregarlo
            user.favorites.push(post);
            console.log(`Post con ID ${postId} agregado a favoritos del usuario con ID ${userId}`);
        }

        // Guardar los cambios en la base de datos
        await this.userRepository.save(user);
    } catch (error) {
        // Manejar cualquier error que ocurra durante el proceso
        console.error('Error al agregar/eliminar el posteo a/de favoritos:', error.message);
        throw error;
    }
}


  
// ELIMINA UN POST DE LOS FAVORITOS DE UN USUARIO

  async removeFromFavorites(userId: number, postId: number): Promise<void> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.favorites', 'favorites')
      .where('user.id = :userId', { userId })
      .getOne();

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    user.favorites = user.favorites.filter(favorite => favorite.id !== postId);

    await this.userRepository.save(user);
  }

  // BUSCA UN USUARIO POR EL CELULAR EN LA BASE DE DATOS

  async findUserByCellphone(phone: string): Promise<User> {
    try {
        console.log(`Buscando usuario con número de teléfono: ${phone}`);
        const user = await this.userRepository.findOne({ where: { phone: phone } });
        if (!user) {
            console.log(`Usuario con número de teléfono ${phone} no encontrado`);
            throw new Error(`Usuario con número de teléfono ${phone} no encontrado`);
        }
        console.log(`Usuario con número de teléfono ${phone} encontrado:`, user);
        return user;
    } catch (error) {
        console.error('Error al buscar usuario por número de teléfono:', error.message);
        throw error;
    }
}
// BUSCA UN USUARIO POR EL CORREO EN LA BASE DE DATOS

async findUserByEmail(email: string): Promise<User> {
    try {
        console.log(`Buscando usuario con correo electrónico: ${email}`);
        const user = await this.userRepository.findOne({ where: { email: email } });
        if (!user) {
            console.log(`Usuario con correo electrónico ${email} no encontrado`);
            throw new Error(`Usuario con correo electrónico ${email} no encontrado`);
        }
        console.log(`Usuario con correo electrónico ${email} encontrado:`, user);
        return user;
    } catch (error) {
        console.error('Error al buscar usuario por correo electrónico:', error.message);
        throw error;
    }
}

// TRAE LAS NOTIFICACIONES DE UN AMIGO
async getUserNotifications(userId: number): Promise<any[]> {
  try {
    console.log(`Obteniendo notificaciones para el usuario con ID: ${userId}`);
    
    // Utilizar createQueryBuilder para incluir la relación 'notifications'
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.notifications', 'notifications')
      .where('user.id = :userId', { userId })
      .getOne();
    
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    console.log(`Notificaciones encontradas para el usuario con ID ${userId}:`, user.notifications);
    return user.notifications;
  } catch (error) {
    console.error('Error al obtener las notificaciones del usuario:', error.message);
    throw error;
  }
}



// TRAE LOS AMIGOS DE UN USUARIO
async getUserFriends(userId: number): Promise<User[]> {
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

    console.log('Estos son los amigos del usuario con sus relaciones de favoritos:');
    console.log(user.friends);

    return user.friends;
}

// TRAE LOS POST DE UN USUARIO
  async getUserPosts(userId: number): Promise<any[]> {
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['posts'] });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user.posts;
  }

 

// TRAE LAS BUSQUEDAS RECIENTES DE UN USUARIO
  async getUserRecentSearches(userId: number): Promise<string[]> {
    const user = await this.userRepository.findOne({where: {id:userId}});
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user.recentSearches || [];
  }

  // AGREGA LAS BUSQUEDAS RECIENTES DE UN USUARIO

  async addRecentSearch(userId: number, searchTerm: string): Promise<void> {
    const user = await this.userRepository.findOne({where: {id:userId}});
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

 
  async googleSignIn(googleData: any): Promise<any> {
  }

  async facebookSignIn(facebookData: any): Promise<any> {
  }

  async getUserFeedWithOptions(userId: number, option: string, param1?: string, param2?: string, param3?: string): Promise<any[]> {
    // Obtener el usuario por su ID
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['posts', 'favorites', 'friends'] });
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
        return user.friends.reduce((posts, friend) => posts.concat(friend.posts), []);
      case 'fourth':
        // Lógica para la opción 'fourth' (cuarta)
        // Ejemplo: devolver los posts del usuario ordenados por fecha de publicación
        return user.posts.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
      case 'fifth':
     default:
        // Opción por defecto en caso de que la opción proporcionada no sea válida
        throw new NotFoundException('Invalid option');
    }
  }
  

  

  async getUserFavorites(userId: number): Promise<any[]> {
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['favorites'] });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user.favorites;
  }

  //AGREGA O ELIMINA EN UN USUARIO EL LIKE A UN POST

    async toggleLike(userId: number, postId: number): Promise<void> {
      try {
        // Buscar al usuario y cargar sus likedPosts
        console.log(`Buscando al usuario con ID ${userId} y sus posts que le han gustado...`);
        const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['likedPosts'] });
    
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
        const index = user.likedPosts.findIndex(post => post.id === postId);
        if (index !== -1) {
          // Si el posteo ya está en los likedPosts, quitar el like
          user.likedPosts.splice(index, 1);
          console.log("El post fue eliminado de los favoritos");
        } else {
          // Si el posteo no está en los likedPosts, agregar el like
          user.likedPosts.push(post);
          console.log("El post fue agregado a favoritos");
        }
    
        // Guardar los cambios en la base de datos
        console.log('Guardando los cambios en la base de datos...');
        await this.userRepository.save(user);
      } catch (error) {
        console.error(`Error en toggleLike: ${error.message}`);
        throw error;
      }
    }
    
    async findInfoRelation(userId: number, relations: string[]): Promise<any> {
      const validRelations = this.validateRelations(relations);
  
      // Verificar si hay al menos una relación válida
      if (validRelations.length === 0) {
        throw new Error('No se han proporcionado relaciones válidas.');
      }
  
      // Construir objeto de opciones para la consulta
      const options: any = { where: { id: userId }, relations: validRelations };
  console.log("options es", options)
      // Realizar la consulta del post con las relaciones especificadas
      const user = await this.userRepository.findOne(options);
  
      if (!user) {
        throw new NotFoundException(`No se encontró ningún post con el ID ${userId}.`);
      }
  
      return user;
    }
  
    private validateRelations(relations: string[]): string[] {
      const validRelations: string[] = [];
  
      // Definir relaciones válidas permitidas en la entidad Post
      const allowedRelations = ['likedPosts', 'favorites', 'comments', 'histories', 'posts', 'notifications', 'friends'];  
      // Filtrar relaciones válidas
      relations.forEach(relation => {
        if (allowedRelations.includes(relation)) {
          validRelations.push(relation);
        }
      });
  
      return validRelations;
    }
  
}
