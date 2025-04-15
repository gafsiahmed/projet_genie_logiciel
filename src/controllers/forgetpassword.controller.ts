import sgMail from "@sendgrid/mail";
import * as dotenv from "dotenv";
import { Request, Response } from "express";
import User from "../models/User";
import { saveData } from "../services/resetpassword.service";
import { updateUser } from "../services/user.services";
import { generateCode } from "../utils/constants";
import { userValidationForForgetPassword } from "../validation/user.validation";

import ForgetPassword from "../models/ForgetPassword";
import { FilterQuery } from 'mongoose';

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

// this function return an email with link after validation of email is exixting in schema
export const sendPasswordResetToken = async (req: Request, res: Response) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "Adresse email invalide" });
  }
  // creating a function to send reset password email to the ussers
  try {
    const sendResetPasswordEmail = async (
      to: string,
      resetPasswordLink: string
    ) => {
      const msg = {
        to: email,
        from: "selimbarka6@gmail.com",
        subject: "Réinitialisation de mot de passe",
        html: `
              <p>Vous avez demandé une réinitialisation de mot de passe.</p>
              <p>Cliquez sur le lien ci-dessous pour réinitialiser votre mot de passe :</p>
              <a href="${resetPasswordLink}">${resetPasswordLink}</a>
              <p>Ce lien expirera dans 1 heure.</p>
            `,
      };

      await sgMail.send(msg);
    };
    // generating a random code for the reset password link
    const token = generateCode();
    //save token code
    await saveData(user.id, token);

    // link contain the token code which is generated in utils/constants
    const resetPasswordLink = `http://localhost:3000/auth/resetpassword/${token} `;

    // send emmail with the request email and the link
    await sendResetPasswordEmail(email, resetPasswordLink);
    return res.status(200).json({
      message: "Check your e-mail , a link is sent",
      link: resetPasswordLink,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// function to reset password
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const token = req.params.token;
    console.log(token);

    const validUser = await ForgetPassword.findOne({ token });
    if (!validUser) {
      return res
        .status(400)
        .json({ message: "You are not authorised to acces this page " });
    }

    const userId = validUser?.userId;

    console.log(userId);
    const { error, value } = userValidationForForgetPassword.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    // check if the token is valid

    const user = await User.findOne(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found " });
    }

    const updateduser = await updateUser(user.id, value);

   
    if (updateduser) {
      await ForgetPassword.deleteOne({ _id: validUser._id });
    }

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
