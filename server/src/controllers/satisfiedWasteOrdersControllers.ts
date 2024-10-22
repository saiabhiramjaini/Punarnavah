import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { CreateSatisfiedWasteReqOrderSchema, SatisfiedWasteReqOrderSchema } from "@abhiram2k03/punarnavah-common";
import{ z } from 'zod';
import { AuthenticatedRequest } from '../utils/types';

const prisma = new PrismaClient();

export const createSatisfiedOrder = async (req: AuthenticatedRequest, res: Response) => {
    try {
        
        const { satisfiedWasteReqId, amount, mobile, address, city, state, pincode } = req.body;

        const userId = req.user!.id;

        const validatedOrder = CreateSatisfiedWasteReqOrderSchema.parse({
            amount,
            mobile,
            address,
            city,
            state,
            pincode,
            satisfiedWasteReqId,
            userId
        })

        const newOrder = await prisma.satisfiedWasteReqOrder.create({
            data: {
                satisfiedWasteReqId: validatedOrder.satisfiedWasteReqId,
                amount: validatedOrder.amount, 
                mobile: validatedOrder.mobile,
                address: validatedOrder.address,
                city: validatedOrder.city, 
                state: validatedOrder.state,
                pincode: validatedOrder.pincode,
                userId: validatedOrder.userId!,
            }
        })

        return res.status(201).json({
            message: "Ordered Successfully!!",
            newOrder
        })
    }
    catch (error: any) {
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

export const getSatisfiedOrders = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const allOrders = await prisma.satisfiedWasteReqOrder.findMany();

        const validatedOrders = SatisfiedWasteReqOrderSchema.array().parse(allOrders);

        return res.status(200).json({
            message: "All Orders fetched successfully!",
            validatedOrders
        })
    }
    catch (error: any) {
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

export const getSatisfiedOrderById = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { id } = req.params;

        const gettingOrderById = await prisma.satisfiedWasteReqOrder.findFirst({
            where: {
                id
            }
        })

        const validatedOrder = SatisfiedWasteReqOrderSchema.parse(gettingOrderById)

        return res.status(200).json({
            message: "Order fetched successfully!",
            validatedOrder
        })
    }
    catch (error: any) {
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

export const updateSatisfiedOrder = async (req: AuthenticatedRequest, res: Response) => {
    try {

        const {id} = req.params;
        const {status} = req.body;

        const changingStatus = await prisma.satisfiedWasteReqOrder.update({
            where:{
                id: id
            },
            data: {
                status
            }
        })

        const validatedOrder = SatisfiedWasteReqOrderSchema.parse(changingStatus);

        return res.status(200).json({
            message: "Status Changed Successfully!",
            validatedOrder
        })
    }
    catch (error: any) {
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