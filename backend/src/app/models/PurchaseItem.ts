import { model, Schema } from 'mongoose';

export const PurchaseItem = model('PurchaseItem', new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  productId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Product',
  },
}));
