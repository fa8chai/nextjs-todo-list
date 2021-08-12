import { signIn, signOut, getSession } from 'next-auth/client';



function Login() {
    return (
        <div className='flex items-center justify-center h-screen'>
            <div className='flex items-center justify-center shadow-lg rounded-md'>
                <button onClick={signIn} className='text-gray-800 font-semibold px-6 py-5 rounded-md  border-gray-400 shadow-sm bg-white hover:shadow-md focus:scale-90 transform duration-75 ease-out'>Login With Username and Password</button>
            </div>
        </div>
    )
}

export default Login
