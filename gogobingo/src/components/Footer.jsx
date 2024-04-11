function Footer({ user, sessionId }) {
    return (
        <div className="container text-white bg-red-400 w-full p-4">
            <h2 className='text-black text-lg font-bold mb-2'>User Dev Info:</h2>
            <div className="bg-white text-black p-4 rounded shadow-md">
                <p className='mb-2'><span className='font-bold'>User:</span> {user ? user.email : 'Not logged in'}</p>
                <p><span className='font-bold'>Session ID:</span> {sessionId}</p>
            </div>
        </div>
    );
}

export default Footer;