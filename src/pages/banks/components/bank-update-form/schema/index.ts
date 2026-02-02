import { z } from "zod";

export const updateBankSchema = z.object({
  bankName: z.string().min(1, "O nome do banco é obrigatório!"),
  typeProduct: z.string().optional(),
  agreement: z.string().optional(),
  coefficients: z.string().optional(),
});

export type UpdateBankSchema = z.infer<typeof updateBankSchema>;