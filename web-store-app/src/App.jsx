import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'
import Home from './Pages/Home/Home'
import Product from './Pages/Product/Product'
import './App.css'

function App() {

  return (
    <div className='app'>
      <Navbar />
      <Routes>
        <Route path='/' Component={Home} />
        <Route path='/product/:id' Component={Product} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
