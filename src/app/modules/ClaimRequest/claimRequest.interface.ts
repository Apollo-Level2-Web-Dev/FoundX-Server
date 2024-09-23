import { ObjectId } from 'mongoose';
import { CLAIM_REQUEST_STATUS } from './claimRequest.constant';

export type TAnswers = {
  question: string;
  answer: string;
};

export interface IItem {
  _id: ObjectId;
  title: string;
  user: ObjectId; // Assuming this is a reference to the user who owns the item
}

export interface IUser {
  _id: ObjectId;
  name: string;
  email: string;
}

export type TClaimRequest = {
  item: IItem | ObjectId;
  claimant: IUser | ObjectId;
  status: keyof typeof CLAIM_REQUEST_STATUS;
  description: string;
  answers?: TAnswers[];
  feedback?: string;
  createdAt?: Date;
  updatedAt?: Date;
};