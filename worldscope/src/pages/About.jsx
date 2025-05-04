import React from 'react'
import Layout from '../components/Layout'

const About = () => {
  return (
    <Layout>
      <section id="about" className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-25 md:pt-20">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-10">
            About <span className="text-blue-600">WorldScope</span>
            <span></span>
          </h2>

          <p className="text-gray-600 text-md md:text-lg leading-relaxed mb-10">
            WorldScope is your gateway to discovering the rich and diverse tapestry of countries across the globe. Whether you're a student, a traveler, or a curious mind,
            we bring the world closer to you — one country at a time.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="backdrop-blur-md bg-white/30 border border-white/20 shadow-md rounded-2xl p-6 text-left">
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">🌍 Our Mission</h3>
              <p className="text-gray-700">
                To make global knowledge easily accessible and visually engaging. We believe in the power of organized information and intuitive interfaces to
                help users explore the world meaningfully.
              </p>
            </div>

            {/* Vision */}
            <div className="backdrop-blur-md bg-white/30 border border-white/20 shadow-md rounded-2xl p-6 text-left">
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">🚀 Our Vision</h3>
              <p className="text-gray-700">
                To become the go-to platform for insightful, fast, and visually appealing country data — making exploration an enjoyable digital experience for everyone.
              </p>
            </div>
          </div>

          <div className="mt-12">
            <p className="text-sm text-gray-500">
              Built with 💙 by the WorldScope team — Fueled by curiosity and the spirit of discovery.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default About