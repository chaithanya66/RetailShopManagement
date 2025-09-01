"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [themeColor, setThemeColor] = useState("blue");

  // Handle Dark Mode toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  async function logout() {
    try {
      const response = await axios.get("api/users/logout");
      console.log(response);
      if (response.status == 200) {
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -250 }}
        animate={{ x: sidebarOpen ? 0 : -250 }}
        transition={{ type: "spring", stiffness: 70 }}
        className="fixed top-0 left-0 h-full w-64 bg-gray-200 dark:bg-gray-800 shadow-2xl p-5 z-40"
      >
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 text-white dark:text-gray-300 hover:text-red-400 transition"
        >
          ✖
        </button>
        <nav className="mt-12 flex flex-col space-y-4">
          <Link href="/dashboard" className="hover:text-blue-400">
            Home
          </Link>
          <Link href="/addproducts" className="hover:text-blue-400">
            Add Product
          </Link>
          <Link href="/displayproducts" className="hover:text-blue-400">
            Display Products
          </Link>
          <Link href="/settingspage" className="hover:text-blue-400">
            Settings
          </Link>
        </nav>
      </motion.aside>

      {/* Sidebar Toggle Button (Top Left) */}
      {!sidebarOpen && (
        <motion.button
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          onClick={() => setSidebarOpen(true)}
          className="fixed top-4 left-4 bg-gray-800 dark:bg-gray-700 text-white px-4 py-2 rounded-lg shadow hover:scale-105 transition z-50"
        >
          ☰
        </motion.button>
      )}

      {/* Main content */}
      <div className="flex-1 p-6 ml-0 md:ml-64 transition-all">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-20 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl max-w-xl mx-auto"
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">
            ⚙️ Settings
          </h2>

          {/* Logout Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-red-600 dark:bg-red-700 text-white py-3 rounded-lg shadow-lg hover:bg-red-500 hover:shadow-red-500/50 transition font-semibold"
            onClick={logout}
          >
            🚪 Log Out
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
