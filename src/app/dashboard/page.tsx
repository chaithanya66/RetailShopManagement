"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import axios from "axios";
import Link from "next/link";

export default function Dashboard() {
  const mainurl = "http://localhost:3000/";
  const [displayhomedata, sethomedata] = useState<any>({});
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchdashboarddata = async () => {
      try {
        const response = await axios.get("api/users/homepage", {
          withCredentials: true,
        });
        sethomedata(response.data);
        console.log(response.data);
      } catch (error: any) {
        console.log(error.response?.data || error.message);
      }
    };
    fetchdashboarddata();
  }, []);
  console.log(displayhomedata.totalproducts);

  const metrics = {
    products: displayhomedata?.totalproducts || 0,
    totalSales: displayhomedata?.totalSaleTillNow || 0,
    todaySales: displayhomedata?.totalsales || 0,
    monthlySales: displayhomedata?.monthlysales,
  };

  const cards = [
    { title: "Total Products", value: metrics.products },
    { title: "Total Sales", value: `₹${metrics.totalSales}` },
    { title: "Today Sales", value: `₹${metrics.todaySales}` },
    { title: "Monthly Sales", value: `₹${metrics.monthlySales}` },
  ];

  // async function checkcookie() {
  //   try {
  //     const response = await axios.get("api/users/checktoken");
  //     console.log(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="absolute top-4 left-4 z-20 p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
      >
        <Menu size={24} />
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="fixed top-0 left-0 h-full w-64 bg-gray-800 shadow-lg z-30 flex flex-col"
          >
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
              <h2 className="text-xl font-bold">Menu</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1 rounded hover:bg-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <nav className="flex flex-col p-4 space-y-3">
              <Link
                href="/dashboard"
                className="hover:text-gray-300 transition"
              >
                Home
              </Link>
              <Link
                href="/addproducts"
                className="hover:text-gray-300 transition"
              >
                Add Products
              </Link>
              <Link
                href="/displayproducts"
                className="hover:text-gray-300 transition"
              >
                Display Products
              </Link>

              <Link
                href="/settingspage"
                className="hover:text-gray-300 transition"
              >
                Settings
              </Link>
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex-1 flex flex-col p-6 md:p-10 overflow-y-auto"
      >
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 80 }}
          className="text-3xl font-extrabold mb-8 ml-10"
        >
          Retail Dashboard
        </motion.h1>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 flex-1">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.2, type: "spring" }}
              whileHover={{ scale: 1.05, rotate: 1 }}
              className="flex items-center justify-center h-full min-h-[200px] w-full rounded-2xl bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 shadow-lg p-6 text-center"
            >
              <div>
                <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
                <p className="text-3xl font-bold">{card.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.main>
    </div>
  );
}
