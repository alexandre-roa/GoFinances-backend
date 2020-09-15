import Category from '@modules/categories/infra/typeorm/entities/Category';

export default interface IAllTransactions {
  id: string;
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: Category | undefined;
}
