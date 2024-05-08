import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import pokemon from "./pokemon2.png";

function SignUp() {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.backgroundColor = "tan"; // Set background when component mounts

    return () => {
      document.body.style.backgroundColor = ""; // Revert on unmount if necessary
    };
  }, []);

  const goBack = () => {
    navigate(-1); // Navigates back
  };

  const handleLogin = () => {
    navigate("/PokemonStats");
  };

  const hangleSignUp = () => {
    navigate("/SignUp");
  };

  return (
    <div className="flex flex-col items-center mt-10 px-4">
      {/* Back button aligned with content width */}
      <button
        onClick={goBack}
        className="self-start bg-orange-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 text-white py-2 px-4 rounded-lg mb-4"
      >
        Back
      </button>
      {/* Adjusted margin for overall vertical alignment */}
      <div className="w-full max-w-xs">
        {/* Constrain width for better control */}
        <div className="bg-sky-500 text-white font-bold p-10 rounded-lg shadow-lg text-center">
          {/* Adjusted padding */}
          Welcome to Pokemon TeamBuilder !!
        </div>
        <img src={pokemon} alt="Pokemon" className="mx-auto my-4" />
        {/* Corrected image tag */}
        <div className="space-y-4 mt-8">
          {/* This is input boxes */}
          <form>
            <label className="block">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                Name
              </span>
              <input
                type="name"
                name="name"
                className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                placeholder="John"
              />
            </label>
          </form>
          <form>
            <label className="block">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 ">
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
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
              Password
            </span>
            <input
              type="password"
              name="password"
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            />
          </label>
          {/* Login */}
          <button
            // onClick={handleLogin}
            className="w-full bg-orange-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 text-white py-2 rounded-md"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
