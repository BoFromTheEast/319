import React, { useState } from "react";
import pokemon from "./pokemon.png";

// let componentToRender;
//   switch (currentView) {
//     case "login":
//       componentToRender = <ReadProducts />;
//       break;
//     case "signup":
//       componentToRender = <DeleteProducts />;
//       break;

//     default:
//       componentToRender = <ReadProducts />;
//   }

function LoginPage() {
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
            <label class="block">
              <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                Email
              </span>
              <input
                type="email"
                name="email"
                class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                placeholder="you@example.com"
              />
            </label>
          </form>
          <label class="block">
            <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
              Password
            </span>
            <input
              type="password"
              name="password"
              class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            />
          </label>
          {/* Creates space between buttons */}
          <button className="w-full bg-orange-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 text-white py-2 rounded-md">
            Login
          </button>
        </div>
        <div className="space-y-4 mt-40">
          <button className="w-full bg-orange-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 text-white py-2 rounded-md">
            Signup
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
