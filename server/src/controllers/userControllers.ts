import { PrismaClient } from '@prisma/client';
import { Response } from 'express';
import { UserSchema } from "@abhiram2k03/punarnavah-common";
import { z } from 'zod';
import { AuthenticatedRequest } from '../utils/types';

const prisma = new PrismaClient();


// export const getUserInfo = async (req: AuthenticatedRequest, res: Response) => {
//     try {
//         const userId =  req.user?.id;

//         const user = await prisma.user.findFirst({
//             include: {
//                 wasteRequests: true,
//                 contributions: true,
//                 innovativeProducts: true,
//                 wasteReqOrders: true,
//                 innovativeProdOrders: true,
//                 bulkWasteOrders: true,
//             },
//             where: {
//                 id: userId
//             },  
//         })
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         const validatedUserData = UserSchema.parse(user);

//         return res.status(200).json({
//             message: "User details fetched successfully",
//             validatedUserData
//         })
//     }
//     catch(error: any) { 
//         if (error instanceof z.ZodError) {
//             return res.status(400).json({
//                 message: "Validation Error",
//                 errors: error.errors
//             });
//         }
//         return res.status(500).json({
//             message: "Server Error",
//             error: error.message
//         });
//     }
// }




export const getUserInfo = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.id;

        const user = await prisma.user.findFirst({
            where: {
                id: userId
            },
            include: {
                wasteRequests: {
                    include: {
                        contributions: true,
                        SatisfiedWasteReqOrder: true
                    }
                },
                contributions: true,
                innovativeProducts: {
                    include: {
                        orders: true
                    }
                },
                wasteReqOrders: true,
                innovativeProdOrders: true,
                bulkWasteOrders: true,
            }
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const validatedUserData = UserSchema.parse(user);

        return res.status(200).json({
            message: "User details fetched successfully",
            validatedUserData
        });
    } catch(error: any) {
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