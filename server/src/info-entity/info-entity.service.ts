import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Post } from 'src/posts/entities/post.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { History } from 'src/histories/entities/history.entity';
import { Notification } from 'src/notification/entities/notification.entity';
import { Info } from './info.interface';
import { ILike } from 'typeorm';
@Injectable()
export class InfoEntityService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(History)
    private readonly historyRepository: Repository<History>
  
  ) {}

  async getInfo(entity: string, id: string, relation: string, property: string, nestedProperty: string) {
    const repository = this.getRepositoryByEntity(entity);
    console.log("el repositorio es", repository)
    
    if (!repository) {
      throw new NotFoundException('Entidad no encontrada');
    }
  
    const entityInstance = await repository.findOne({
      where: { id: id },
      relations: [`${relation}.${property}`]
    });
    
    if (entityInstance) {
      if (property === 'null') {
        // Si se proporciona 'null' como property, devolver el objeto hasta ese punto
        return entityInstance;
      } else if (entityInstance[relation] && property !== 'null' && entityInstance[relation][property]) {
        const nestedEntity = entityInstance[relation][property];
        if (nestedProperty === 'null') {
          // Si se proporciona 'null' como nestedProperty, devolver el objeto hasta ese punto
          return entityInstance;
        } else if (nestedEntity && nestedEntity[nestedProperty]) {
          // Si nestedProperty está presente en el objeto, retornar el objeto completo
          return entityInstance;
        } else {
          // Si nestedProperty no está presente, realizar una consulta recursiva para obtenerlo
          const nestedEntityRepository = this.getRepositoryByEntity(property);
          console.log("nestedEntityRepository", nestedEntityRepository);
          if (nestedEntityRepository) {
            const result = await nestedEntityRepository.findOne({
              where: { id: nestedEntity.id },
              relations: [nestedProperty]
            });
            if (result) {
              // Agregar el resultado a la propiedad nestedProperty dentro del objeto original
              entityInstance[relation][property][nestedProperty] = result;
              return entityInstance;
            }
          }
        }
      }
    }
  
    return entityInstance;
  }
  

 
async filterProperty(entity: string, property: string, filterValue: string) {
  const repository = this.getRepositoryByEntity(entity);
  if (!repository) {
    throw new NotFoundException('Entidad no encontrada');
  }

  try {
    const results = await repository
      .createQueryBuilder()
      .select()
      .where(`${property} ILIKE :filterValue`, { filterValue: `%${filterValue}%` })
      .getMany();

    return results;
  } catch (error) {
    console.log(error)
    throw new Error('Error al realizar la consulta');
  }
}
  

async dynamicFilter(entity: string, filters: any) {
  const repository = this.getRepositoryByEntity(entity);
  if (!repository) {
    throw new NotFoundException('Entidad no encontrada');
  }

  try {
    let queryBuilder = repository.createQueryBuilder('entity');

    // Construir la cláusula WHERE dinámicamente
    Object.entries(filters).forEach(([key, value]) => {
      if (typeof value === 'string' && value.toLowerCase() === 'true') {
        // Si el valor es una cadena "true", convertirlo a booleano
        value = true;
      } else if (typeof value === 'string' && value.toLowerCase() === 'false') {
        // Si el valor es una cadena "false", convertirlo a booleano
        value = false;
      }
      
      // Agregar la condición al queryBuilder según el tipo de valor
      if (typeof value === 'boolean') {
        queryBuilder = queryBuilder.andWhere(`entity.${key} = :${key}`, { [key]: value });
      } else if (typeof value === 'string') {
        queryBuilder = queryBuilder.andWhere(`entity.${key} ILIKE :${key}`, { [key]: `%${value}%` });
      } else if (typeof value === 'number') {
        queryBuilder = queryBuilder.andWhere(`entity.${key} > :${key}`, { [key]: value });
      }
    });

    // Ejecutar la consulta y devolver los resultados
    const results = await queryBuilder.getMany();
    return results;
  } catch (error) {
    throw new Error('Error al realizar la consulta');
  }
}



filterInfo(info: Info, filter: Info): string[] {
  const matches: string[] = [];

  // Iteramos sobre las propiedades del objeto Info
  for (const key in info) {
    if (info.hasOwnProperty(key)) {
      // Verificamos si la propiedad existe en el filtro y si sus valores coinciden
      if (filter.hasOwnProperty(key) && info[key] === filter[key]) {
        matches.push(key);
      }
    }
  }

  return matches;
}

  private getRepositoryByEntity(entity: string): Repository<any> | null {
    console.log("entrando  a repositorios")
    switch (entity) {
      case 'user':
        return this.userRepository;
      case 'notification':
        return this.notificationRepository;
      case 'post':
        return this.postRepository;
      case 'comment':
        return this.commentRepository;
      case 'history':
        return this.historyRepository;
      default:
        return null;
    }
  }

}
