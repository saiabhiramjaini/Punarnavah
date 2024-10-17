import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { forgotPasswordSchema, resetPasswordSchema, signinSchema, signupSchema } from "@abhiram2k03/punarnavah-common";
import { sendEmail } from "../utils/email"
import { AuthenticatedRequest } from "../utils/types";

const prisma = new PrismaClient();

export const signup = async (req: Request, res: Response)=>{
    try{
        const {username, email, password, cPassword} = signupSchema.parse(req.body);

        if (password !== cPassword) {
            return res.json({ msg: "Passwords do not match" });
        }

        const user = await prisma.user.findFirst({ 
            where: {
                email
            }
        })
        if(user){
            return res.json({msg: "User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const saveUser = await prisma.user.create({
            data:{
                username,
                email,
                password: hashedPassword
            }
        })

        const token = jwt.sign({ userId: saveUser.id }, process.env.JWT_SECRET!, { expiresIn: "1d" });
        res.cookie('token', token, { httpOnly: true });
        
        return res.json({msg: "User created Successfully"})
    }
    catch (error: any) {
        if (error.errors && error.errors[0].message) {
          const message = error.errors[0].message;
          return res.json({ msg: message });
        }
        console.error(error); 
        return res.json({ msg: "Internal Server Error" });
    }
}

export const signin = async (req: Request, res: Response)=>{
    try{
        const {email, password} = signinSchema.parse(req.body);

        const user = await prisma.user.findFirst({ 
            where: {
                email
            }
        })

        if(!user){
            return res.json({msg: "Email doesn't exist"});
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch){
            return res.json({msg: "Invalid Credentials"});
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!);
        res.cookie('token', token, { httpOnly: true });
        return res.json({msg: "Signin successful"})
    }
    catch (error: any) {
        if (error.errors && error.errors[0].message) {
          const message = error.errors[0].message;
          return res.json({ msg: message });
        }
        console.error(error);
        return res.json({ msg: "Internal Server Error" });
    }
}


export const forgotPassword = async(req: Request, res:Response)=>{
    try{
        const {email} = forgotPasswordSchema.parse(req.body);

        const existingUser = await prisma.user.findFirst({
            where:{
                email
            }
        })

        if(!existingUser){
            return res.json({msg: "User not found"})
        }

        const token = jwt.sign({ userId: existingUser.id }, process.env.JWT_SECRET!, { expiresIn: "1d" });
        res.cookie('token', token, { httpOnly: true });

        const text = `${process.env.CLIENT_URL}/resetPassword/${token}`;
        const emailResult = await sendEmail(email, "Reset password", text);

        if (emailResult.success) {
            return res.json({ msg: "Email sent successfully" });
        } else {
            return res.json({ msg: emailResult.error });
        }
    }
    catch (error: any) {
        if (error.errors && error.errors[0].message) {
          const message = error.errors[0].message;
          return res.json({ msg: message });
        }
      
        console.error(error); 
        return res.json({ msg: "Internal Server Error" });
    }
}

export const profile = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const user = req.user;
      if (!user) {
        return res.status(401).json({ msg: 'Unauthorized' });
      }
      return res.json({ username: user.username, email: user.email });
    } catch (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).json({ msg: 'Server error' });
    }
};


export const resetPassword = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { password, cPassword } = resetPasswordSchema.parse(req.body);
    const user = req.user;

    if (!user) {
      return res.status(401).json({ msg: 'Unauthorized' });
    }

    if (password !== cPassword) {
      return res.json({ msg: "Passwords do not match" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({ where: { id: user.id }, data: { password: hashedPassword } });
    const updatedUser = await prisma.user.findUnique({ where: { id: user.id } });

    return res.json({ msg: 'Password updated successfully', user: updatedUser });
  } catch (error: any) {
    if (error.errors && error.errors[0].message) {
      const message = error.errors[0].message;
      return res.json({ msg: message });
    }
    console.error(error);
    return res.json({ msg: "Internal Server Error" });
  }
};


export const logout = async(req: Request, res: Response)=>{
    res.clearCookie('token');
    return res.json({ msg: "Logged out successfully" });
}