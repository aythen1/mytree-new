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
  async findOne(@Param('id') id: number) {
    return this.commentsService.findOne(id);
  }


  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateCommentDto: CreateCommentDto) {
    return this.commentsService.update(id, updateCommentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.commentsService.remove(id);
  }
}
