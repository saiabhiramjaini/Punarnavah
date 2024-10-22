import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { CreateInnovativeProdOrderSchema, InnovativeProdOrderSchema } from "@abhiram2k03/punarnavah-common";
import{ z } from 'zod';
import { AuthenticatedRequest } from '../utils/types';

const prisma = new PrismaClient();
export const createInnovativeOrder = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { innovativeProductId, amount, mobile, address, city, state, pincode } = req.body;
        const userId = req.user!.id;

        const validatedOrder = CreateInnovativeProdOrderSchema.parse({
            amount,
            mobile,
            address,
            city,
            state,
            pincode,
            innovativeProductId,
            userId
        });

        const product = await prisma.innovativeProduct.findUnique({
            where: {
                id: validatedOrder.innovativeProductId
            }
        });

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        if (product.quantity <= 0) {
            return res.status(400).json({
                message: "Product is out of stock"
            });
        }

        const [newOrder, updatedProduct] = await prisma.$transaction([
            prisma.innovativeProdOrder.create({
                data: {
                    amount: validatedOrder.amount,
                    mobile: validatedOrder.mobile,
                    address: validatedOrder.address,
                    city: validatedOrder.city,
                    state: validatedOrder.state,
                    pincode: validatedOrder.pincode,
                    userId: validatedOrder.userId!,
                    innovativeProductId: validatedOrder.innovativeProductId
                }
            }),
            prisma.innovativeProduct.update({
                where: {
                    id: validatedOrder.innovativeProductId
                },
                data: {
                    quantity: {
                        decrement: 1
                    }
                }
            })
        ]);

        return res.status(201).json({
            message: "Ordered Successfully!!",
            newOrder,
            updatedProduct
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
};


export const getInnovativeOrders = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const allOrders = await prisma.innovativeProdOrder.findMany();

        const validatedOrders = InnovativeProdOrderSchema.array().parse(allOrders);

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

export const getInnovativeOrderById = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { id } = req.params;

        const gettingOrderById = await prisma.innovativeProdOrder.findFirst({
            where: {
                id
            }
        })

        const validatedOrder = InnovativeProdOrderSchema.parse(gettingOrderById)

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

export const updateInnovativeOrder = async (req: AuthenticatedRequest, res: Response) => {
    try {

        const {id} = req.params;
        const {status} = req.body;

        const changingStatus = await prisma.innovativeProdOrder.update({
            where:{
                id: id
            },
            data: {
                status
            }
        })

        const validatedOrder = InnovativeProdOrderSchema.parse(changingStatus);

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