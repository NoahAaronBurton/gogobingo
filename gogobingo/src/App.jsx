import { useState } from 'react'
import './App.css'
import Navbar from './Navbar'
import Landing from './Landing'
import BoardEditor from './BoardEditor'
import LoginForm from './components/LoginForm'
import SignUp from './components/SignUp'
import Footer from './components/Footer'

const env = import.meta.env.MODE;
console.log('env:', env);

function App() {
  const [openPage, setOpenPage] = useState('landing');
  const [user, setUser] = useState(null);
  const [sessionId, setSessionId] = useState(null);

  


  return (
    <div className="flex flex-col w-full min-h-screen justify-between items-center">
      <Navbar setOpenPage={setOpenPage} setUser={setUser} user={user} sessionId={sessionId} setSessionId={setSessionId} />
      <div id='main' className='flex-grow'>
        {openPage === 'landing' && <Landing />}
        {openPage === 'board-editor' && <BoardEditor />}
        {openPage === 'login' && <LoginForm />}
        {openPage === 'sign-up' && <SignUp setSessionId={setSessionId} setUser={setUser} setOpenPage={setOpenPage} />}
      </div>
      {env === 'development' && <Footer user={user} sessionId={sessionId} />}
    </div>
  );
}


export default App
