import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TImageFile } from "../../interfaces/image.interface";


const uploadImage = async (
    photo: TImageFile
) => {
    if (!photo) {
        throw new AppError(httpStatus.BAD_REQUEST, "No photo provided for upload");
    };

    return {
        filename: photo.originalname,
        path: photo.path,
        size: photo.size
    };
};

export const ImageUploadServices = {
    uploadImage
}