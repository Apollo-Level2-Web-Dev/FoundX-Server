import { Schema, model } from 'mongoose';
import { TAnswers, TClaimRequest } from './claimRequest.interface';
import { CLAIM_REQUEST_STATUS } from './claimRequest.constant';

const answerSchema = new Schema<TAnswers>(
  {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    virtuals: true,
    _id: false,
  }
);

const claimRequestSchema = new Schema<TClaimRequest>(
  {
    item: {
      type: Schema.Types.ObjectId,
      ref: 'Item',
      required: true,
    },
    claimant: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    status: {
      type: String,
      enum: Object.keys(CLAIM_REQUEST_STATUS),
      default: 'PENDING',
    },
    description: {
      type: String,
      required: true,
    },
    answers: {
      type: [answerSchema],
      default: [],
    },
    feedback: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    virtuals: true,
  }
);

export const ClaimRequest = model<TClaimRequest>(
  'ClaimRequest',
  claimRequestSchema
);
