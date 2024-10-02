import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Post } from 'src/posts/entities/post.entity';
import { NotificationService } from 'src/notification/notification.service';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private readonly notificationService: NotificationService,
  ) {}

  async create(
    postId: any,
    userId: any,
    createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    const comment = new Comment();
    comment.content = createCommentDto.content;
    // Asignamos el ID del post al comentario
    comment.post = postId;
    comment.creatorId = createCommentDto.creatorId;

    // Buscamos el usuario con el ID proporcionado
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const post = await this.postRepository.findOne({
      where: { id: postId },
      relations: ['user'],
    });

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    // Asignamos el usuario al comentario
    comment.user = user;

    const save = await this.commentRepository.save(comment);
    if (user.id !== post?.user?.id) {
      await this.notificationService.create({
        title: 'Nueva Invitación',
        message: `ha comentado tu publicación: ${comment.content}`,
        senderId: user.id, // El creador del evento como emisor de la notificación
        receiverId: post.user.id, // El usuario invitado como receptor de la notificación
        type: 'comentario',
        readed: false,
        post,
      });
    }
    return save;
  }
  async findAll(): Promise<Comment[]> {
    return await this.commentRepository.find();
  }

  async findOne(id: string): Promise<Comment> {
    const comment = await this.commentRepository.findOne({ where: { id: id } });
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    return comment;
  }
  async findAllByPost(postId: number): Promise<Comment[]> {
    const comments = await this.commentRepository.find({
      where: {
        post: { id: postId },
      },
      relations: ['user', 'responses', 'responses.user', 'parentComment'],
    });

    if (!comments || comments.length === 0) {
      throw new NotFoundException(
        `No comments found for post with ID ${postId}`,
      );
    }

    return comments;
  }

  async update(
    id: string,
    updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    const comment = await this.commentRepository.findOne({ where: { id } });

    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    Object.assign(comment, updateCommentDto);

    return await this.commentRepository.save(comment);
  }

  async updateResponses(
    parentCommentId: string,
    createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    // Encuentra el comentario al que se va a responder
    const parentComment = await this.commentRepository.findOne({
      where: { id: parentCommentId },
      relations: ['user'],
    });

    if (!parentComment) {
      throw new NotFoundException(
        `Parent comment with ID ${parentCommentId} not found`,
      );
    }

    // Verifica que el usuario exista
    const user = await this.userRepository.findOne({
      where: { id: createCommentDto.creatorId },
    });
    if (!user) {
      throw new NotFoundException(
        `User with ID ${createCommentDto.creatorId} not found`,
      );
    }

    // Si se provee un postId, verifica que el post exista
    let post = null;
    if (createCommentDto.postId) {
      post = await this.postRepository.findOne({
        where: { id: createCommentDto.postId },
        relations: ['user'],
      });
      if (!post) {
        throw new NotFoundException(
          `Post with ID ${createCommentDto.postId} not found`,
        );
      }
    }

    // Crear la nueva respuesta
    const newResponse = this.commentRepository.create({
      content: createCommentDto.content,
      creatorId: createCommentDto.creatorId,
      user: user, // Relación con el usuario
      parentComment: parentComment, // Relación con el comentario padre
      ...(post && { post }), // Solo asigna el post si existe
    });

    // Guardar la respuesta en la base de datos
    await this.commentRepository.save(newResponse);
    console.log(parentComment?.user?.id, post?.user?.id, 'aaaaaa');
    if (parentComment?.user?.id !== createCommentDto.creatorId) {
      await this.notificationService.create({
        title: 'Nueva Invitación',
        message: `ha respondido tu comentario: ${newResponse.content}`,
        senderId: user.id, // El creador del evento como emisor de la notificación
        receiverId: parentComment?.user?.id, // El usuario invitado como receptor de la notificación
        type: 'comentario',
        readed: false,
        ...(post && { post }),
      });
    }
    // Devolver el comentario padre actualizado con las nuevas respuestas
    return this.commentRepository.findOne({
      where: { id: parentCommentId },
      relations: ['responses'],
    });
  }

  async updateLikes(
    id: string,
    updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    const comment = await this.commentRepository.findOne({ where: { id } });

    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    // Update other properties from updateCommentDto if needed

    // Handle likes array
    const { likes } = updateCommentDto; // Destructure likes from DTO
    const existingLikes = comment.likes || []; // Initialize with empty array if none exists

    // Combine adding and removing in a single loop for efficiency
    for (const likeId of likes) {
      if (!existingLikes.includes(likeId)) {
        existingLikes.push(likeId); // Add new like
      } else {
        const indexToRemove = existingLikes.indexOf(likeId);
        if (indexToRemove !== -1) {
          existingLikes.splice(indexToRemove, 1); // Remove existing like
        }
      }
    }

    comment.likes = existingLikes;

    return await this.commentRepository.save(comment);
  }
  async updateDislikes(
    id: string,
    updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    const comment = await this.commentRepository.findOne({ where: { id } });

    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    // Update other properties from updateCommentDto if needed

    // Handle likes array
    const { dislikes } = updateCommentDto; // Destructure likes from DTO
    const existingLikes = comment.dislikes || []; // Initialize with empty array if none exists

    // Combine adding and removing in a single loop for efficiency
    for (const likeId of dislikes) {
      if (!existingLikes.includes(likeId)) {
        existingLikes.push(likeId); // Add new like
      } else {
        const indexToRemove = existingLikes.indexOf(likeId);
        if (indexToRemove !== -1) {
          existingLikes.splice(indexToRemove, 1); // Remove existing like
        }
      }
    }

    comment.dislikes = existingLikes;

    return await this.commentRepository.save(comment);
  }
  async remove(id: number): Promise<void> {
    const result = await this.commentRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
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
    console.log('options es', options);
    // Realizar la consulta del post con las relaciones especificadas
    const user = await this.commentRepository.findOne(options);

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
    const allowedRelations = ['user', 'post'];
    // Filtrar relaciones válidas
    relations.forEach((relation) => {
      if (allowedRelations.includes(relation)) {
        validRelations.push(relation);
      }
    });

    return validRelations;
  }
}
