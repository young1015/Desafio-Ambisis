import prisma from "../../../../prisma/client"

async function pegarEmpresa(empresaId: number) {
    const res = await fetch(
        `http://localhost:3000/empresas/${empresaId}`,
        {
            next: { revalidate: 10 },
        }
        );
        const id = await res.json();

    const empresa = await prisma.empresa.findUnique({
        where: {
          id: id,
        },
      })

      return empresa;
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