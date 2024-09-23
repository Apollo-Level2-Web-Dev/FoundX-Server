import mongoose from 'mongoose';
import { z } from 'zod';
import { DISTRICTS, ITEM_STATUS } from './item.constant';

const createItemValidationSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    description: z.string({
      required_error: 'Description is required',
    }),
    image: z.string().optional(),
    location: z.string({
      required_error: 'Location is required',
    }),
    city: z.enum(DISTRICTS, {
      required_error: 'City is required',
    }),
    dateFound: z.string({ message: 'Date found is required' }).refine((val) => {
      return new Date(val).toString() !== 'Invalid Date';
    }),
    status: z.nativeEnum(ITEM_STATUS).default(ITEM_STATUS.AVAILABLE),
    isReported: z.boolean().optional(),
    reportCount: z.number().optional(),
    user: z
      .string({
        required_error: 'User is required',
      })
      .refine((val) => {
        return mongoose.Types.ObjectId.isValid(val);
      }),
    category: z
      .string({
        required_error: 'Category is required',
      })
      .refine((val) => {
        return mongoose.Types.ObjectId.isValid(val);
      }),
    questions: z.array(z.string()).optional(),
  }),
});

const updateItemValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    location: z.string().optional(),
    city: z.enum(DISTRICTS).optional(),
    dateFound: z.date().optional(),
    status: z.nativeEnum(ITEM_STATUS).optional(),
    isReported: z.boolean().optional(),
    reportCount: z.number().optional(),
    user: z
      .string()
      .refine((val) => {
        return mongoose.Types.ObjectId.isValid(val);
      })
      .optional(),
    category: z
      .string()
      .refine((val) => {
        return mongoose.Types.ObjectId.isValid(val);
      })
      .optional(),
    questions: z.array(z.string()).optional(),
  }),
});

export const ItemValidation = {
  createItemValidationSchema,
  updateItemValidationSchema,
};
