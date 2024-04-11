import { useState } from 'react'
import './App.css'
import Navbar from './Navbar'
import Landing from './Landing'
import BoardEditor from './BoardEditor'
import LoginForm from './components/LoginForm'


function App() {
  const [openPage, setOpenPage] = useState('landing');
  const [user, setUser] = useState(null);



  return (
     <div className="flex flex-col w-full justify-center items-center">
        <Navbar setOpenPage={setOpenPage} setUser={setUser} />
        {user && <p>Welcome, {user.email}</p>}
        <div id='main' className=''>
          {openPage === 'landing' && <Landing />}
          {openPage === 'board-editor' && <BoardEditor />}
          {openPage === 'login' && <LoginForm />}
        </div>
     </div>
  )
}

export default App
