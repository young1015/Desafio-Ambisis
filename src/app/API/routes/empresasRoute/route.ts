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
        data: { razaoSocial: body.razaoSocial, 
            cnpj: body.cnpj, 
            cep: body.cep, 
            cidade: body.cidade, 
            estado: body.estado, 
            bairro: body.bairro,
            complemento: body.complemento }
    });

    return NextResponse.json(novaEmpresa, { status: 201 });
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

    const body = await request.json();

    try{
        const id = body.id;
        const empresa = getEmpresa(id);
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
    
    const body = await request.json();

    try {
        const { razaoSocial, cnpj, cep, cidade, estado, bairro, complemento } = await request.json();
        const id = body.id;
         updateEmpresa(id, razaoSocial, cnpj, cep, cidade, estado, bairro, complemento);
         return NextResponse.json({message: "OK"}, {status: 200})

    } catch (err) {
        return NextResponse.json({message: "ERROR", err}, {status: 500})
    }
}

export async function DELETE(request: NextResponse) {
    const body = await request.json();

    try {
        const id = body.id;
         deleteEmpresa(id)
         return NextResponse.json({message: "OK"}, {status: 200})

    } catch (err) {
        return NextResponse.json({message: "ERROR", err}, {status: 500})
    }
}


