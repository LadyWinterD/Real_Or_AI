import { useNavigate } from "react-router";
import { getUser, clearUser } from "../utils/storage";
import { countryFlags } from "../data/mockData";

interface HeaderProps {
  score?: number;
  total?: number;
  streak?: number;
}

export default function Header({ score, total, streak }: HeaderProps) {
  const navigate = useNavigate();
  const user = getUser();

  const handleLogout = () => {
    clearUser();
    navigate('/');
  };

  return (
    <div className="w-full bg-black/30 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <button
          onClick={() => navigate('/')}
          className="text-2xl font-black tracking-tighter bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent hover:scale-105 transition-transform"
        >
          Real or AI?
        </button>

        {/* Center - Score Display (if in game) */}
        {typeof score === 'number' && typeof total === 'number' && (
          <div className="flex items-center gap-6">
            <div className="text-lg font-mono">
              Score: <span className="text-cyan-400 font-bold">{score}</span> / {total}
            </div>
            {typeof streak === 'number' && streak > 0 && (
              <div className="text-lg font-mono">
                🔥 Streak: <span className="text-orange-400 font-bold">{streak}</span>
              </div>
            )}
          </div>
        )}

        {/* Right - Navigation & User Profile */}
        <div className="flex items-center gap-4">
          
          {/* ✅ 这是新增的作者页面入口按钮 */}
          <button
            onClick={() => navigate('/creator')}
            className="px-4 py-2 bg-white/5 border border-cyan-400/50 rounded-lg text-cyan-400 font-bold uppercase tracking-wider text-xs md:text-sm hover:bg-cyan-400 hover:text-black transition-all shadow-[0_0_10px_rgba(0,229,255,0.1)] hover:shadow-[0_0_20px_rgba(0,229,255,0.4)]"
          >
            🧑‍💻 The Creator
          </button>

          {/* User Status */}
          {user ? (
            <>
              <div className="hidden md:flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2">
                <span className="text-sm text-gray-400">Detective:</span>
                <span className="text-cyan-400 font-semibold">{user.username}</span>
                <span>{countryFlags[user.country]}</span>
              </div>
              <button
                onClick={handleLogout}
                className="text-sm text-gray-400 hover:text-red-400 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 bg-cyan-500 rounded-full text-white text-sm font-semibold hover:bg-cyan-600 transition-colors"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </div>
  );
}