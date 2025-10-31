"use client"
import React from 'react'
import Header from '@/components/Header/Header'
import HowCalculated from '@/components/Info/HowCalculated'
import GPATable from '@/components/Table/GPATable'
import All_Semesters from '@/components/AllSemesters/All_Semesters'

const HomePage = () => {
  return (
    <div className='py-10 lg:py-20'>
      <Header />
      <All_Semesters />
      <HowCalculated />
    </div>
  )
}

export default HomePage