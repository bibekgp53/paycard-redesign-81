
import * as z from "zod"

export const cardAllocationSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  surname: z.string().min(2, "Surname must be at least 2 characters"),
  idNumber: z.string()
    .min(6, "ID/Passport number must be at least 6 characters")
    .max(13, "ID/Passport number must not exceed 13 characters"),
  cellphone: z.string()
    .min(10, "Cellphone number must be at least 10 digits")
    .max(13, "Cellphone number must not exceed 13 digits")
    .regex(/^[0-9+]+$/, "Must contain only numbers or + symbol"),
  reference: z.string().optional(),
})

export type CardAllocationFormData = z.infer<typeof cardAllocationSchema>
