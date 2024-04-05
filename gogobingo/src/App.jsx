import { useState } from 'react'
import './App.css'
import Navbar from './Navbar'
import Landing from './Landing'
import BoardEditor from './BoardEditor'
function App() {
  const [openPage, setOpenPage] = useState('landing');



  return (
     <div className="flex flex-col w-full justify-center items-center">
      <Navbar setOpenPage={setOpenPage} />
      <div id='main' className=''>
        {openPage === 'landing' && <Landing />}
        {openPage === 'board-editor' && <BoardEditor />}
      </div>
     </div>
  )
}

export default App
