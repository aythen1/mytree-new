import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Diary } from '../diary/entities/diary.entity';
import { CreateDiaryDto } from './dto/create-diary.dto';
import { UpdateDiaryDto } from './dto/update-diary.dto';

@Injectable()
export class DiaryService {
  constructor(
    @InjectRepository(Diary)
    private readonly diaryRepository: Repository<Diary>,
  ) {}

  /**
   * Crea una nueva entrada de diario.
   * @param createDiaryDto - Objeto de transferencia de datos que contiene la información del diario.
   * @returns La entrada de diario creada.
   */
  async create(createDiaryDto: CreateDiaryDto): Promise<Diary> {
    const diary = this.diaryRepository.create(createDiaryDto);
    return await this.diaryRepository.save(diary);
  }

  /**
   * Encuentra todas las entradas de diario.
   * @returns Una lista de todas las entradas de diario.
   */
  async findAll(): Promise<Diary[]> {
    return await this.diaryRepository.find();
  }

  /**
   * Encuentra una entrada de diario por su ID.
   * @param id - El ID de la entrada de diario.
   * @returns La entrada de diario encontrada.
   * @throws NotFoundException si no se encuentra la entrada de diario.
   */
  async findOne(id: string): Promise<Diary> {
    const diary = await this.diaryRepository.findOne({ where: { id } });
    if (!diary) {
      throw new NotFoundException(`Diario con ID ${id} no encontrado`);
    }
    return diary;
  }

  /**
   * Actualiza una entrada de diario por su ID.
   * @param id - El ID de la entrada de diario.
   * @param updateDiaryDto - Objeto de transferencia de datos que contiene la información actualizada del diario.
   * @returns La entrada de diario actualizada.
   * @throws NotFoundException si no se encuentra la entrada de diario.
   */
  async update(id: string, updateDiaryDto: UpdateDiaryDto): Promise<Diary> {
    await this.diaryRepository.update(id, updateDiaryDto);
    const updatedDiary = await this.findOne(id);
    return updatedDiary;
  }

  /**
   * Elimina una entrada de diario por su ID.
   * @param id - El ID de la entrada de diario.
   * @throws NotFoundException si no se encuentra la entrada de diario.
   */
  async remove(id: string): Promise<void> {
    // Verifica si el diario existe antes de intentar eliminarlo
    const diary = await this.diaryRepository.findOne({where: {id:id}});
    if (!diary) {
      throw new NotFoundException(`Diario con ID ${id} no encontrado`);
    }

    // Elimina el diario
    const result = await this.diaryRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Diario con ID ${id} no encontrado`);
    }
  }

  /**
   * Encuentra todas las entradas de diario creadas por un usuario específico.
   * @param creatorId - El ID del usuario que creó los diarios.
   * @returns Una lista de entradas de diario creadas por el usuario especificado.
   */
  async findAllByUser(creatorId: string): Promise<Diary[]> {
    return await this.diaryRepository.find({ where: { creatorId } });
  }

//para traer todos los diarios de una categoria de un usuario
  async findByCategoryAndCreator(category: string, creatorId: string): Promise<Diary[]> {
    return this.diaryRepository.find({ where: { category, creatorId } });
  }
}
