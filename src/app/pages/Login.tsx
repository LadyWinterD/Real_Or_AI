import { useState } from "react";
import { useNavigate } from "react-router";
import { saveUser, getUser } from "../utils/storage";
import { countries, countryFlags } from "../data/mockData";

export default function Login() {
  const navigate = useNavigate();
  const existingUser = getUser();

  const [username, setUsername] = useState("");
  const [country, setCountry] = useState("");
  const [error, setError] = useState("");

  const handleStartInvestigation = () => {
    if (!username.trim()) {
      setError("Please enter a detective name");
      return;
    }
    if (!country) {
      setError("Please select your country");
      return;
    }

    const user = {
      username: username.trim(),
      country: country,
    };

    saveUser(user);
    navigate('/game');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,229,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-md">
        {/* Back button */}
        <button
          onClick={() => navigate('/')}
          className="mb-6 text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-2"
        >
          <span>←</span>
          <span>Back to Home</span>
        </button>

        {/* Main Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 space-y-6 shadow-[0_0_50px_rgba(0,229,255,0.1)]">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="text-5xl mb-4">🕵️</div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Sign in to become a detective
            </h1>
            <p className="text-gray-400 text-sm">
              Join the global investigation force
            </p>
          </div>

          {/* Form */}
          <div className="space-y-4">
            {/* Username */}
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 uppercase tracking-wider">
                Detective Name
              </label>
              <input
                id="username"
                type="text"
                placeholder="Enter your codename"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError("");
                }}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                onKeyPress={(e) => e.key === 'Enter' && handleStartInvestigation()}
              />
            </div>

            {/* Country */}
            <div className="space-y-2">
              <label htmlFor="country" className="block text-sm font-medium text-gray-300 uppercase tracking-wider">
                Country
              </label>
              <select
                id="country"
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                  setError("");
                }}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all appearance-none cursor-pointer"
              >
                <option value="" className="bg-gray-900">Select your country</option>
                {countries.map((c) => (
                  <option key={c} value={c} className="bg-gray-900">
                    {countryFlags[c]} {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-red-400 text-sm text-center bg-red-500/10 border border-red-500/20 rounded-lg py-2">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleStartInvestigation}
              className="w-full px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-white font-bold text-lg uppercase tracking-wider transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] active:scale-95"
            >
              Start Investigation
            </button>
          </div>

          {/* Existing User Info */}
          {existingUser && (
            <div className="pt-4 border-t border-white/10">
              <div className="text-center text-sm text-gray-400">
                Welcome back, <span className="text-cyan-400 font-semibold">{existingUser.username}</span>{" "}
                {countryFlags[existingUser.country]}
              </div>
            </div>
          )}

          {/* Info */}
          <div className="text-xs text-gray-500 text-center space-y-1">
            <p>🔒 No password required - instant access</p>
            <p>⚡ Data stored locally for privacy</p>
          </div>
        </div>

        {/* Bottom info */}
        <div className="mt-6 text-center text-sm text-gray-500">
          Ready to test your AI detection skills?
        </div>
      </div>
    </div>
  );
}
