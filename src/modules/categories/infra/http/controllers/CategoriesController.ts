import { Response, Request } from 'express';
import { container } from 'tsyringe';

import CreateCategoryService from '@modules/categories/services/CreateCategoryService';

export default class CategoriesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { title } = request.body;

    const createCategory = container.resolve(CreateCategoryService);

    const category = await createCategory.execute({ categoryTitle: title });

    return response.json(category);
  }
}
