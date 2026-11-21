
import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="bg-white">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-50 to-orange-100">
        <div className="mx-auto max-w-screen-xl px-4 py-20 lg:py-28 grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <div>
            <span className="text-orange-700 font-semibold text-sm uppercase tracking-wider">
              Simple • Fast • Reliable
            </span>

            <h1 className="mt-4 mb-6 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl xl:text-6xl">
              Convert Your Currency
              <span className="text-orange-700"> Anytime, Anywhere</span>
            </h1>

            <p className="mb-8 text-lg font-normal text-gray-600 lg:text-xl">
              Convert currencies quickly and easily with our simple
              currency converter. Get the latest exchange rates and
              make smarter financial decisions.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/converter"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-orange-700 rounded-lg hover:bg-orange-800 focus:ring-4 focus:ring-orange-300"
              >
                Start Converting
                <span className="ml-2">→</span>
              </Link>

              <Link
                to="/"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2489/2489756.png"
              alt="Currency Exchange"
              className="w-72 md:w-96 object-contain"
            />
          </div>

        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-screen-xl px-4">

          <div className="text-center mb-12">
            <h2 className="mb-4 text-3xl font-extrabold text-gray-900">
              Why Choose Our Currency Converter?
            </h2>

            <p className="text-gray-500 text-lg">
              Everything you need for quick and easy currency conversion.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">

            {/* Feature 1 */}
            <div className="p-8 text-center border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">
                Fast Conversion
              </h3>
              <p className="text-gray-500">
                Convert currencies in seconds with a simple and
                user-friendly interface.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 text-center border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">
                Multiple Currencies
              </h3>
              <p className="text-gray-500">
                Explore and convert between different currencies
                from around the world.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 text-center border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">
                Easy to Use
              </h3>
              <p className="text-gray-500">
                Enjoy a clean, simple, and convenient currency
                conversion experience.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-orange-700 py-16">
        <div className="mx-auto max-w-screen-xl px-4 text-center">

          <h2 className="mb-4 text-3xl font-extrabold text-white">
            Ready to Convert Your Currency?
          </h2>

          <p className="mb-8 text-orange-100 text-lg">
            Start converting currencies quickly and easily today.
          </p>

          <Link
            to="/converter"
            className="inline-flex items-center px-6 py-3 text-base font-medium text-orange-700 bg-white rounded-lg hover:bg-gray-100"
          >
            Get Started →
          </Link>

        </div>
      </section>

    </div>
  )
}
