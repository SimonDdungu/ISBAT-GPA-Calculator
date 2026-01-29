"use client"
import React, { useEffect, useState } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import AddResults from './AddResults';
import ActionButton from './ActionButton';
import ResetResults from './ResetResults'
import Export from '../Exports/Export';
import { SemesterTableData } from '@/interfaces';
import { useDispatch } from "react-redux";
import { updateSemesterResults, setSemesterGPA } from "@/redux/slice";


const SemesterTable = ({semesterName ,id, results}: SemesterTableData) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const totalCredits = results.reduce((sum, row) => sum + row.credit, 0);
  const totalGradePoints = results.reduce((sum, row) => sum + row.weightedGradePoints, 0);

  const GPA = totalCredits ? totalGradePoints / totalCredits : 0;

  const validResults = results.length >= 4;

  useEffect(() => {
     if(results.length >= 4){
        dispatch(setSemesterGPA({ id: id, gpa: GPA }));
      }else{
        dispatch(setSemesterGPA({ id: id, gpa: null }));
      }
      
  }, [results.length, GPA, id, dispatch]);


  return (
    <div>
      <div className='mb-8 flex flex-col gap-y-4 md:flex-row md:justify-between md:items-center'>
        <div className='flex items-center gap-x-5'>
           <AddResults id={id}/>
           <ResetResults id={id} />
        </div>

        <div>
          <Export semester={semesterName} results={results} gpa={GPA} totalCredit={totalCredits} totalGradePoints={totalGradePoints}/>
        </div>
      </div>
         
      
      <div className="card origin-top-left  scale-[0.8] sm:scale-100 w-[125%] sm:w-full">
            <DataTable value={results} size='small' className='text-sm' loading={loading} removableSort stripedRows scrollable scrollHeight="400px" showGridlines  tableStyle={{ minWidth: '50rem' }} emptyMessage="No semeter results added yet.">
                <Column field="unitName" sortable header="Unit Name" style={{ width: '10%' }}></Column>
                <Column field="iaMarks" sortable header="IA Marks" style={{ width: '5%' }}></Column>
                <Column field="ueMarks" sortable header="UE Marks" style={{ width: '5%' }}></Column>
                <Column field="totalScore" sortable header="Total Score" style={{ width: '5%' }}></Column>
                <Column field="grade" sortable header="Grade" style={{ width: '5%' }}></Column>
                <Column field="points" sortable header="Points" style={{ width: '5%' }}></Column>
                <Column field="credit" sortable header="Credit" style={{ width: '5%' }}></Column>
                <Column field="weightedGradePoints" sortable header="Grade Points" style={{ width: '5%' }}></Column>
                <Column body={(_, options) => (<ActionButton id={id} rowIndex={options.rowIndex} rowData={results[options.rowIndex]}/> )} header="Actions" style={{ width: '5%' }} />
            </DataTable>
        </div>

      {validResults ? 
        <div className='-mt-5 flex flex-col md:flex-row md:justify-between md:items-center sm:mt-10 text-sm text-black'>
          <div>
            <p><span className='font-semibold'>GPA:</span> {GPA.toFixed(2)}</p>
          </div>
          <div className='flex flex-col md:flex-row gap-x-10'>
            <p><span className='font-semibold'>Total Credit: {totalCredits}</span> </p>
            <p><span className='font-semibold'>Total Grade Points:</span> {totalGradePoints}</p>
          </div>
        </div>

        :

        <div className='font-semibold text-sm mt-10 text-gray-700 flex flex-row gap-x-2 items-center'>
          <i className='pi pi-info-circle'></i>
          <span>At least 4 Course Units are required to calculate GPA, CGPA and download results.</span>
         </div>

        }
    </div>
  )
}

export default SemesterTable