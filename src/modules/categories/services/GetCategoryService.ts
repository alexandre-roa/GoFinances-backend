import { inject, injectable } from 'tsyringe';
import ICategoryRepository from '@modules/categories/repositories/ICategoryRepository';
import Category from '../infra/typeorm/entities/Category';

interface IRequest {
  category_id: string | undefined;
}
@injectable()
class GetCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoryRepository: ICategoryRepository,
  ) {}

  public async find(): Promise<Category[] | undefined> {
    const categories = await this.categoryRepository.find();

    return categories;
  }

  public async findById({
    category_id,
  }: IRequest): Promise<Category | undefined> {
    const category = await this.categoryRepository.findId(category_id);

    return category;
  }
}

export default GetCategoryService;
