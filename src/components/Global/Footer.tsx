import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Email from "@/assets/icons/email.svg"

const Footer = () => {
  return (
    <div className='bg-black text-white px-5 pt-5 pb-10 grow'>
      <div className='flex flex-col md:flex-row gap-y-10 md:justify-between'>      
        <div className='text-sm'>
            <h2 className='font-semibold mb-3 pb-2 border-b-2 border-white w-max'>ISBAT University GPA Calculator</h2>
            <h3><span className='text-red-500'>Disclaimer:</span> This is not an official ISBAT University GPA Calculator.<br/>This is a side project to help fellow ISBAT students calculate there GPA.</h3>
        </div>

        <Link href={"mailto:dev.simonddungu@gmail.com"} className='text-white flex flex-row gap-x-2 items-center text-sm'>
          <Image src={Email} alt='email' className='size-6 object-contain'/>
          <span>dev.simonddungu@gmail.com</span>
        </Link>
      </div>
    </div>
  )
}

export default Footer