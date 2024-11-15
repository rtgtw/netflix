import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authUser';








const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //email and password are controlled elements by react, can take directly from them, b/c of useState
    //create the hook login variable outside of handleLogin
    const {login} = useAuthStore();



    const handleLogin = (e) => {
      e.preventDefault();
     
     //pass in email and password to login function in the authStore
     login({email,password});
    }
    

  return (
    <div className="h-screen w-full hero-bg">

      {/* header will hold the navbar components */}
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4">

        <Link to={"/"}>
          <img src="/netflix-logo.png" alt="logo" className="w-52" />
        </Link>
      </header>

      {/* form w/ input elements to hold creds*/}
      <div className="flex justify-center items-center mt-20 mx-3">
        <div className="w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md">
          <h1 className='text-center text-white text-2xl font-bold mb-4'> Sign In </h1>

          <form className="space-y-4" onSubmit={handleLogin}> 
            <div>
              {/* block takes the entire line */}
              <label htmlFor='email' className='text-sm font-medium text-gray-300 block'>
                Email
              </label>
              <input type="email"
                className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white 
                focus:outline-none focus:ring'
                placeholder='you@example.com'
                id='email'
                value={email}
                onChange={(e) => {setEmail(e.target.value); console.log(e.target.value)}}/>
            </div>


            <div>
              {/* block takes the entire line */}
              <label htmlFor='password' className='text-sm font-medium text-gray-300 block'>
                Password
              </label>
              <input type="password"
                className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white 
                focus:outline-none focus:ring'
                placeholder='●●●●●●●●'
                id='password'
                value={password}
                onChange={(e) => {setPassword(e.target.value);}}/>
            </div>

            <button className="w-full py-2 bg-red-600 text-white font-semibold rounded-md 
                    hover:bg-red-800">
              Login
            </button>
          </form>

        {/* are you a member portion, right under form */}
        <div className='text-center text-gray-400'>
          Don't have an account? {" "}
          <Link to={"/signup"} className='text-red-500 hover:underline'>
            Sign up
          </Link>
        </div>


        </div>
      </div>



    </div>
  )
}

export default LoginPage