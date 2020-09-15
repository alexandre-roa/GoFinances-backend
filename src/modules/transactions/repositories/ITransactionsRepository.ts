import Transaction from '@modules/transactions/infra/typeorm/entities/Transaction';
import IBalanceDTO from '@modules/transactions/dtos/IBalanceDTO';
import IGetTransactionsDTO from '@modules/transactions/dtos/IGetTransactionsDTO';
import ICreateTransactionsDTO from '../dtos/ICreateTransactionsDTO';

export default interface ITransactionsRepository {
  create(data: ICreateTransactionsDTO): Promise<Transaction>;
  getBalance(): Promise<IBalanceDTO>;
  all(): Promise<IGetTransactionsDTO[]>;
}
