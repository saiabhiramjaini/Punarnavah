import { z } from "zod";

export const SatisfiedWasteReqOrderSchema = z.object({
  id: z.string().cuid({ message: "Invalid order ID format" }),
  amount: z.number().positive({ message: "Amount must be a positive number" }),
  mobile: z.string().regex(/^\d{10}$/, { message: "Mobile number must be 10 digits" }),
  address: z.string().min(1, { message: "Address is required" }),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  pincode: z.string().regex(/^\d{6}$/, { message: "Pincode must be 6 digits" }),
  status: z.string().default("processing"),
  userId: z.string().cuid({ message: "Invalid user ID format" }),
  satisfiedWasteReqId: z.string().cuid({ message: "Invalid satisfied waste request ID format" }),
});
  
export const CreateSatisfiedWasteReqOrderSchema = z.object({
  amount: z.number().positive({ message: "Amount must be a positive number" }),
  mobile: z.string().regex(/^\d{10}$/, { message: "Mobile number must be 10 digits" }),
  address: z.string().min(1, { message: "Address is required" }),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  pincode: z.string().regex(/^\d{6}$/, { message: "Pincode must be 6 digits" }),
  satisfiedWasteReqId: z.string().cuid({ message: "Invalid satisfied waste request ID format" }),
  userId: z.string().cuid({ message: "Invalid user ID format" }).optional(),
});

// inferred type
export type SatisfiedWasteReqOrderType = z.infer<typeof SatisfiedWasteReqOrderSchema>;
export type CreateSatisfiedWasteReqOrderType = z.infer<typeof CreateSatisfiedWasteReqOrderSchema>;