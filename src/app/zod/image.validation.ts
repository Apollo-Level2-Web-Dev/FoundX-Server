import { z } from 'zod';

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
const ACCEPTED_FILE_TYPES = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'png',
  'jpeg',
  'jpg',
] as const;

const ImageFileZodSchema = z.object({
  fieldname: z.string(),
  originalname: z.string(),
  encoding: z.string(),
  mimetype: z.enum(ACCEPTED_FILE_TYPES),
  path: z.string(),
  size: z
    .number()
    .refine(
      (size) => size <= MAX_UPLOAD_SIZE,
      'File size must be less than 3MB'
    ),
  filename: z.string(),
});

export const ImageFilesArrayZodSchema = z.object({
  files: z.record(z.string(), z.array(ImageFileZodSchema)).refine((files) => {
    return Object.keys(files).length > 0;
  }, 'Image is required'),
});
