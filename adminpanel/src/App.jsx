import { useState } from 'react'
import './App.css'
import AddFood from './pages/AddFood/AddFood.jsx'
import { Routes, Route } from 'react-router-dom'
import ListFood from './pages/ListFood/ListFood.jsx'
import Orders from './pages/Orders/Orders.jsx'
import BulkImport from './pages/BulkImport/BulkImport.jsx'
import Sidebar from './components/Sidebar/Sidebar.jsx'
import Menubar from './components/Menubar/Menubar.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AdminAuthProvider, useAdminAuth } from './context/AdminAuthContext.jsx'
import Login from './pages/Login/Login.jsx'

function AuthenticatedApp() {
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
            <Route path='/bulkimport' element={<BulkImport/>}/>
            <Route path='/' element={<ListFood/>}/>
          </Routes>
        </div>
      </div>
    </div>
  )
}

function AppContent() {
  const { isAuthenticated, loading } = useAdminAuth()

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center" style={{minHeight: '100vh'}}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Login />
  }

  return <AuthenticatedApp />
}

function App() {
  return (
    <AdminAuthProvider>
      <AppContent />
    </AdminAuthProvider>
  )
}

export default App
