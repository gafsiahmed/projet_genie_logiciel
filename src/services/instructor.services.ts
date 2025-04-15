import sgMail from "@sendgrid/mail";
import bycrypt from "bcryptjs";
import Instructor from "../models/Instructor";

type CreateInstructorArgs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  phoneNumber: string;
  training: string;
};

export const addInstructor = async (args: CreateInstructorArgs) => {
  const hashedPassword = await bycrypt.hash(args.password, 10);
  const createdInstructor = await Instructor.create({
    ...args,
    password: hashedPassword,
  });

  // how to create a system that send an email to the new user created with send grid
  const msg = {
    to: args.email,
    from: "selimbarka6@gmail.com",
    subject: "Welcome to OpusBoard  ",
    text: "Welcome to OpusBoard Instructor ",
    html: `
        <style>
        h1{
            color: #0d6efd;
            }
            p{
            color: #0d6efd;
            }

        </style>
        <h1>Welcome to OpusBoard</h1>
        <br/>
        <p>your email is <strong>${args.email} </strong></p>
        <p>your password is  <strong>${args.password}</strong></p>
        <br/>
        <p>If there is any problem please contact the admin 
        on : tkdsayed@gmail.com 
        </p>
        <p>Thank you for using OpusBoard</p>
            
        `,
  };
  console.log(msg);

  await sgMail.send(msg);

  return createdInstructor;
};

export const getInstructor = async (instructorId: string) => {
  return await Instructor.findById(instructorId);
};

export const deleteInstructors = async (instructorId: string) => {
  return await Instructor.findByIdAndDelete(instructorId);
};

export const getInstructors = async () => {
  return await Instructor.find({ role: "instructor" });
};

export const updateInstructors = async (
  instructorId: string,
  args: CreateInstructorArgs
) => {
  const hashedPassword = await bycrypt.hash(args.password, 10);
  return await Instructor.findByIdAndUpdate(instructorId, {
    ...args,
    password: hashedPassword,
  });
};
