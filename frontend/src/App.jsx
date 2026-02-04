import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Engineers from './pages/Engineers'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/contact'
import MyProfile from './pages/MyProfile'
import MyMeetings from './pages/MyMeetings'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Meeting from './pages/Meeting'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/engineers' element={<Engineers />} />
        <Route path='/engineers/:speciality' element={<Engineers />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/my-Meetings' element={<MyMeetings />} />
        <Route path='/Meeting/:engId' element={< Meeting />} />


      </Routes>
      <Footer />
    </div>
  )
}

export default App
