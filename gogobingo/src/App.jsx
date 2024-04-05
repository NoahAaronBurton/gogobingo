import { useState } from 'react'
import './App.css'
import Navbar from './Navbar'
import Landing from './Landing'

function App() {
  

  return (
     <div className="flex flex-col w-full justify-center items-center">
      <Navbar />
      <Landing />
     </div>
  )
}

export default App
