import { useState } from "react";
import database from '../data/database.json'; // ✅ 换成你真实的弹药库！

interface ShareModalProps {
  onClose: () => void;
  score: number;
  totalPlayed: number;
  accuracy: number;
}

export default function ShareModal({ onClose, score, totalPlayed, accuracy }: ShareModalProps) {
  // ✅ 丝滑复制状态
  const [copied, setCopied] = useState(false);

  // ✅ 从真实的 database 里随机挑一张图作为挑战封面
  const randomImage = database[Math.floor(Math.random() * database.length)];
  
  const websiteUrl = "https://deepfake-detective.ai";
  
  // Create challenge text
  const challengeText = `🕵️ I just scored ${score}/${totalPlayed} (${accuracy}%) on Deepfake Detective!\n\nCan you tell if this image is AI or Real?\n\nTest your skills: ${websiteUrl}\n\n#DeepfakeDetective #AIDetection`;

  // Share to different platforms
  const shareToTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(challengeText)}`;
    window.open(twitterUrl, '_blank');
  };

  const shareToFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(websiteUrl)}&quote=${encodeURIComponent(challengeText)}`;
    window.open(facebookUrl, '_blank');
  };

  const shareToWhatsApp = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(challengeText)}`;
    window.open(whatsappUrl, '_blank');
  };

  // ✅ 优雅的复制反馈，告别丑陋的 alert
  const copyToClipboard = () => {
    navigator.clipboard.writeText(challengeText);
    setCopied(true);
    // 2秒后恢复原状
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div 
      className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in duration-300" 
      style={{ zIndex: 40 }}
      onClick={onClose}
    >
      <div 
        className="max-w-2xl w-full space-y-6" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="text-4xl font-black uppercase tracking-wider text-cyan-400">
            📤 Share Your Challenge
          </h2>
          <p className="text-gray-400">
            Challenge your friends to beat your score!
          </p>
        </div>

        {/* Preview Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-cyan-500/30 rounded-xl p-6 space-y-4">
          <p className="text-lg text-center text-gray-300 font-semibold">
            🤔 Can you tell if this image is AI or Real?
          </p>
          
          {/* Random Challenge Image (现在是真图了！) */}
          <div className="relative rounded-lg overflow-hidden">
            <img 
              src={randomImage.url} 
              alt="Challenge" 
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center p-4">
              <p className="text-white font-bold text-xl">🕵️ Real or AI Generated?</p>
            </div>
          </div>

          {/* Your Score */}
          <div className="text-center bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/30 rounded-lg p-4">
            <p className="text-sm text-gray-400 mb-1">My Score</p>
            <p className="text-3xl font-black text-cyan-400">
              {score}/{totalPlayed} <span className="text-lg text-gray-400">({accuracy}%)</span>
            </p>
          </div>

          {/* Challenge Text */}
          <div className="bg-black/30 border border-white/10 rounded-lg p-4">
            <p className="text-sm text-gray-300 leading-relaxed font-mono whitespace-pre-line">
              {challengeText}
            </p>
          </div>
        </div>

        {/* Share Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <button
            onClick={shareToTwitter}
            className="px-4 py-3 bg-[#1DA1F2] hover:bg-[#1a8cd8] rounded-xl text-white font-semibold transition-all hover:scale-105 flex items-center justify-center gap-2"
          >
            <span className="text-xl">𝕏</span>
            <span>Twitter/X</span>
          </button>
          
          <button
            onClick={shareToFacebook}
            className="px-4 py-3 bg-[#1877F2] hover:bg-[#166fe5] rounded-xl text-white font-semibold transition-all hover:scale-105 flex items-center justify-center gap-2"
          >
            <span className="text-xl font-bold">f</span>
            <span>Facebook</span>
          </button>
          
          <button
            onClick={shareToWhatsApp}
            className="px-4 py-3 bg-[#25D366] hover:bg-[#22c55e] rounded-xl text-white font-semibold transition-all hover:scale-105 flex items-center justify-center gap-2"
          >
            <span>💬</span>
            <span>WhatsApp</span>
          </button>
          
          {/* ✅ 丝滑的复制按钮 */}
          <button
            onClick={copyToClipboard}
            className={`px-4 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 md:col-span-3 ${
              copied 
                ? 'bg-green-500 text-white border border-green-400 scale-95' 
                : 'bg-white/5 border border-white/20 hover:bg-white/10 text-white hover:scale-[1.02]'
            }`}
          >
            <span>{copied ? '✅' : '📋'}</span>
            <span>{copied ? 'Copied to Clipboard!' : 'Copy to Clipboard'}</span>
          </button>
        </div>

        {/* Close Button */}
        <div className="text-center">
          <button
            onClick={onClose}
            className="px-8 py-3 bg-white/5 border border-white/20 rounded-xl text-gray-400 font-semibold hover:bg-white/10 hover:text-white transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}