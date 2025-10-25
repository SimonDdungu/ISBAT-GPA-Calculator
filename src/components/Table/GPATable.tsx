"use client"
import React, { useState } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { GpaAttributes, initialResults } from '@/interfaces';
import AddResults from './AddResults';
import ActionButton from './ActionButton';
import { dummyResults } from '@/interfaces';
import ResetResults from './ResetResults';
import Export from '../Exports/Export';


const GPATable = () => {
  const [results, setResults] = useState<any[]>(dummyResults)


  const totalCredits = results.reduce((sum, row) => sum + row.credit, 0);
  const totalGradePoints = results.reduce((sum, row) => sum + row.weightedGradePoints, 0);

  const GPA = totalCredits ? totalGradePoints / totalCredits : 0

  let validResults = false

  if(results.length >= 4){
    validResults = true
  }else{
    validResults = false
  }

  return (
    <div className='px-3 lg:px-10'>
      <div className='mb-8 flex flex-col gap-y-4 md:flex-row md:justify-between md:items-center'>
        <div className='flex items-center gap-x-5'>
           <AddResults setResults={setResults} results={results}/>
           <ResetResults setResults={setResults} />
        </div>

        <div>
          <Export results={results} gpa={GPA} totalCredit={totalCredits} totalGradePoints={totalGradePoints}/>
        </div>
      </div>
         
      
      <div className="card">
            <DataTable value={results} size='small' className='text-sm' removableSort stripedRows scrollable scrollHeight="400px" showGridlines  tableStyle={{ minWidth: '50rem' }} emptyMessage="No semeter results added yet.">
                <Column field="unitName" sortable header="Unit Name" style={{ width: '10%' }}></Column>
                <Column field="iaMarks" sortable header="IA Marks" style={{ width: '5%' }}></Column>
                <Column field="ueMarks" sortable header="UE Marks" style={{ width: '5%' }}></Column>
                <Column field="totalScore" sortable header="Total Score" style={{ width: '5%' }}></Column>
                <Column field="grade" sortable header="Grade" style={{ width: '5%' }}></Column>
                <Column field="points" sortable header="Points" style={{ width: '5%' }}></Column>
                <Column field="credit" sortable header="Credit" style={{ width: '5%' }}></Column>
                <Column field="weightedGradePoints" sortable header="Grade Points" style={{ width: '5%' }}></Column>
                <Column body={(_, options) => (<ActionButton rowIndex={options.rowIndex} rowData={results[options.rowIndex]} setResults={setResults}/> )} header="Actions" style={{ width: '5%' }} />
            </DataTable>
        </div>

      {validResults ? 
        <div className='flex flex-col md:flex-row md:justify-between md:items-center mt-10 text-sm'>
          <div>
            <p><span className='font-semibold'>GPA:</span> {GPA.toFixed(2)}</p>
          </div>
          <div className='flex flex-col md:flex-row gap-x-10'>
            <p><span className='font-semibold'>Total Credit: {totalCredits}</span> </p>
            <p><span className='font-semibold'>Total Grade Points:</span> {totalGradePoints}</p>
          </div>
        </div>

        :

        <div className='font-semibold text-sm mt-10'>At least 4 Course Units are required to calculate GPA. </div>

        }
    </div>
  )
}

export default GPATable