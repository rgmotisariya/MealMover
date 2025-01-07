import React from 'react'
import NavBar from './component/NavBar/NavBar'
import SideBar from './component/SideBar/SideBar'
import Add from '../pages/Add/Add'
import List from '../pages/List/List'
import Order from '../pages/Order/Order'
import {Routes,Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const url="http://localhost:3000";
  return (
    <div >
      
      <NavBar  />
      <ToastContainer />
      <hr />
      <div className='app-content'>
         <SideBar />
         <Routes>
           
               <Route path='/add' element={<Add  url={url} />} />
               <Route path='/list' element={<List url={url} />} />
               <Route path='/order' element={<Order url={url}/>} />
            
         </Routes>
      </div>
    </div>
  )
}

export default App