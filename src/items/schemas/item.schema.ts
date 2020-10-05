import * as mongoose from 'mongoose';
import { ItemStatus } from '../interfaces/item.interface';

export const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  quantity: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: [ItemStatus.OPEN, ItemStatus.PROCESSING, ItemStatus.DONE],
    default: ItemStatus.OPEN,
  },
});
