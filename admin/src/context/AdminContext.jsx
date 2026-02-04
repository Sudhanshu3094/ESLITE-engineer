import { createContext, useState } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'
export const AdminContext = createContext()

const AdminContextProvider = (props)=>{

   const [aToken,setAToken] = useState(localStorage.getItem('aToken')? localStorage.getItem('aToken'): '')
   const [engineers,setEngineers] = useState([])
   const [meetings ,setMeetings] = useState([])
   const [dashData , setDashData] = useState(false)

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const getAllEngineers = async ()=>{
         
      try {
         const {data} = await axios.post(backendUrl + '/api/admin/all-engineers' , {}, {headers:{aToken}})
         if(data.success){
            setEngineers(data.engineers)
            console.log(data.engineers)

         } else{
            toast.error(data.message)
         }
      } catch (error) {
         toast.error(error.message)
      }
    }

      const changeAvailability = async ( engId) =>{

         try {
            const { data } = await axios.post(backendUrl + '/api/admin/change-availability',{engId},{headers:{aToken}})
            if(data.success){
               toast.success(data.message)
               getAllEngineers()

            }else{
               toast.error(data.message)
            }
         } catch (error) {
            toast.error(error.message)
         }

      }

      const getAllMeetings = async  ()=>{

         try {
            const { data } = await axios.get(backendUrl +'/api/admin/meetings',{headers:{aToken}})

            if( data.success){
               setMeetings(data.meetings)
               console.log(data.meetings);
               
            }else{
                toast.error(data.message)
            }
         } catch (error) {
                toast.error(erroe.message)
            
         }
      }

      const cancelMeeting = async (meetingId)=>{
        try {
         

         const{data} = await axios.post(backendUrl+ '/api/admin/cancel-meeting',{meetingId},{headers:{aToken}})

         if(data.success){
            toast.success(data.message)
            getAllMeetings()
         }else{
            toast.error(data.message)
         }

        } catch (error) {
                toast.error(erroe.message)
         
        }
      }

      
      const getDashData = async()=>{
         try {
            const{data}= await axios.get(backendUrl + '/api/admin/dashboard' ,{headers:{aToken}})

            if(data.success){
               setDashData(data.dashData)
               console.log(data.dashData);
               
            }else{
               toast.error(data.message)
            }
         } catch (error) {
            toast.error(error.message)
         }
      }




    const value ={
       aToken,setAToken,
       backendUrl,engineers,
       getAllEngineers, changeAvailability,
       meetings,setMeetings,
       getAllMeetings,
       cancelMeeting,
       dashData,getDashData


    }
    return (
       <AdminContext.Provider value={value}>
        {props.children}
       </AdminContext.Provider>

    )
}

export default AdminContextProvider




