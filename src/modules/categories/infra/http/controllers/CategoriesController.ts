import { Response, Request } from 'express';
import { container } from 'tsyringe';

import CreateCategoryService from '@modules/categories/services/CreateCategoryService';
import GetCategoryService from '@modules/categories/services/GetCategoryService';
import DeleteCategoryService from '@modules/categories/services/DeleteCategoryService';

export default class CategoriesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { title } = request.body;

    const createCategory = container.resolve(CreateCategoryService);

    const category = await createCategory.execute({ categoryTitle: title });

    return response.json(category);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const getCategories = container.resolve(GetCategoryService);

    const categories = await getCategories.find();

    return response.json(categories);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { category_id } = request.params;
    const categories = container.resolve(DeleteCategoryService);

    await categories.delete(category_id);

    return response.json({ delete: 'ok' });
  }
}
