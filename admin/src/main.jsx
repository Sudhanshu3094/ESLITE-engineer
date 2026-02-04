// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import {BrowserRouter} from 'react-router-dom'
// import AdminContextProvider from './context/AdminContext.jsx'
// import EngineerContextProvider from './context/EngineerContext.jsx'
// createRoot(document.getElementById('root')).render(
//   <BrowserRouter>
// <AdminContextProvider>
//   <EngineerContextProvider>
//     <AdminContextProvider>
//     <App />
//     </AdminContextProvider>
//   </EngineerContextProvider>
// </AdminContextProvider>


//   </BrowserRouter>,
// )




import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

import AppContextProvider from './context/AppContext.jsx'
import AdminContextProvider from './context/AdminContext.jsx'
import EngineerContextProvider from './context/EngineerContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AppContextProvider>
        <AdminContextProvider>
          <EngineerContextProvider>
            <App />
          </EngineerContextProvider>
        </AdminContextProvider>
      </AppContextProvider>
    </BrowserRouter>
  </StrictMode>
)
