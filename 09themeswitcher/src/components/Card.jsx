import React, { useState } from 'react'



export default function Card() {
  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">

        {/* Card Image */}
        <img
          src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500"
          alt="Card"
          className="w-full h-48 object-cover rounded-lg mb-5"
        />

        {/* Card Content */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          Card Title
        </h2>

        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-5">
          This is a simple card component built using React and
          Tailwind CSS. You can customize the content according
          to your requirements.
        </p>

        {/* Card Button */}
        <button className="w-full bg-orange-700 hover:bg-orange-800 text-white font-medium py-2.5 px-4 rounded-lg transition duration-300">
          Read More
        </button>

      </div>
    </div>
  )
}
