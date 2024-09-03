import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Item } from '../Item/item.model';
import { IItem, IUser, TAnswers, TClaimRequest } from './claimRequest.interface';
import { JwtPayload } from 'jsonwebtoken';
import { ClaimRequest } from './claimRequest.model';
import { QueryBuilder } from '../../builder/QueryBuilder';
import { CLAIM_REQUEST_STATUS } from './claimRequest.constant';
import { EmailHelper } from '../../utils/emailSender';

const createClaimRequest = async (payload: TClaimRequest, user: JwtPayload) => {
  const item = await Item.findById(payload.item);

  if (!item) {
    throw new AppError(httpStatus.NOT_FOUND, 'Item not found!');
  }

  if (item.user.toString() === user._id) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Since you found the item,so you are not able to claim it'
    );
  }

  const isClaimRequestExists = await ClaimRequest.findOne({
    item: item._id,
    claimant: user._id,
  });

  if (isClaimRequestExists) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'You already create a claim request!'
    );
  }

  let questionAnswers: TAnswers[] = [];

  if (item.questions?.length) {
    questionAnswers = item.questions.map((question, index) => {
      return {
        question: question,
        answer: payload.answers?.length
          ? (payload.answers[index] as unknown as string)
          : '',
      };
    });
  }

  const result = await ClaimRequest.create({
    item: payload.item,
    claimant: user._id,
    description: payload.description,
    answers: questionAnswers,
  });
  return result;
};

const viewReceivedClaimRequests = async (
  query: Record<string, unknown>,
  user: JwtPayload
) => {
  // user._id = "64ecf4f2b95e9b54a5c9e5f9"
  const items = await Item.find({ user: user._id }).select('_id').exec();

  if (!items) {
    throw new AppError(httpStatus.NOT_FOUND, 'No item found!');
  }
  const itemIds = items.map((item) => item._id);

  const itemQuery = new QueryBuilder(
    ClaimRequest.find({ item: { $in: itemIds } })
      .populate('claimant')
      .populate('item'),
    query
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await itemQuery.modelQuery;

  return result;
};

const viewMyClaimRequests = async (
  query: Record<string, unknown>,
  user: JwtPayload
) => {
  // user._id = "64ecf4f2b95e9b54a5c9e5f9"

  const itemQuery = new QueryBuilder(
    ClaimRequest.find({ claimant: user._id }).populate('item'),
    query
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await itemQuery.modelQuery;

  return result;
};

const getClaimRequestById = async (id: string) => {
  const result = await ClaimRequest.findById(id)
    .populate('item')
    .populate('claimant');
  return result;
};

const updateStatusWithFeedback = async (
  id: string,
  payload: { status: string; feedback: string },
  user: JwtPayload
) => {
  const claimRequest = await ClaimRequest.findById(id).populate('item');
  if (!claimRequest) {
    throw new AppError(httpStatus.NOT_FOUND, 'Claim request not found!');
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  if (claimRequest?.item.user != user._id) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'You have no permission to update!'
    );
  }

  const result = await ClaimRequest.findByIdAndUpdate(id, payload, {
    new: true,
  }).populate('item').populate('claimant');

  const populatedItem = result?.item as IItem;
  const populatedClaimant = result?.claimant as IUser;

  const emailData = {
    recipient_name: populatedClaimant.name,
    item_name: populatedItem.title,
    feedback: result?.feedback,
    isApproved: result?.status === CLAIM_REQUEST_STATUS.APPROVED
  }

  const emailTemplate = await EmailHelper.createEmailContent(emailData, 'claimNotification');
  await EmailHelper.sendEmail(
    populatedClaimant.email,
    emailTemplate,
    `Your claim request is ${result?.status}!`
  );

  return result;
};

export const ClaimRequestServices = {
  createClaimRequest,
  viewReceivedClaimRequests,
  viewMyClaimRequests,
  getClaimRequestById,
  updateStatusWithFeedback,
};
