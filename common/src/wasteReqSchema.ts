import { z } from "zod";
import { ContributionSchema } from "./contributionsSchema";

export const UploadWasteRequestSchema = z.object({
    image: z.string({message :"Image is required"}).url({ message: "Invalid image URL" }),
    name: z.string().min(1, { message: "Name is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    requiredQuantity: z.number().int().positive({ message: "Quantity must be a positive integer" }),
    remainingQuantity: z.number().int({ message: "Quantity must be a positive integer" }).min(0, { message: "Quantity must be equal to or greater than 0" }),
    quantityUnit: z.string().min(1, { message: "Quantity unit is required" }),
    price: z.number().positive({ message: "Price must be a positive number" }),
    userId: z.string().cuid({ message: "Invalid user ID format" }).optional(),
});
  
export const WasteRequestSchema = UploadWasteRequestSchema.extend({
    id: z.string().cuid({ message: "Invalid waste request ID format" }),
    contributions: z.array(ContributionSchema, { message: "Contributions Array is Required" }),
});

// inferred type
export type UploadWasteRequestType = z.infer<typeof UploadWasteRequestSchema>;
export type WasteRequestType = z.infer<typeof WasteRequestSchema>;
