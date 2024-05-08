import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import setting from "./setting.png";

function Setting() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: "", //handle password value
  });

  useEffect(() => {
    document.body.style.backgroundColor = "grey"; // Set background when component mounts
    return () => {
      document.body.style.backgroundColor = ""; // Revert on unmount if necessary
    };
  }, []);

  const goBack = () => {
    navigate(-1); // Navigates back
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault(); // Prevent default form submission behavior
  //   const loginName = "Testing@gmail.com"; // This should be dynamically obtained, perhaps from user state or props
  //   try {
  //     const response = await fetch(
  //       `http://localhost:8081/users/${loginName}/password`,
  //       {
  //         method: "PUT", // Correct method for updating
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           newPassword: formData.password,
  //         }),
  //       }
  //     );

  //     if (response.ok) {
  //       navigate("/PokemonStats"); // Navigate on successful update
  //     } else {
  //       const text = await response.text();
  //       alert(`Failed to change password: ${text}`);
  //     }
  //   } catch (error) {
  //     console.error("Change password error:", error);
  //     alert("Failed to change password, please try again later.");
  //   }
  // };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    const token = localStorage.getItem("userToken"); // Retrieve the token
    if (!token) {
      console.error("No token found, please log in.");
      alert("No token found, please log in.");
      return;
    }

    const loginName = localStorage.getItem("loginName");
    if (!loginName) {
      console.error("Login name not found, please log in again.");
      alert("Login name not found, please log in again.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8081/user/${loginName}/password`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Use token in Authorization header
          },
          body: JSON.stringify({ newPassword: formData.password }),
        }
      );

      if (!response.ok) throw new Error("Password change failed.");
      alert("Password changed successfully!");
    } catch (error) {
      console.error("Failed to change password:", error);
      alert(error.message);
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
          Settings
        </div>
        <div className="space-y-4 mt-10 flex justify-center items-center">
          <img src={setting} alt="setting" className="h-40 w-40 " />
        </div>
        <form className="space-y-4 mt-8" onSubmit={handleSubmit}>
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
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default Setting;
