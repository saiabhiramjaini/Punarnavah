import { PrismaClient } from '@prisma/client';
import { Response } from 'express';
import { InnovativeProductSchema, UploadInnovativeProductSchema } from "@abhiram2k03/punarnavah-common";
import { AuthenticatedRequest } from '../utils/types';
import { z } from 'zod';

const prisma = new PrismaClient();

export const uploadInnovativeProd = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { image, name, description, price, quantity, materialsUsed } = req.body;   

        const userId = req.user?.id;

        const validatedInnovativeProd = UploadInnovativeProductSchema.parse({
            image,
            name, 
            description, 
            price, 
            quantity, 
            materialsUsed, 
            userId
        })

        const existingProduct = await prisma.innovativeProduct.findFirst({
            where: { 
                AND: [
                    { name },
                    { userId: validatedInnovativeProd.userId }
                ]
            }
        });

        if (existingProduct) {
            return res.status(409).json({ 
                message: "A Product with this name already exists for the user" 
            });
        }

        const newProduct = await prisma.innovativeProduct.create({
            data: {
                image: validatedInnovativeProd.image,
                name: validatedInnovativeProd.name,
                description: validatedInnovativeProd.description,
                price: validatedInnovativeProd.price,
                quantity: validatedInnovativeProd.quantity,
                materialsUsed: validatedInnovativeProd.materialsUsed,
                userId: validatedInnovativeProd.userId!
            }
        })

        return res.status(201).json({
            message: "Product Uploaded successfully!!",
            newProduct
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

export const getInnovativeProd = async (req: Request, res: Response) => {
    try {
        const getProducts = await prisma.innovativeProduct.findMany({
            include: {
                orders: true
            }
        });

        const validatedProducts = InnovativeProductSchema.array().parse(getProducts);

        return res.status(200).json({
            message: "All Products are",
            validatedProducts
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

export const getInnovativeProdById = async (req: AuthenticatedRequest, res: Response) => {
    try{

        const id = req.params.id;


        const getProdById = await prisma.innovativeProduct.findFirst({
            include: {
                orders: true
            },
            where: {
                id: id
            }
        })

        if (!getProdById) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        const validatedProd = InnovativeProductSchema.parse(getProdById);

        return res.status(200).json({
            message: "Innovative Product Fetched Successfully",
            validatedProd
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