import React, { useState } from "react";
import pokemon from "./pokemon.png";
// import setting from "./setting.png";
// import TeamList from "./teamList";
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent the form from submitting in the traditional way
    const loginDetails = {
      loginName: email,
      password: password,
    };

    try {
      const response = await fetch('http://localhost:8081/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginDetails),
      });

      const message = await response.text(); // Assuming response is plain text
      if (response.ok) {
        navigate('/TeamList'); // Navigate to TeamList if login is successful
      } else {
        setErrorMessage(message); // Set the error message state if login fails
      }
    } catch (error) {
      console.error('Login request failed:', error);
      setErrorMessage('Login request failed, please check your network.'); // Set a generic error message
    }
  };

  const hangleSignUp = () => {
    navigate("/SignUp");
  };

  // const handleSetting = () => {
  //   navigate("/Setting");
  // };

  return (
    <div className="flex justify-center mt-12">
      {/* Adjusted margin for overall vertical alignment */}
      <div className="w-full max-w-xs">
        {/* Constrain width for better control */}
        <div className="bg-sky-500 text-white font-bold p-10 rounded-lg shadow-lg text-center">
          {/* Adjusted padding */}
          Pokemon TeamBuilder
        </div>
        <img src={pokemon} alt="Pokemon" className="mx-auto my-4" />
        {/* Corrected image tag */}
        <div className="space-y-4 mt-8">
          {/* This is input boxes */}

          <form>
            <label className="block">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                Email
              </span>
              <input
                type="email"
                name="email"
                className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                placeholder="you@example.com"
              />
            </label>
          </form>
          <label className="block">
            <span className="block text-sm font-medium text-slate-700">
              Email
            </span>
            <input
              type="email"
              name="email"
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="block">
            <span className="block text-sm font-medium text-slate-700">
              Password
            </span>
            <input
              type="password"
              name="password"
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          {errorMessage && (
            <div className="text-red-500 text-center">{errorMessage}</div>
          )}
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 text-white py-2 rounded-md"
          >
            Login
          </button>
        </form>

        {/* Signup */}
        <div className="space-y-4 mt-40">
          <button
            onClick={hangleSignUp}
            className="w-full bg-orange-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 text-white py-2 rounded-md"
          >
            Signup
          </button>
        </div>
        
      </div>
    </div>
  );
}

export default LoginPage;
