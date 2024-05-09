import React, { useState, useEffect } from "react";
import pokemon from "./pokemon2.png";

function SignUp(props) {
  const [formData, setFormData] = useState({
    name: "", //handle name value
    email: "", //handle email value
    password: "", //handle password value
  });

  useEffect(() => {
    document.body.style.backgroundColor = "tan"; // Set background when component mounts
    return () => {
      document.body.style.backgroundColor = ""; // Revert on unmount if necessary
    };
  }, []);

  const goBack = () => {
    props.onBack();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    try {
      const response = await fetch("http://localhost:8081/signup", {
        method: "POST", //Creating a new user
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          loginName: formData.email, // Assuming your backend expects loginName instead of email
          password: formData.password,
        }),
      });

      if (response.ok) {
        props.onSubmit(); // Navigate on successful sign up
      } else {
        const text = await response.text();
        alert(`Failed to sign up: ${text}`);
      }
    } catch (error) {
      console.error("Sign up error:", error);
      alert("Failed to sign up, please try again later.");
    }
  };

  return (
    <div className="flex flex-col items-center mt-10 px-4">
      <button
        onClick={goBack}
        className="self-start bg-orange-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 text-white py-2 px-4 rounded-lg mb-4"
      >
        Back
      </button>
      <div className="w-full max-w-xs">
        <div className="bg-sky-500 text-white font-bold p-5 rounded-lg shadow-lg text-center">
          Welcome to Pokemon TeamBuilder !!
        </div>
        <img src={pokemon} alt="Pokemon" className="mx-auto my-4" />
        <form className="space-y-4 mt-8" onSubmit={handleSubmit}>
          <label className="block">
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 ">
              Email
            </span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
              placeholder="you@example.com"
            />
          </label>

          <label className="block">
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
              Password
            </span>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            />
          </label>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 text-white py-2 rounded-md"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
