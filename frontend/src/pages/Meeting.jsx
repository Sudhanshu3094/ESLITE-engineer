// import React, { useContext, useEffect, useState } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
// import { AppContext } from '../context/AppContext'
// import { assets } from '../assets/assets'
// import RelatedEngineers from '../components/RelatedEngineers'
// import { toast } from 'react-toastify'
// import axios from 'axios'

// const Meeting = () => {
//   const { engId } = useParams()
//   const { engineers, currencySymbol, backendUrl, token, getEngineersData } = useContext(AppContext)
//   const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

//   const navigate = useNavigate()

//   const [engInfo, setEngInfo] = useState(null)
//   const [engSlots, setEngSlots] = useState([])
//   const [slotIndex, setSlotIndex] = useState(0)
//   const [slotTime, setSlotTime] = useState((''))
//   const fetchEngInfo = async () => {
//     const engInfo = engineers.find(eng => eng._id === engId)
//     setEngInfo(engInfo)


//   }

//   const getAvailableSlots = async () => {
//     setEngSlots([])
//     //getting current date
//     let today = new Date()

//     for (let i = 0; i < 7; i++) {
//       // getting date with index
//       let currentDate = new Date(today)
//       currentDate.setDate(today.getDate() + i)
//       //setting end time of the date with index
//       let endTime = new Date()
//       endTime.setDate(today.getDate() + i)
//       endTime.setHours(21, 0, 0, 0)
//       // setting hours
//       if (today.getDate() === currentDate.getDate()) {
//         currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
//         currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
//       } else {
//         currentDate.setHours(10)
//         currentDate.setMinutes(0)
//       }

//       let timeSlots = []
//       while (currentDate < endTime) {
//         let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

//         let day = currentDate.getDate()
//         let month = currentDate.getMonth() + 1
//         let year = currentDate.getFullYear()

//         const slotDate = day + "_" + month + "_" + year
//         const slotTime = formattedTime
//         const isSlotAvailable = engInfo.slots_booked[slotDate] && engInfo.slots_booked[slotDate].includes(slotTime) ? false : true


//         if (isSlotAvailable) {
//           //add slot to array
//           timeSlots.push({
//             datetime: new Date(currentDate),
//             time: formattedTime
//           })
//         }



//         // Increment current time by 30 minutes
//         currentDate.setMinutes(currentDate.getMinutes() + 30)
//       }
//       setEngSlots(prev => ([...prev, timeSlots]))
//     }
//   }

//   const bookMeeting = async () => {

//     if (!token) {
//       toast.warn('login to book meetings')
//       return navigate('/login')
//     }
//     try {
//       const date = engSlots[slotIndex][0].datetime

//       let day = date.getDate()
//       let month = date.getMonth() + 1
//       let year = date.getFullYear()

//       const slotDate = day + "_" + month + "_" + year

//       const { data } = await axios.post(backendUrl + '/api/user/book-meeting', { engId, slotDate, slotTime }, { headers: { token } })

//       if (data.success) {
//         toast.success(data.message)
//         getEngineersData()
//         navigate('/my-meetings')
//       } else {
//         toast.error(data.message)
//       }

//     } catch (error) {
//       console.log(error)
//       toast.error(error.message)
//     }
//   }

//   useEffect(() => {
//     fetchEngInfo()
//   }, [engineers, engId])

//   useEffect(() => {
//     getAvailableSlots()
//   }, [engInfo])

//   useEffect(() => {
//     console.log(engSlots);

//   }, [engSlots])
//   return engInfo && (
//     <div>
//       {/* ------------engineer Details----------- */}
//       <div className='flex flex-col sm:flex-row gap-4'>
//         <div >
//           <img className='bg-neutral-200 w-full sm:max-w-72 rounded-lg' src={engInfo.image} alt="" />
//         </div>

//         <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
//           {/* -----------Eng Info : name, degree, experience------------- */}
//           <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
//             {engInfo.name}
//             <img className='w-5' src={assets.verified_icon} alt="" />
//           </p>
//           <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
//             <p>
//               {engInfo.degree} - {engInfo.speciality}
//             </p>
//             <button className='py-0.5 px-2 border text-xs rounded-full'>{engInfo.experience}</button>
//           </div>
//           {/* --------------Engineer About------------------ */}
//           <div>
//             <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>
//               About <img src={assets.info_icon} alt="" />
//             </p>
//             <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{engInfo.about}</p>
//           </div>
//           <p className='text-gray-500 font-medium mt-4'>Meeting fee: <span className='text-gray-600'>{currencySymbol}{engInfo.fees}</span></p>
//         </div>
//       </div>
//       {/* -----------Bookings slots------------ */}
//       <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
//         <p>Booking slots</p>
//         <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
//           {
//             engSlots.length && engSlots.map((item, index) => (
//               //classname{} is a dynamic classes here we use template literals
//               // Dynamic class names = styles change with state or props.
//               //Template literals make it easy to combine static + conditional classes.
//               //Here, it’s used to highlight the selected time slot when clicked.
//               <div onClick={() => setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-red-500 text-white' : 'border border-gray-200'}`} key={index}>
//                 <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
//                 <p>{item[0] && item[0].datetime.getDate()}</p>
//               </div>
//             ))
//           }
//         </div>
//         <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
//           {engSlots.length && engSlots[slotIndex].map((item, index) => (
//             <p onClick={() => setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-red-500 text-white' : 'text-gray-400 border border-gray-300'}`} key={index}>{item.time.toLowerCase()}</p>
//           ))}
//         </div>
//         <button onClick={bookMeeting} className='bg-red-500 text-white text-sm font-light px-14 py-3 rounded-full my-6'>Book an Meeting</button>
//       </div>
//       {/* ---------listing related engineers-------- */}
//       <RelatedEngineers engId={engId} speciality={engInfo.speciality} />
//     </div>
//   )
// }

