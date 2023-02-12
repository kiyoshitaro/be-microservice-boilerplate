import { TPipeResponse } from './types';

export interface ITransactionPipe {
  /**
   * voting
   */
  vote(): Promise<boolean>;

  /**
   * start transaction
   */
  startTransaction(
    transactionId: string,
    affectedIds: string[]
  ): Promise<TPipeResponse>;

  /**
   * commit the selected transaction
   */
  commit(
    transactionId: string,
    options?: { modelOrder: string[] }
  ): Promise<TPipeResponse>;

  /**
   * rollback the selected transaction
   */
  rollback(
    transactionId: string,
    options?: { modelOrder: string[] }
  ): Promise<TPipeResponse>;
}
