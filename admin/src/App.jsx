import React from 'react'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Routes, Route } from "react-router-dom"
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'


const App = () => {

   const url = "https://food-delivery-backend-app.vercel.app"
  return (
    <div>
       <Navbar/>
       <hr />
       <div className="app-content">
         <Sidebar/>
         <Routes>
             <Route path='/add' element={<Add url={url} />}/>
             <Route path='/list' element={<List url={url}/>}/>
             <Route path='/orders' element={<Orders url={url}/>}/>
         </Routes>
       </div>
        <ToastContainer/>
    </div>
  )
}

export default App