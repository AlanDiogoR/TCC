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
  createAt: {
    type: Number,
    required: true,
  },
}));
