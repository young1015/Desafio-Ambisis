import prisma from "../../../prisma/client";
import Link from "next/link";

async function retornarLicencas() {
  const licencas = await prisma.licenca.findMany();
  
  if(!licencas) {
    
  } else {
    return licencas;
  }
}


export default async function LicencasExistentes() {
  const licencas = await retornarLicencas();

  return (
    <>
      <main>
        <div>
          <h1 className="text-4xl text-center">Licenças Existentes</h1>
          <div className="px-10 py-10 border-[#ffffff] text-black border-2 m-20 bg-[#a3a3a3] bg-opacity-50">

          {licencas?.map((licenca: { id: any; }) => {
            return <Licenca key={licenca.id} licenca={licenca}/>;
          })}

          </div>
        </div>
      </main>
    </>
  )
}

function Licenca({ licenca }: any) {
  const { id, numero, orgaoAmbiental, validade, emissao } = licenca || {};

  return (
    <Link href={`/licencas/${licenca.id}`}>
      <div>
        <h2>Orgão Ambiental: {orgaoAmbiental}</h2>       
      </div>
    </Link>
  )
}