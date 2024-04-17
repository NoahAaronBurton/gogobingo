import { useState } from 'react';
import axios from 'axios';
const api = import.meta.env.VITE_API_URL;
import Button from './Button';


const LoginForm = ({ showModal, setShowModal, setUser, sessionID, setSessionID}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log('Log in button pressed');
        // from state vars
        const user = {
          email,
          password,
        };
      
        try {
          const response = await axios.post(api +'/login', user, { withCredentials: true });
          console.log(response.data);
          setUser(user);
          setSessionID(response.data.sessionID);
        } catch (error) {
          console.error('Error logging in:', error);
        }
      };

    return (
        <>
            {showModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', padding: '1em', borderRadius: '10px' }}>
                        <label>
                            Email:
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </label>
                        <label>
                            Password:
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </label>
                        <Button text="Log In" onClick={handleSubmit} type="submit"/>
                        <button onClick={() => setShowModal(false)}>Close</button>
                    </form>
                </div>
            )}
        </>
    );
};

export default LoginForm;