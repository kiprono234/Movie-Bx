// src/pages/About.jsx
import React from "react";
import Navbar from "../components/Navbar";
import { Film, Code, Github, Linkedin } from "lucide-react";

export default function About() {
  return (
    <> 
    <Navbar/>
    <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 via-black to-gray-950 text-gray-100 px-6 py-16">
      <div className="max-w-5xl text-center">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 flex items-center justify-center gap-2">
          <Film className="text-red-500 w-10 h-10" />
          About <span className="text-red-500">Movie Box</span>
        </h1>

        {/* Tagline */}
        <p className="text-gray-400 text-lg md:text-xl mb-8">
          Your ultimate destination for exploring, discovering, and falling in love with movies.
        </p>

        {/* Description */}
        <div className="bg-gray-800/40 backdrop-blur-sm p-8 rounded-2xl shadow-lg mb-12">
          <p className="text-gray-300 leading-relaxed mb-4">
            Movie Box was born out of a passion for cinema and technology. It’s a place where movie lovers can explore the latest releases,
            discover timeless classics, and dive deep into details — all powered by data from{" "}
            <span className="text-red-400 font-semibold">The Movie Database (TMDB)</span>.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Built with React and powered by APIs, Movie Box combines smooth performance, modern design, and real-time movie data to give
            you a cinematic experience right from your screen.
          </p>
        </div>

        {/* Technologies */}
        <div>
          <h2 className="text-2xl font-semibold text-white mb-4 flex items-center justify-center gap-2">
            <Code className="text-red-500" /> Technologies Used
          </h2>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {["React.js", "Tailwind CSS", "TMDB API", "JavaScript (ES6+)", "React Router"].map((tech, index) => (
              <span
                key={index}
                className="bg-gray-700 text-gray-200 px-4 py-2 rounded-full text-sm font-medium hover:bg-red-500 hover:text-white transition"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Developer Section */}
        <div className="border-t border-gray-700 pt-8">
          <p className="text-lg text-gray-300 mb-4">
            Developed with ❤️ by{" "}
            <span className="text-red-400 font-semibold">Dennis Kipkurui</span>.
          </p>

          <div className="flex justify-center gap-6">
            <a
              href="https://github.com/dennoAiden"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition"
            >
              <Github className="w-5 h-5" /> GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/dennis-kipkurui-40b3122a4/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition"
            >
              <Linkedin className="w-5 h-5" /> LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
    </>
   
  );
}
