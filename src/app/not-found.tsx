"use client"
import Image from "next/image"
import { redirect } from "next/navigation"
import Student from "@/assets/images/404.webp"

export default function NotFound(){
  return (
    <section className='w-screen pt-15 flex items-end justify-center  text-black'>
      <div className="flex flex-col-reverse lg:flex-row  items-center gap-y-5">
        <div className="w-80 md:w-130">
          <Image src={Student} alt="404 image" className="w-full h-full object-cover"/>
        </div>


        <div>
          <div className="text-center space-y-5 mb-5 md:mb-10">
            <h1 className='font-semibold tracking-wider text-xl lg:text-3xl'>404 | PAGE NOT FOUND</h1>
            <p className='text-gray-700 text-sm md:text-lg'>{"Don't worry! it's not your fault."}</p>
          </div>


          <button onClick={() => redirect('/')} className="text-sm lg:text-base block w-max mx-auto cursor-pointer px-4 py-2 bg-red-900 text-white rounded-lg hover:bg-red-800 transition-colors ease-in-out duration-300">
            Back to Dashboard
          </button>
        </div>
      </div>
    </section>
  )
}