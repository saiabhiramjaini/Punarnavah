import { z } from "zod";

export const BulkWasteSchema = z.object({
  id: z.string().cuid({ message: "Invalid bulk waste ID format" }),
  image: z.string().url({ message: "Invalid image URL" }),
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  price: z.number().positive({ message: "Price must be a positive number" }),
  quantityAvailable: z.number().int().positive({ message: "Quantity must be a positive integer" }),
  quantityUnit: z.string().min(1, { message: "Quantity unit is required" }),
});
  
export const UploadBulkWasteSchema = z.object({
  image: z.string().url({ message: "Invalid image URL" }),
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  price: z.number().positive({ message: "Price must be a positive number" }),
  quantityAvailable: z.number().int().positive({ message: "Quantity must be a positive integer" }),
  quantityUnit: z.string().min(1, { message: "Quantity unit is required" }),
});

// Inferred Types
export type BulkWasteType = z.infer<typeof BulkWasteSchema>;
export type UploadBulkWasteType = z.infer<typeof UploadBulkWasteSchema>;