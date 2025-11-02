import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import renderImage from "../../../utills/render-image";
import googleIcon from "../../../assets/google-contained.svg";
import facebookIcon from "../../../assets/facebook.svg";
import appleIcon from "../../../assets/Apple.svg";
import { loginUser } from "../../../services/apiHelpers";
import { setUserData } from "../../../store/slice/userData";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const count = useAppSelector((state) => state.counter.value);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    loginUser({ email, password })
      .then((response) => {
        if (response.data && response.data.token) {
          localStorage.setItem("token", response.data.token);
          dispatch(setUserData({
            token: response.data.token,
            merchantId: response.data.merchantId,
          }));
          toast.success("Login successful!");
          navigate("/dashboard");
        } else {
          toast.error("Login failed. Token not received.");
        }
      })
      .catch((error) => {
        toast.error("Login failed. Please check your credentials.");
      });
  };


  return (
    <div className="relative flex justify-center items-center min-h-screen overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=80')",
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/70"></div>

      {/* Animated Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-sm bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-6 text-white"
      >
        <h2 className="text-2xl font-bold text-center mb-1 tracking-wide">
          Welcome Back 👋
        </h2>
        <p className="text-center text-gray-300 text-xs mb-5">
          Log in to manage your restaurant dashboard
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-xs text-gray-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md focus:ring-2 focus:ring-sky-400 focus:outline-none text-white placeholder-gray-300 text-sm"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs text-gray-300 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md focus:ring-2 focus:ring-sky-400 focus:outline-none text-white placeholder-gray-300 text-sm pr-9"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white transition"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <div className="text-right mt-1">
              <a
                href="#"
                className="text-xs text-sky-400 hover:underline transition"
              >
                Forgot password?
              </a>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-sky-400 to-blue-500 rounded-md text-white text-sm font-semibold shadow-lg hover:from-sky-500 hover:to-blue-600 transition-all duration-300"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-1 border-gray-500/40" />
          <span className="mx-2 text-xs text-gray-300">OR</span>
          <hr className="flex-1 border-gray-500/40" />
        </div>

        {/* Social Login */}
        <div className="flex justify-center gap-4">
          {renderImage({
            src: googleIcon,
            alt: "Google",
            className:
              "cursor-pointer w-7 h-7 p-1 bg-white/20 rounded-full hover:bg-white/30 transition",
          })}
          {renderImage({
            src: facebookIcon,
            alt: "Facebook",
            className:
              "cursor-pointer w-7 h-7 p-1 bg-white/20 rounded-full hover:bg-white/30 transition",
          })}
          {renderImage({
            src: appleIcon,
            alt: "Apple",
            className:
              "cursor-pointer w-7 h-7 p-1 bg-white/20 rounded-full hover:bg-white/30 transition",
          })}
        </div>

        {/* Signup Link */}
        <p className="text-center text-gray-300 text-xs mt-5">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="text-sky-400 font-medium hover:underline"
          >
            Sign up
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
