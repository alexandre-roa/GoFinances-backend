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

  public async findId(category_id: string): Promise<Category | undefined> {
    const category = await this.ormRepository.find({ id: category_id });

    return category[0];
  }

  public async findOne(categoryTitle: string): Promise<Category | undefined> {
    const checkCategoryExist = this.ormRepository.findOne({
      where: { title: categoryTitle },
    });

    return checkCategoryExist;
  }

  public async find(): Promise<Category[] | undefined> {
    const categories = this.ormRepository.find();

    return categories;
  }

  public async delete(category_id: string): Promise<void> {
    await this.ormRepository.find();
    await this.ormRepository.delete(category_id);
  }
}

export default CategoriesRepository;
