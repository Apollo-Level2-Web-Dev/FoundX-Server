import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ItemCategoryServices } from './itemCategory.service';

const createItemCategory = catchAsync(async (req, res) => {
  const itemCategory = await ItemCategoryServices.createItemCategory(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Item Category Created Successfully',
    data: itemCategory,
  });
});

const getAllItemCategories = catchAsync(async (req, res) => {
  const itemCategory = await ItemCategoryServices.getAllItemCategories(
    req.query
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Item Category Retrieved Successfully',
    data: itemCategory,
  });
});

const getItemCategoryById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const itemCategory = await ItemCategoryServices.getItemCategoryById(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Item Category Retrieved Successfully',
    data: itemCategory,
  });
});

const updateItemCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const itemCategory = await ItemCategoryServices.updateItemCategory(
    id,
    req.body
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Item Category updated successfully',
    data: itemCategory,
  });
});

const deleteItemCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const itemCategory = await ItemCategoryServices.deleteItemCategory(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Item Category Deleted Successfully',
    data: itemCategory,
  });
});

export const ItemCategoryControllers = {
  createItemCategory,
  getAllItemCategories,
  getItemCategoryById,
  updateItemCategory,
  deleteItemCategory,
};
