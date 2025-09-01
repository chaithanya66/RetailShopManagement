"use client"; // only in App Router

import { useState } from "react";

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center justify-center h-screen">
      {/* Button to open modal */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Open Popup
      </button>

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          {/* Modal Box */}
          <div className="bg-white p-6 rounded-2xl shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4 text-blue-700">
              Hello from Popup 🚀
            </h2>
            <p className="mb-4 text-blue-700">
              This is a popup modal in Next.js using Tailwind.
            </p>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
              >
                Close
              </button>
              <button
                onClick={() => alert("Confirmed ✅")}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
