import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Login from './pages/Login/Login.jsx'
import Home from './pages/Home/Home.jsx'
import Register from './pages/Register/Register.jsx'
import Layout from './components/Layout/Layout.jsx'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import store from "./store/store";
import { Provider } from "react-redux";
import ProtectedRoute from './components/Protected Route/ProtectedRoute.jsx'

const router = createBrowserRouter([{
  path: '/',
  element: <Navigate to="/login" replace={true} />
  }, {
  path: '/login',
  element: <Layout><Login /></Layout>
  }, {
    path: '/register',
    element: <Layout><Register /></Layout>
  },
  {
    path: '/home',
    element: <ProtectedRoute element={<Layout><Home /></Layout>}/>
  },
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
