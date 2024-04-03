import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { History } from './entities/history.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class HistoriesService {
  constructor(
    @InjectRepository(History)
    private readonly historyRepository: Repository<History>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createHistoryDto: CreateHistoryDto) {
    const history = new History();
    history.nameUser = createHistoryDto.nameUser;
    history.description = createHistoryDto.description;
    history.media = createHistoryDto.media;
    history.etiquets = createHistoryDto.etiquets;
    history.fecha = createHistoryDto.fecha;
    history.hashtags = createHistoryDto.hashtags;
    history.user = createHistoryDto.userId;


     // Aquí asumimos que etiquets es un array de IDs de usuarios
  if (history.etiquets && history.etiquets.length > 0) {
    const etiquetUsers = await this.userRepository.findBy({id:In(history.etiquets)});
    history.etiquets = etiquetUsers;
  }

    return await this.historyRepository.save(history);
  }

  async findAll() {
    return await this.historyRepository.find();
  }

  async findAllByUser(userId: number): Promise<History[]> {
    const histories = await this.historyRepository.find({ where: { user: { id: userId } } });
    if (!histories || histories.length === 0) {
      throw new NotFoundException(`No histories found for user with ID ${userId}`);
    }
    return histories;
  }
  async findOne(id: number) {
    return await this.historyRepository.findOne({where:{id:id}});
  }

  async update(id: number, updateHistoryDto: UpdateHistoryDto) {
    const history = await this.historyRepository.findOne({where:{id:id}});
    if (!history) {
      throw new Error(`History with ID ${id} not found`);
    }

    // Actualizamos los campos
    history.nameUser = updateHistoryDto.nameUser || history.nameUser;
    history.description = updateHistoryDto.description || history.description;
    history.media = updateHistoryDto.media || history.media;
    history.etiquets = updateHistoryDto.etiquets || history.etiquets;
    history.fecha = updateHistoryDto.fecha || history.fecha;
    history.hashtags = updateHistoryDto.hashtags || history.hashtags;

    return await this.historyRepository.save(history);
  }

  async remove(id: number) {
    const history = await this.historyRepository.findOne({where:{id:id}});
    if (!history) {
      throw new Error(`History with ID ${id} not found`);
    }

    await this.historyRepository.remove(history);
    return `History with ID ${id} has been removed`;
  }
}
