import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { EngineerContext } from '../context/EngineerContext'
const Login = () => {
   
    const [state,setState]= useState('Admin')
    const [email,setEmail] =useState('')
    const [password,setPassword] =useState('')

    
    const{setAToken,backendUrl} = useContext(AdminContext)

    const{setEToken} = useContext(EngineerContext)
    
    const onSubmitHandler = async (event)=>{
        event.preventDefault()   // show that when we submit the form it will not reload the webpage

        try{
          if(state === 'Admin'){
             
             const {data}= await axios.post(backendUrl + '/api/admin/login', {email,password})
             if(data.success){
                localStorage.setItem('aToken', data.token)
                setAToken(data.token)
             }else {
            toast.error(data.message)
          } 

          }else{

             const {data} = await axios.post(backendUrl+ '/api/engineer/login' , {email,password})
             if(data.success){
                localStorage.setItem('eToken', data.token)
                setEToken(data.token)
                console.log(data.token);
                
             }else {
            toast.error(data.message)
          } 

          }
        }catch (error){

        }
    }

    
  return (


    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex item-center'>
         <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
            <p className='text-2xl font-semibold m-auto'><span className='text-red-500'>{state}</span> Login</p>
              <div className='w-full'>
                <p>Email</p>
                <input onChange={(e)=>setEmail(e.target.value)} value={email} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="email" required />
              </div>
               <div className='w-full'>
                <p>Password</p>
                <input onChange={(e)=>setPassword(e.target.value)} value={password} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="password" required />
              </div>
              <button className='bg-red-500 text-white w-full py-2 rounded-md text-base'>Login</button>
            
            {
                state === 'Admin'
                ? <p>Engineer Login? <span className='text-red-500 underline cursor-pointer' onClick={()=> setState('Engineer')}>Click here</span></p>
                :<p>Admin Login? <span className='text-red-500 underline cursor-pointer' onClick={()=> setState('Admin')}>Click here</span></p>
                
            }
         </div>
    </form>
  )
}

export default Login