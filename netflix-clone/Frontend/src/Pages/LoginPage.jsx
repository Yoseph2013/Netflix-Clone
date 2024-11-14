import { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

function LoginPage() {
    const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");

    const handleLogin = (e) => {
      e.preventDefault();
      console.log(email ,password)
    }
  return (
    <div className="h-screen w-full hero-bg">
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link to={'/'}>
          <img src="/netflix-logo.png" alt="Logo" className="w-52" />
        </Link>
      </header>
      
      <div className="flex justify-center items-center mt-20 mx-3">
        <div className="w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md">
          <h1 className="text-center text-white text-2xl font-bold mb-4">Login</h1>
          
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-300 block">
                Email
              </label>
              <input
                placeholder="you@example.com"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
              />
            </div>
               <div>
              <label htmlFor="password" className="text-sm font-medium text-gray-300 block">
                Password
              </label>
              <input
                placeholder="Enter Password"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
              />
            </div>
            <button className='w-full py-2 bg-red-600 text-white font-semibold rounded-none
            hover:bg-red-700'>
              Login
            </button>
          </form>
          <div className='text-center text-gray-400'>
            Don't have an account ? &nbsp;
            <Link to ={"/signup"} className='text-red-500 hover:underline'>Sign up</Link>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
