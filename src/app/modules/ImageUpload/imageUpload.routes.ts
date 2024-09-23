import express from 'express';
import { multerUpload } from '../../config/multer.config';
import { ImageUploadController } from './imageUpload.controller';

const router = express.Router();


router.post(
    '/',
    multerUpload.single('photo'),
    ImageUploadController.uploadImage
)

export const ImageUploadRoutes = router;
