import { useState } from "react";

interface ShareModalProps {
  score: number;
  totalPlayed: number;
  accuracy: number;
  onClose: () => void;
}

export default function ShareModal({ score, totalPlayed, accuracy, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  // ⚠️ 把这里的网址换成你真实的 AWS Amplify 上线网址！
  const GAME_URL = "https://main.d70hoadpw7x8k.amplifyapp.com/"; 

  // 动态生成的极客风战绩文案
  const shareText = `🕵️ I just scored ${score}/${totalPlayed} (${accuracy}%) on REAL OR AI!\n\nCan you beat my digital forensics skills and spot the deepfakes? 🔍\n\nPowered by Amazon Nova.\nPlay here: ${GAME_URL}\n\n#AmazonNova #Hackathon #RealOrAI`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    window.open(twitterUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-md bg-gray-900 border border-cyan-500/30 rounded-2xl shadow-[0_0_50px_rgba(0,229,255,0.15)] overflow-hidden">
        
        {/* Top Decoration */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600"></div>

        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-black text-white tracking-wide uppercase">
                Share Evidence
              </h3>
              <p className="text-sm text-gray-400 mt-1">
                Recruit more detectives to the agency.
              </p>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors text-2xl"
            >
              ✕
            </button>
          </div>

          {/* Preview Box */}
          <div className="bg-black/50 border border-white/10 rounded-xl p-4 relative group">
            <p className="text-gray-300 text-sm whitespace-pre-wrap font-mono leading-relaxed">
              {shareText}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {/* Copy Button */}
            <button
              onClick={handleCopy}
              className={`w-full py-3 px-4 rounded-xl font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                copied 
                  ? "bg-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.4)]" 
                  : "bg-white/5 border border-cyan-400/50 text-cyan-400 hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_20px_rgba(0,229,255,0.4)]"
              }`}
            >
              {copied ? "✅ Copied to Clipboard!" : "📄 Copy Report"}
            </button>

            {/* X (Twitter) Button */}
            <button
              onClick={handleTwitterShare}
              className="w-full py-3 px-4 bg-white text-black hover:bg-gray-200 rounded-xl font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 5.96H5.078z"></path>
              </svg>
              Share on X
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}