import sgMail from "@sendgrid/mail";
import * as dotenv from "dotenv";
import { Request, Response } from "express";
import Student from "../../models/Student";
dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export const sendAnnonceMail = async (req: Request, res: Response) => {
  const { email, object, Message } = req.body;
  console.log(email);

  const user = await Student.find({ email });

  if (!user) {
    return res.status(400).json({ message: "Adresse email invalide" });
  }
  const emails = email.split(",");
  console.log(emails);

  try {
    const sendAnnonceEmail = async (to: string) => {
      const msg = {
        to: emails,
        from: "selimbarka6@gmail.com",
        subject: object,
        html: `${Message}`,
      };

      await sgMail.send(msg);
    };

    // send emmail with the request email
    await sendAnnonceEmail(email);
    return res.status(200).json({
      message: "Check your e-mail ",
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
