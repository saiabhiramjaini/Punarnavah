import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { z } from 'zod'
import { ContributionSchema, UploadContributionSchema } from "@abhiram2k03/punarnavah-common";

const prisma = new PrismaClient();

export const contribute = async (req: Request, res: Response) => {
    try {
       const { mobile, address, city, state, pincode, quantity } = req.body;

       const { wasteRequestId } = req.params;
       
       const userId = req.cookies.userId;

       const validateContribute = UploadContributionSchema.parse({
            mobile,
            address,
            city,
            state,
            pincode,
            quantity,
            wasteRequestId,
            userId
       })

       const newContribute = await prisma.contribution.create({
            data: {
                mobile: validateContribute.mobile,
                address: validateContribute.address,
                city: validateContribute.city,
                state: validateContribute.state,
                pincode: validateContribute.pincode,
                quantity: validateContribute.quantity,
                wasteRequestId: validateContribute.wasteRequestId,
                userId: validateContribute.userId!
            }
       })

       return res.status(201).json({
            message: "Contribution added successfully!!",
            newContribute
       })
    }
    catch (error: any) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                message: "Validation Error",
                errors: error.errors
            });
        }
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
}

export const getContributionsById = async (req: Request, res: Response) => {
    try {
       const { wasteRequestId } = req.params;

       const contributions = await prisma.wasteRequest.findFirst({
            where: {
                id: wasteRequestId
            },
       })

       const validateContribute = ContributionSchema.parse({
            contributions    
       })

       return res.status(200).json({
            message: "Your Contributions are",
            validateContribute
       })


    }
    catch (error: any) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                message: "Validation Error",
                errors: error.errors
            });
        }
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
}
