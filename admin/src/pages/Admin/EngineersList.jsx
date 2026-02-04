import { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const EngineersList = () => {

  const { engineers, aToken, getAllEngineers , changeAvailability } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getAllEngineers()
    }
  }, [aToken])
  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium'>All Engineers</h1>
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {
          engineers.map((item,index)=>(
            <div className='border border-red-200 rounded-xl max-w-53 overflow-hidden cursor-pointer group' key={index}>
               
               <img className='bg-red-50 group-hover:bg-red-500 transition-all duration-500' src={item.image} alt="" />
               <div className='p-4'>
                <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
                <p className='text-zinc-600 text-sm'>{item.speciality}</p>
                <div className='mt-2 flex items-center gap-1 text-sm'>
                  <input onChange={()=> changeAvailability(item._id)} type="checkbox" checked={item.available} />
                  <p>Available</p>
                </div>
               </div>
               
            </div>

          ))
        }
      </div>
    </div>
  )
}

export default EngineersList



