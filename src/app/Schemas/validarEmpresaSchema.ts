import { z } from 'zod';

export const criarEmpresaSchema = z.object({
    razaoSocial: z.string().min(2).max(50),
    cnpj: z.string().length(14),
    cep: z.string().length(8),
    cidade: z.string().min(4).max(30),
    estado: z.string().min(5).max(20),
    bairro: z.string().min(4).max(20)
});
