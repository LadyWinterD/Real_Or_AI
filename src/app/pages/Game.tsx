import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { getUser, addToLeaderboard, clearGameState } from "../utils/storage";
import { GameImage } from "../data/mockData";
import Header from "../components/Header";
import ResultModal from "../components/ResultModal";
import ShareModal from "../components/ShareModal";
import database from '../data/database.json';

// ✅ 黑客松专属配置：每局只玩 3 道题（录屏 Demo 的完美长度）
const QUESTIONS_PER_GAME = 3;

export default function Game() {
  const navigate = useNavigate();
  const user = getUser();

  const [shuffledImages, setShuffledImages] = useState<GameImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [totalPlayed, setTotalPlayed] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [lastGuessCorrect, setLastGuessCorrect] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [reviewing, setReviewing] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  // Initialize game
  useEffect(() => {
    // 随机打乱完整的 database，然后只截取前 3 张图
    const shuffled = [...database]
      .sort(() => Math.random() - 0.5)
      .slice(0, QUESTIONS_PER_GAME) as unknown as GameImage[];
    
    setShuffledImages(shuffled);
    clearGameState();
  }, []);

  // Preload current image
  useEffect(() => {
    if (shuffledImages[currentIndex]) {
      setImageLoaded(false);
      const img = new Image();
      img.src = shuffledImages[currentIndex].url;
      img.onload = () => setImageLoaded(true);
    }
  }, [currentIndex, shuffledImages]);

  const currentImage = shuffledImages[currentIndex];

  const handleGuess = (isAiGuess: boolean) => {
    if (!currentImage) return;

    const isCorrect = isAiGuess === currentImage.is_ai;
    
    setTotalPlayed(totalPlayed + 1);
    setLastGuessCorrect(isCorrect);

    if (isCorrect) {
      setScore(score + 1);
      setStreak(streak + 1);
    } else {
      setStreak(0);
    }

    setShowResult(true);
    setReviewing(false);
  };

  const handleNext = () => {
    setShowResult(false);
    setReviewing(false);

    // 如果当前已经是最后一道题了，就进入结算页面
    if (currentIndex + 1 >= shuffledImages.length) {
      setGameComplete(true);
      
      // Add to leaderboard
      if (user) {
        const accuracy = Math.round((score / shuffledImages.length) * 100);
        addToLeaderboard({
          username: user.username,
          country: user.country,
          score: score,
          accuracy: accuracy,
          timestamp: Date.now(),
        });
      }
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleReviewImage = () => {
    setShowResult(false);
    setReviewing(true);
  };

  // ✅ 核心修复：只保留这一个唤醒弹窗的函数
  const handleShare = () => {
    setShowShareModal(true);
  };

  const handleViewLeaderboard = () => {
    navigate('/leaderboard');
  };

  const handlePlayAgain = () => {
    // 点击再玩一次时，重新从数据库里随机抽 3 张新的图
    const shuffled = [...database]
      .sort(() => Math.random() - 0.5)
      .slice(0, QUESTIONS_PER_GAME) as unknown as GameImage[];
      
    setShuffledImages(shuffled);
    setCurrentIndex(0);
    setScore(0);
    setTotalPlayed(0); // 重置当局玩的题数
    setStreak(0);
    setGameComplete(false);
    setShowResult(false);
    setReviewing(false);
    setShowShareModal(false);
  };

  if (!user) {
    return null;
  }

  // ==========================================
  // 🏆 结算页面 (Game Complete Screen)
  // ==========================================
  if (gameComplete) {
    const accuracy = Math.round((score / shuffledImages.length) * 100);
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center p-6 relative">
          <div className="max-w-2xl w-full text-center space-y-8 z-10">
            {/* Title */}
            <div className="space-y-4">
              <h1 className="text-6xl font-black uppercase tracking-wider text-cyan-400">
                Investigation Complete!
              </h1>
              <p className="text-2xl text-gray-300">
                {accuracy === 100
                  ? "Perfect detective work! 🎉"
                  : accuracy >= 66 
                  ? "Excellent work, detective! 🌟"
                  : accuracy >= 33 
                  ? "Good job! Keep training! 💪"
                  : "Keep practicing, detective! 🔍"}
              </p>
            </div>

            {/* Score Card */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="text-5xl font-black text-cyan-400">{score}</div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider">Score</div>
                </div>
                <div className="space-y-2">
                  <div className="text-5xl font-black text-purple-400">{accuracy}%</div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider">Accuracy</div>
                </div>
                <div className="space-y-2">
                  <div className="text-5xl font-black text-orange-400">{streak}</div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider">Max Streak</div>
                </div>
              </div>
            </div>

            {/* Rank Preview */}
            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-6">
              <p className="text-lg text-gray-300 mb-2">
                Your score has been added to the global leaderboard!
              </p>
              <p className="text-sm text-gray-400">
                Check where you rank among detectives worldwide
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handlePlayAgain}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-white font-bold text-lg uppercase tracking-wider hover:scale-105 transition-transform"
              >
                🔄 Play Again
              </button>
              <button
                onClick={handleViewLeaderboard}
                className="px-8 py-4 bg-white/5 border-2 border-cyan-400 rounded-xl text-cyan-400 font-bold text-lg uppercase tracking-wider hover:bg-cyan-400 hover:text-black transition-all"
              >
                🏆 View Leaderboard
              </button>
              <button
                onClick={handleShare} // ✅ 这里正确绑定了唤醒弹窗的函数
                className="px-8 py-4 bg-white/5 border-2 border-orange-400 rounded-xl text-orange-400 font-bold text-lg uppercase tracking-wider hover:bg-orange-400 hover:text-black transition-all"
              >
                📤 Share Score
              </button>
            </div>
          </div>

          {/* ✅ 确保在结算页面渲染分享弹窗 */}
          {showShareModal && (
            <ShareModal
              score={score}
              totalPlayed={shuffledImages.length}
              accuracy={accuracy}
              onClose={() => setShowShareModal(false)}
            />
          )}
        </div>
      </div>
    );
  }

  // ==========================================
  // 🎮 游戏主页面
  // ==========================================
  return (
    <div className="min-h-screen flex flex-col">
      <Header score={score} total={totalPlayed} streak={streak} />

      <div className="flex-1 flex flex-col items-center justify-center p-6 relative">
        {/* Background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,229,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>

        {/* Progress */}
        <div className="w-full max-w-4xl mb-4">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Question {currentIndex + 1} of {shuffledImages.length}</span>
            <span>{Math.round(((currentIndex + 1) / shuffledImages.length) * 100)}% Complete</span>
          </div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-500"
              style={{ width: `${((currentIndex + 1) / shuffledImages.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Main Game Container */}
        <div className="relative w-full max-w-4xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-[0_0_50px_rgba(0,229,255,0.1)]">
          {/* Image */}
          {currentImage && (
            <div className="mb-8 relative">
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-2xl text-cyan-400 animate-pulse">Loading...</div>
                </div>
              )}
              <img
                src={currentImage.url}
                alt="Detective Case"
                className={`w-full max-h-[60vh] object-contain rounded-lg transition-opacity duration-500 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </div>
          )}

          {/* Action Buttons */}
          {!showResult && !reviewing && (
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={() => handleGuess(false)}
                className="group relative px-10 py-6 bg-transparent border-4 border-cyan-400 rounded-xl text-cyan-400 font-bold text-2xl uppercase tracking-widest hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_30px_rgba(0,229,255,0.6)] transition-all active:scale-95"
              >
                📸 Real Photo
              </button>
              <button
                onClick={() => handleGuess(true)}
                className="group relative px-10 py-6 bg-transparent border-4 border-orange-400 rounded-xl text-orange-400 font-bold text-2xl uppercase tracking-widest hover:bg-orange-400 hover:text-black hover:shadow-[0_0_30px_rgba(255,153,0,0.6)] transition-all active:scale-95"
              >
                🤖 AI Generated
              </button>
            </div>
          )}

          {/* Reviewing State */}
          {!showResult && reviewing && (
            <div className="text-center space-y-4">
              <p className="text-xl text-gray-400">Review the image carefully</p>
              <button
                onClick={handleNext}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-white font-bold text-lg uppercase tracking-wider hover:scale-105 transition-transform shadow-[0_0_20px_rgba(0,229,255,0.3)]"
              >
                Next Case →
              </button>
            </div>
          )}
        </div>

        {/* Result Modal */}
        {showResult && currentImage && (
          <ResultModal
            isCorrect={lastGuessCorrect}
            currentImage={currentImage}
            onNext={handleNext}
            onReviewImage={handleReviewImage}
            onShare={handleShare}
            isLastQuestion={currentIndex + 1 >= shuffledImages.length}
          />
        )}

        {/* Share Modal for midway sharing */}
        {showShareModal && !gameComplete && totalPlayed > 0 && (
          <ShareModal
            score={score}
            totalPlayed={totalPlayed}
            accuracy={Math.round((score / totalPlayed) * 100)}
            onClose={() => setShowShareModal(false)}
          />
        )}
      </div>
    </div>
  );
}