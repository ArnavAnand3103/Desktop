
import React from 'react'
import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div className="bg-white">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-50 to-orange-100">
        <div className="mx-auto max-w-screen-xl px-4 py-20 text-center">

          <span className="text-orange-700 font-semibold uppercase tracking-wider text-sm">
            About Us
          </span>

          <h1 className="mt-4 mb-6 text-4xl font-extrabold text-gray-900 md:text-5xl">
            Making Currency Conversion
            <span className="text-orange-700"> Simple & Easy</span>
          </h1>

          <p className="max-w-3xl mx-auto text-lg text-gray-600">
            Our mission is to make currency conversion simple, fast,
            and accessible for everyone. Convert currencies easily
            and stay informed about exchange rates.
          </p>

        </div>
      </section>

      {/* About Content */}
      <section className="py-20">
        <div className="mx-auto max-w-screen-xl px-4 grid md:grid-cols-2 gap-12 items-center">

          <div>
            <h2 className="mb-6 text-3xl font-extrabold text-gray-900">
              Who We Are
            </h2>

            <p className="mb-5 text-gray-600 leading-relaxed">
              We provide a simple and convenient platform that helps
              users convert one currency into another without any
              complications.
            </p>

            <p className="mb-5 text-gray-600 leading-relaxed">
              Whether you are travelling internationally, shopping
              online, studying abroad, or managing international
              transactions, our currency converter makes the process
              easier.
            </p>

            <Link
              to="/converter"
              className="inline-flex items-center px-6 py-3 text-white bg-orange-700 rounded-lg hover:bg-orange-800 font-medium"
            >
              Try Our Converter →
            </Link>
          </div>

          <div className="flex justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2830/2830284.png"
              alt="Global Currency Exchange"
              className="w-72 md:w-96 object-contain"
            />
          </div>

        </div>
      </section>

      {/* Mission and Vision */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-screen-xl px-4">

          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Our Mission & Vision
            </h2>
            <p className="mt-4 text-gray-500 text-lg">
              Building a smarter and more accessible currency
              conversion experience.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">

            {/* Mission */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <div className="text-4xl mb-4">🎯</div>

              <h3 className="mb-4 text-2xl font-bold text-gray-900">
                Our Mission
              </h3>

              <p className="text-gray-600 leading-relaxed">
                To provide users with a fast, reliable, and
                user-friendly currency conversion platform that
                simplifies international currency calculations.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <div className="text-4xl mb-4">🌍</div>

              <h3 className="mb-4 text-2xl font-bold text-gray-900">
                Our Vision
              </h3>

              <p className="text-gray-600 leading-relaxed">
                To make currency conversion accessible to everyone
                around the world through simple technology and
                an easy-to-use digital experience.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="mx-auto max-w-screen-xl px-4">

          <div className="text-center mb-12">
            <h2 className="mb-4 text-3xl font-extrabold text-gray-900">
              Why Choose Us?
            </h2>

            <p className="text-gray-500 text-lg">
              Designed to make your currency conversion experience better.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

            <div className="text-center p-6">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-3">Fast & Easy</h3>
              <p className="text-gray-500">
                Convert currencies quickly with just a few clicks.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="text-4xl mb-4">💱</div>
              <h3 className="text-xl font-bold mb-3">Multiple Currencies</h3>
              <p className="text-gray-500">
                Access different currencies from around the world.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-bold mb-3">Responsive Design</h3>
              <p className="text-gray-500">
                Enjoy a smooth experience on mobile, tablet, and desktop.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="bg-orange-700 py-16">
        <div className="mx-auto max-w-screen-xl px-4 text-center">

          <h2 className="mb-4 text-3xl font-extrabold text-white">
            Start Converting Today!
          </h2>

          <p className="mb-8 text-lg text-orange-100">
            Experience simple and convenient currency conversion.
          </p>

          <Link
            to="/converter"
            className="inline-flex items-center px-6 py-3 text-orange-700 bg-white rounded-lg hover:bg-gray-100 font-medium"
          >
            Convert Currency →
          </Link>

        </div>
      </section>

    </div>
  )
}
```
