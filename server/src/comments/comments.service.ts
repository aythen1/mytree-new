import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async create(postId: any, userId: any, createCommentDto: CreateCommentDto): Promise<Comment> {
    const comment = new Comment();
    comment.content = createCommentDto.content;
    comment.user = userId; // Asignamos el ID del usuario al comentario
    comment.post = postId; // Asignamos el ID del post al comentario

    return await this.commentRepository.save(comment);
  }

  async findAll(): Promise<Comment[]> {
    return await this.commentRepository.find();
  }

  async findOne(id: number): Promise<Comment> {
    const comment = await this.commentRepository.findOne({where:{id:id}});
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    return comment;
  }
  async findAllByPost(postId: number): Promise<Comment[]> {
    const comments = await this.commentRepository.find({ 
      where: { post: { id: postId } },
      relations: ['user'] // Cargar ansiosamente la relación 'user'
    });
    if (!comments || comments.length === 0) {
      throw new NotFoundException(`No comments found for post with ID ${postId}`);
    }
    return comments;
  }

  async update(id: number, updateCommentDto: CreateCommentDto): Promise<Comment> {
    const comment = await this.commentRepository.findOne({where:{id:id}});
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    // Actualizamos el contenido del comentario
    comment.content = updateCommentDto.content;

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
console.log("options es", options)
    // Realizar la consulta del post con las relaciones especificadas
    const user = await this.commentRepository.findOne(options);

    if (!user) {
      throw new NotFoundException(`No se encontró ningún post con el ID ${userId}.`);
    }

    return user;
  }

  private validateRelations(relations: string[]): string[] {
    const validRelations: string[] = [];

    // Definir relaciones válidas permitidas en la entidad Post
    const allowedRelations = ['user' , 'post'];  
    // Filtrar relaciones válidas
    relations.forEach(relation => {
      if (allowedRelations.includes(relation)) {
        validRelations.push(relation);
      }
    });

    return validRelations;
  }
}
