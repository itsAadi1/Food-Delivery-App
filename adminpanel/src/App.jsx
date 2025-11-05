import { useState } from 'react'
import './App.css'
import AddFood from './pages/AddFood/AddFood.jsx'
import { Routes, Route } from 'react-router-dom'
import ListFood from './pages/ListFood/ListFood.jsx'
import Orders from './pages/Orders/Orders.jsx'
import Sidebar from './components/Sidebar/Sidebar.jsx'
import Menubar from './components/Menubar/Menubar.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
 const [sidebarOpen, setSidebarOpen] = useState(true)
 const toggleSidebar = () => {
  setSidebarOpen(!sidebarOpen)
 }
  return (
    <div className="d-flex" id="wrapper">
      <Sidebar open={sidebarOpen}/>
      <div id="page-content-wrapper">
        <Menubar toggle={toggleSidebar}/>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          style={{
            borderRadius: '12px',
            fontFamily: 'Poppins, sans-serif'
          }}
        />
        <div className="container-fluid">
          <Routes>
            <Route path='/addfood' element={<AddFood/>}/>
            <Route path='/listfood' element={<ListFood/>}/>
            <Route path='/orders' element={<Orders/>}/>
            <Route path='/' element={<ListFood/>}/>
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App
