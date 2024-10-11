import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Album } from './entities/album.entity';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Crear un nuevo álbum
  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const {
      taggedUsers: taggedUserIds,
      creatorId,
      images,
      ...rest
    } = createAlbumDto;

    // Buscar el usuario creador del álbum
    const user = await this.userRepository.findOne({
      where: { id: creatorId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Buscar los usuarios etiquetados (tagged users)
    let taggedUsers: User[] = [];
    if (taggedUserIds && taggedUserIds.length > 0) {
      taggedUsers = await this.userRepository.findBy({ id: In(taggedUserIds) });
    }

    // Crear el álbum con los datos del DTO
    const album = this.albumRepository.create({
      ...rest,
      creator: user,
      taggedUsers, // Relacionar los usuarios etiquetados
    });

    // Guardar el álbum en la base de datos
    const savedAlbum = await this.albumRepository.save(album);

    // Crear un post por cada imagen
    if (images && images.length > 0) {
      for (const image of images) {
        const post = this.postRepository.create({
          album: savedAlbum, // Relacionar con el álbum
          photos: [image], // Asignar la imagen al post
          nameUser: user.username,
          description: '',
          user, // Relacionar con el usuario creador
          fecha: new Date().toString(),
          privacyMode: createAlbumDto.privacyMode,
        });
        await this.postRepository.save(post);
      }
    }

    return savedAlbum;
  }

  // Obtener todos los álbumes
  async findAll(): Promise<Album[]> {
    return this.albumRepository.find();
  }

  // Obtener un álbum por su ID
  async findOne(id: string): Promise<Album> {
    const album = await this.albumRepository.findOne({ where: { id: id } });
    if (!album) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }
    return album;
  }

  // Actualizar un álbum existente
  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    // Busca los usuarios etiquetados en la base de datos
    let taggedUsers: User[] = [];
    if (updateAlbumDto.taggedUsers && updateAlbumDto.taggedUsers.length > 0) {
      taggedUsers = await this.userRepository.findBy({
        id: In(updateAlbumDto.taggedUsers),
      });
    }

    // Cargar el álbum existente
    const album = await this.albumRepository.preload({
      id,
      ...updateAlbumDto,
      taggedUsers, // Asigna los usuarios encontrados
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
    return this.albumRepository.find({
      where: { creatorId },
      relations: ['taggedUsers', 'posts', 'creator'],
    });
  }
}
