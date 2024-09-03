import mongoose from 'mongoose';
import { z } from 'zod';
import { CLAIM_REQUEST_STATUS } from './claimRequest.constant';

const createClaimRequestValidationSchema = z.object({
  body: z.object({
    item: z
      .string({
        required_error: 'Item is required',
      })
      .refine((val) => {
        return mongoose.Types.ObjectId.isValid(val);
      }),
    answers: z.array(
      z.string({
        required_error: 'Answer is required',
      })
    ),
    description: z.string({
      required_error: 'Description is required',
    }),
    status: z
      .nativeEnum(CLAIM_REQUEST_STATUS)
      .default(CLAIM_REQUEST_STATUS.PENDING),
  }),
});

const updateClaimRequestValidationSchema = z.object({
  body: z.object({
    description: z
      .string({
        required_error: 'Description is required',
      })
      .optional(),
    status: z.nativeEnum(CLAIM_REQUEST_STATUS).optional(),
    answers: z
      .array(
        z.object({
          user: z
            .string({
              required_error: 'User is required',
            })
            .refine((val) => {
              return mongoose.Types.ObjectId.isValid(val);
            }),
          question: z.string({
            required_error: 'Question is required',
          }),
          answer: z.string({
            required_error: 'Answer is required',
          }),
        })
      )
      .optional(),
  }),
});

const updateClaimRequestStatusWithFeedbackSchema = z.object({
  body: z.object({
    feedback: z
      .string({
        required_error: 'Feedback is required',
      })
      .optional(),
    status: z.nativeEnum(CLAIM_REQUEST_STATUS)
  }),
});


export const ClaimRequestValidation = {
  createClaimRequestValidationSchema,
  updateClaimRequestValidationSchema,
  updateClaimRequestStatusWithFeedbackSchema
};
