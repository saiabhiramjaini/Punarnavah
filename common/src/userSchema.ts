import { z } from "zod";
import { WasteRequestSchema } from "./wasteReqSchema";
import { ContributionSchema } from "./contributionsSchema";
import { InnovativeProductSchema } from "./innovativeProdsSchema";
import { SatisfiedWasteReqOrderSchema } from "./satisfiedWasteSchema";
import { InnovativeProdOrderSchema } from "./innovativeProdsOrderSchema";
import { BulkWasteOrderSchema } from "./bulkWasteOrdersSchema";

export const UserSchema = z.object({
  id: z.string().cuid({ message: "Invalid user ID format" }),
  username: z.string().min(1, { message: "Username is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
  createdAt: z.date({ message: "Invalid creation date" }),
  updatedAt: z.date({ message: "Invalid update date" }),
  wasteRequests: z.array(WasteRequestSchema, { message: "Waste Requests Array is Required" }).optional(),
  contributions: z.array(ContributionSchema, { message: "Contributions Array is Required" }).optional(),
  innovativeProducts: z.array(InnovativeProductSchema, { message: "Innovative Products Array is Required" }).optional(),
  wasteReqOrders: z.array(SatisfiedWasteReqOrderSchema, { message: "Waste Request Orders Array is Required" }).optional(),
  innovativeProdOrders: z.array(InnovativeProdOrderSchema, { message: "Innovative Product Orders Array is Required" }).optional(),
  bulkWasteOrders: z.array(BulkWasteOrderSchema, { message: "Bulk Waste Orders Array is Required" }).optional(),
});

// inferred type
export type UserType = z.infer<typeof UserSchema>;