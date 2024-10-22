import { z } from "zod";
import { InnovativeProdOrderSchema } from "./innovativeProdsOrderSchema";

export const UploadInnovativeProductSchema = z.object({
  image: z.string({ message: "Image is required" }).url({ message: "Invalid image URL" }),
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  price: z.number().positive({ message: "Price must be a positive number" }),
  quantity: z.number().int().nonnegative({ message: "Quantity must be a non-negative integer" }),
  materialsUsed: z.string().min(1, { message: "Materials used is required" }),
  userId: z.string().cuid({ message: "Invalid user ID format" }).optional(),
});
  
export const InnovativeProductSchema = UploadInnovativeProductSchema.extend({
  id: z.string().cuid({ message: "Invalid product ID format" }),
  orders: z.array(InnovativeProdOrderSchema, { message: "Orders Array is Required" }),
});

// inferred type
export type UploadInnovativeProductType = z.infer<typeof UploadInnovativeProductSchema>;
export type InnovativeProductType = z.infer<typeof InnovativeProductSchema>;

