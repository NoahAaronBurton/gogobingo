import Button from "./Button";
import { useState } from 'react';
import axios from 'axios';
const api = import.meta.env.VITE_API_URL;

export default function SignUp ({ setUser, setSessionID, setOpenPage}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [signupMessage, setSignupMessage] = useState(''); //

    // function for sing up
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Sign up button pressed');
        
        // check if passwords match
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        // from state vars
        const user = {
            email,
            password,
        };
        // sign up
        try {
          const response = await axios.post(api +'/register', user, { withCredentials: true });
          setUser(response.data.user);
          setSessionID(response.data.sessionID);
            setOpenPage('landing');
          console.log(response.data);
        } catch (error) {
            console.error('Error registering in:', error);
        }

        // then log in
        // try {
        //     const response = await axios.post(api +'/login', user, { withCredentials: true });
        //     console.log(response.data);
        //     setSignupMessage(response.data.message);
        //     setUser(user);
        //     setSessionID(response.data.sessionID);
        //     setOpenPage('landing');
        // } catch (error) {
        //     console.error('Error logging in:', error);
        // }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen ">
            <h1 className="mb-6 text-3xl font-bold text-gray-700">Sign Up</h1>
            <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md w-80">
                <label className="block mb-4">
                    <span className="text-gray-700">Email:</span>
                    <input onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" type="email" required />
                </label>
                <label className="block mb-4">
                    <span className="text-gray-700">Password:</span>
                    <input onChange={(e) => setPassword(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" type="password" required />
                </label>
                <label className="block mb-4">
                    <span className="text-gray-700">Confirm Password:</span>
                    <input onChange={(e) => setConfirmPassword(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" type="password" required />
                </label>
                <Button text='Sign Up' onClick={handleSubmit} type="submit"/>
            </form>
            <div className="mt-4 text-red-500">{signupMessage}</div>
        </div>
    );
}