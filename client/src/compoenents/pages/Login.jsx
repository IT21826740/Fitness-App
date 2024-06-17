import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Oauth from "../Oauth";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {

 const [username, setUsername] = useState("");
 const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const userData = await response.json();
        console.log("userdata", userData)
        localStorage.setItem("userData", JSON.stringify(userData.user))
         localStorage.setItem("coverImage", userData.user.coverPath || "");
         localStorage.setItem("profileImage", userData.user.profilePath || "");
        setError("");
        toast.success("Login successful!", {
          position: "top-center",
          theme: "dark",
          transition: Bounce,
        });
        navigate(`/profile/${userData.user.username}`);
         
      } else {
        const errorMessage = await response.text();
        setError(errorMessage || "Login failed");
        toast.error("Invalid username or password", {
          position: "top-center",
          theme: "dark",
          transition: Bounce,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while logging in");
      toast.error("An error occurred while logging in");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <ToastContainer />
      <div className="w-2/5 mx-auto bg-white p-6 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Sign in</h2>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-md font-medium">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
            <div className="mb-4">
              <label htmlFor="password" className="block text-md font-medium">
                Password
              </label>
              <input
                type="text"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            <div className="mt-6">
              <button type="submit" className="mt-1 p-2 w-full text-black font-semibold bg-green-400">
                Sign In
              </button>

              <div className="mt-4 flex items-center justify-center text-gray-500">
                <hr className="w-full border-gray-300" />
                <span className="px-4">or</span>
                <hr className="w-full border-gray-300" />
              </div>
              <div className="mt-4">
                <Oauth />
              </div>
            </div>
          </div>
        </form>
        <div className="flex gap-2 mt-5">
          <p>Do not have an account?</p>
          <Link to="/signup">
            <span className=" text-black cursor-pointer hover:font-bold">
              Sign up
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
