import React from 'react'
import Header from '@/components/Header/Header'
import HowCalculated from '@/components/Info/HowCalculated'
import GPATable from '@/components/Table/GPATable'

const HomePage = () => {
  return (
    <div className='py-10 lg:py-20'>
      <Header />
      <GPATable />
      <HowCalculated />
    </div>
  )
}

export default HomePage