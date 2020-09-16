import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICategoryRepository from '@modules/categories/repositories/ICategoryRepository';
import Category from '../infra/typeorm/entities/Category';

interface IRequest {
  categoryTitle: string;
}
@injectable()
class CreateCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoryRepository: ICategoryRepository,
  ) {}

  public async execute({ categoryTitle }: IRequest): Promise<Category | null> {
    const checkCategoryExist = await this.categoryRepository.findOne(
      categoryTitle,
    );

    if (checkCategoryExist) {
      throw new AppError('Category is already exists');
    }

    const category = await this.categoryRepository.create(categoryTitle);

    return category;
  }
}

export default CreateCategoryService;
