import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import Handlebars from 'handlebars';
import nodemailer from 'nodemailer';
import config from '../config';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';

const ReadFile = promisify(fs.readFile);

const sendEmail = async (email: string, html: string, subject: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: config.sender_email,
      pass: config.sender_app_password,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  await transporter.sendMail({
    from: '"FoundX" <fahimfiroz.ph@gmail.com>', // sender address
    to: email, // list of receivers
    subject, // Subject line.
    //text: "Hello world?", // plain text body
    html, // html body
  });
};

const createEmailContent = async (data: object, templateType: string) => {
  try {
    const templatePath = path.join(
      process.cwd(),
      `src/views/${templateType}.template.hbs`
    );
    const content = await ReadFile(templatePath, 'utf8');

    const template = Handlebars.compile(content);

    return template(data);
  } catch (error) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      (error as Error).message
    );
  }
};

export const EmailHelper = {
  sendEmail,
  createEmailContent,
};
