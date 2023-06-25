import { model, Schema } from 'mongoose';

export const Purchase = model('Purchase', new Schema({
  value: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: [
      'SELECTING', 'PACKING', 'SENT'
    ],
    default: 'SELECTING',
  },
  date: {
    type: Date,
    required: Date.now,
  },
  addressId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Address',
  }
}));
