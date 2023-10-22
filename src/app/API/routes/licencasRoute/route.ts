import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";
import { criarLicencaSchema } from "../../../Schemas/validarLicencaSchema";

export async function POST(request: NextRequest) {
    const body = await request.json();
    const valicadao = criarLicencaSchema.safeParse(body);
    if (!valicadao.success)
    return NextResponse.json(valicadao.error.errors, {status: 400})

    const novaLicenca = await prisma.licenca.create({
        data: { numero: body.numero, orgaoAmbiental: body.orgaoAmbiental, emissao: body.emissao, validade: body.validade, empresa: body.empresa }
    })

    return NextResponse.json(novaLicenca, {status: 201});
}