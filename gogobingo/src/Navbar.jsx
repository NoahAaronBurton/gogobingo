import Button from "./components/Button";
import LoginForm from "./components/LoginForm";
import SignUp from "./components/SignUp";
import { useState } from 'react';
import axios from 'axios';
const api = import.meta.env.VITE_API_URL;

export default function Navbar({ setOpenPage, setUser, user, sessionID, setSessionID}) {

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

      
      try {
        const user = {
          email: 't@t.com',
          password: 'password',
  
        };
        const response = await axios.post(api +'/register', user, { withCredentials: true });
        console.log(response.data);
        setUser(user);
        setSessionID(response.data.sessionID);
      } catch (error) {
        console.error('Error registering in:', error);
      }

    }

    const logout = async () => {
      try {
        const url = api + '/logout';
        await axios.get(url, { withCredentials: true });
        setUser(null);
        setSessionID(null);
      } catch (error) {
        console.log(error);
      }
    }


    return (
        <nav className="flex justify-between w-full p-4">
          <div className="flex space-x-4">
            <NavItem name="Home" funct={() => setOpenPage("landing")} />
            <NavItem name="Create a Board" funct={() => setOpenPage("board-editor")} />
            { !user && <NavItem name="Login" funct={() => setShowModal(true)} />}
            { !user && <NavItem name="Sign Up" funct={() => setOpenPage("sign-up")} />}
            { user && <NavItem name="Logout" funct={logout} />}
            <LoginForm setOpenPage={setOpenPage} showModal={showModal} setShowModal={setShowModal} setUser={setUser} sessionID={sessionID} setSessionID={setSessionID} />
            {/* <SignUp setUser={setUser} setSessionID={setSessionID} /> */}
          </div>
        <Button text="Quick register (dev only)" funct={quickRegister} /> 
        </nav>
    )
}