// export default Meeting



// // Summary

// // Generates 30-minute time slots for a engineers over the next 7 days.

// // Start time:

// // Today: next available slot (not in the past, minimum 10:00 AM)

// // Future days: 10:00 AM

// // End time: 9:00 PM for all days.

// // Each slot is stored as an object with:

// // { datetime: Date object, time: formatted string }


// // Slots are grouped day-wise and stored in engSlots state as an array of arrays.

// // Highlights today’s current time by skipping past slots.

// // Key idea: Automatically builds the engineers available schedule for display in the UI.

import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedEngineers from '../components/RelatedEngineers'
import { toast } from 'react-toastify'
import axios from 'axios'

const Meeting = () => {
  const { engId } = useParams()
  const { engineers, currencySymbol, backendUrl, token, getEngineersData } =
    useContext(AppContext)

  const navigate = useNavigate()

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const [engInfo, setEngInfo] = useState(null)
  const [engSlots, setEngSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  /* ---------------- Fetch Engineer Info ---------------- */
  const fetchEngInfo = () => {
    const info = engineers.find((eng) => eng._id === engId)
    setEngInfo(info)
  }

  /* ---------------- Generate Slots ---------------- */
  const getAvailableSlots = async () => {
    if (!engInfo) return

    setEngSlots([])
    let today = new Date()

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      let endTime = new Date()
      endTime.setDate(today.getDate() + i)
      endTime.setHours(21, 0, 0, 0)

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        )
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      } else {
        currentDate.setHours(10, 0)
      }

      let timeSlots = []

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })

        let day = currentDate.getDate()
        let month = currentDate.getMonth() + 1
        let year = currentDate.getFullYear()

        const slotDate = `${day}_${month}_${year}`

        const isSlotAvailable =
          engInfo.slots_booked?.[slotDate] &&
          engInfo.slots_booked[slotDate].includes(formattedTime)
            ? false
            : true

        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          })
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }

      setEngSlots((prev) => [...prev, timeSlots])
    }
  }

  /* ---------------- Book Meeting ---------------- */
  const bookMeeting = async () => {
    if (!token) {
      toast.warn('login to book meetings')
      return navigate('/login')
    }

    if (!engSlots.length || !engSlots[slotIndex]?.length) return

    try {
      const date = engSlots[slotIndex][0].datetime

      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()

      const slotDate = `${day}_${month}_${year}`

      const { data } = await axios.post(
        backendUrl + '/api/user/book-meeting',
        { engId, slotDate, slotTime },
        { headers: { token } }
      )

      if (data.success) {
        toast.success(data.message)
        getEngineersData()
        navigate('/my-meetings')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  /* ---------------- Effects ---------------- */
  useEffect(() => {
    fetchEngInfo()
  }, [engineers, engId])

  useEffect(() => {
    getAvailableSlots()
  }, [engInfo])

  /* ---------------- Render ---------------- */
  return (
    engInfo && (
      <div>
        {/* Engineer Details */}
        <div className="flex flex-col sm:flex-row gap-4">
          <img
            className="bg-neutral-200 w-full sm:max-w-72 rounded-lg"
            src={engInfo.image}
            alt=""
          />

          <div className="flex-1 border border-gray-400 rounded-lg p-8 bg-white">
            <p className="flex items-center gap-2 text-2xl font-medium">
              {engInfo.name}
              <img className="w-5" src={assets.verified_icon} alt="" />
            </p>

            <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
              <p>
                {engInfo.degree} - {engInfo.speciality}
              </p>
              <button className="border px-2 rounded-full text-xs">
                {engInfo.experience}
              </button>
            </div>

            <p className="flex items-center gap-1 text-sm font-medium mt-3">
              About <img src={assets.info_icon} alt="" />
            </p>

            <p className="text-sm text-gray-500 mt-1">{engInfo.about}</p>

            <p className="mt-4 text-gray-500 font-medium">
              Meeting fee:{' '}
              <span className="text-gray-700">
                {currencySymbol}
                {engInfo.fees}
              </span>
            </p>
          </div>
        </div>

        {/* Booking Slots */}
        <div className="sm:ml-72 mt-6 font-medium text-gray-700">
          <p>Booking slots</p>

          <div className="flex gap-3 overflow-x-auto mt-4">
            {engSlots.map((item, index) => (
              item[0] && (
                <div
                  key={index}
                  onClick={() => {
                    setSlotIndex(index)
                    setSlotTime('')
                  }}
                  className={`cursor-pointer text-center py-6 min-w-16 rounded-full ${
                    slotIndex === index
                      ? 'bg-red-500 text-white'
                      : 'border'
                  }`}
                >
                  <p>{daysOfWeek[item[0].datetime.getDay()]}</p>
                  <p>{item[0].datetime.getDate()}</p>
                </div>
              )
            ))}
          </div>

          <div className="flex gap-3 overflow-x-auto mt-4">
            {engSlots[slotIndex]?.map((item, index) => (
              <p
                key={index}
                onClick={() => setSlotTime(item.time)}
                className={`px-5 py-2 rounded-full cursor-pointer ${
                  item.time === slotTime
                    ? 'bg-red-500 text-white'
                    : 'border text-gray-400'
                }`}
              >
                {item.time.toLowerCase()}
              </p>
            ))}
          </div>

          <button
            onClick={bookMeeting}
            className="bg-red-500 text-white px-14 py-3 rounded-full my-6"
          >
            Book a Meeting
          </button>
        </div>

        <RelatedEngineers
          engId={engId}
          speciality={engInfo.speciality}
        />
      </div>
    )
  )
}

export default Meeting
