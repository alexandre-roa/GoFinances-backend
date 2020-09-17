import 'reflect-metadata';
import CreateCategoryService from '@modules/categories/services/CreateCategoryService';
import AppError from '@shared/errors/AppError';
import FakeCategoryRepository from '../repositories/fakes/FakeCategoryRepository';

describe('CreateCategory', () => {
  it('Should be able to create new category', async () => {
    const fakeCategoryRepository = new FakeCategoryRepository();
    const createCategoryService = new CreateCategoryService(
      fakeCategoryRepository,
    );

    const category = await createCategoryService.execute({
      categoryTitle: 'Test Category',
    });

    expect(category).toHaveProperty('id');
  });

  it('Should NOT be able to create new category with the same title', async () => {
    const fakeCategoryRepository = new FakeCategoryRepository();
    const createCategoryService = new CreateCategoryService(
      fakeCategoryRepository,
    );

    await createCategoryService.execute({
      categoryTitle: 'Test Category',
    });

    expect(
      createCategoryService.execute({
        categoryTitle: 'Test Category',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
