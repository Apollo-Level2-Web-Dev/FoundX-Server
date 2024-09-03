import httpStatus from 'http-status';
import { QueryBuilder } from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { itemCategorySearchableFields } from './itemCategory.constant';
import { ItemCategoryDocument, TItemCategory } from './itemCategory.interface';
import { ItemCategory } from './itemCategory.model';

const createItemCategory = async (itemCategory: TItemCategory) => {
  const result = await ItemCategory.create(itemCategory);
  return result;
};

const getAllItemCategories = async (query: Record<string, unknown>) => {
  const items = new QueryBuilder(ItemCategory.find({ isDeleted: false }), query)
    .search(itemCategorySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await items.modelQuery;
  return result;
};

const getItemCategoryById = async (
  categoryId: string
): Promise<ItemCategoryDocument | null> => {
  const isCategoryExists = await ItemCategory.findOne({
    _id: categoryId,
    isDeleted: false,
  });

  if (!isCategoryExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Item Category not found!');
  }

  const category = await ItemCategory.findOne({
    _id: categoryId,
    isDeleted: false,
  }).exec();
  return category;
};

const updateItemCategory = async (
  id: string,
  updateData: Partial<TItemCategory>
) => {
  const isCategoryExists = await ItemCategory.findOne({
    _id: id,
    isDeleted: false,
  });

  if (!isCategoryExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Item Category not found!');
  }

  const category = await ItemCategory.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  return category;
};

const deleteItemCategory = async (id: string) => {
  const isCategoryExists = await ItemCategory.findOne({
    _id: id,
    isDeleted: false,
  });
  if (!isCategoryExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Item Category not found!');
  }

  const category = await ItemCategory.findByIdAndDelete(id);
  return category;
};

export const ItemCategoryServices = {
  createItemCategory,
  getAllItemCategories,
  getItemCategoryById,
  updateItemCategory,
  deleteItemCategory,
};
