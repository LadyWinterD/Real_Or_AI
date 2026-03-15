import { GameImage } from "../data/mockData";

interface ResultModalProps {
  isCorrect: boolean;
  currentImage: GameImage;
  onNext: () => void;
  onReviewImage: () => void;
  onShare: () => void;
  isLastQuestion?: boolean;
}

export default function ResultModal({
  isCorrect,
  currentImage,
  onNext,
  onReviewImage,
  onShare,
  isLastQuestion = false,
}: ResultModalProps) {
  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in duration-300" style={{ zIndex: 40 }}>
      <div className="max-w-2xl w-full space-y-6">
        {/* Result Title */}
        <div className="text-center">
          <h2
            className={`text-6xl font-black uppercase tracking-widest mb-2 ${
              isCorrect ? "text-green-400" : "text-red-500"
            }`}
          >
            {isCorrect ? "✅ Correct!" : "❌ You got fooled!"}
          </h2>
          <p className="text-xl text-gray-400">
            {isCorrect
              ? "You spotted the truth!"
              : "AI deception succeeded this time"}
          </p>
        </div>

        {/* Forensic Report */}
        <div className="bg-white/5 backdrop-blur-xl border-l-4 border-l-cyan-500 rounded-xl p-6 space-y-3">
          <div className="flex items-center gap-2 text-gray-400 uppercase tracking-widest text-sm">
            <span>⚡</span>
            <span>Amazon Nova Pro Forensic Report:</span>
          </div>
          <p className="font-mono text-lg leading-relaxed text-gray-200">
            {currentImage.forensic_report}
          </p>
        </div>

        {/* Image Truth */}
        <div className="text-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4">
          <p className="text-sm text-gray-400 mb-1">This image was:</p>
          <p
            className={`text-2xl font-bold uppercase tracking-wider ${
              currentImage.is_ai ? "text-orange-400" : "text-cyan-400"
            }`}
          >
            {currentImage.is_ai ? "🤖 AI Generated" : "📸 Real Photo"}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onNext}
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-white font-bold text-lg uppercase tracking-wider hover:scale-105 transition-transform shadow-[0_0_20px_rgba(0,229,255,0.3)]"
          >
            {isLastQuestion ? "View Results" : "Next Case →"}
          </button>
          <button
            onClick={onReviewImage}
            className="px-8 py-4 bg-white/5 border border-white/20 rounded-xl text-white font-bold text-lg uppercase tracking-wider hover:bg-white/10 transition-all"
          >
            🔍 Review Image
          </button>
          <button
            onClick={onShare}
            className="px-8 py-4 bg-white/5 border border-orange-400/50 rounded-xl text-orange-400 font-bold text-lg uppercase tracking-wider hover:bg-orange-400/10 transition-all"
          >
            📤 Share
          </button>
        </div>
      </div>
    </div>
  );
}