import { z } from "zod";

export const registerNewBankSchema = z.object({
  name: z.string().min(3, "O nome do banco é obrigatório!"),
  code: z.string().min(1, "O código do banco é obrigatório!"),
  product: z.string({
    message: "O produto do banco é um campo obrigatório.",
  }).min(1, "O tipo do produto é obrigatório!"),
  agreement: z.string({
  message: "O convênio do banco é um campo obrigatório.",
  }).min(1, "O convênio do banco é obrigatório!"),
});

export type RegisterNewBankSchema = z.infer<typeof registerNewBankSchema>;

export const registerExistingBankSchema = z.object({
  bankId: z.string({
  message: "O banco é um campo obrigatório.",
  }).min(1, "O nome do banco é obrigatório!"),
  product: z.string({
  message: "O produto do banco é um campo obrigatório.",
  }).min(1, "O tipo do produto é obrigatório!"),
  agreement: z.string({
  message: "O convênio do banco é um campo obrigatório.",
  }).min(1, "O convênio do banco é obrigatório!"),
});

export type RegisterExistingBankSchema = z.infer<typeof registerExistingBankSchema>;