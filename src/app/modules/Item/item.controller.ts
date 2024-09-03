import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TImageFiles } from '../../interfaces/image.interface';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ItemServices } from './item.service';

const createItem = catchAsync(async (req, res) => {
  if (!req.files) {
    throw new AppError(400, 'Please upload an image');
  }

  const item = await ItemServices.createItemIntoDB(
    req.body,
    req.files as TImageFiles
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Item created successfully',
    data: item,
  });
});

const getAllItems = catchAsync(async (req, res) => {
  const item = await ItemServices.getAllItemsFromDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Item retrieved successfully',
    data: item,
  });
});

const getItem = catchAsync(async (req, res) => {
  const itemId = req.params.id;
  const item = await ItemServices.getItemFromDB(itemId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Item retrieved successfully',
    data: item,
  });
});

const updateItem = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updatedItem = await ItemServices.updateItemInDB(id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Item updated successfully',
    data: updatedItem,
  });
});

const deleteItem = catchAsync(async (req, res) => {
  const { id } = req.params;
  await ItemServices.deleteItemFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Item deleted successfully',
    data: null,
  });
});

export const ItemControllers = {
  createItem,
  getAllItems,
  getItem,
  updateItem,
  deleteItem,
};
