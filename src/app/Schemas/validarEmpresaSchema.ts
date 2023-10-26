import { any, z } from 'zod';
import { criarLicencaSchema } from './validarLicencaSchema';

export const criarEmpresaSchema = z.object({
    razaoSocial: z.string().min(2).max(50),
    cnpj: z.string().length(14),
    cep: z.string().length(8),
    cidade: z.string().max(30),
    estado: z.string().max(20),
    bairro: z.string().max(20),
    complemento: z.string().max(20)
});


