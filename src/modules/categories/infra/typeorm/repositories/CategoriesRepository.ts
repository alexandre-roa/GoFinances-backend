import { EntityRepository, Repository, getRepository } from 'typeorm';

import Category from '@modules/categories/infra/typeorm/entities/Category';

import ICategoryRepository from '@modules/categories/repositories/ICategoryRepository';

@EntityRepository(Category)
class CategoriesRepository implements ICategoryRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  public async create(categoryTitle: string): Promise<Category> {
    const category = this.ormRepository.create({
      title: categoryTitle,
    });

    await this.ormRepository.save(category);

    return category;
  }
}

export default CategoriesRepository;
