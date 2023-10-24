import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";
import { criarEmpresaSchema } from "../../../Schemas/validarEmpresaSchema";

export async function POST(request: NextRequest) {
    const body =  await request.json();
    const validacao = criarEmpresaSchema.safeParse(body);
    if (!validacao.success)
        return NextResponse.json(validacao.error.format(), { status: 400})

    const novaEmpresa = await prisma.empresa.create({
        data: { razaoSocial: body.razaoSocial, cnpj: body.cnpj, cep: body.cep, cidade: body.cidade, estado: body.estado, bairro: body.bairro }
    })

    return NextResponse.json(novaEmpresa, { status: 201});
}

export async function DELETE(request: NextResponse) {
    const body =  await request.json();
}