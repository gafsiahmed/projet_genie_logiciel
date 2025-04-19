import bycrypt from "bcryptjs";
import sgMail from "@sendgrid/mail";
import User from "../models/User";

type CreateUserArgs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  phoneNumber: string;
};

export const addUser = async (args: CreateUserArgs) => {
  //validating the args passed to the function
  const hashedPassword = await bycrypt.hash(args.password, 10);
  const createdUser = await User.create({
    ...args,
    password: hashedPassword,
  });

  const msg = {
    to: args.email,
    from: "selimbarka6@gmail.com",
    subject: "Welcome to OpusBoard",
    text: "Welcome to OpusBoard",
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
    on : tkdsayed@gmail.com  </p>
    <p>Thank you for using OpusBoard</p>

    
    `,
  };
  console.log(msg);

  await sgMail.send(msg);

  return createdUser;
};

// The get user service takes the id of a user as an argument and return that user
export const getUser = async (userId: string) => {
  return await User.findById(userId);
};

// the delete user service takes the id of a user and delete it and return the deleted user
export const deleteUser = async (userId: string) => {
  return await User.findByIdAndDelete(userId);
};

// het all users service
export const getUsers = async () => {
  return await User.find();
};

// update user service
export const updateUser = async (userId: string, args: any) => {
  const hashedPassword = await bycrypt.hash(args.password, 10);
  args.password = hashedPassword;
  return await User.findByIdAndUpdate(userId, args, { new: true });
};

// type GenerateTokenArgs = {
//   userId: string;
//   role: string;
// };

// export const generateToken = async (args: GenerateTokenArgs) => {
//   return jwt.sign(
//     args,
//     config.jwt.accessTokenSecret as string,

//     //write the expire time
//     { expiresIn: 60 }
//   );
// };
