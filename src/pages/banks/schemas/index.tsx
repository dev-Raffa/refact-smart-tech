import { z } from "zod";

export const searchRegisteredBanksSchema = z.object({
  bankId: z.string()
});

export type SearchRegisteredBanksSchema = z.infer<typeof searchRegisteredBanksSchema>;