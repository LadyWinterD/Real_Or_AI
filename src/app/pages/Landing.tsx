import { useNavigate } from "react-router";
import { getUser } from "../utils/storage";
import { useEffect } from "react";

export default function Landing() {
  const navigate = useNavigate();

  useEffect(() => {
    // If user is already logged in, could show their name or allow logout
    const user = getUser();
    if (user) {
      // User is logged in, but we let them stay on landing page
      // They can navigate to game directly if they want
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Cyber grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,229,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>
      
      {/* Glow effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 max-w-4xl w-full text-center space-y-12">
        {/* Logo */}
        <div className="space-y-4">
          <h1 className="text-7xl md:text-8xl font-black tracking-tighter bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient">
            DEEPFAKE DETECTIVE
          </h1>
          <p className="text-3xl md:text-4xl font-bold text-cyan-400 animate-pulse">
            Can you beat AI deception?
          </p>
        </div>

        {/* Description */}
        <div className="max-w-2xl mx-auto space-y-3">
          <p className="text-xl text-gray-300 leading-relaxed">
            Train your brain to detect AI-generated images.
          </p>
          <p className="text-xl text-gray-300 leading-relaxed">
            Challenge yourself and compete globally.
          </p>
        </div>

        {/* Stats Card */}
        <div className="max-w-md mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1">
              <div className="text-3xl font-bold text-cyan-400">10</div>
              <div className="text-xs text-gray-400 uppercase tracking-wider">Images</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold text-orange-400">50/50</div>
              <div className="text-xs text-gray-400 uppercase tracking-wider">Real vs AI</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold text-purple-400">1,245</div>
              <div className="text-xs text-gray-400 uppercase tracking-wider">Detectives</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button
            onClick={() => navigate('/login')}
            className="group relative px-12 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-bold text-xl tracking-wider uppercase transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(0,229,255,0.6)] active:scale-95"
          >
            <span className="relative z-10">Start Investigation</span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 blur transition-opacity"></div>
          </button>

          <button
            onClick={() => navigate('/leaderboard')}
            className="px-12 py-5 bg-transparent border-2 border-cyan-400 rounded-full text-cyan-400 font-bold text-xl tracking-wider uppercase transition-all hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] active:scale-95"
          >
            View Global Leaderboard
          </button>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
          <div className="bg-white/5 backdrop-blur-xl border border-cyan-500/30 rounded-xl p-6 space-y-3 hover:border-cyan-400 transition-colors">
            <div className="text-4xl">🔍</div>
            <h3 className="text-lg font-bold text-cyan-400">AI Detection</h3>
            <p className="text-sm text-gray-400">
              Learn to spot AI-generated images using advanced forensic techniques
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-orange-500/30 rounded-xl p-6 space-y-3 hover:border-orange-400 transition-colors">
            <div className="text-4xl">⚡</div>
            <h3 className="text-lg font-bold text-orange-400">Nova Analysis</h3>
            <p className="text-sm text-gray-400">
              Get detailed forensic reports powered by Amazon Nova Pro
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-purple-500/30 rounded-xl p-6 space-y-3 hover:border-purple-400 transition-colors">
            <div className="text-4xl">🌍</div>
            <h3 className="text-lg font-bold text-purple-400">Global Competition</h3>
            <p className="text-sm text-gray-400">
              Compete with detectives worldwide and climb the rankings
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
}
