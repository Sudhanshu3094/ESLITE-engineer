import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const RelatedEngineers = ({speciality,engId}) => {

    const {engineers}= useContext(AppContext)
    const navigate = useNavigate()
    const [relEng,setRelEng]=useState([])

    useEffect(()=>{
        if(engineers.length > 0 && speciality){
            const engineersData = engineers.filter((eng)=> eng.speciality === speciality && eng._id !== engId)
            setRelEng(engineersData)
        }
    },[engineers,speciality,engId])
  return (
    <div>
      <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
      <h1 className='text-3xl font-medium'>Related Specialist</h1>
      <p className='sm:w-1/3 text-center text-sm'>Browse our extensive list of reliable engineer.</p>
      <div className='w-full grid [grid-template-columns:repeat(auto-fill,minmax(200px,1fr))] gap-4 gap-y-6 pt-5 px-3 sm:px-0'>
        {relEng.slice(0,5).map((item,index)=>(
              <div onClick={()=>{navigate(`/Meeting/${item._id}`); scrollTo(0,0)} }className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
                <img className='bg-blue-50' src={item.image} alt="" />
                <div className='p-4'>
                    <div className={`flex items-center gap-2 text-sm text-center ${item.available ? ' text-green-500' :' text-gray-500'}`}>
                        <p className={`w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-gray-500'}  rounded-full `}></p><p >{item.available ? 'Available' : ' Not Available'}</p>
                    </div>
                    <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                    <p className='text-gray-800 text-sm'>{item.speciality}</p>
                </div>
              </div>
        ))}
      </div>
      <button onClick={()=>{navigate('/engineers');scrollTo(0,0)}} className='bg-amber-100 text-gray-600 px-12 py-3 rounded-full mt-10'>more</button>
    </div>
    </div>
  )
}

export default RelatedEngineers
