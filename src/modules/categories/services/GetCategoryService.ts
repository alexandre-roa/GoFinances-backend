import ICategoryRepository from '@modules/categories/repositories/ICategoryRepository';
import Category from '../infra/typeorm/entities/Category';

interface IRequest {
  category_id: string | undefined;
}

class GetCategoryService {
  constructor(private categoryRepository: ICategoryRepository) {}

  public async execute({
    category_id,
  }: IRequest): Promise<Category | undefined> {
    const category = await this.categoryRepository.findId(category_id);

    return category;
  }
}

export default GetCategoryService;
