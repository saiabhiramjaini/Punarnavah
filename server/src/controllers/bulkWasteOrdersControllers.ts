import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { CreateBulkWasteOrderSchema, BulkWasteOrderSchema } from "@abhiram2k03/punarnavah-common";
import{ z } from 'zod';
import { AuthenticatedRequest } from '../utils/types';

const prisma = new PrismaClient();

export const createBulkWasteOrder = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { bulkWasteId, amount, mobile, address, city, state, pincode } = req.body;

        const userId = req.user?.id;

        const validatedOrder = CreateBulkWasteOrderSchema.parse({
            amount,
            mobile,
            address,
            city,
            state,
            pincode,
            bulkWasteId,
            userId
        });
        
        const [newOrder, updatedBulkWaste] = await prisma.$transaction([
            prisma.bulkWasteOrder.create({
                data: {
                    amount: validatedOrder.amount,
                    mobile: validatedOrder.mobile,
                    address: validatedOrder.address,
                    city: validatedOrder.city,
                    state: validatedOrder.state,
                    pincode: validatedOrder.pincode,
                    bulkWasteId: validatedOrder.bulkWasteId,
                    userId: validatedOrder.userId!,
                }
            }),
            prisma.bulkWaste.update({
                where: {
                    id: validatedOrder.bulkWasteId
                },
                data: {
                    quantityAvailable: {
                        decrement: 1
                    }
                }
            })
        ]);

        return res.status(201).json({
            message: "Ordered Successfully!!",
            newOrder,
            updatedBulkWaste
        });
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


export const getBulkWasteOrders = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const allOrders = await prisma.bulkWasteOrder.findMany();

        const validatedOrders = BulkWasteOrderSchema.array().parse(allOrders);

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

export const getBulkWasteOrderById = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { id } = req.params;

        const gettingOrderById = await prisma.bulkWasteOrder.findFirst({
            where: {
                id
            }
        })

        const validatedOrder = BulkWasteOrderSchema.parse(gettingOrderById)

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

export const updateBulkWasteOrder = async (req: AuthenticatedRequest, res: Response) => {
    try {

        const {id} = req.params;
        const {status} = req.body;

        const changingStatus = await prisma.bulkWasteOrder.update({
            where:{
                id: id
            },
            data: {
                status
            }
        })

        const validatedOrder = BulkWasteOrderSchema.parse(changingStatus);

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