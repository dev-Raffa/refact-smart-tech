import z from "zod"

export const PartnerBasicSchema = z.object({
  name: z.string(),
  description: z.string()
})

export const PartnerReplicationSchema = z.object({
  tenant: z.string(),
  replicationConfigurationRequest: z.object({
    includeClients: z.boolean().default(true).optional(),
    includeClientRoles: z.boolean().default(true).optional(),
    includeClientScopes: z.boolean().default(true).optional(),
    createAdminGroupWithAllRulesAssociated: z.boolean().default(true).optional(),
    adminUser: z.object({
      username: z.string(),
      password: z.string()
    })
  })
}) 

export const PartnerSchema = z.object({
  ...PartnerBasicSchema.shape,
  ...PartnerReplicationSchema.shape
})

export type PartnerSchemaType = z.infer<typeof PartnerSchema>;
