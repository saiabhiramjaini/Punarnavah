import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { UserSchema } from "@abhiram2k03/punarnavah-common";
import { z } from 'zod';

const prisma = new PrismaClient();


export const getUserInfo = async (req: Request, res: Response) => {
    try {
        const userId =  req.cookies.userId;

        const user = await prisma.user.findFirst({
            include: {
                wasteRequests: true,
                contributions: true,
                innovativeProducts: true,
                wasteReqOrders: true,
                innovativeProdOrders: true,
                bulkWasteOrders: true,
            },
            where: {
                id: userId
            },  
        })
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const validatedUserData = UserSchema.parse(user);

        return res.status(200).json({
            message: "User details fetched successfully",
            validatedUserData
        })
    }
    catch(error: any) { 
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                message: "Validation Error",
                errors: error.errors
            });
        }
        return res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
}
