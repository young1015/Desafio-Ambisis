

import { useEffect, useState } from "react";
import prisma from "../../prisma/client";
import Link from "next/link";
import { deleteEmpresa } from "./API/controllers/empresa/empresaController";

async function retornarEmpresas() {
  const empresas = await prisma.empresa.findMany();
  if(!empresas) {
    
  } else {
    return empresas;
  }
}

export default async function EmpresasExistentes() {
  const empresas = await retornarEmpresas();

  return (
    <>
      <main>
        <div>
          <h1 className="text-4xl text-center">Empresas Existentes</h1>
          <div className="px-10 py-10 border-[#ffffff] text-black border-2 m-20 bg-[#a3a3a3] bg-opacity-50">

          {empresas?.map((empresa: { id: any; }) => {
            return <Empresa key={empresa.id} empresa={empresa}/>;
          })}

          </div>
        </div>
      </main>
    </>
  )
}

function Empresa({ empresa }: any) {
  const { id, razaoSocial, cnpj, cep, cidade, estado, bairro, complemento } = empresa || {};

  return (
    <Link href={`/empresas/${id}`}>
      <div>
          <h2>Razão Social: {razaoSocial}</h2>
          <br />
      </div>
     </Link> 
  )
}

