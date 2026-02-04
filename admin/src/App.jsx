import React, { useContext } from 'react'
import Login from './pages/Login'
 import { ToastContainer, toast } from 'react-toastify';    
 import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import AllMeetings from './pages/Admin/AllMeetings';
import AddEngineer from './pages/Admin/AddEngineer';
import EngineersList from './pages/Admin/EngineersList';
import { EngineerContext } from './context/EngineerContext';
import EngineerDashboard from './pages/Engineer/engineerDashboard';
import EngineerMeetings from './pages/Engineer/EngineerMeetings';
import EngineerProfile from './pages/Engineer/EngineerProfile';

const App = () => {
    
    const {aToken} = useContext(AdminContext)
    const{ eToken} = useContext(EngineerContext)

    
  return aToken || eToken ? (
    <div className='bg-[#F8F9FD]'>
       <ToastContainer/>
      <Navbar/>
      <div className='flex items-start'>
        <Sidebar/>
        <Routes>
           {/* Admin Route */}
          <Route path='/' element ={<></>}/>
          <Route path='/admin-dashboard' element ={<Dashboard/>}/>
          <Route path='/all-meetings' element ={<AllMeetings/>}/>
          <Route path='/add-engineer' element ={<AddEngineer/>}/>
          <Route path='/engineer-list' element ={<EngineersList/>}/>
           
           {/* Engineer Route */}
          <Route path='/engineer-dashboard' element ={<EngineerDashboard/>}/>
          <Route path='/engineer-meetings' element ={<EngineerMeetings/>}/>
          <Route path='/engineer-profile' element ={<EngineerProfile/>}/>




        </Routes>

      </div>

    </div>
  ) : (
    <>
       <Login/>
       <ToastContainer/>
    
    </>
  )
}

export default App