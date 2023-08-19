import { BaseEntity, DeleteResult, FindConditions, Repository } from 'typeorm';
import { IBaseService } from './i.base.service';
import { EntityId } from 'typeorm/repository/EntityId';

export class BaseService<T extends BaseEntity> implements IBaseService<T> {
  constructor(public repository: Repository<T>) {}

  findAll(): Promise<T[]> {
    return this.repository.find();
  }

  findOne(conditions?: FindConditions<T>): Promise<T> {
    return this.repository.findOne(conditions);
  }

  findById(id: EntityId): Promise<T> {
    return this.repository.findOne(id);
  }

  findByIds(ids: [EntityId]): Promise<T[]> {
    return this.repository.findByIds(ids);
  }

  store(data: any): Promise<T> {
    return this.repository.save(data);
  }

  async update(id: EntityId, data: any): Promise<T> {
    await this.repository.update(id, data);
    return this.findById(id);
  }

  delete(id: EntityId): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
