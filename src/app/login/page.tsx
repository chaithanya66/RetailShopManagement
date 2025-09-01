"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { motion } from "framer-motion";

export default function Login() {
  const router = useRouter();
  const [user, setUser] = useState({ email: "", password: "" });
  const [buttonDisable, setButtonDisable] = useState(false);
  const [process, setProcess] = useState(true);

  async function onLogin() {
    try {
      setProcess(false);
      setButtonDisable(true);
      const response = await axios.post("/api/users/login", user);
      if (response.status === 200) {
        router.push("/dashboard");
      }
    } catch (error: any) {
      if (error.status === 401) {
        alert("Invalid password");
      } else if (error.status === 400) {
        alert("User doesn't exist");
      } else {
        alert("Something went wrong!");
      }
    } finally {
      setButtonDisable(false);
      setProcess(true);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 80, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="w-full max-w-md p-8 rounded-2xl shadow-2xl bg-gray-900/70 border border-gray-700 backdrop-blur-xl"
      >
        <motion.h1
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
          className="text-4xl font-bold text-center mb-6 text-yellow-400 drop-shadow-lg"
        >
          {process ? "Welcome Back" : "Processing..."}
        </motion.h1>

        {/* Email */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mb-6"
        >
          <label htmlFor="email" className="text-sm text-gray-300">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="w-full mt-2 p-3 rounded-lg bg-gray-800 text-white placeholder-gray-500 border border-gray-600 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-500 outline-none transition"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </motion.div>

        {/* Password */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mb-6"
        >
          <label htmlFor="password" className="text-sm text-gray-300">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            className="w-full mt-2 p-3 rounded-lg bg-gray-800 text-white placeholder-gray-500 border border-gray-600 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-500 outline-none transition"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </motion.div>

        {/* Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-3 rounded-lg bg-yellow-400 text-black font-bold text-lg shadow-lg hover:bg-yellow-300 transition"
          disabled={buttonDisable}
          onClick={onLogin}
        >
          {buttonDisable ? (
            <div className="loader1">
              <div className="dot1"></div>
              <div className="dot1"></div>
              <div className="dot1"></div>
            </div>
          ) : (
            "Login"
          )}
        </motion.button>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-6 text-center"
        >
          <p className="text-gray-400">
            Don’t have an account?{" "}
            <Link
              href="/signup"
              className="text-yellow-400 hover:text-yellow-300 transition font-semibold"
            >
              Sign up
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
