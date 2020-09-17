import 'reflect-metadata';
import GetCategoryService from '@modules/categories/services/GetCategoryService';
import CreateCategoryService from '@modules/categories/services/CreateCategoryService';
import FakeCategoryRepository from '../repositories/fakes/FakeCategoryRepository';

describe('DeleteCategory', () => {
  it('Should be able to get categories', async () => {
    const fakeCategoryRepository = new FakeCategoryRepository();
    const getCategoryService = new GetCategoryService(fakeCategoryRepository);
    const createCategoryService = new CreateCategoryService(
      fakeCategoryRepository,
    );

    const category1 = await createCategoryService.execute({
      categoryTitle: 'Test Category',
    });

    const category2 = await createCategoryService.execute({
      categoryTitle: 'Test Category2',
    });

    const categories = await getCategoryService.find();

    expect(categories).toStrictEqual([category1, category2]);
  });

  it('Should be able to get category by id', async () => {
    const fakeCategoryRepository = new FakeCategoryRepository();
    const getCategoryService = new GetCategoryService(fakeCategoryRepository);
    const createCategoryService = new CreateCategoryService(
      fakeCategoryRepository,
    );

    await createCategoryService.execute({
      categoryTitle: 'Test Category',
    });

    const category = await getCategoryService.findById({
      category_id: '1234567890',
    });

    expect(category).toHaveProperty('id');
  });
});
