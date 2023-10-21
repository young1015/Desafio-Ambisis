import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';
import prisma from "../../../../../prisma/client";

const criarEmpresaSchema = z.object({
    razaoSocial: z.string().min(2).max(50),
    cnpj: z.string().length(14),
    cep: z.string().length(8),
    cidade: z.string().min(4).max(30),
    estado: z.string().min(5).max(20),
    bairro: z.string().min(4).max(20)
})

export async function POST(request: NextRequest) {
    const body =  await request.json();
    const validacao = criarEmpresaSchema.safeParse(body);
    if (!validacao.success)
        return NextResponse.json(validacao.error.errors, { status: 400})

    const novaEmpresa = await prisma.empresa.create({
        data: { razaoSocial: body.razaoSocial, cnpj: body.cnpj, cep: body.cep, cidade: body.cidade, estado: body.estado, bairro: body.bairro }
    })

    return NextResponse.json(novaEmpresa, { status: 201});
}