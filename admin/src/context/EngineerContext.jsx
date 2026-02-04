import { useState } from "react";
import { createContext } from "react";
import axios from 'axios'
import { toast } from 'react-toastify'

export const EngineerContext = createContext()

const EngineerContextProvider = (props) => {

   const backendUrl = import.meta.env.VITE_BACKEND_URL

   const [eToken, setEToken] = useState(localStorage.getItem('eToken') ? localStorage.getItem('eToken') : '')
   const [meetings, setMeetings] = useState([])
   const [dashData, setDashData] = useState(false)
   const [profileData, setProfileData] = useState(false)

   const getMeetings = async () => {
      try {
         const { data } = await axios.get(backendUrl + '/api/engineer/meetings', { headers: { eToken } })

         if (data.success) {
            setMeetings(data.meetings)
            console.log(data.meetings.reverse());

         } else {
            toast.error(data.message)
         }
      } catch (error) {
         console.log(error);
         toast.error(error.message)
      }
   }

   const completeMeeting = async (meetingId) => {

      try {

         const { data } = await axios.post(backendUrl + '/api/engineer/complete-meeting', { meetingId }, { headers: { eToken } })
         if (data.success) {
            toast.success(data.message)
            getMeetings()
         } else {
            toast.error(data.message)
         }

      } catch (error) {
         console.log(error);
         toast.error(error.message)
      }
   }

   const cancelMeeting = async (meetingId) => {

      try {

         const { data } = await axios.post(backendUrl + '/api/engineer/cancel-meeting', { meetingId }, { headers: { eToken } })
         if (data.success) {
            toast.success(data.message)
            getMeetings()
         } else {
            toast.error(data.message)
         }

      } catch (error) {
         console.log(error);
         toast.error(error.message)
      }
   }

   const getDashData = async () => {
      try {

         const { data } = await axios.get(backendUrl + '/api/engineer/dashboard', { headers: { eToken } })
         if (data.success) {
            setDashData(data.dashData)
            console.log(data.dashData);

         } else {
            toast.error(data.message)
         }

      } catch (error) {
         console.log(error);
         toast.error(error.message)
      }
   }


   const getProfileData = async () => {
      try {
         const {data } = await axios.get(backendUrl + '/api/engineer/profile', {headers:{eToken}})
         if (data.success){
            setProfileData(data.profileData)
            console.log(data.profileData)
         }

      } catch (error) {
         console.log(error);
         toast.error(error.message)
      }
   }




   const value = {
      eToken, setEToken,
      backendUrl,
      meetings, setMeetings,
      getMeetings,
      completeMeeting, cancelMeeting,
      dashData, setDashData, getDashData,
      profileData,setProfileData,
      getProfileData,
   }
   return (
      <EngineerContext.Provider value={value}>
         {props.children}
      </EngineerContext.Provider>

   )
}

export default EngineerContextProvider

