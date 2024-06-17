import { Link } from "react-router-dom";
import Oauth from "../Oauth";
import { useState } from 'react'
import axios from "axios";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    address: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/user/add",
        formData
      );
      console.log(response.data);
      toast.success("User account created Successfully!", {
        position: "top-center",
        theme: "dark",
        transition: Bounce,
      });

    } catch (error) {
      console.error("Error creating user:", error);
      if (error.response && error.response.status === 400 && error.response.data.message === "Username already exists") {
        toast.error("Username already exists", {
          position: "top-center",
          theme: "dark",
          transition: Bounce,
          autoClose:"3000"
        });
        
      }
    }
  };

 const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  console.log(formData)

  return (
    <div>
      <ToastContainer />
      <div className="flex items-center justify-center h-screen">
        <div className="w-2/5 bg-white p-6 rounded-md shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-md font-medium">
                Username
              </label>
              <input
                type="text"
                name="username"
                onChange={handleChange}
                value={formData.username}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-cyan-600"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-md font-medium">
                Email
              </label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}

                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-cyan-600"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="block text-md font-medium">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}

                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-cyan-600"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-md font-medium">
                Password
              </label>
              <input
                type="text"
                name="password"
                value={formData.password}
                onChange={handleChange}

                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-cyan-600"
              />
            </div>
            <button type="submit" className="mt-1 p-2 w-full text-black font-semibold bg-green-400">
              Sign Up
            </button>
          </form>
          <div className="mt-4 flex items-center justify-center text-gray-500">
            <hr className="w-full border-gray-300" />
            <span className="px-4">or</span>
            <hr className="w-full border-gray-300" />
          </div>
          <div className="mt-4">
            <Oauth />
          </div>
          <div className="flex gap-2 mt-5">
            <p>Do not have an account?</p>
            <Link to="/login">
              <span className=" text-black cursor-pointer hover:font-bold">
                Sign in
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
