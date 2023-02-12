import { BaseModel } from '../../modules/objection';
import { TransactionContextModel } from './transaction-context.model';

export class ProcessingTransactionModel {
  transactions: {
    [transactionId: string]: {
      [modelName: string]: typeof TransactionContextModel['prototype'];
    };
  };

  constructor() {
    this.transactions = {};
  }

  addContext<T extends BaseModel>(
    transactionId: string,
    modelName: string,
    transactionContext: TransactionContextModel<T>
  ): boolean {
    if (!(transactionId in this.transactions)) {
      this.transactions[transactionId] = {};
    }
    this.transactions[transactionId][modelName] = transactionContext;
    return true;
  }

  removeContext(transactionId: string): boolean {
    if (transactionId in this.transactions) {
      delete this.transactions[transactionId];
      return true;
    }
    return false;
  }

  getContext<T extends BaseModel>(
    transactionId: string,
    modelName: string
  ): TransactionContextModel<T> {
    if (
      transactionId in this.transactions &&
      modelName in this.transactions[transactionId]
    ) {
      return this.transactions[transactionId][modelName];
    }
    throw new Error('Context does not exist');
  }

  getAffectedModels(transactionId: string): string[] {
    if (transactionId in this.transactions) {
      return Object.keys(this.transactions[transactionId]);
    }
    throw new Error('Context does not exist');
  }

  commit(transactionId: string, modelName: string): void {
    const context = this.getContext(transactionId, modelName);
    try {
      context.transaction.commit();
      this.removeContext(transactionId);
    } catch (e) {
      throw new Error('Something wrong happened when committing transaction.');
    }
  }

  rollback(transactionId: string, modelName: string): void {
    const context = this.getContext(transactionId, modelName);

    try {
      context.transaction.rollback();
      this.removeContext(transactionId);
    } catch (e) {
      throw new Error('Something wrong happened when rollbacking transaction.');
    }
  }
}
