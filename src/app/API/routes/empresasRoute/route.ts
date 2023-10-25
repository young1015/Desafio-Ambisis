import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";
import { criarEmpresaSchema } from "../../../Schemas/validarEmpresaSchema";
import { deleteEmpresa, getEmpresa, updateEmpresa } from "../../controllers/empresa/empresaController";

export async function POST(request: NextRequest) {
    const body =  await request.json();
    const validacao = criarEmpresaSchema.safeParse(body);
    if (!validacao.success)
        return NextResponse.json(validacao.error.format(), { status: 400})

    const novaEmpresa = await prisma.empresa.create({
        data: { razaoSocial: body.razaoSocial, cnpj: body.cnpj, cep: body.cep, cidade: body.cidade, estado: body.estado, bairro: body.bairro, licencas: body.licencas }
    })

    return NextResponse.json(novaEmpresa, { status: 201});
}

export async function getEmpresas(request: NextResponse) {

    try {
        const empresas = await prisma.empresa.findMany()
        return NextResponse.json(empresas, { status: 201});
    } catch (err) {
        return NextResponse.json({ message: "Error", err},
        {
            status: 500
        })
    } 
}

export async function getEmpresaById(request: NextResponse) {

    try{
        const id = request.url.split("empresa/")[1];
        const empresa = getEmpresa(parseInt(id));
    if(!empresa) {
        return NextResponse.json({ message: "Error"},
        {status: 404})    
    }
    return NextResponse.json(empresa, { status: 201});
    } catch (err) {
        return NextResponse.json({message: "Error", err}, {status: 500})
    }   
}

export async function PUT(request: NextResponse) {

    try {
        const { razaoSocial, cnpj, cep, cidade, estado, bairro } = await request.json();
        const id = request.url.split("empresa/")[1];
         updateEmpresa(parseInt(id), razaoSocial, cnpj, cep, cidade, estado, bairro);
         return NextResponse.json({message: "OK"}, {status: 200})

    } catch (err) {
        return NextResponse.json({message: "ERROR", err}, {status: 500})
    }
}

export async function DELETE(request: NextResponse) {

    try {
        const id = request.url.split("empresa/")[1];
         deleteEmpresa(parseInt(id))
         return NextResponse.json({message: "OK"}, {status: 200})

    } catch (err) {
        return NextResponse.json({message: "ERROR", err}, {status: 500})
    }
}