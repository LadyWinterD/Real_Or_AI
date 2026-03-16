import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getLeaderboard, getUser } from "../utils/storage";
import { Player, countryFlags } from "../data/mockData";
import Header from "../components/Header";

export default function Leaderboard() {
  const navigate = useNavigate();
  const user = getUser();
  const [leaderboard, setLeaderboard] = useState<Player[]>([]);
  const [filter, setFilter] = useState<"all" | "country">("all");

  useEffect(() => {
    const data = getLeaderboard();
    setLeaderboard(data);
  }, []);

  const filteredLeaderboard =
    filter === "country" && user
      ? leaderboard.filter((p) => p.country === user.country)
      : leaderboard;

  const topPlayers = filteredLeaderboard.slice(0, 50);

  // Find user's rank
  const userRank = user
    ? leaderboard.findIndex((p) => p.username === user.username && p.country === user.country) + 1
    : null;

  // Country stats
  const countryStats = leaderboard.reduce((acc, player) => {
    if (!acc[player.country]) {
      acc[player.country] = { totalAccuracy: 0, count: 0 };
    }
    acc[player.country].totalAccuracy += player.accuracy;
    acc[player.country].count += 1;
    return acc;
  }, {} as Record<string, { totalAccuracy: number; count: number }>);

  const topCountries = Object.entries(countryStats)
    .map(([country, stats]) => ({
      country,
      avgAccuracy: Math.round(stats.totalAccuracy / stats.count),
      players: stats.count,
    }))
    .sort((a, b) => b.avgAccuracy - a.avgAccuracy)
    .slice(0, 10);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 p-6 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,229,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>

        <div className="relative z-10 max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-6xl font-black uppercase tracking-wider bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Global Detective Rankings
            </h1>
            <p className="text-xl text-gray-400">
              Compete with detectives worldwide
            </p>
          </div>

          {/* User Rank (if logged in and played) */}
          {user && userRank && userRank > 0 && (
            <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-2 border-cyan-400 rounded-xl p-6 text-center">
              <p className="text-lg text-gray-300 mb-2">Your Global Rank</p>
              <div className="flex items-center justify-center gap-4">
                <span className="text-5xl font-black text-cyan-400">#{userRank}</span>
                <span className="text-3xl">{countryFlags[user.country]}</span>
              </div>
            </div>
          )}

          {/* Filter Tabs */}
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setFilter("all")}
              className={`px-6 py-3 rounded-xl font-bold uppercase tracking-wider transition-all ${
                filter === "all"
                  ? "bg-cyan-500 text-white shadow-[0_0_20px_rgba(0,229,255,0.4)]"
                  : "bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10"
              }`}
            >
              🌍 Global
            </button>
            {user && (
              <button
                onClick={() => setFilter("country")}
                className={`px-6 py-3 rounded-xl font-bold uppercase tracking-wider transition-all ${
                  filter === "country"
                    ? "bg-cyan-500 text-white shadow-[0_0_20px_rgba(0,229,255,0.4)]"
                    : "bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10"
                }`}
              >
                {countryFlags[user.country]} {user.country}
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Leaderboard */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-2xl font-bold text-cyan-400 uppercase tracking-wider">
                🏆 Top Detectives
              </h2>
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 p-4 bg-white/5 border-b border-white/10 text-sm text-gray-400 uppercase tracking-wider">
                  <div className="col-span-1">Rank</div>
                  <div className="col-span-4">Detective</div>
                  <div className="col-span-2 text-center">Country</div>
                  <div className="col-span-2 text-center">Score</div>
                  <div className="col-span-1 text-center">Streak</div>
                  <div className="col-span-2 text-center">Accuracy</div>
                </div>

                {/* Table Rows */}
                <div className="divide-y divide-white/5">
                  {topPlayers.map((player, index) => {
                    const isCurrentUser = user && player.username === user.username && player.country === user.country;
                    const actualRank = filter === "all" ? index + 1 : leaderboard.findIndex(p => p === player) + 1;
                    
                    // ✅ 核心魔法：用准确率强行推算出 3 题赛制下的得分！
                    const normalizedScore = Math.round((player.accuracy / 100) * 3);
                    // ✅ 连击数封顶为 3
                    const rawStreak = player.streak !== undefined ? player.streak : normalizedScore;
                    const normalizedStreak = Math.min(rawStreak, 3);

                    return (
                      <div
                        key={`${player.username}-${player.timestamp}`}
                        className={`grid grid-cols-12 gap-4 p-4 hover:bg-white/5 transition-colors items-center ${
                          isCurrentUser ? "bg-cyan-500/10 border-l-4 border-l-cyan-400" : ""
                        }`}
                      >
                        {/* Rank */}
                        <div className="col-span-1 flex items-center">
                          {actualRank === 1 && <span className="text-2xl">🥇</span>}
                          {actualRank === 2 && <span className="text-2xl">🥈</span>}
                          {actualRank === 3 && <span className="text-2xl">🥉</span>}
                          {actualRank > 3 && (
                            <span className="text-gray-400 font-mono">#{actualRank}</span>
                          )}
                        </div>

                        {/* Username */}
                        <div className="col-span-4 flex items-center">
                          <span
                            className={`font-semibold ${
                              isCurrentUser ? "text-cyan-400" : "text-white"
                            }`}
                          >
                            {player.username}
                            {isCurrentUser && " (You)"}
                          </span>
                        </div>

                        {/* Country */}
                        <div className="col-span-2 flex items-center justify-center text-2xl">
                          {countryFlags[player.country] || "🌍"}
                        </div>

                        {/* ✅ Score: 永远只会显示 3/3, 2/3, 1/3, 0/3 */}
                        <div className="col-span-2 flex items-center justify-center">
                          <span className="font-bold text-cyan-400">
                            {normalizedScore}/3
                          </span>
                        </div>

                        {/* ✅ Streak: 永远不会超过 🔥 3 */}
                        <div className="col-span-1 flex items-center justify-center">
                          <span className="font-bold text-orange-400">
                            🔥 {normalizedStreak}
                          </span>
                        </div>

                        {/* Accuracy */}
                        <div className="col-span-2 flex items-center justify-center">
                          <span
                            className={`font-bold ${
                              player.accuracy >= 80
                                ? "text-green-400"
                                : player.accuracy >= 60
                                ? "text-yellow-400"
                                : "text-orange-400"
                            }`}
                          >
                            {player.accuracy}%
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Country Stats */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-purple-400 uppercase tracking-wider">
                🌍 Top Countries
              </h2>
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 space-y-3">
                {topCountries.map((country, index) => (
                  <div
                    key={country.country}
                    className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-gray-400 font-mono text-sm">#{index + 1}</span>
                      <span className="text-2xl">{countryFlags[country.country] || "🌍"}</span>
                      <div>
                        <div className="font-semibold text-white text-sm">
                          {country.country}
                        </div>
                        <div className="text-xs text-gray-400">
                          {country.players} {country.players === 1 ? "detective" : "detectives"}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`font-bold ${
                          country.avgAccuracy >= 80
                            ? "text-green-400"
                            : country.avgAccuracy >= 60
                            ? "text-yellow-400"
                            : "text-orange-400"
                        }`}
                      >
                        {country.avgAccuracy}%
                      </div>
                      <div className="text-xs text-gray-500">avg acc</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats Summary */}
              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-4 space-y-2">
                <h3 className="text-lg font-bold text-purple-400 mb-3">📊 Global Stats</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Detectives:</span>
                    <span className="text-white font-semibold">{leaderboard.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Countries:</span>
                    <span className="text-white font-semibold">{Object.keys(countryStats).length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Avg Accuracy:</span>
                    <span className="text-cyan-400 font-semibold">
                      {leaderboard.length > 0
                        ? Math.round(leaderboard.reduce((sum, p) => sum + p.accuracy, 0) / leaderboard.length)
                        : 0}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center space-y-4 pt-8">
            <button
              onClick={() => navigate('/game')}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-white font-bold text-lg uppercase tracking-wider hover:scale-105 transition-transform shadow-[0_0_30px_rgba(0,229,255,0.3)]"
            >
              {user ? "🎮 Play Now" : "🔍 Start Investigation"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}