import { z } from 'zod';

const createItemCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
  }),
});

const updateItemCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
  }),
});

export const ItemCategoryValidation = {
  createItemCategoryValidationSchema,
  updateItemCategoryValidationSchema,
};
