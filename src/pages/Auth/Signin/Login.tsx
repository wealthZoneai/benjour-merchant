import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch, useAppSelector } from "../../../hooks";
import renderImage from "../../../utills/render-image";
import googleIcon from "../../../assets/google-contained.svg";
import facebookIcon from "../../../assets/facebook.svg";
import appleIcon from "../../../assets/Apple.svg";


const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const count = useAppSelector(state => state.counter.value);
  const dispatch = useAppDispatch();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(count)

    // if (!email || !password) {
    //   toast.error("Please fill all fields");
    //   return;
    // }

    // if (email === "test@example.com" && password === "123456") {
    //   toast.success("Login successful!");
    //   setTimeout(() => {
    //   }, 1000);
    // } else {
    //   toast.error("Invalid email or password");
    // }
     toast.success("Login successful!");
    navigate("/dashboard");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="relative w-full max-w-sm bg-white rounded-xl shadow-xl p-6 pb-8">
        <div className="absolute top-0 left-0 w-full h-1 bg-sky-400 rounded-t-xl"></div>
        <h2 className="text-2xl my-6 font-semibold text-center">Login</h2>
        <form className="space-y-3">
          <div>
            <label className="block text-sm text-gray-700 text-left mb-1">
              Email adderess
            </label>
            <input
              type="text"
              placeholder="Email adderess"
              className="w-full border-b border-gray-200 focus:border-sky-400 outline-none py-1 placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 text-left  mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full border-b border-gray-200 focus:border-sky-400 outline-none py-1 placeholder-gray-400"
            />
            <div className="text-right mt-1">
              <a
                href="#"
                className="text-sm text-gray underline hover:underline"
              >
                Forget password?
              </a>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogin}
            className="w-full bg-sky-400 hover:bg-sky-500 text-white py-2.5 rounded-md font-medium mt-4"
          >
            Login
          </button>
        </form>
        <div className="flex items-center my-4">
          <hr className="flex-1 border-gray-200" />
          <span className="mx-3 text-sm text-gray-400">Or</span>
          <hr className="flex-1 border-gray-200" />
        </div>
        <div className="flex justify-center space-x-5 text-xl">
          {renderImage({
            src: googleIcon,
            alt: "Icon",
            className: "cursor-pointer",
          })}
          {renderImage({
            src: facebookIcon,
            alt: "Icon",
            className: "cursor-pointer",
          })}
          {renderImage({
            src: appleIcon,
            alt: "Icon",
            className: "cursor-pointer",
          })}
        </div>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <a href="/signup" className="text-black font-medium hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
