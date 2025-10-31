"use client"
import React, { useState } from 'react'
import { TabView, TabPanel } from 'primereact/tabview';
import SemesterTable from './SemesterTable';
import { initialSemesters } from '@/interfaces';
import { useSelector } from "react-redux";
import { RootState } from '@/redux/store';
import { Calculate_CGPA } from '@/redux/CGPA';

const All_Semesters = () => {
    const semesters = useSelector((state: RootState) => state.semesters);
    const total_cgpa = useSelector((state: RootState) => Calculate_CGPA(state));
    //const [semesters, setSemesters] = useState<any>(initialSemesters)

    // const addCourse = (index: number, addedResults: any) => {
    //     const updatedSemesters = [...semesters];
    //     updatedSemesters[index].results.push(addedResults);
    //     setSemesters(updatedSemesters);
    // };

  return (
        <div className="lg:px-10">
            <TabView scrollable>
               {semesters.map((sem: any, index: any) => {
                    return (
                   <TabPanel header={sem.name} key={index} className='text-sm'>
                    <SemesterTable
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