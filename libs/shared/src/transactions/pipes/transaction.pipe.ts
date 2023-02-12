/* eslint-disable @typescript-eslint/no-unused-vars */
import { ProcessingTransactionModel } from '../context/processing-transaction.model';
import { ITransactionPipe } from './transaction.pipe.interface';
import { TPipeResponse } from './types';

export abstract class TransactionPipe implements ITransactionPipe {
  processingTransactions: ProcessingTransactionModel;

  async vote(): Promise<boolean> {
    return true;
  }

  startTransaction(
    transactionId: string,
    affectedIds: string[]
  ): Promise<TPipeResponse> {
    throw new Error('Method not implemented.');
  }

  async commit(
    transactionId: string,
    options?: { modelOrder?: string[] }
  ): Promise<TPipeResponse> {
    let models = this.processingTransactions.getAffectedModels(transactionId);
    if (options && options.modelOrder) {
      if (options.modelOrder.length === models.length) {
        models = options.modelOrder;
      } else {
        return {
          status: 0,
          errorMessage: "Models' order should cover all affected models",
        };
      }
    }

    for (let i = 0; i < models.length; i++) {
      try {
        this.processingTransactions.commit(transactionId, models[i]);
      } catch (e) {
        return {
          status: 0,
          errorMessage: e.message,
        };
      }
    }

    return {
      status: 1,
    };
  }
  async rollback(
    transactionId: string,
    options?: { modelOrder: string[] }
  ): Promise<TPipeResponse> {
    try {
      let models = this.processingTransactions.getAffectedModels(transactionId);
      if (options && options.modelOrder) {
        if (options.modelOrder.length === models.length) {
          models = options.modelOrder;
        } else {
          return {
            status: 0,
            errorMessage: "Models' order should cover all affected models",
          };
        }
      }

      for (let i = 0; i < models.length; i++) {
        try {
          this.processingTransactions.rollback(transactionId, models[i]);
        } catch (e) {
          return {
            status: 0,
            errorMessage: e.message,
          };
        }
      }

      return {
        status: 1,
      };
    } catch (e) {
      return { status: 0, errorMessage: e.message };
    }
  }
}
