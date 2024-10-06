import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Route, RouterProvider, createRoutesFromElements} from 'react-router'
import {createBrowserRouter} from "react-router-dom";
import {Provider} from 'react-redux'
import store from './redux/features/store.js'
//auth
import Login from './pages/Auth/Login.jsx'
import Register from './pages/Auth/Register.jsx'
//PRIVATE ROUTE
import PrivateRoute from './components/privateRoute.jsx'
import AdminRoutes from './pages/Admin/AdminRoutes.jsx'
import Profile from './pages/User/Profile.jsx'
import UserList from './pages/Admin/UserList.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path = "/" element = {<App/>}>
      <Route path = "/login" element = {<Login/>}/>
      <Route path = "/register" element = {<Register/>}/>

      <Route path='' element = {<PrivateRoute/>}>
        <Route path='/profile' element = {<Profile/>}/>
      </Route>
      <Route path='/admin' element = {<AdminRoutes/>}>
        <Route path='userlist' element = {<UserList/>}/>
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store = {store}>
  <RouterProvider router = {router}/>
  </Provider>
)
