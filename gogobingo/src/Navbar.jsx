import Button from "./components/Button";
import LoginForm from "./components/LoginForm";
import { useState } from 'react';

export default function Navbar({ setOpenPage, setUser, user, sessionId, setSessionId}) {

  const [showModal, setShowModal] = useState(false);

    const NavItem = ({ name, funct }) => {
        return (
            <Button funct={funct} text={name} />
        );
    }

    return (
        <nav className="flex justify-between w-full p-4">
          <div className="flex space-x-4">
            <NavItem name="Home" funct={() => setOpenPage("landing")} />
            <NavItem name="Create a Board" funct={() => setOpenPage("board-editor")} />
            { !user && <NavItem name="Login" funct={() => setShowModal(true)} />}
            { user && <NavItem name="Logout" funct={() => setUser(null)} />}
            <LoginForm showModal={showModal} setShowModal={setShowModal} setUser={setUser} sessionId={sessionId} setSessionId={setSessionId} />
          </div>
         
        </nav>
    )
}