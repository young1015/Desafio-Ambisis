import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';
import prisma from "../../../../../prisma/client";

const criarLicencaSchema = z.object({
    numero: z.string().length(10),
    orgaoAmbiental: z.string().min(5).max(30),
    emissao: z.date().min(new Date("1950-01-01")).max(new Date()),
    validade: z.date().min(new Date("1950-01-01")).max(new Date())
})

export async function POST(request: NextRequest) {
    const body = await request.json();
    const valicadao = criarLicencaSchema.safeParse(body);
    if (!valicadao.success)
    return NextResponse.json(valicadao.error.errors, {status: 400})

    const novaLicenca = await prisma.licenca.create({
        data: { numero: body.numero, orgaoAmbiental: body.orgaoAmbiental, emissao: body.emissao, validade: body.validade }
    })

    return NextResponse.json(novaLicenca, {status: 201});
}