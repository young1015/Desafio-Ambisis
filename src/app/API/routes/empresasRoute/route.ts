import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";
import { criarEmpresaSchema } from "../../../Schemas/validarEmpresaSchema";
import { deleteEmpresa, getEmpresa, updateEmpresa } from "../../controllers/empresa/empresaController";
import { criarLicencaSchema } from "@/app/Schemas/validarLicencaSchema";
import LicencaModal from "@/app/components/LicencaModal";

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
            bairro: body.bairro }
    });

    const licencasCriadas = [];
    for (const licencaData of body.licencas) {
        const valicadao = criarLicencaSchema.safeParse(body);
    if (!valicadao.success)
    return NextResponse.json(valicadao.error.errors, {status: 400})

    const novaLicenca = await prisma.licenca.create({
        data: { numero: licencaData.numero, orgaoAmbiental: licencaData.orgaoAmbiental, emissao: licencaData.emissao, validade: licencaData.validade, empresaId: novaEmpresa.id },
    });
    licencasCriadas.push(novaLicenca);
    }

    await prisma.empresa.update({
        where: {id: novaEmpresa.id},
        data: {
            licencas: {
                connect: licencasCriadas.map((licenca) => ({ id: licenca.id })),
            },
        },
    });
    

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

