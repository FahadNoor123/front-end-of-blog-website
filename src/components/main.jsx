import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'


import Layout from '../Layout.jsx'
import Home from './NormalUsers/Home/Home.jsx'
import AdminDashboard from './SuperAdmin/Admin/Home/AdminDashboard.jsx'
import Login from './NormalUsers/Login/Login.jsx'
import Register from './NormalUsers/Login/Register.jsx'

const router=createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout/>}>

       <Route path="/touse" element={<Home/>}/>
     
   
       <Route path="/admin" element={<AdminDashboard/>}/>
       
        
      
      
      </Route>
    )
  )
  
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <RouterProvider router={router}>
        <CartProvider>
          {/* Move ToastContainer to the top level */}
          <ToastContainer />
          <Layout />
        </CartProvider>
      </RouterProvider>
    </React.StrictMode>
  );