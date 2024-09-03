import { Schema, model } from 'mongoose';
import { DISTRICTS, ITEM_STATUS } from './item.constant';
import { TItem } from './item.interface';
import { ItemCategory } from '../ItemCategory/itemCategory.model';

const itemSchema = new Schema<TItem>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },
    location: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      enum: DISTRICTS,
      required: true,
    },
    dateFound: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: Object.keys(ITEM_STATUS),
      required: true,
    },
    isReported: {
      type: Boolean,
      default: false,
    },
    reportCount: {
      type: Number,
      default: 0,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'ItemCategory',
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    questions: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
    virtuals: true,
  }
);

// Middleware to increment item count in associated category
itemSchema.post('save', async function (doc) {
  try {
    await ItemCategory.findByIdAndUpdate(doc.category, {
      $inc: { postCount: 1 },
    });
  } catch (error) {
    throw new Error(
      `Failed to increment item count for category ${doc.category}: ${error}`
    );
  }
});

export const Item = model<TItem>('Item', itemSchema);
