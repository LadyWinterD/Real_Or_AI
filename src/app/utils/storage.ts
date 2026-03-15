import { Player, initialLeaderboard } from "../data/mockData";

export interface UserData {
  username: string;
  country: string;
}

// User management
export const saveUser = (user: UserData) => {
  localStorage.setItem('currentUser', JSON.stringify(user));
};

export const getUser = (): UserData | null => {
  const user = localStorage.getItem('currentUser');
  return user ? JSON.parse(user) : null;
};

export const clearUser = () => {
  localStorage.removeItem('currentUser');
};

// Leaderboard management
export const getLeaderboard = (): Player[] => {
  const stored = localStorage.getItem('leaderboard');
  if (stored) {
    return JSON.parse(stored);
  }
  // Initialize with mock data
  localStorage.setItem('leaderboard', JSON.stringify(initialLeaderboard));
  return initialLeaderboard;
};

export const addToLeaderboard = (player: Player) => {
  const leaderboard = getLeaderboard();
  leaderboard.push(player);
  // Sort by score (descending), then by accuracy (descending)
  leaderboard.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return b.accuracy - a.accuracy;
  });
  // Keep top 100
  const topLeaderboard = leaderboard.slice(0, 100);
  localStorage.setItem('leaderboard', JSON.stringify(topLeaderboard));
  return topLeaderboard;
};

// Game state
export interface GameState {
  score: number;
  totalPlayed: number;
  streak: number;
}

export const saveGameState = (state: GameState) => {
  localStorage.setItem('gameState', JSON.stringify(state));
};

export const getGameState = (): GameState | null => {
  const state = localStorage.getItem('gameState');
  return state ? JSON.parse(state) : null;
};

export const clearGameState = () => {
  localStorage.removeItem('gameState');
};
