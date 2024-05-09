import React, { useState, useEffect } from "react";
import pokemon from "./pokemon.png";
import wallpaper from "./pokemonlogin.gif";

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  
  useEffect(() => {
    // Set background GIF and color when component mounts
    document.body.style.backgroundColor = "pink";
    document.body.style.backgroundImage = `url(${wallpaper})`;
    document.body.style.backgroundSize = "cover"; // Cover the entire body
    document.body.style.backgroundPosition = "center"; // Center the background image
    document.body.style.backgroundRepeat = "no-repeat"; // Do not repeat the background image
    document.body.style.backgroundAttachment = "fixed";

    return () => {
      // Revert background styles on unmount if necessary
      document.body.style.background = "";
      document.body.style.backgroundColor = "";
    };
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    const loginDetails = {
      loginName: email,
      password: password,
    };

    try {
      const response = await fetch("http://localhost:8081/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginDetails),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("userToken", data.token);
        localStorage.setItem("loginName", loginDetails.loginName);

        props.onLoginSuccess();
      } else {
        const errorText = await response.text();
        setErrorMessage(errorText);
      }
    } catch (error) {
      setErrorMessage("Login request failed, please check your network.");
    }
  };

  const handleSignUp = () => {
    props.onNavigateToSignUp();
  };

  const handleAboutUs = () => {
    props.onAboutUs();
  };

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

        <form onSubmit={handleLogin} className="space-y-4 mt-8">
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
            onClick={handleSignUp}
            className="w-full bg-orange-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 text-white py-2 rounded-md"
          >
            Signup
          </button>
          <button
            onClick={handleAboutUs}
            className="w-full bg-orange-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 text-white py-2 rounded-md"
          >
            About Us
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
