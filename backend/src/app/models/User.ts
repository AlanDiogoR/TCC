import { model, Schema } from 'mongoose';

export const User = model('User', new Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  adressId: {
    type: Schema.Types.ObjectId,
    ref: 'Address',
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
}));
