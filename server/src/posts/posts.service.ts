import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async createPost(createPostDto: CreatePostDto): Promise<Post> {
    try {
      const { nameUser, description, photos, etiquets, fecha, hashtags, userId , tags , albums , privacyMode} = createPostDto;

      const userEntity = await this.userRepository.findOne({where:{id:userId}});

      if (!userEntity) {
        throw new NotFoundException('Usuario no encontrado');
      }

      const post = new Post();
      post.nameUser = nameUser;
      post.description = description;
      post.photos = photos;
      post.etiquets = etiquets;
      post.fecha = fecha;
      post.hashtags = hashtags;
      post.user = userEntity;
      post.tags = tags;
      post.albums = albums;
      post.privacyMode = privacyMode;
      return await this.postRepository.save(post);
    } catch (error) {
      throw error;
    }

  }

  async findAll(): Promise<Post[]> {
    return await this.postRepository.find({relations:['user']});
  }

  async findOne(id: number): Promise<Post> {
    
    const post = await this.postRepository.findOne({where:{id:id}});
    if (!post) {
      throw new NotFoundException(`Post con ID ${id} no encontrado`);
    }

    return post;

  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    const { nameUser, description, photos, etiquets, fecha, hashtags } = updatePostDto;
    let post = await this.postRepository.findOne({where:{id:id}});

    if (!post) {
      throw new NotFoundException(`Post con ID ${id} no encontrado`);
    }

    post.nameUser = nameUser || post.nameUser;
    post.description = description || post.description;
    post.photos = photos || post.photos;
    post.etiquets = etiquets || post.etiquets;
    post.fecha = fecha || post.fecha;
    post.hashtags = hashtags || post.hashtags;

    return await this.postRepository.save(post);
  }

  async remove(id: number): Promise<void> {
    const post = await this.postRepository.findOne({where:{id:id}});

    if (!post) {
      throw new NotFoundException(`Post con ID ${id} no encontrado`);
    }

    await this.postRepository.remove(post);
  }

  async findInfoRelation(postId: number, relations: string[]): Promise<any> {
    const validRelations = this.validateRelations(relations);

    // Verificar si hay al menos una relación válida
    if (validRelations.length === 0) {
      throw new Error('No se han proporcionado relaciones válidas.');
    }

    // Construir objeto de opciones para la consulta
    const options: any = { where: { id: postId }, relations: validRelations };
console.log("options es", options)
    // Realizar la consulta del post con las relaciones especificadas
    const post = await this.postRepository.findOne(options);

    if (!post) {
      throw new NotFoundException(`No se encontró ningún post con el ID ${postId}.`);
    }

    return post;
  }

  private validateRelations(relations: string[]): string[] {
    const validRelations: string[] = [];

    // Definir relaciones válidas permitidas en la entidad Post
    const allowedRelations = ['comments', 'etiquets', 'user']; // Agregar más según sea necesario

    // Filtrar relaciones válidas
    relations.forEach(relation => {
      if (allowedRelations.includes(relation)) {
        validRelations.push(relation);
      }
    });

    return validRelations;
  }

  
}
