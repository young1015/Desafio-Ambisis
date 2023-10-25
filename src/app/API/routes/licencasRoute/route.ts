import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";
import { criarLicencaSchema } from "../../../Schemas/validarLicencaSchema";
import { deleteLicenca, getLicenca, updateLicenca } from "../../controllers/licenca/licencaController";
import { useState } from 'react'

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

export async function getLicencas(request: NextResponse) {

    try {
        const licencas = await prisma.licenca.findMany()
        return NextResponse.json(licencas, { status: 201});

    } catch (err) {
        
        return NextResponse.json({ message: "Error", err},
        {
            status: 500
        })
    } 
}

export async function getLicencaById(request: NextResponse) {

    try{
        const id = request.url.split("licenca/")[1];
        const licenca = getLicenca(parseInt(id));
    if(!licenca) {
        return NextResponse.json({ message: "Error"},
        {status: 404})    
    }
    return NextResponse.json(licenca, { status: 201});
    } catch (err) {
        return NextResponse.json({message: "Error", err}, {status: 500})
    }   
}

export async function PUT(request: NextResponse) {

    try {
        const { numero, orgaoAmbiental, emissao, validade } = await request.json();
        const id = request.url.split("licenca/")[1];
         updateLicenca(parseInt(id), numero, orgaoAmbiental, emissao, validade);
         return NextResponse.json({message: "OK"}, {status: 200})

    } catch (err) {
        return NextResponse.json({message: "ERROR", err}, {status: 500})
    }
}

export async function DELETE(request: NextResponse) {

    try {
        const id = request.url.split("licenca/")[1];
         deleteLicenca(parseInt(id))
         return NextResponse.json({message: "OK"}, {status: 200})

    } catch (err) {
        return NextResponse.json({message: "ERROR", err}, {status: 500})
    }
}