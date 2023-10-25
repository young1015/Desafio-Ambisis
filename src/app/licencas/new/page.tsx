"use client"

import Link from "next/link"
import React, { useState } from "react"
import axios from 'axios'
import { useForm, Controller} from 'react-hook-form'
import { useRouter } from "next/navigation"
import { zodResolver } from '@hookform/resolvers/zod'
import { criarLicencaSchema } from "@/app/Schemas/validarLicencaSchema" 
import { z } from 'zod'
import ErrorMessage from "@/app/components/ErrorMessage"

 type LicencaForm = z.infer<typeof criarLicencaSchema>;
 
export default function Home() {
  const router = useRouter();
  const { register, control, handleSubmit, formState: { errors } } =  useForm<LicencaForm>({
    resolver: zodResolver(criarLicencaSchema)
  });
  const [error, setError] = useState('');

    return (
      <>
        <main>
        <h1 className="text-4xl text-center">Cadastrar Licença</h1>
          <div className=" bg-zinc-50 flex items-center justify-center">
            <form className="flex flex-col gap-4 w-full max-w-xs" onSubmit={handleSubmit(async (data) => {
              try {
                await axios.post('/API/routes/licencasRoute', data);
                router.push('/empresas/new');
              } catch (error) {
                setError('Ocorreu um erro inesperado.')
              }
              
            })}>

              <div className="flex flex-col gap-1">
               <label className="text-black" htmlFor="numero">Número: </label>
               <input {...register('numero')} className="text-black border-2 border-zinc-300 rounded"  type="text"/> 
               <ErrorMessage>{errors.numero?.message}</ErrorMessage>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-black" htmlFor="">Orgão Ambiental: </label>          
                <input {...register('orgaoAmbiental')} className="text-black border-2  border-zinc-300 rounded"  type="text"/>
               <ErrorMessage>{errors.orgaoAmbiental?.message}</ErrorMessage>
              </div>

            <div className="flex flex-col gap-1">
              <label className="text-black" htmlFor="">Emissão: </label>          
              <input {...register('emissao')} className="text-black border-2  border-zinc-300 rounded"  type="text"/>
              <ErrorMessage>{errors.emissao?.message}</ErrorMessage>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-black" htmlFor="">Validade: </label>          
              <input {...register('validade')} className="text-black border-2  border-zinc-300 rounded"  type="text"/>
               <ErrorMessage>{errors.validade?.message}</ErrorMessage>
            </div>

              <button className="text-black border-2 rounded-md mt-5" type="submit">Criar Licença</button>
            </form> 
          </div>   
        </main>
      </>
    )
  }