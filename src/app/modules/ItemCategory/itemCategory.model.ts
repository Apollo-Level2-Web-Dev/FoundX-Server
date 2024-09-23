import { Schema, model } from 'mongoose';
import {
  ItemCategoryDocument,
  ItemCategoryModel,
} from './itemCategory.interface';

// Define the schema
const ItemCategorySchema = new Schema<ItemCategoryDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    postCount: {
      type: Number,
      default: 0,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const ItemCategory = model<ItemCategoryDocument, ItemCategoryModel>(
  'ItemCategory',
  ItemCategorySchema
);
