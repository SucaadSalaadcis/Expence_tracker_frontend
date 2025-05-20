import React, { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

// Components and pages
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Register from './pages/Auth/Register'
import Login from './pages/Auth/Login'
import Dashbord from './components/Dashboard'
import NotFound from './pages/NotFound'
import Logout from './pages/Auth/Logout'
import ExpenceList from './pages/expences/ExpenceList'
import CreateExp from './pages/expences/CreateExp'
import EditExp from './pages/expences/EditExp'
import { matchPath } from 'react-router-dom';
import UsersList from './pages/users/UsersList'
import CreateUser from './pages/users/CreateUser'

export default function App() {
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  const noLayoutRoutes = ['/', '/login', '/register', '/logout'];
  const knownRoutes = [
    '/',
    '/login',
    '/register',
    '/dashboard',
    '/expenses',
    '/createE',
    '/editE/:id',
    '/users',
    '/createUser',
    '/logout'
  ];

  const hideLayout =
    noLayoutRoutes.includes(location.pathname) ||
    !knownRoutes.some(route => matchPath(route, location.pathname));

  return (
    <>
      <div className="flex h-screen overflow-auto">
        {/* Sidebar */}
        {!hideLayout && (
          <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        )}

        {/* Main Content */}
        <div className="flex flex-col flex-1">
          {/* Header */}
          {!hideLayout && <Header toggleSidebar={toggleSidebar} />}

          {/* Page content */}
          <main className="flex-1 p-6 overflow-auto bg-gray-100">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashbord />} />
              <Route path="/expenses" element={<ExpenceList />} />
              <Route path="/createE" element={<CreateExp />} />
              <Route path='/editE/:id' element={<EditExp />} />
              <Route path="/users" element={<UsersList />} />
              <Route path="/createUser" element={<CreateUser />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </div>

      <Toaster />
    </>
  )
}
