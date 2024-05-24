import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post(':postId/:userId')
  async create(@Param('postId') postId: number, @Param('userId') userId: number, @Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(postId, userId, createCommentDto);
  }

  @Get('post/:postId')
  findAllByPost(@Param('postId') postId: number) {
    return this.commentsService.findAllByPost(postId);
  }
  @Get()
  async findAll() {
    return this.commentsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.commentsService.findOne(id);
  }


  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCommentDto: CreateCommentDto) {
    return this.commentsService.update(id, updateCommentDto);
  }
  @Patch(':id/like')
  async updateLike(@Param('id') id: string, @Body() updateCommentDto: CreateCommentDto) {
    return this.commentsService.updateLikes(id, updateCommentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.commentsService.remove(id);
  }

  @Post(':commentId/info-relation')
  async findInfoRelation(
    @Param('commentId') commentId: number, 
    @Body() requestBody: { relations: string }
  ): Promise<any[]> {
    // Verificar si se proporcionaron relaciones
    if (!requestBody.relations || typeof requestBody.relations !== 'string') {
      throw new Error('Debe proporcionar al menos una relación como una cadena de texto.');
    }
  console.log(requestBody.relations)
    // Convertir las relaciones en un array
    const relationsArray = requestBody.relations.split(',');
  
    // Llamar al servicio para obtener la información relacionada
    return this.commentsService.findInfoRelation(commentId, relationsArray);
  }
}
