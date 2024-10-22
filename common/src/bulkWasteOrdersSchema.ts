import { z } from "zod";

export const BulkWasteOrderSchema = z.object({
  id: z.string().cuid({ message: "Invalid order ID format" }),
  amount: z.number().positive({ message: "Amount must be a positive number" }),
  mobile: z.string().regex(/^\d{10}$/, { message: "Mobile number must be 10 digits" }),
  address: z.string().min(1, { message: "Address is required" }),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  pincode: z.string().regex(/^\d{6}$/, { message: "Pincode must be 6 digits" }),
  status: z.string().default("processing"),
  userId: z.string().cuid({ message: "Invalid user ID format" }),
  bulkWasteId: z.string().cuid({ message: "Invalid bulk waste ID format" }),
});
  
export const CreateBulkWasteOrderSchema = z.object({
  amount: z.number().positive({ message: "Amount must be a positive number" }),
  mobile: z.string().regex(/^\d{10}$/, { message: "Mobile number must be 10 digits" }),
  address: z.string().min(1, { message: "Address is required" }),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  pincode: z.string().regex(/^\d{6}$/, { message: "Pincode must be 6 digits" }),
  bulkWasteId: z.string().cuid({ message: "Invalid bulk waste ID format" }),
  userId: z.string().cuid({ message: "Invalid user ID format" }).optional(),
});

// Inferred Types
export type BulkWasteOrderType = z.infer<typeof BulkWasteOrderSchema>;
export type CreateBulkWasteOrderType = z.infer<typeof CreateBulkWasteOrderSchema>;
