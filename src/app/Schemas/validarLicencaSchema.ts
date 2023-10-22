import { z } from 'zod';

export const criarLicencaSchema = z.object({
    numero: z.string().length(10),
    orgaoAmbiental: z.string().min(5).max(30),
    emissao: z.date().min(new Date("1950-01-01")).max(new Date()),
    validade: z.date().min(new Date("1950-01-01")).max(new Date())
});
