import Transaction from '@modules/transactions/infra/typeorm/entities/Transaction';
import IBalanceDTO from '@modules/transactions/dtos/IBalanceDTO';
import ICreateTransactionsDTO from '../dtos/ICreateTransactionsDTO';

export default interface ITransactionsRepository {
  create(data: ICreateTransactionsDTO): Promise<Transaction>;
  getBalance(): Promise<IBalanceDTO>;
  find(): Promise<Transaction[]>;
  import(csvFIle: string): Promise<Transaction[]>;
  delete(ids: Array<string>): Promise<void>;
}
