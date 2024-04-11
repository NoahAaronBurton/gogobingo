import { useState } from 'react';
import axios from 'axios';

const LoginForm = ({ showModal, setShowModal, setUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const user = {
            email,
            password,
        };

        // Send a post request to your Passport.js login route
        // const response = await axios.post('/login', user);

        // Handle response...
        setUser(user);
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
                        <input type="submit" value="Log In" />
                        <button onClick={() => setShowModal(false)}>Close</button>
                    </form>
                </div>
            )}
        </>
    );
};

export default LoginForm;