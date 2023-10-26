import prisma from "../../../../../prisma/client";

export async function getEmpresa(id: number) {
    const empresa = await prisma.empresa.findUnique({
        where: {
            id: id
        }
    });

    return empresa;
}

export async function updateEmpresa(id: number, razaoSocial: string, cnpj: string, cep: string, cidade: string, estado: string, bairro: string, complemento: string ) {
    const empresa = await getEmpresa(id)

    if(empresa) {
        empresa.razaoSocial = razaoSocial;
        empresa.cnpj = cnpj;
        empresa.cep = cep;
        empresa.cidade = cidade;
        empresa.estado = estado;
        empresa.bairro = bairro;
        empresa.complemento = complemento;
    } else {
        throw new Error("Empresa não encontrada")
    }
}

export async function deleteEmpresa(id: number) {
    const empresa = await prisma.empresa.delete({
        where: {
            id: id
        }
    })
}
