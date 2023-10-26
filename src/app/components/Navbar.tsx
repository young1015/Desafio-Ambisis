import Link from "next/link"
import React from "react"
import { BsFillBuildingFill } from 'react-icons/bs';

const Navbar = () => {
    return (
        <nav className="w-full flex space-x-5 border-b mb-5 px-5 items-center h-14">
        
                <Link href="/"><BsFillBuildingFill/></Link>
                <ul className="flex space-x-5 ">
                    <li><Link className="text-zinc-500 hover:text-slate-800 transition-colors text-lg" href="/empresas/new">Cadastrar Empresa</Link></li>
                    <li><Link className="text-zinc-500 hover:text-slate-800 transition-colors text-lg" href="/licencas/new">Cadastrar Licença</Link></li>
                </ul>  
             
        </nav>
    )

}

export default Navbar