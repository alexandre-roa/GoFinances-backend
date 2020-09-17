import 'reflect-metadata';
import DeleteCategoryService from '@modules/categories/services/DeleteCategoryService';
import CreateCategoryService from '@modules/categories/services/CreateCategoryService';
import FakeCategoryRepository from '../repositories/fakes/FakeCategoryRepository';

describe('DeleteCategory', () => {
  it('Should be able to delete category', async () => {
    const fakeCategoryRepository = new FakeCategoryRepository();
    const deleteCategoryService = new DeleteCategoryService(
      fakeCategoryRepository,
    );
    const createCategoryService = new CreateCategoryService(
      fakeCategoryRepository,
    );

    await createCategoryService.execute({
      categoryTitle: 'Test Category',
    });

    const category = await deleteCategoryService.delete('1234567890');

    expect(category).toStrictEqual([]);
  });
});
