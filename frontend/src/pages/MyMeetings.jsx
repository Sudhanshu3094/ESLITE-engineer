import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import {useNavigate} from 'react-router-dom'

const MyMeetings = () => {
  const { backendUrl, token ,getEngineersData } = useContext(AppContext)

  const [meetings,setMeetings] = useState([])

  const months =["","Jan","Feb","Mar","Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec"]

  const slotDateFormat = (slotDate) =>{
    const dateArray = slotDate.split('_')
      return dateArray[0]+ " " + months[Number(dateArray[1])] + " " + dateArray[2]
  }
  

  const navigate = useNavigate()



  const getUserMeetings = async ()=>{
    try {
      const {data} = await axios.get(backendUrl + '/api/user/meetings',{headers:{token}})

      if(data.success){
        setMeetings(data.meetings.reverse())
        console.log(data.meetings);
        
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }
  }

  const cancelMeeting = async (meetingId) =>{

    try {
      
      const {data} = await axios.post(backendUrl +'/api/user/cancel-meeting',{meetingId},{headers:{token}})
       
      if(data.success){
        toast.success(data.message)
        getUserMeetings()
        getEngineersData()


      }else{
        toast.error(data.message)
      }
      


    } catch (error) {
         console.log(error);
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if(token){
        getUserMeetings()
    }
  },[token])

  return (
    <div>
      <p className='p-3 mt-12 font-medium text-zinc-700 border-b'>My meetings</p>
      <div>
        {meetings.map((item,index)=>(
          <div className='grid grid-cols-[1fr_2fr]  gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
            <div>
              <img className='w-32 bg-red-300 ' src={item.engData?.image} alt="" />
            </div>
            <div className='flex-1 text-sm text-zinc-600'>
              <p className='text-neutral-800 font-semibold'>{item.engData.name}</p>
              <p>{item.engData.speciality}</p>
              <p className='text-zinc-700 font-medium mt-1'>Address:</p>
              <p className='text-xs'>{item.engData.address.line1}</p>
              <p className='text-xs'>{item.engData.address.line2}</p>
              <p className='text-xs mt-1'><span className='text-sm text-neutral-700 font-medium' >Date & Time:</span> {slotDateFormat(item.slotDate)}| {item.slotTime} </p>
            </div>
            <div></div>
            <div className='flex flex-col gap-2 justify-end '>
              {!item.cancelled && !item.isCompleted &&
              <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-green-700 hover:text-white transition-all duration-300'>Pay Online</button>}
              {!item.cancelled && !item.isCompleted &&
              <button onClick={()=> cancelMeeting(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded  hover:bg-red-700 hover:text-white transition-all duration-300'>Cancel Meeting</button>}

              {
                item.cancelled && !item.isCompleted && <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>Meeting Cancelled</button>
              }
              {item.isCompleted && <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500'>Completed</button>}
            </div>

          </div>
        ))}
      </div >
    </div>
  )
}

export default MyMeetings


// import React, { useContext, useEffect, useState } from 'react'
// import { AppContext } from '../context/AppContext'
// import axios from 'axios'
// import { toast } from 'react-toastify'

// const MyMeetings = () => {

//   const { backendUrl, token } = useContext(AppContext)
//   const [meetings, setMeetings] = useState([])

//   const getUserMeetings = async () => {
//     try {
//       const { data } = await axios.get(
//         `${backendUrl}/api/user/meetings`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         }
//       )

//       console.log("Meetings API response:", data)

//       if (data.success) {
//         setMeetings(data.meetings.reverse())
//       } else {
//         toast.error(data.message)
//       }

//     } catch (error) {
//       console.log(error)
//       toast.error(error.message)
//     }
//   }

//   useEffect(() => {
//     if (token) {
//       getUserMeetings()
//     }
//   }, [token])

//   return (
//     <div className="px-4">
//       <p className='p-3 mt-12 font-medium text-zinc-700 border-b'>
//         My Meetings
//       </p>

//       {meetings.length === 0 && (
//         <p className="text-center text-zinc-500 mt-5">
//           No meetings found
//         </p>
//       )}

//       {meetings.map((item, index) => (
//         <div
//           key={index}
//           className='grid grid-cols-[1fr_2fr] sm:flex gap-6 py-4 border-b'
//         >
//           <img
//             className='w-32 rounded bg-gray-100'
//             src={item.engData?.image}
//             alt=""
//           />

//           <div className='flex-1 text-sm text-zinc-600'>
//             <p className='text-neutral-800 font-semibold'>
//               {item.engData?.className}
//             </p>
//             <p>{item.engData?.speciality}</p>

//             <p className='text-zinc-700 font-medium mt-1'>Address:</p>
//             <p className='text-xs'>
//               {item.engData?.address?.line1}
//             </p>
//             <p className='text-xs'>
//               {item.engData?.address?.line2}
//             </p>

//             <p className='text-xs mt-1'>
//               <span className='text-sm font-medium'>
//                 Date & Time:
//               </span>
//               {" "}
//               {item.slotDate} | {item.slotTime}
//             </p>
//           </div>

//           <div className='flex flex-col gap-2 justify-end'>
//             <button className='sm:min-w-48 py-2 border rounded hover:bg-green-700 hover:text-white transition'>
//               Pay Online
//             </button>
//             <button className='sm:min-w-48 py-2 border rounded hover:bg-red-700 hover:text-white transition'>
//               Cancel Meeting
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   )
// }

// export default MyMeetings
