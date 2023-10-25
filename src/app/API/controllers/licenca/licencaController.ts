import prisma from "../../../../../prisma/client";

export async function getLicenca(id: number) {
    const licenca = await prisma.licenca.findUnique({
        where: {
            id: id
        }
    });

    return licenca;
}

export async function updateLicenca(id: number, numero: string, orgaoAmbiental: string, emissao: Date, validade: Date  ) {
    const licenca = await getLicenca(id)

    if(licenca) {
        licenca.numero = numero;
        licenca.orgaoAmbiental = orgaoAmbiental;
        licenca.emissao = emissao;
        licenca.validade = validade;
    } else {
        throw new Error("Licença não encontrada")
    }
}

export async function deleteLicenca(id: number) {
    const licenca = await prisma.licenca.delete({
        where: {
            id: id
        }
    })
}
