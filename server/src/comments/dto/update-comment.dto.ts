import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentDto } from './create-comment.dto';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
    content?: string;
    responses?: object[];
    likes?: string[];
    dislikes?: string[];
    extraData?: any;
}
