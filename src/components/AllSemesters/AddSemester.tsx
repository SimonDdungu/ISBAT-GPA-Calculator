import React from 'react'
import { addSemester } from '@/redux/slice'
import { useDispatch } from 'react-redux'

const AddSemester = () => {
    const dispatch = useDispatch()

    const addSemetser = () => {
        dispatch(addSemester())
    }
  return (
    <button className='px-5 py-2 bg-white border-1 border-blue-700 rounded-lg text-sm text-blue-700 cursor-pointer font-semibold' onClick={addSemetser}>
        Add Semester
    </button>
  )
}

export default AddSemester