import { z } from "zod";

export const InnovativeProdOrderSchema = z.object({
  id: z.string().cuid({ message: "Invalid order ID format" }),
  amount: z.number().positive({ message: "Amount must be a positive number" }),
  mobile: z.string().regex(/^\d{10}$/, { message: "Mobile number must be 10 digits" }),
  address: z.string().min(1, { message: "Address is required" }),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  pincode: z.string().regex(/^\d{6}$/, { message: "Pincode must be 6 digits" }),
  status: z.string().default("processing"),
  userId: z.string().cuid({ message: "Invalid user ID format" }),
  innovativeProductId: z.string().cuid({ message: "Invalid innovative product ID format" }),
});
  
export const CreateInnovativeProdOrderSchema = z.object({
  amount: z.number().positive({ message: "Amount must be a positive number" }),
  mobile: z.string().regex(/^\d{10}$/, { message: "Mobile number must be 10 digits" }),
  address: z.string().min(1, { message: "Address is required" }),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  pincode: z.string().regex(/^\d{6}$/, { message: "Pincode must be 6 digits" }),
  innovativeProductId: z.string().cuid({ message: "Invalid product ID format" }),
  userId: z.string().cuid({ message: "Invalid user ID format" }).optional(),
});

// inferred type
export type InnovativeProdOrderType = z.infer<typeof InnovativeProdOrderSchema>;
export type CreateInnovativeProdOrderType = z.infer<typeof CreateInnovativeProdOrderSchema>;