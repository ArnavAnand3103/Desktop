
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Contact() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    alert('Thank you! Your message has been submitted.')

    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    })
  }

  return (
    <div className="bg-white">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-50 to-orange-100">
        <div className="mx-auto max-w-screen-xl px-4 py-16 text-center">

          <span className="text-orange-700 font-semibold uppercase tracking-wider text-sm">
            Contact Us
          </span>

          <h1 className="mt-4 mb-6 text-4xl font-extrabold text-gray-900 md:text-5xl">
            Get In <span className="text-orange-700">Touch With Us</span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Have questions, suggestions, or feedback?
            We would love to hear from you.
          </p>

        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="mx-auto max-w-screen-xl px-4">

          <div className="grid lg:grid-cols-2 gap-12">

            {/* Contact Information */}
            <div>

              <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
                Let's Talk
              </h2>

              <p className="text-gray-600 mb-10 leading-relaxed">
                If you have any questions about our currency converter,
                need assistance, or want to share your feedback,
                feel free to contact us.
              </p>

              <div className="space-y-8">

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="bg-orange-100 p-4 rounded-lg text-2xl">
                    📧
                  </div>

                  <div>
                    <h3 className="font-bold text-lg text-gray-900">
                      Email Us
                    </h3>
                    <p className="text-gray-500">
                      support@currencyconverter.com
                    </p>
                  </div>
                </div>

                {/* Support */}
                <div className="flex items-start gap-4">
                  <div className="bg-orange-100 p-4 rounded-lg text-2xl">
                    💬
                  </div>

                  <div>
                    <h3 className="font-bold text-lg text-gray-900">
                      Customer Support
                    </h3>
                    <p className="text-gray-500">
                      We are here to help with your queries.
                    </p>
                  </div>
                </div>

                {/* Availability */}
                <div className="flex items-start gap-4">
                  <div className="bg-orange-100 p-4 rounded-lg text-2xl">
                    🕒
                  </div>

                  <div>
                    <h3 className="font-bold text-lg text-gray-900">
                      Availability
                    </h3>
                    <p className="text-gray-500">
                      Send us a message anytime.
                    </p>
                  </div>
                </div>

              </div>

              {/* Back to Home */}
              <div className="mt-10">
                <Link
                  to="/"
                  className="text-orange-700 font-medium hover:text-orange-800"
                >
                  ← Back to Home
                </Link>
              </div>

            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">

              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Send Us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Name */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Your Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Your Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Subject
                  </label>

                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Enter subject"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Your Message
                  </label>

                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Write your message here..."
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full px-6 py-3 text-white bg-orange-700 rounded-lg font-medium hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 transition"
                >
                  Send Message →
                </button>

              </form>
            </div>

          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-orange-700 py-14">
        <div className="mx-auto max-w-screen-xl px-4 text-center">

          <h2 className="mb-4 text-3xl font-extrabold text-white">
            Need Help With Currency Conversion?
          </h2>

          <p className="mb-8 text-orange-100 text-lg">
            Visit our converter and start converting currencies instantly.
          </p>

          <Link
            to="/converter"
            className="inline-flex items-center px-6 py-3 text-orange-700 bg-white rounded-lg hover:bg-gray-100 font-medium"
          >
            Start Converting →
          </Link>

        </div>
      </section>

    </div>
  )
}
