import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from './entities/album.entity';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
  ) {}

  // Crear un nuevo álbum
  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const album = this.albumRepository.create(createAlbumDto);
    return this.albumRepository.save(album);
  }

  // Obtener todos los álbumes
  async findAll(): Promise<Album[]> {
    return this.albumRepository.find();
  }

  // Obtener un álbum por su ID
  async findOne(id: string): Promise<Album> {
    const album = await this.albumRepository.findOne({where: {id: id } });
    if (!album) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }
    return album;
  }

  // Actualizar un álbum existente
  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    const album = await this.albumRepository.preload({
      id,
      ...updateAlbumDto,
    });
    if (!album) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }
    return this.albumRepository.save(album);
  }

  // Eliminar un álbum
  async remove(id: string): Promise<void> {
    const result = await this.albumRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }
  }

  // Obtener álbumes por creatorId
  async findByCreatorId(creatorId: string): Promise<Album[]> {
    return this.albumRepository.find({ where: { creatorId } });
  }
}
