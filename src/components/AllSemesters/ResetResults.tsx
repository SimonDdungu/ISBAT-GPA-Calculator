"use client"
import React from 'react';
import { resetGPA} from '@/interfaces';
import { confirmDialog } from 'primereact/confirmdialog';
import { resetSemesterResults } from '@/redux/slice';
import { useDispatch } from 'react-redux';


const ResetResults = ({id}: resetGPA) => {

    const dispatch = useDispatch()

    const accept = () => {
        dispatch(resetSemesterResults({id}))
    }
    
    const reset = () => {
        confirmDialog({
            message: 'Are you sure you want to reset your results?',
            header: 'Reset Results',
            icon: 'pi pi-replay',
            accept
        });
    };

    
  return (
    <div>
        <button onClick={reset} className="text-xs md:text-sm flex items-center gap-x-2 bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-950 transition md:ml-auto w-max cursor-pointer">
            <i className="pi pi-replay  md:text-sm text-xs"></i>
            <span>Reset Results</span>
        </button>
    </div>
  )
}

export default ResetResults