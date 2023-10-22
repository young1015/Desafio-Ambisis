"use client"

import Link from "next/link"
import React from "react"
import axios from 'axios'
import { useForm, Controller} from 'react-hook-form'
import { useRouter } from "next/navigation"


interface EmpresaForm {
  razaoSocial: string;
  cnpj: string; 
  cep: string;
  cidade: string;
  estado: string;
  bairro: string;
}



export default function Home() {
  const router = useRouter();
  const {register, control, handleSubmit} =  useForm<EmpresaForm>();

  function criarEmpresa(data: any) {
    console.log(data)
  }

    return (
      <>
        <main>
        <h1 className="text-4xl text-center">Cadastrar Empresa</h1>
          <div className=" h-screen bg-zinc-50 flex items-center justify-center">
            <form className="flex flex-col gap-4 w-full max-w-xs" onSubmit={handleSubmit(async (data) => {await axios.post('/API/routes/empresasRoute', data);
            router.push('/empresas')})}>

              <div className="flex flex-col gap-1">
               <label className="text-black" htmlFor="razaoSocial">Razão Social: </label>
               <input {...register('razaoSocial')} className="text-black border-2 border-zinc-300 rounded"  type="text"/> 
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-black" htmlFor="">CNPJ: </label>          
                <input {...register('cnpj')} className="text-black border-2  border-zinc-300 rounded"  type="text"/>
              </div>

            <div className="flex flex-col gap-1">
              <label className="text-black" htmlFor="">CEP: </label>          
              <input {...register('cep')} className="text-black border-2  border-zinc-300 rounded"  type="text"/>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-black" htmlFor="">Cidade: </label>          
              <input {...register('cidade')} className="text-black border-2  border-zinc-300 rounded"  type="text"/>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-black" htmlFor="">Estado: </label>          
              <input {...register('estado')} className="text-black border-2  border-zinc-300 rounded"  type="text"/>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-black" htmlFor="">Bairro: </label>          
              <input {...register('bairro')} className="text-black border-2  border-zinc-300 rounded-"  type="text"/>
            </div>

              <button className="text-black border-2 rounded-md mt-5" type="submit">Criar Empresa</button>
            </form> 
          </div>   
        </main>
      </>
    )
  }