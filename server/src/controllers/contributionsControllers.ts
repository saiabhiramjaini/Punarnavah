import { PrismaClient } from '@prisma/client';
import { Response } from 'express';
import { z } from 'zod';
import { UploadContributionSchema } from "@abhiram2k03/punarnavah-common";
import { AuthenticatedRequest } from '../utils/types';

const prisma = new PrismaClient();

export const contribute = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { mobile, address, city, state, pincode, quantity } = req.body;
        const { wasteRequestId } = req.params;

        const userId = req.user?.id;

        const validateContribute = UploadContributionSchema.parse({
            mobile,
            address,
            city,
            state,
            pincode,
            quantity,
            wasteRequestId,
            userId
        });

        const wasteRequest = await prisma.wasteRequest.findUnique({
            where: {
                id: wasteRequestId
            },
            select: {
                remainingQuantity: true
            }
        });

        if (!wasteRequest) {
            return res.status(404).json({
                message: "Waste request not found."
            });
        }

        if (validateContribute.quantity > wasteRequest.remainingQuantity) {
            return res.status(400).json({
                message: `You can contribute a maximum of ${wasteRequest.remainingQuantity} units.`
            });
        }

        const [newContribute, updatedRequest] = await prisma.$transaction([
            prisma.wasteRequest.update({
                where: {
                    id: wasteRequestId
                },
                data: {
                    remainingQuantity: {
                        decrement: validateContribute.quantity
                    }
                }
            }),
            prisma.contribution.create({
                data: {
                    mobile: validateContribute.mobile,
                    address: validateContribute.address,
                    city: validateContribute.city,
                    state: validateContribute.state,
                    pincode: validateContribute.pincode,
                    quantity: validateContribute.quantity,
                    wasteRequestId: validateContribute.wasteRequestId,
                    userId: validateContribute.userId!, 
                }
            })
        ]);

        return res.status(201).json({
            message: "Contribution added successfully!",
            newContribute,
            updatedRequest
        });
    } catch (error: any) {
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
