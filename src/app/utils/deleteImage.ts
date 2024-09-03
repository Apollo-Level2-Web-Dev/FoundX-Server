import { cloudinaryUpload } from '../config/cloudinary.config';
import { TImageFiles } from '../interfaces/image.interface';

export const deleteImageFromCloudinary = (files: TImageFiles) => {
  const publicIds: string[] = [];

  for (const file of Object.values(files)) {
    for (const image of file) {
      publicIds.push(image.filename);
    }
  }

  return new Promise((resolve, reject) => {
    cloudinaryUpload.api.delete_resources(
      publicIds,
      { resource_type: 'image' },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};
