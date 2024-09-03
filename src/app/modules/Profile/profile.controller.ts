import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { ProfileServices } from "./profile.service";
import { TImageFile } from "../../interfaces/image.interface";

const getMyProfile = catchAsync(async (req: Request, res: Response) => {
    const user = req.user;
    const result = await ProfileServices.getMyProfile(user);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'My Profile Retrive Successfully',
        data: result,
    });
});

const updateMyProfile = catchAsync(async (req, res) => {

    const result = await ProfileServices.updateMyProfile(
        req.user,
        req.body,
        req.file as TImageFile
    );

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Profile updated successfully',
        data: result,
    });
});

export const ProfileController = {
    getMyProfile,
    updateMyProfile
}