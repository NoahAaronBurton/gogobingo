import Button from "./components/Button";
import LoginForm from "./components/LoginForm";
import { useState } from 'react';
import axios from 'axios';
const api = import.meta.env.VITE_API_URL;

export default function Navbar({ setOpenPage, setUser, user, sessionId, setSessionId}) {

  const [showModal, setShowModal] = useState(false);

    const NavItem = ({ name, funct }) => {
        return (
            <Button funct={funct} text={name} />
        );
    }
    // * function for quick log in for dev purposes
    const quickRegister = async (e) => {
      e.preventDefault();
      console.log('Quick login button pressed');

      const user = {
        email: 't@t.com',
        password: 'password',

      };

      try {
        const response = await axios.post(api +'/register', user);
        console.log(response.data);
        // setUser(user);
        // setSessionId(response.data.sessionId);
      } catch (error) {
        console.error('Error registering in:', error);
      }
      // this will still log in if the above block fails (they may already be registered)
      try {
        const response = await axios.post(api +'/login', user);
        console.log(response.data);
        setUser(user);
        setSessionId(response.data.sessionId);
      } catch (error) {
        console.error('Error logging in:', error);
      }
    }

    function logout(e) {
      e.preventDefault();
      console.log('Logout button pressed');
      axios.post(api +'/logout')
      .then(response => {
        console.log(response.data);
        setUser(null);
        setSessionId(null);
      })
      .catch(error => {
        console.error('Error logging out:', error);
      });
    }

    return (
        <nav className="flex justify-between w-full p-4">
          <div className="flex space-x-4">
            <NavItem name="Home" funct={() => setOpenPage("landing")} />
            <NavItem name="Create a Board" funct={() => setOpenPage("board-editor")} />
            { !user && <NavItem name="Login" funct={() => setShowModal(true)} />}
            { user && <NavItem name="Logout" funct={logout} />}
            <LoginForm showModal={showModal} setShowModal={setShowModal} setUser={setUser} sessionId={sessionId} setSessionId={setSessionId} />
          </div>
        <Button text="Quick register (dev only)" funct={quickRegister} /> 
        </nav>
    )
}