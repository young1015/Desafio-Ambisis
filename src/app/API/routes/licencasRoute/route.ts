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

    const idMapping = [];
    const createdLicencas = [];
    
        const newLicenca = await prisma.licenca.create({
            data: {
                numero: body.numero,
                orgaoAmbiental: body.orgaoAmbiental,
                emissao: body.emissao,
                validade: body.validade,
                empresaId: body.empresaId
            },
        });
        createdLicencas.push(newLicenca);

        idMapping[body.temporaryId] = newLicenca.id;
    

    const response = await fetch('API/routes/empresasRoute', {
        method: 'POST',
        body: JSON.stringify({ empresaData: body.empresaData, idMapping }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return NextResponse.json({ createdLicencas, idMapping }, { status: 201 });
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

    const body = await request.json();

    try{
        const id = body.id;
        const licenca = getLicenca(id);
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

    const body = await request.json();

    try {
        const { numero, orgaoAmbiental, emissao, validade } = await request.json();
        const id = body.id;
         updateLicenca(id, numero, orgaoAmbiental, emissao, validade);
         return NextResponse.json({message: "OK"}, {status: 200})

    } catch (err) {
        return NextResponse.json({message: "ERROR", err}, {status: 500})
    }
}

export async function DELETE(request: NextResponse) {

    const body = await request.json();

    try {
        const id = body.id;
         deleteLicenca(id)
         return NextResponse.json({message: "OK"}, {status: 200})

    } catch (err) {
        return NextResponse.json({message: "ERROR", err}, {status: 500})
    }
}