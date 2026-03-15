import React from 'react';
import { useNavigate } from 'react-router';

export default function Creator() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col pt-24 pb-12 px-6 relative">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,229,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none -z-10"></div>
      
      <div className="max-w-4xl w-full mx-auto space-y-8 animate-in fade-in duration-500">
        
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-black uppercase tracking-wider text-cyan-400">
            Meet the Detective
          </h1>
          <p className="text-xl text-gray-400">
            Building robust data pipelines by day, hunting deepfakes by night.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-[0_0_50px_rgba(0,229,255,0.1)]">
          <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">
            
            {/* Avatar / Identity */}
            <div className="flex-shrink-0 space-y-4 text-center">
              <div className="w-40 h-40 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border-2 border-cyan-400/50 flex items-center justify-center text-6xl shadow-[0_0_30px_rgba(0,229,255,0.3)] mx-auto md:mx-0">
                👩‍💻
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white tracking-wide">Cindy Li</h2>
                <p className="text-cyan-400 font-mono mt-1 text-sm uppercase">Data Engineer & AI Dev</p>
              </div>
            </div>

            {/* Bio & Details */}
            <div className="flex-1 space-y-6">
              
              <div className="space-y-3 text-gray-300 leading-relaxed">
                <p>
                  I am a highly skilled Data Engineer with over 7 years of experience specializing in engineering data pipelines, data modeling, and cloud integration.
                </p>
                <p>
                  My expertise spans across enterprise platforms, but I am deeply passionate about pushing boundaries through Full-stack development and AI Agent creation. I thrive in hackathons, continuously exploring how data can drive intelligent solutions.
                </p>
              </div>

              {/* Skills Tags */}
              <div className="space-y-2">
                <h3 className="text-sm uppercase tracking-widest text-gray-400 font-bold mb-3">Tech Arsenal</h3>
                <div className="flex flex-wrap gap-2">
                  {['Python', 'SQL', 'Azure Synapse', 'Databricks', 'Power BI', 'AI Agents'].map(skill => (
                    <span key={skill} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-sm text-cyan-300">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Featured Projects */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                <h3 className="text-sm uppercase tracking-widest text-gray-400 font-bold mb-3">Notable Missions</h3>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <span className="text-orange-400 text-xl">🏆</span>
                    <div>
                      <p className="text-white font-bold flex items-center flex-wrap gap-2">
                        Bubble Trouble 
                        <span className="text-xs text-orange-400 border border-orange-400/30 bg-orange-400/10 px-2 py-0.5 rounded">Winner: APAC Bolt.new Hackathon</span>
                      </p>
                      <p className="text-sm text-gray-400 mt-1">Engineered a global leaderboard data product with Redis and real-time architecture.</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-cyan-400 text-xl">✈️</span>
                    <div>
                      <p className="text-white font-bold">Travel Planner</p>
                      <p className="text-sm text-gray-400 mt-1">Data-driven intelligent scheduling platform utilizing OpenTripMap & Weather APIs.</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-purple-400 text-xl">🏗️</span>
                  </li>
                </ul>
              </div>

              {/* Contact / Links */}
              <div className="flex flex-wrap gap-4 pt-6">
                <a href="https://github.com/LadyWinterD" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/20 rounded-xl text-white font-bold hover:bg-white/10 hover:border-cyan-400 transition-all">
                  <span>👾</span> GitHub
                </a>
                <a href="mailto:ladywinterd@gmail.com" className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/20 rounded-xl text-white font-bold hover:bg-white/10 hover:border-orange-400 transition-all">
                  <span>✉️</span> Contact Me
                </a>
              </div>

            </div>
          </div>
        </div>
        
        {/* Back Button */}
        <div className="text-center pt-8 pb-12">
          <button 
            onClick={() => navigate('/')}
            className="px-8 py-3 bg-transparent border-2 border-cyan-400 rounded-xl text-cyan-400 font-bold uppercase tracking-wider hover:bg-cyan-400 hover:text-black transition-all shadow-[0_0_15px_rgba(0,229,255,0.2)] hover:shadow-[0_0_30px_rgba(0,229,255,0.6)]"
          >
            ← Back to Investigation
          </button>
        </div>

      </div>
    </div>
  );
}