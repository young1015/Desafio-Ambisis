import prisma from "../../../../prisma/client";
import { deleteEmpresa } from "@/app/API/controllers/empresa/empresaController";


export default async function Page({ params }: { params: { id: any } }) {
  const id = params.id
  const empresa = await prisma.empresa.findUnique({
    where: {
      id: parseInt(id)
    }
  })

  const { razaoSocial, cnpj, cep, cidade, estado, bairro, complemento } = empresa || {};
  return (

      <div className="flex flex-col  bg-slate-400 items-center">
          <h2>Razão Social: {razaoSocial}</h2>
          <h2>CNPJ: {cnpj}</h2>
          <h2>CEP: {cep}</h2>  
          <h2>Cidade: {cidade}</h2>
          <h2>Estado: {estado}</h2>
          <h2>Bairro: {bairro}</h2>
          <h2>Complemento: {complemento}</h2>
          <br />
          <button className="text-lime-500" type="submit" >Editar Empresa</button>
          <br />
          <button className="text-red-500" type="submit">Deletar Empresa</button>
      </div>
      
  )
}
