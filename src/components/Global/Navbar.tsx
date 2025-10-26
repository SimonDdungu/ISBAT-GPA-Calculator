"use client"
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Logo from "@/assets/logo/isbat-university-logo.png"
import Link from 'next/link'
import Hamburger from 'hamburger-react'

const Navbar = () => {
    const [isOpen, setOpen] = useState(false)
    const Mobile_Menu = useRef<HTMLDivElement>(null)

    useEffect(() => {
            const close_nav = (e: Event) => {
                if(Mobile_Menu.current && !Mobile_Menu.current.contains(e.target as Node)){
                    setOpen(false);
                }
            }
    
            document.addEventListener("click", close_nav)
            document.addEventListener("scroll", close_nav)
    
            return () => {
                document.removeEventListener("click", close_nav)
                document.removeEventListener("scroll", close_nav)
            }
            
    }, [isOpen]);

    
  return (
    <header className='sticky top-0 z-999 w-full bg-white'>
        <div className='py-4 px-5 flex flex-row justify-between items-center relative shadow-sm'>

        
            <div className='w-50 pointer-events-none'>
                <Image src={Logo} alt='ISBAT University Logo' className='w-full h-full object-contain'/>
            </div>

            <button className='text-red-800 lg:hidden'>
                <Hamburger toggled={isOpen} toggle={setOpen} size={20}/>
            </button>

            <div className='hidden lg:flex flex-row gap-x-10 text-sm'>
                <Link target='_blank' rel="noopener noreferrer" href={'https://www.isbatuniversity.ac.ug/'} className='px-5 py-2 bg-red-800 text-white rounded-lg flex gap-x-3 items-center hover:bg-red-900 transition-colors'>
                    <i className='pi pi-globe'></i>
                    <span>ISBAT University</span>
                </Link>

                <Link target='_blank' rel="noopener noreferrer" href={'https://erp.isbatuniversity.ac.ug/frmStudentLogin.aspx'} className='px-5 py-2 bg-blue-100 text-blue-900  rounded-lg flex gap-x-3 items-center hover:bg-blue-200 transition-colors'>
                    <i className='pi pi-user'></i>
                    <span>Student Portal</span>
                </Link>

                <Link target='_blank' rel="noopener noreferrer" href={'https://ilearn.isbatuniversity.ac.ug/login'} className='px-5 py-2 bg-blue-900 text-white rounded-lg flex gap-x-3 items-center hover:bg-blue-800 transition-colors'>
                    <i className='pi pi-book'></i>
                    <span>iLearn Portal</span>
                </Link>
            </div>


            {/* Mobile Nav */}
            <div ref={Mobile_Menu} className={`lg:hidden flex flex-col gap-y-5 h-60 shadow-sm text-sm absolute top-full left-0 right-0 bg-white/95 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"} transition duration-150  p-5`}>
                <Link target='_blank' rel="noopener noreferrer" href={'https://www.isbatuniversity.ac.ug/'} className='w-60 px-5 py-2 bg-red-800 text-white rounded-lg flex gap-x-3 items-center hover:bg-red-900 transition-colors'>
                    <i className='pi pi-globe'></i>
                    <span>ISBAT University</span>
                </Link>

                <Link target='_blank' rel="noopener noreferrer" href={'https://erp.isbatuniversity.ac.ug/frmStudentLogin.aspx'} className='w-60 px-5 py-2 bg-blue-100 text-blue-900  rounded-lg flex gap-x-3 items-center hover:bg-blue-200 transition-colors'>
                    <i className='pi pi-user'></i>
                    <span>Student Portal</span>
                </Link>

                <Link target='_blank' rel="noopener noreferrer" href={'https://ilearn.isbatuniversity.ac.ug/login'} className='w-60 px-5 py-2 bg-blue-900 text-white rounded-lg flex gap-x-3 items-center hover:bg-blue-800 transition-colors'>
                    <i className='pi pi-book'></i>
                    <span>iLearn Portal</span>
                </Link>

            </div>
        </div>

    </header>
  )
}

export default Navbar