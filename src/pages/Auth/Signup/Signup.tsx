import React from "react";
import googleIcon from "../../../assets/google-contained.svg";
import facebookIcon from "../../../assets/facebook.svg";
import appleIcon from "../../../assets/Apple.svg";
import renderImage from "../../../utills/render-image";

export default function Signup() {
  
  return (
    <div className="flex justify-center min-h-screen items-center bg-gray-50">
      <div className="relative w-full max-w-sm bg-white rounded-xl shadow-xl p-6 pb-8">
        <div className="absolute top-0 left-0 w-full h-1 bg-sky-400 rounded-t-xl"></div>
        <h2 className="text-2xl my-6 font-semibold text-center mb-4">Sign Up</h2>
        <form className="space-y-3">
          <div>
            <label className="block text-sm text-gray-700 text-left mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter name"
              className="w-full border-b border-gray-200 focus:border-sky-400 outline-none py-1 placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 text-left mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              className="w-full border-b border-gray-200 focus:border-sky-400 outline-none py-1 placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-left mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full border-b border-gray-200 focus:border-sky-400 outline-none py-1 placeholder-gray-400"
            />
          </div>

          <button
            type="button"
            className="w-full bg-sky-400 hover:bg-sky-500 text-white py-2.5 rounded-md font-medium mt-4"
          >
            Sign Up
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
          Already have an account?{" "}
          <a href="/" className="text-black font-medium hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
