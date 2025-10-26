import React from 'react'
import {BeatLoader} from "react-spinners"

const loading = () => {
  return (
    <div className="w-screen h-[70vh] flex flex-col justify-center items-center z-20 bg-white">
        <BeatLoader 
        color="#c10007"
        />
    </div>
  )
}

export default loading