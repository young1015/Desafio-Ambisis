import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client"

async function pegarEmpresa(request: NextResponse) {
    const id = request.url.split("/empresas/")[1];
    console.log(id) 
}


export default async function PaginaEmpresa({ params }: any) {
    const empresa = await pegarEmpresa(params.id);

    return (
        <div>
            <h1>Empresas/{}</h1>
            <div>
                <h2>CNPJ:    {}</h2>
                <h2>CEP:    {}</h2>
                <h2>Cidade: {}</h2>
                <h2>Estado: {}</h2>
                <h2>Bairro: {}</h2>
            </div>
        </div>
    )
}