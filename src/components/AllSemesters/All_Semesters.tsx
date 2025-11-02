"use client"
import React, { useState } from 'react'
import { TabView, TabPanel } from 'primereact/tabview';
import SemesterTable from './SemesterTable';
import { initialSemesters } from '@/interfaces';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '@/redux/store';
import { Calculate_CGPA } from '@/redux/CGPA';
import AddSemester from './AddSemester';
import ResetSemesters from './ResetSemesters';
import { removeSemester } from '@/redux/slice';
import ExportAllSemesters from '../Exports/ExportAllSemesters';

const All_Semesters = () => {
    const dispatch = useDispatch()
    const semesters = useSelector((state: RootState) => state.semesters);
    const total_cgpa = useSelector((state: RootState) => Calculate_CGPA(state));
    //const [activeIndex, setActiveIndex] = useState(0);


    const handleCloseSemester = (index: number) => {
        dispatch(removeSemester({index}))

    }

  return (
        <div className="lg:px-10">
            <div className='px-5 lg:px-0 flex flex-col md:flex-row md:justify-end md:items-center gap-x-5 gap-y-2 mb-5'>
                <ExportAllSemesters semesters={semesters}/>
                <ResetSemesters />
            </div>
            <TabView scrollable 
            >
               {semesters.map((sem: any, index: any) => {
                    return (
                   <TabPanel header={sem.name} key={index} className='text-sm'>
                    <SemesterTable
                        semesterName={sem.name}
                        id={sem.id}
                        results={sem.results}
                    />
                    </TabPanel>)
                })}
            </TabView>

            <p className='px-5'><span className='font-semibold text-sm mt-5'>CGPA:</span> {total_cgpa.toFixed(2)}</p>
        </div>
  )
}

export default All_Semesters