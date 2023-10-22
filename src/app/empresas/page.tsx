import prisma from "../../../prisma/client";

export default function Home() {

 async function retornarEmpresas() {
  const empresas = await prisma.empresa.findMany();

 }

  return (
    <>
      <main>
        <div>
          <h1 className="text-4xl text-center">Empresas Existentes</h1>
          <section className="px-10 py-10 border-[#ffffff] text-black border-2 m-20 bg-[#a3a3a3] bg-opacity-50">

            

          </section>
        </div>
      </main>
    </>
  )
}