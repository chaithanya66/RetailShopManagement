"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import axios from "axios";

export default function AddProductPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [productsDet, setProductDet] = useState({
    productName: "",
    price: 0,
    quantity: 0,
    description: "",
  });
  const [postdata, setPostdata] = useState(false);

  async function addProsucts(e: React.FormEvent) {
    e.preventDefault();
    setPostdata(true);
    try {
      const response = await axios.post("api/users/addproducts", productsDet);
      console.log(response);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setPostdata(false);
    }
  }

  const mailUrl = "https://retail-shop-management-kbx5.vercel.app/";
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white overflow-hidden">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: "-100%" }}
        animate={{ x: isSidebarOpen ? 0 : "-100%" }}
        transition={{ type: "spring", stiffness: 80, damping: 15 }}
        className="fixed top-0 left-0 h-full w-64 bg-black/80 backdrop-blur-xl border-r border-gray-800 z-50 shadow-2xl"
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className="text-lg font-bold text-white">Menu</h2>
          <button onClick={() => setIsSidebarOpen(false)}>
            <X className="text-gray-400 hover:text-white transition" />
          </button>
        </div>
        <nav className="p-6 space-y-4">
          <a
            href={mailUrl + "dashboard"}
            className="block px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 transition"
          >
            Home
          </a>
          <a
            href={mailUrl + `addproducts`}
            className="block px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 transition"
          >
            Add Products
          </a>
          <a
            href={mailUrl + `displayproducts`}
            className="block px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 transition"
          >
            Display Products
          </a>
          <a
            href={mailUrl + `settingspage`}
            className="block px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 transition"
          >
            Settings
          </a>
        </nav>
      </motion.aside>

      {/* Sidebar toggle button */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="absolute top-4 left-4 z-40 p-2 rounded-xl bg-gray-900/80 hover:bg-gray-800 transition border border-gray-700"
      >
        <Menu className="text-white" />
      </button>

      {/* Form container */}
      <main className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-lg bg-black/70 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-gray-800"
        >
          <h1 className="text-3xl font-extrabold text-white mb-8 text-center">
            Add Product
          </h1>

          <form className="space-y-6" onSubmit={addProsucts}>
            {/* Product Name */}
            <div className="relative">
              <input
                type=""
                id="productName"
                placeholder=" "
                value={productsDet.productName}
                onChange={(e) =>
                  setProductDet({
                    ...productsDet,
                    productName: e.target.value,
                  })
                }
                className="peer w-full px-4 py-3 bg-gray-900/60 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
              />
              <label
                htmlFor="productName"
                className="absolute left-4 top-3 text-gray-400 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-[-10px] peer-focus:text-xs peer-focus:text-purple-400 peer-[:not(:placeholder-shown)]:top-[-10px] peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-purple-300"
              >
                Product Name
              </label>
            </div>

            {/* Price */}
            <div className="relative">
              <input
                type="number"
                id="price"
                value={productsDet.price}
                onChange={(e) =>
                  setProductDet({
                    ...productsDet,
                    price: parseFloat(e.target.value),
                  })
                }
                placeholder=" "
                className="peer w-full px-4 py-3 bg-gray-900/60 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
              />
              <label
                htmlFor="price"
                className="absolute left-4 top-3 text-gray-400 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-[-10px] peer-focus:text-xs peer-focus:text-purple-400 peer-[:not(:placeholder-shown)]:top-[-10px] peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-purple-300"
              >
                Price
              </label>
            </div>

            {/* Quantity */}
            <div className="relative">
              <input
                type="number"
                id="quantity"
                placeholder=" "
                value={productsDet.quantity}
                onChange={(e) =>
                  setProductDet({
                    ...productsDet,
                    quantity: parseFloat(e.target.value),
                  })
                }
                className="peer w-full px-4 py-3 bg-gray-900/60 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
              />
              <label
                htmlFor="quantity"
                className="
    absolute left-4 top-3 text-gray-400 text-sm transition-all
    peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
    peer-focus:top-[-10px] peer-focus:text-xs peer-focus:text-purple-400
    peer-[:not(:placeholder-shown)]:top-[-10px] peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-purple-300
  "
              >
                Quantity
              </label>
            </div>

            {/* Description */}
            <div className="relative">
              <textarea
                id="description"
                rows={4}
                placeholder=" "
                value={productsDet.description}
                onChange={(e) =>
                  setProductDet({
                    ...productsDet,
                    description: e.target.value,
                  })
                }
                className="peer w-full px-4 py-3 bg-gray-900/60 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white resize-none"
              ></textarea>
              <label
                htmlFor="description"
                className="
    absolute left-4 top-3 text-gray-400 text-sm transition-all
    peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
    peer-focus:top-[-10px] peer-focus:text-xs peer-focus:text-purple-400
    peer-[:not(:placeholder-shown)]:top-[-10px] peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-purple-300
  "
              >
                Description
              </label>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px rgba(139, 92, 246, 0.7)",
              }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-700 to-purple-900 text-white font-semibold shadow-lg hover:opacity-90 transition border border-gray-800"
            >
              {postdata ? (
                <div className="loader">
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </div>
              ) : (
                "Submit Product"
              )}
            </motion.button>
          </form>
        </motion.div>
      </main>
    </div>
  );
}
