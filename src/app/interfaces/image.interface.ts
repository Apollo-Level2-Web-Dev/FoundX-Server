import { Express } from 'express';

export type TImageFiles = { [fieldname: string]: Express.Multer.File[] };

export type TImageFile = {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    path: string;
    size: number;
    filename: string;
};