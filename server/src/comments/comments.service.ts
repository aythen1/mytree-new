import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async create(postId: any, userId: any, createCommentDto: CreateCommentDto): Promise<Comment> {
    const comment = new Comment();
    comment.content = createCommentDto.content;
    // Asignamos el ID del usuario al comentario
    comment.post = postId; // Asignamos el ID del post al comentario
    comment.creatorId = userId
    return await this.commentRepository.save(comment);
  }

  async findAll(): Promise<Comment[]> {
    return await this.commentRepository.find();
  }

  async findOne(id: string): Promise<Comment> {
    const comment = await this.commentRepository.findOne({where:{id:id}});
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    return comment;
  }
  async findAllByPost(postId: number): Promise<Comment[]> {
    const comments = await this.commentRepository.find({ 
      where: { post: { id: postId } }

    });
    if (!comments || comments.length === 0) {
      throw new NotFoundException(`No comments found for post with ID ${postId}`);
    }
    return comments;
  }
  async update(id: string, updateCommentDto: UpdateCommentDto): Promise<Comment> {
    const comment = await this.commentRepository.findOne({ where: { id } });
  
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
  
    Object.assign(comment, updateCommentDto);
  
    return await this.commentRepository.save(comment);
  }

  async updateResponses(id: string, updateCommentDto: UpdateCommentDto): Promise<Comment> {
    const comment = await this.commentRepository.findOne({ where: { id } });
  
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
  
    // Efficiently add new responses without duplicates
    const newResponses = [updateCommentDto.responses] || [];
    comment.responses = [...comment.responses, ...newResponses];
  
    return await this.commentRepository.save(comment);
  }

  async updateLikes(id: string, updateCommentDto: UpdateCommentDto): Promise<Comment> {
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
  async updateDislikes(id: string, updateCommentDto: UpdateCommentDto): Promise<Comment> {
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
