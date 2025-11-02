import React from 'react'
import GradingTable from './GradingTable'

const HowCalculated = () => {
  return (
    <div className='px-2 lg:px-10 mt-15'>
        <div className='px-3 py-5 lg:px-5 border-2 border-gray-200 rounded-lg lg:w-max text-sm lg:text-base mx-auto'>
            <h2 className='text-lg font-semibold mb-3'>How is GPA being calculated?</h2>
            <div className='space-y-2 text-gray-700'>
              <p>- Credit are the total number of hours a Course Unit is taught in a week.</p>
              <p>- Internal Assements (IA) are results of Coursework and Tests combined to give a final score marked out of 30.</p>
              <p>- University Exams (UE) are results from the End of Semenster Exams marked out of 70.</p>
              <p>- Total Score is a result of adding Internal Assements with University Exams to give a final score out of 100.</p>
              <p>- The Minimum Total score required to pass a Course Unit is 50. Below 50 is considered a retake.</p>
              <p>- Below is the criteria used to award points and grades:</p>
              <GradingTable />

              <p>-Each Grade point is calculated from: <span className='font-semibold'>Grade Point = Credit x Points</span></p>
              <p>-The Final GPA (Grade Point Average) is calculated from: <span className='font-semibold'>GPA = Total Grade Points / Total Credit</span></p>
              <p>-CGPA (Cumulative Grade Point Average) is calculated from: <span className='font-semibold'>CGPA = Total GPA across semesters / Number of Semesters</span></p>
            </div>
        </div>
    </div>
  )
}

export default HowCalculated