"use client"

import Link from "next/link"
import React, { ReactNode, useEffect, useState } from "react"
import axios from 'axios'
import { useForm, Controller } from 'react-hook-form'
import { useRouter } from "next/navigation"
import { zodResolver } from '@hookform/resolvers/zod'
import { criarEmpresaSchema } from "@/app/Schemas/validarEmpresaSchema"
import { z } from 'zod'
import ErrorMessage from "@/app/components/ErrorMessage"


type EmpresaForm = z.infer<typeof criarEmpresaSchema>;

export default function criarEmpresa() {
  const [handleModal, setHandleModal] = useState(false)
  const router = useRouter();
  const { register, control, handleSubmit, formState: { errors } } = useForm<EmpresaForm>({
    resolver: zodResolver(criarEmpresaSchema)
  });
  
  const [error, setError] = useState('');

  return (
    <>
      <main>
        <h1 className="text-4xl text-center">Cadastrar Empresa</h1>
        <div className="h-5/6 bg-zinc-50 flex items-center justify-center">
          <form id="formEmpresa" className="flex  flex-col gap-2 w-full max-w-xs" onSubmit={handleSubmit(async (data) => {

            try {
              await axios.post('/API/routes/empresasRoute', data);
              router.push('/');
            } catch (error) {
              setError('Ocorreu um erro inesperado.')
            }
          })}>

            <div className="flex flex-col gap-1">
              <label className="text-black" htmlFor="razaoSocial">Razão Social: </label>
              <input id="razaoSocial" {...register('razaoSocial')} className="text-black border-2 border-zinc-300 rounded" type="text" />
              <ErrorMessage>{errors.razaoSocial?.message}</ErrorMessage>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-black" htmlFor="">CNPJ: </label>
              <input id="cnpj"  {...register('cnpj')} className="text-black border-2  border-zinc-300 rounded" type="text" />
              <ErrorMessage>{errors.cnpj?.message}</ErrorMessage>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-black" htmlFor="">CEP: </label>
              <input id="cep"  {...register('cep')} className="text-black border-2  border-zinc-300 rounded" type="text" />
              <ErrorMessage>{errors.cep?.message}</ErrorMessage>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-black" htmlFor="">Cidade: </label>
              <input id="cidade"  {...register('cidade')} className="text-black border-2  border-zinc-300 rounded" type="text" />
              <ErrorMessage>{errors.cidade?.message}</ErrorMessage>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-black" htmlFor="">Estado: </label>
              <input id="estado"  {...register('estado')} className="text-black border-2  border-zinc-300 rounded" type="text" />
              <ErrorMessage>{errors.estado?.message}</ErrorMessage>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-black" htmlFor="">Bairro: </label>
              <input id="bairro"  {...register('bairro')} className="text-black border-2  border-zinc-300 rounded-" type="text" />
              <ErrorMessage>{errors.bairro?.message}</ErrorMessage>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-black" htmlFor="">Complemento: </label>
              <input id="complemento"  {...register('complemento')} className="text-black border-2  border-zinc-300 rounded-" type="text" />
              <ErrorMessage>{errors.complemento?.message}</ErrorMessage>
            </div>

            <Link href={'/licencas/new'}>
              <button className="flex gap-2">Adicionar Licença</button>
            </Link>
            <button className="text-black border-2 rounded-md mt-5" type="submit">Criar Empresa</button>
          </form>


        </div>
      </main>
    </>
  )
}
