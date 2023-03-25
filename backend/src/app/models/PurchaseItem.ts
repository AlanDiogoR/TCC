import { model, Schema } from 'mongoose';

export const PurchaseItem = model('PurchaseItem', new Schema({
  products: {
    required: true,
    type: [{
      product: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Product',
      },
      quantity: {
        type: Number,
        default: 1,
      },
    }],
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
