import axios from 'axios';
import { useState } from 'react';
const api = import.meta.env.VITE_API_URL;

function Footer({ user, sessionID }) {
    const [testResultSuccess, setTestResultSuccess] = useState(null); 

    function testAuth() {
        axios.get(api + '/test', { withCredentials: true })
        .then(response => {
            const { user, sessionID: responseSessionID } = response.data;
            console.log('User:', user);
            console.log('Session ID:', responseSessionID);

            if (sessionID === responseSessionID) {
                console.log('Session IDs match');
                setTestResultSuccess(true)
            } else {
                console.log('Session IDs do not match');
                setTestResultSuccess(false)
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    return (
        <div className="container text-white bg-red-400 w-full p-4">
            <h2 className='text-black text-lg font-bold mb-2'>User Dev Info:</h2>
            <div className="bg-white text-black p-4 rounded shadow-md">
                <p className='mb-2'><span className='font-bold'>User:</span> {user ? user.email : 'Not logged in'}</p>
                <p><span className='font-bold'>Session ID:</span> {sessionID}</p>
            </div>
            <button onClick={testAuth} className='mt-2 bg-black text-white p-2 rounded'>Test Auth</button>
            { testResultSuccess === true && <p className='text-green-400'>Test successful</p> }
            { testResultSuccess === false && <p className='text-orange-400'>Test failed</p> }
        </div>
    );
}

export default Footer;