import Category from '@modules/categories/infra/typeorm/entities/Category';

export default interface ICreateTransactionsDTO {
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category_id: string;
  category: Category | undefined;
}
