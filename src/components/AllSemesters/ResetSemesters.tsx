import React from 'react'
import { resetAllSemesters } from '@/redux/slice'
import { confirmDialog } from 'primereact/confirmdialog';
import { useDispatch } from 'react-redux'

const ResetSemesters = () => {
    const dispatch = useDispatch()

    const accept = () => {
        dispatch(resetAllSemesters())
    }
    
    const reset = () => {
        confirmDialog({
            message: 'Are you sure you want to reset all your semester results?',
            header: 'Reset Semester Results',
            icon: 'pi pi-replay',
            acceptClassName: 'p-button-danger',
            rejectClassName: 'text-gray-700 bg-white border-none',
            accept
        });
    };

  return (
    <button className='px-5 py-2 bg-white border-1 border-red-700 rounded-lg text-sm text-red-700 cursor-pointer font-semibold' onClick={reset}>
        Reset Semesters
    </button>
  )
}

export default ResetSemesters