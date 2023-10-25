import { z } from 'zod';

export const criarLicencaSchema = z.object({
    numero: z.string().min(2).max(5),
    orgaoAmbiental: z.string().min(5).max(30),
    emissao: z.coerce.date().min(new Date("1950-01-01")).max(new Date()),
    validade: z.coerce.date().min(new Date("1950-01-01")).max(new Date())
});
