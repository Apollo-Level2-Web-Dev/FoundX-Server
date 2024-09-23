import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { TImageFile } from '../../interfaces/image.interface';
import { ImageUploadServices } from './imageUpload.service';

const uploadImage = catchAsync(async (req: Request, res: Response) => {

    const result = await ImageUploadServices.uploadImage(
        req.file as TImageFile
    );

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Photo uploaded successfully',
        data: result
    });
});

export const ImageUploadController = {
    uploadImage,
};
