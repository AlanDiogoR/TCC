import { model, Schema } from 'mongoose';

export const PurchaseItem = model('PurchaseItem', new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  value: {
    type: Number,
    required: true,
  },
  productId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Product',
  },
  PurchaseId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Purchase',
  }
}));
