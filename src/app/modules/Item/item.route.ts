import express from 'express';
import { multerUpload } from '../../config/multer.config';
import { parseBody } from '../../middlewares/bodyParser';
import validateImageFileRequest from '../../middlewares/validateImageFileRequest';
import validateRequest from '../../middlewares/validateRequest';
import { ImageFilesArrayZodSchema } from '../../zod/image.validation';
import { ItemControllers } from './item.controller';
import { ItemValidation } from './item.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.USER),
  multerUpload.fields([{ name: 'itemImages' }]),
  validateImageFileRequest(ImageFilesArrayZodSchema),
  parseBody,
  validateRequest(ItemValidation.createItemValidationSchema),
  ItemControllers.createItem
);

router.get('/', ItemControllers.getAllItems);

router.get('/:id', ItemControllers.getItem);

router.put(
  '/:id',
  auth(USER_ROLE.USER),
  validateRequest(ItemValidation.updateItemValidationSchema),
  ItemControllers.updateItem
);

router.delete('/:id', auth(USER_ROLE.USER), ItemControllers.deleteItem);

export const ItemRoutes = router;
