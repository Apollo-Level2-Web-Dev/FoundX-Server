import express from 'express';
import { ItemCategoryControllers } from './itemCategory.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { ItemCategoryValidation } from './itemCategory.validation';

const router = express.Router();

router.get('/', ItemCategoryControllers.getAllItemCategories);

router.get('/:id', ItemCategoryControllers.getItemCategoryById);

router.post(
  '/',
  auth(USER_ROLE.ADMIN),
  validateRequest(ItemCategoryValidation.createItemCategoryValidationSchema),
  ItemCategoryControllers.createItemCategory
);

router.put(
  '/:id',
  auth(USER_ROLE.ADMIN),
  validateRequest(ItemCategoryValidation.updateItemCategoryValidationSchema),
  ItemCategoryControllers.updateItemCategory
);

router.delete(
  '/:id',
  auth(USER_ROLE.ADMIN),
  ItemCategoryControllers.deleteItemCategory
);

export const ItemCategoryRoutes = router;
