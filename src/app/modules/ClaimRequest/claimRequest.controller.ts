import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ClaimRequestServices } from './claimRequest.service';

const createClaimRequest = catchAsync(async (req, res) => {
  const result = await ClaimRequestServices.createClaimRequest(
    req.body,
    req.user
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Claim Request Submitted Successfully!',
    data: result,
  });
});

const viewReceivedClaimRequests = catchAsync(async (req, res) => {
  const result = await ClaimRequestServices.viewReceivedClaimRequests(
    req.query,
    req.user
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Claim request retrieved successfully',
    data: result,
  });
});

const viewMyClaimRequests = catchAsync(async (req, res) => {
  const result = await ClaimRequestServices.viewMyClaimRequests(
    req.query,
    req.user
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Claim request retrieved successfully',
    data: result,
  });
});

const getClaimRequestById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ClaimRequestServices.getClaimRequestById(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Claim request retrieved successfully',
    data: result,
  });
});

const updateStatusWithFeedback = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ClaimRequestServices.updateStatusWithFeedback(
    id,
    req.body,
    req.user
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Claim request updated successfully',
    data: result,
  });
});

export const ClaimRequestControllers = {
  createClaimRequest,
  viewReceivedClaimRequests,
  viewMyClaimRequests,
  getClaimRequestById,
  updateStatusWithFeedback,
};
