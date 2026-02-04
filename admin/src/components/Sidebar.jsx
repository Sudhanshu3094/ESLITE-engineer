import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { EngineerContext } from '../context/EngineerContext'

const Sidebar = () => {

    
  const {aToken} = useContext(AdminContext)
  const {eToken} = useContext(EngineerContext)


  return (
    // <div className='min-h-screen bg-white border-r'>
    //    {

    //     aToken && <ul className='text-[#515151] mt-5'>
          
    //       <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ?'bg-[#f1cbcb] border-r-4 border-red-500': ''}`} to={'/admin-dashboard'}>
    //         <img src={assets.home_icon} alt="" />
    //         <p className='hidden md:block'>Dashboard</p>
    //       </NavLink>
    //        <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ?'bg-[#f1cbcb] border-r-4 border-red-500': ''}`} to={'all-meetings'}>
    //         <img src={assets.meeting_icon} alt="" />
    //         <p className='hidden md:block'>Meetings</p>
    //       </NavLink>
    //        <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ?'bg-[#f1cbcb] border-r-4 border-red-500': ''}`} to={'/add-engineer'}>
    //         <img src={assets.add_icon} alt="" />
    //         <p className='hidden md:block'>Add Engineer</p>
    //       </NavLink>
    //        <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ?'bg-[#f1cbcb] border-r-4 border-red-500': ''}`} to={'engineer-list'}>
    //         <img src={assets.people_icon} alt="" />
    //         <p className='hidden md:block'>Engineer List</p>
    //       </NavLink>


    //     </ul>
    //    }

    //    {

    //     eToken && <ul className='text-[#515151] mt-5'>
          
    //       <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ?'bg-[#f1cbcb] border-r-4 border-red-500': ''}`} to={'/engineer-dashboard'}>
    //         <img src={assets.home_icon} alt="" />
    //         <p>Dashboard</p>
    //       </NavLink>
    //        <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ?'bg-[#f1cbcb] border-r-4 border-red-500': ''}`} to={'engineer-meetings'}>
    //         <img src={assets.meeting_icon} alt="" />
    //         <p>Meetings</p>
    //       </NavLink>
           
    //        <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ?'bg-[#f1cbcb] border-r-4 border-red-500': ''}`} to={'engineer-profile'}>
    //         <img src={assets.people_icon} alt="" />
    //         <p>Profile</p>
    //       </NavLink>


    //     </ul>
    //    }



    // </div>



    <div className='min-h-screen w-72 bg-white border-r'>
  
  {aToken && (
    <ul className='text-[#515151] mt-5'>

      <NavLink
        to='/admin-dashboard'
        className={({ isActive }) =>
          `w-full flex items-center gap-3 py-3.5 px-6 cursor-pointer
           ${isActive ? 'bg-[#f1cbcb] border-r-4 border-red-500' : ''}`
        }
      >
        <img src={assets.home_icon} alt="" />
        <p className='hidden md:block'>Dashboard</p>
      </NavLink>

      <NavLink
        to='all-meetings'
        className={({ isActive }) =>
          `w-full flex items-center gap-3 py-3.5 px-6 cursor-pointer
           ${isActive ? 'bg-[#f1cbcb] border-r-4 border-red-500' : ''}`
        }
      >
        <img src={assets.meeting_icon} alt="" />
        <p className='hidden md:block'>Meetings</p>
      </NavLink>

      <NavLink
        to='/add-engineer'
        className={({ isActive }) =>
          `w-full flex items-center gap-3 py-3.5 px-6 cursor-pointer
           ${isActive ? 'bg-[#f1cbcb] border-r-4 border-red-500' : ''}`
        }
      >
        <img src={assets.add_icon} alt="" />
        <p className='hidden md:block'>Add Engineer</p>
      </NavLink>

      <NavLink
        to='engineer-list'
        className={({ isActive }) =>
          `w-full flex items-center gap-3 py-3.5 px-6 cursor-pointer
           ${isActive ? 'bg-[#f1cbcb] border-r-4 border-red-500' : ''}`
        }
      >
        <img src={assets.people_icon} alt="" />
        <p className='hidden md:block'>Engineer List</p>
      </NavLink>

    </ul>
  )}

  {eToken && (
    <ul className='text-[#515151] mt-5'>

      <NavLink
        to='/engineer-dashboard'
        className={({ isActive }) =>
          `w-full flex items-center gap-3 py-3.5 px-6 cursor-pointer
           ${isActive ? 'bg-[#f1cbcb] border-r-4 border-red-500' : ''}`
        }
      >
        <img src={assets.home_icon} alt="" />
        <p className='hidden md:block'>Dashboard</p>
      </NavLink>

      <NavLink
        to='engineer-meetings'
        className={({ isActive }) =>
          `w-full flex items-center gap-3 py-3.5 px-6 cursor-pointer
           ${isActive ? 'bg-[#f1cbcb] border-r-4 border-red-500' : ''}`
        }
      >
        <img src={assets.meeting_icon} alt="" />
        <p className='hidden md:block'>Meetings</p>
      </NavLink>

      <NavLink
        to='engineer-profile'
        className={({ isActive }) =>
          `w-full flex items-center gap-3 py-3.5 px-6 cursor-pointer
           ${isActive ? 'bg-[#f1cbcb] border-r-4 border-red-500' : ''}`
        }
      >
        <img src={assets.people_icon} alt="" />
        <p className='hidden md:block'>Profile</p>
      </NavLink>

    </ul>
  )}

</div>

  )
}

export default Sidebar
