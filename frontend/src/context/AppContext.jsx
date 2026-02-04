

// import { createContext, useEffect, useState } from "react"
// import axios from 'axios'
// import { toast } from 'react-toastify'

// export const AppContext = createContext()

// const AppContextProvider = (props) => {

//   const currencySymbol = '$'
//   const backendUrl = import.meta.env.VITE_BACKEND_URL

//   const [engineers, setEngineers] = useState([])
//   const [token, setToken] = useState(
//     localStorage.getItem('token') ? localStorage.getItem('token') : false
//   )
//   const [userData, setUserData] = useState(false)

//   const getEngineersData = async () => {
//     try {
//       const { data } = await axios.get(
//         backendUrl + '/api/engineer/list'
//       )

//       if (data.success) {
//         setEngineers(data.engineers)
//       } else {
//         toast.error(data.message)
//       }
//     } catch (error) {
//       console.log(error)
//       toast.error(error.message)
//     }
//   }

//   const loadUserProfileData = async () => {
//     try {
//       const { data } = await axios.get(
//         backendUrl + '/api/user/get-profile',
//         { headers: { token } }
//       )

//       if (data.success) {
//         setUserData(data.userData)
//       } else {
//         toast.error(data.message)
//       }
//     } catch (error) {
//       console.log(error)
//       toast.error(error.message)
//     }
//   }

//   const value = {
//     engineers, getEngineersData,
//     currencySymbol,
//     token,
//     setToken,
//     backendUrl,
//     userData,
//     setUserData,
//     loadUserProfileData
//   }

//   useEffect(() => {
//     getEngineersData()
//   }, [])

//   useEffect(() => {
//     if (token) {
//       loadUserProfileData()
//     } else {
//       setUserData(false)
//     }
//   }, [token])

//   return (
//     <AppContext.Provider value={value}>
//       {props.children}
//     </AppContext.Provider>
//   )
// }

// export default AppContextProvider


import { createContext, useEffect, useState } from "react"
import axios from 'axios'
import { toast } from 'react-toastify'

export const AppContext = createContext()

const AppContextProvider = (props) => {

  const currencySymbol = '$'
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const [engineers, setEngineers] = useState([])
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [userData, setUserData] = useState(null)

  const getEngineersData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/engineer/list`)
      if (data.success) {
        setEngineers(data.engineers)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/user/get-profile`,
        { headers: { token } } // or Authorization header
      )

      if (data.success) {
        setUserData(data.userData)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  // persist token
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token)
    } else {
      localStorage.removeItem('token')
    }
  }, [token])

  useEffect(() => {
    getEngineersData()
  }, [])

  useEffect(() => {
    if (token) {
      loadUserProfileData()
    } else {
      setUserData(null)
    }
  }, [token])

  const value = {
    engineers,
    getEngineersData,
    currencySymbol,
    token,
    setToken,
    backendUrl,
    userData,
    setUserData,
    loadUserProfileData
  }

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider
