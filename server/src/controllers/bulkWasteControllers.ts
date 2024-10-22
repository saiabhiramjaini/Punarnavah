import { Request, Response } from 'express';
import { BulkWasteSchema, UploadBulkWasteSchema } from "@abhiram2k03/punarnavah-common";
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import { AuthenticatedRequest } from '../utils/types';

const prisma = new PrismaClient();

export const uploadBulkWaste = async (req:Request, res: Response) => {
    try {
       const { image, name, description, price, quantityAvailable, quantityUnit } = req.body;

       const validatedBulkWaste = UploadBulkWasteSchema.parse({
            image,
            name,
            description,
            price,
            quantityAvailable,
            quantityUnit,
       });
    
       const newBulkWaste = await prisma.bulkWaste.create({
            data:{
                image: validatedBulkWaste.image,
                name: validatedBulkWaste.name,
                description: validatedBulkWaste.description,
                price: validatedBulkWaste.price,
                quantityAvailable: validatedBulkWaste.quantityAvailable,
                quantityUnit: validatedBulkWaste.quantityUnit,
            }
       })

       return res.status(201).json({
            message: "Waste Uploaded Successfully!!",
            newBulkWaste
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

export const getBulkWaste = async (req: Request, res: Response) => {
    try {
        const getWaste = await prisma.bulkWaste.findMany();

        const validatedWaste = BulkWasteSchema.array().parse(getWaste);

        return res.status(200).json({
            message: "Wastes received Successfully!",
            validatedWaste
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

export const getBulkWasteById = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { id } = req.params;

        const getWasteById = await prisma.bulkWaste.findFirst({
            where: {
                id
            }
        })

        const validatedWaste = BulkWasteSchema.parse(getWasteById);
        
        return res.status(200).json({
            message: "Successfully retrieved Waste ",
            validatedWaste
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