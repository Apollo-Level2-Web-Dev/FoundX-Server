import { Document, Model } from 'mongoose';

// Interface for the ItemCategory document
export interface ItemCategoryDocument extends Document {
  name: string;
  postCount: number;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Type for the input data when creating/updating a category
export type TItemCategory = {
  name: string;
  postCount?: number;
  isDeleted?: boolean;
};

// Interface for the ItemCategory model (if no static methods)
export type ItemCategoryModel = Model<ItemCategoryDocument>;
