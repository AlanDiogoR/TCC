import { model, Schema } from 'mongoose';

export const Product = model('Product', new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  imagePath: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },

  category: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Category',
  },
}));
