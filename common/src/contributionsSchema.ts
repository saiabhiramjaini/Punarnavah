import { z } from "zod";

export const UploadContributionSchema = z.object({
  mobile: z.string().regex(/^\d{10}$/, { message: "Mobile number must be 10 digits" }),
  address: z.string().min(1, { message: "Address is required" }),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  pincode: z.string().regex(/^\d{6}$/, { message: "Pincode must be 6 digits" }),
  quantity: z.number().int().positive({ message: "Quantity must be a positive integer" }),
  wasteRequestId: z.string().cuid({ message: "Invalid waste request ID format" }),
  userId: z.string().cuid({ message: "Invalid user ID format" }).optional(),
});
  
export const ContributionSchema = UploadContributionSchema.extend({
  id: z.string().cuid({ message: "Invalid contribution ID format" }),
});

// inferred type
export type UploadContributionType = z.infer<typeof UploadContributionSchema>;
export type ContributionType = z.infer<typeof ContributionSchema>;
