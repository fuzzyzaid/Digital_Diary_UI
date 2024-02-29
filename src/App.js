import React, { useEffect, useState } from 'react'
import { Routes,Route } from 'react-router-dom';
import Signup from './components/SignUp/Signup'
import Header from './components/Header/Header';
import MyAccount from './components/MyAccount/MyAccount';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/Footer/Footer';

function App() {
  return (
   <>
          <Header/>
          <Routes>
            {/* By default it is / therefore it is opening the home page */}
            <Route path="/" element={<Home/>}/>  
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/myAccount" element={<MyAccount/>}/>
          </Routes>
          <Footer/>
   </>
  )
}

export default App