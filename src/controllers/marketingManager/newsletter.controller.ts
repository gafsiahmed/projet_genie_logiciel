import sgMail from "@sendgrid/mail";
import * as dotenv from "dotenv";
import { Request, Response } from "express";
import Newsletter from "../../models/NewsLetter";
dotenv.config();

//setting the key of sendgrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

// get newsletters list
export const getNewsletters = async (req: Request, res: Response) => {
  try {
    const newsletters = await Newsletter.find();
    res.status(200).json(newsletters);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

// create newsletter
export const createNewsletter = async (req: Request, res: Response) => {
  const newsletter = req.body;
  const newNewsletter = new Newsletter(newsletter);
  try {
    await newNewsletter.save();
    res.status(201).json(newNewsletter);
  } catch (error) {
    res.status(409).json({ message: error });
  }
};

// get newsletter by id
export const getNewsletterById = async (req: Request, res: Response) => {
  try {
    const newsletter = await Newsletter.findById(req.params.id);
    res.status(200).json(newsletter);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

// update newsletter by id
export const updateNewsletterById = async (req: Request, res: Response) => {
  try {
    const newsletter = await Newsletter.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(newsletter);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

// delete newsletter by id
export const deleteNewsletterById = async (req: Request, res: Response) => {
  try {
    const newsletter = await Newsletter.findByIdAndDelete(req.params.id);
    res.status(200).json(newsletter);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

// diffuse newsletter by id
// Fix email parameters with proper typing
interface NewsletterEmail {
  to: string;
  from: string;
  subject: string;
  html: string;
}

export const diffuseNewsletterById = async (req: Request, res: Response) => {
  const newsletterId = req.params.id;
  const newsletter = await Newsletter.findById(newsletterId);

  if (!newsletter) {
    return res.status(404).json({ message: "Newsletter not found" });
  }

  const { object, content, subscribersList } = newsletter;

  try {
    const sendNewsletterEmail = async (to: string) => {
      const msg = {
        to: subscribersList as string,
        from: "selimbarka6@gmail.com",
        subject: object,
        html: `${content}`,
      };

      await sgMail.send(msg as NewsletterEmail);
    };

    // send email with the request email
    await sendNewsletterEmail(subscribersList as string);
    return res.status(200).json({
      message: "Newsletter diffused successfully to our subscribers ",
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
