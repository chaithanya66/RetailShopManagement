"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function DisplayProductsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userproducts, setuserproducts] = useState<any[]>([]);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [formData, setFormData] = useState<any>({});

  // Fetch products
  useEffect(() => {
    async function fetchproducts() {
      try {
        const response = await axios.get("/api/users/fetchproducts");
        setuserproducts(response.data?.totalproducts);
      } catch (error) {
        console.log(error);
      }
    }
    fetchproducts();
  }, []);

  const handleEditClick = (product: any) => {
    setEditingProduct(product);
    setFormData(product);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.post("/api/users/sales", formData);
      console.log("Updated:", response.data);

      setuserproducts((prev) =>
        prev.map((p) => (p.productid === formData.productid ? formData : p))
      );

      setEditingProduct(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      {/* Sidebar */}
      {sidebarOpen && (
        <motion.aside
          initial={{ x: -250 }}
          animate={{ x: 0 }}
          exit={{ x: -250 }}
          transition={{ type: "spring", stiffness: 80 }}
          className="w-64 bg-gray-950 p-6 shadow-2xl flex flex-col"
        >
          {/* Top Section with Close Button */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Menu</h2>

            <button
              onClick={() => setSidebarOpen(false)}
              className="text-red-500 hover:text-red-400 transition"
            >
              <X size={28} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-4 flex-1">
            {[
              { name: "Home", path: "/dashboard" },
              { name: "Add Products", path: "/addproducts" },
              { name: "Display Products", path: "/displayproducts" },
              { name: "Settings", path: "/settingspage" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.1, x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link
                  href={item.path}
                  className="block px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </nav>
        </motion.aside>
      )}

      {/* Main content */}
      <div className="flex-1 p-6">
        {/* Show Sidebar Icon */}
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-blue-500 hover:text-blue-400 transition mb-6"
          >
            <Menu size={28} />
          </button>
        )}

        <h1 className="text-4xl font-bold mb-8 text-center">📦 Products</h1>

        {/* Product grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
          {userproducts.map((product) => (
            <motion.div
              key={product.productid}
              className="bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-700 hover:border-purple-500"
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 0px 20px rgba(168, 85, 247, 0.7)",
              }}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <h2 className="text-2xl font-semibold mb-2 text-purple-400">
                {product.productname}
              </h2>
              <p className="mb-1">
                💰 <span className="font-bold">Price:</span> ₹{product.price}
              </p>
              <p className="mb-1">
                📦 <span className="font-bold">Quantity:</span>{" "}
                {product.quantity}
              </p>
              <p className="text-gray-300">{product.description}</p>
              <motion.button
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "rgb(147,51,234)",
                }}
                className="mt-4 bg-purple-600 px-4 py-2 rounded-lg shadow-lg hover:shadow-purple-500/50 transition"
                onClick={() => handleEditClick(product)}
              >
                Edit
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {editingProduct && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gray-900 rounded-2xl p-8 w-96 shadow-xl border border-purple-500"
              initial={{ scale: 0.5, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.5, rotate: 180 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
            >
              <h2 className="text-2xl font-bold text-purple-400 mb-4">
                ✏️ Edit Product
              </h2>

              {/* Form */}
              <label className="block mb-2">Name</label>
              <input
                type="text"
                name="productname"
                value={formData.productname || ""}
                onChange={handleInputChange}
                className="w-full mb-4 p-2 rounded bg-gray-800 border border-gray-600"
              />

              <label className="block mb-2">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price || ""}
                onChange={handleInputChange}
                className="w-full mb-4 p-2 rounded bg-gray-800 border border-gray-600"
              />

              <label className="block mb-2">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity || ""}
                onChange={handleInputChange}
                className="w-full mb-4 p-2 rounded bg-gray-800 border border-gray-600"
              />

              <label className="block mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description || ""}
                onChange={handleInputChange}
                className="w-full mb-4 p-2 rounded bg-gray-800 border border-gray-600"
              />

              {/* Buttons */}
              <div className="flex justify-between">
                <button
                  onClick={() => setEditingProduct(null)}
                  className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  Save
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
