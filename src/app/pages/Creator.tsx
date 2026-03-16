import React from 'react';
import { useNavigate } from 'react-router';

export default function Creator() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col pt-24 pb-12 px-6 relative overflow-x-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,229,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none -z-10"></div>
      
      <div className="max-w-6xl w-full mx-auto space-y-12 animate-in fade-in duration-500">
        
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-black uppercase tracking-wider text-cyan-400">
            The Investigation Team
          </h1>
          <p className="text-xl text-gray-400">
            Driven by a shared passion for AI, data, and digital security.
          </p>
        </div>

        {/* Team Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* 🕵️‍♀️ Agent 1: LadyWinterD */}
          <div className="bg-white/5 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-8 shadow-[0_0_30px_rgba(0,229,255,0.05)] hover:shadow-[0_0_40px_rgba(0,229,255,0.15)] transition-all flex flex-col">
            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start mb-6">
              <div className="w-32 h-32 flex-shrink-0 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border-2 border-cyan-400/50 flex items-center justify-center text-5xl shadow-[0_0_20px_rgba(0,229,255,0.2)]">
                👩‍💻
              </div>
              <div className="text-center sm:text-left">
                <h2 className="text-3xl font-bold text-white tracking-wide">LadyWinterD</h2>
                <p className="text-cyan-400 font-mono mt-1 text-sm uppercase font-bold">Data & AI Specialist</p>
              </div>
            </div>
            
            <div className="flex-1 space-y-6">
              <div className="space-y-3 text-gray-300 leading-relaxed text-sm">
                <p>
                  A Data Engineer and developer driven by a deep fascination with Artificial Intelligence. She specializes in building scalable data pipelines and architecting intelligent systems.
                </p>
                <p>
                  Thriving at the intersection of raw data and emerging tech, she constantly explores how AI can be leveraged to create innovative, real-world solutions.
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-white/10">
                <h3 className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-3">Core Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {['Data Engineering', 'Artificial Intelligence', 'Cloud Architecture', 'Full-Stack Dev'].map(skill => (
                    <span key={skill} className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-xs text-cyan-300">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-6 mt-auto">
              <a href="https://github.com/LadyWinterD" target="_blank" rel="noreferrer" className="flex-1 text-center px-4 py-2.5 bg-white/5 border border-white/20 rounded-xl text-white text-sm font-bold hover:bg-white/10 hover:border-cyan-400 transition-all">
                GitHub
              </a>
              <a href="mailto:Cindy.walls.123@gmail.com" className="flex-1 text-center px-4 py-2.5 bg-white/5 border border-white/20 rounded-xl text-white text-sm font-bold hover:bg-white/10 hover:border-cyan-400 transition-all">
                ✉️ Contact
              </a>
            </div>
          </div>

          {/* 🦊 Agent 2: FOX */}
          <div className="bg-white/5 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-8 shadow-[0_0_30px_rgba(168,85,247,0.05)] hover:shadow-[0_0_40px_rgba(168,85,247,0.15)] transition-all flex flex-col">
            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start mb-6">
              <div className="w-32 h-32 flex-shrink-0 rounded-2xl bg-gradient-to-br from-purple-500/20 to-red-600/20 border-2 border-purple-400/50 flex items-center justify-center text-5xl shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                🦊
              </div>
              <div className="text-center sm:text-left">
                <h2 className="text-3xl font-bold text-white tracking-wide">FOX</h2>
                <p className="text-purple-400 font-mono mt-1 text-sm uppercase font-bold">Network & Security Architect</p>
              </div>
            </div>
            
            <div className="flex-1 space-y-6">
              <div className="space-y-3 text-gray-300 leading-relaxed text-sm">
                <p>
                  A hardcore Cybersecurity Architect dedicated to securing digital frontiers. He brings extensive experience in enterprise infrastructure defense and threat neutralization.
                </p>
                <p>
                  Passionate about understanding AI from a defensive perspective, FOX focuses on fortifying networks and ensuring systems remain impenetrable against evolving synthetic threats.
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-white/10">
                <h3 className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-3">Core Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {['Cybersecurity', 'Network Defense', 'Threat Intelligence', 'Infrastructure'].map(skill => (
                    <span key={skill} className="px-3 py-1 bg-purple-500/10 border border-purple-500/30 rounded-lg text-xs text-purple-300">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-6 mt-auto">
              <button className="flex-1 px-4 py-2.5 bg-white/5 border border-white/20 rounded-xl text-gray-400 text-sm font-bold cursor-not-allowed opacity-50 hover:bg-white/10 transition-all" title="System secured. No unauthorized access.">
                🔒 Encrypted Connection
              </button>
            </div>
          </div>

        </div>
        
        {/* Back Button */}
        <div className="text-center pt-8 pb-12">
          <button 
            onClick={() => navigate('/')}
            className="px-8 py-3 bg-transparent border-2 border-cyan-400 rounded-xl text-cyan-400 font-bold uppercase tracking-wider hover:bg-cyan-400 hover:text-black transition-all shadow-[0_0_15px_rgba(0,229,255,0.2)] hover:shadow-[0_0_30px_rgba(0,229,255,0.6)]"
          >
            ← Back to HQ
          </button>
        </div>

      </div>
    </div>
  );
}