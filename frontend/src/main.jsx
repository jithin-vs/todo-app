import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Login from './pages/Login/Login.jsx'
import Home from './pages/Home/Home.jsx'
import Register from './pages/Register/Register.jsx'
import Layout from './components/Layout/Layout.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([{
  path: '/',
  element: <Layout><Home /></Layout>
}, {
  path: '/login',
  element: <Layout><Login /></Layout>
  }, {
    path: '/register',
    element: <Layout><Register /></Layout>
  },
  {
    path: '/home',
    element: <Layout><Home /></Layout>
    },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
