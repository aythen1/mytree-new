import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('albums')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  // Crear un nuevo álbum
  @Post()
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  // Obtener todos los álbumes
  @Get()
  async findAll() {
    return this.albumService.findAll();
  }

  // Obtener un álbum por su ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.albumService.findOne(id);
  }

  // Actualizar un álbum existente
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    return this.albumService.update(id, updateAlbumDto);
  }

  // Eliminar un álbum
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.albumService.remove(id);
  }

  // Obtener álbumes por creatorId
  @Post('/by-creator')
  async findByCreatorId(@Body() body: { creatorId: string }) {
    const { creatorId } = body;
    return this.albumService.findByCreatorId(creatorId);
  }
}
