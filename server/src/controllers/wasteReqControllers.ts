import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { UploadWasteRequestSchema, WasteRequestSchema } from "@abhiram2k03/punarnavah-common";
import { z } from 'zod';
import { AuthenticatedRequest } from '../utils/types';

const prisma = new PrismaClient();

export const uploadWasteReq = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { image, name, description, requiredQuantity, remainingQuantity, quantityUnit, price } = req.body;

        const userId = req.user?.id;

        const validatedWasteReq = UploadWasteRequestSchema.parse({
            image, 
            name, 
            description, 
            requiredQuantity, 
            remainingQuantity,
            quantityUnit, 
            price, 
            userId
        });

        const existingRequest = await prisma.wasteRequest.findFirst({
            where: { 
                AND: [
                    { name },
                    { userId: validatedWasteReq.userId }
                ]
            }
        });

        if (existingRequest) {
            return res.status(409).json({ 
                message: "A request with this name already exists for the user" 
            });
        }

        const newWasteRequest = await prisma.wasteRequest.create({
            data: {
                image: validatedWasteReq.image,
                name: validatedWasteReq.name,
                description: validatedWasteReq.description,
                requiredQuantity: validatedWasteReq.requiredQuantity,
                remainingQuantity: validatedWasteReq.remainingQuantity,
                quantityUnit: validatedWasteReq.quantityUnit,
                price: validatedWasteReq.price,
                userId: validatedWasteReq.userId!
            }
        });

        return res.status(201).json({
            message: "Successfully Uploaded!",
            newWasteRequest,
        });
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

export const getWasteReq = async (req: Request, res: Response) => {
    try {
        const wasteRequests = await prisma.wasteRequest.findMany({
            include: { 
                contributions: true,
                SatisfiedWasteReqOrder: true
            }
        });

        const validatedWasteRequests = WasteRequestSchema.array().parse(wasteRequests);

        return res.status(200).json({
            wasteRequests: validatedWasteRequests
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

export const getWasteReqById = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { id } = req.params;

        const wasteRequest = await prisma.wasteRequest.findUnique({
            where: { id },
            include: {
                contributions: true,
                SatisfiedWasteReqOrder: true // Include orders as per new schema
            }
        });

        if (!wasteRequest) {
            return res.status(404).json({
                message: "Waste request not found"
            });
        }

        const validatedWasteRequest = WasteRequestSchema.parse(wasteRequest);

        return res.status(200).json({
            wasteRequest: validatedWasteRequest
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

export const getUnsatisfiedWasteReq = async (req: Request, res: Response) => {
    try {
        const wasteRequests = await prisma.wasteRequest.findMany({
            include: {
                contributions: true,
                SatisfiedWasteReqOrder: true
            },
            where: {
                remainingQuantity: { gt: 0 }
            }
        });

        const validatedRequests = WasteRequestSchema.array().parse(wasteRequests);

        return res.status(200).json({
            unsatisfiedRequests: validatedRequests
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


export const getSatisfiedWasteReq = async (req: Request, res: Response) => {
    try {
        const wasteRequests = await prisma.wasteRequest.findMany({
            include: {
                contributions: true,
                SatisfiedWasteReqOrder: true
            },
            where: {
                remainingQuantity: 0
            }
        });

        const validatedRequests = WasteRequestSchema.array().parse(wasteRequests);

        return res.status(200).json({
            unsatisfiedRequests: validatedRequests
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