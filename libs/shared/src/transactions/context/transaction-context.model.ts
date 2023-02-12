import { Transaction } from 'objection';
import { BaseModel } from '@microservice-platform/shared/objection';

export class TransactionContextModel<T extends BaseModel> {
  dataIds: (string | number)[];
  affectedData: T[];
  transaction: Transaction;

  constructor(
    dataIds: (string | number)[],
    affectedData: T[],
    transaction: Transaction
  ) {
    this.dataIds = dataIds;
    this.affectedData = affectedData;
    this.transaction = transaction;
  }
}
