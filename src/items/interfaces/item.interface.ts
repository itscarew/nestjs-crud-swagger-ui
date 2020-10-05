import { Document } from 'mongoose';

export interface Item extends Document {
  readonly id?: string;
  readonly name: string;
  readonly description?: string;
  readonly quantity: number;
  readonly createdAt?: Date;
  readonly status: ItemStatus;
}

export enum ItemStatus {
  OPEN = 'OPEN',
  PROCESSING = 'PROCESSING',
  DONE = 'DONE',
}
