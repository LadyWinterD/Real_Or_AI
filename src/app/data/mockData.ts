export interface GameImage {
  id: number;
  url: string;
  is_ai: boolean;
  forensic_report: string;
}

export interface Player {
  username: string;
  country: string;
  score: number;
  accuracy: number;
  timestamp: number;
}

// Mock game images - mix of real and AI generated
export const gameImages: GameImage[] = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
    is_ai: false,
    forensic_report: "Natural lighting patterns detected. Authentic skin texture and pore detail consistent with photographic capture. No synthetic artifacts found."
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    is_ai: false,
    forensic_report: "Consistent depth of field and bokeh characteristics. Natural eye reflection patterns. Photographic noise distribution matches camera sensor signature."
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    is_ai: false,
    forensic_report: "Genuine camera compression artifacts detected. Natural shadow falloff and ambient occlusion. No generative model fingerprints identified."
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    is_ai: false,
    forensic_report: "Authentic photographic metadata present. Natural lens distortion patterns. Consistent EXIF data with physical camera capture."
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    is_ai: false,
    forensic_report: "Real-world lighting physics verified. Natural facial asymmetry present. Authentic hair strand detail and texture variation."
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    is_ai: true,
    forensic_report: "Synthetic pattern detected in iris details. Overly smooth skin texture typical of AI generation. Background elements show non-physical repetition patterns."
  },
  {
    id: 7,
    url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
    is_ai: true,
    forensic_report: "Artificial symmetry in facial features exceeds biological norms. Hair strands exhibit generative model artifacts. Lighting behavior inconsistent with physics."
  },
  {
    id: 8,
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
    is_ai: true,
    forensic_report: "Background details contain synthetic glyph patterns. Edge transitions show AI hallucination markers. Unnatural color gradient distribution detected."
  },
  {
    id: 9,
    url: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6",
    is_ai: true,
    forensic_report: "Frequency domain analysis reveals GAN fingerprints. Teeth geometry shows non-human generation patterns. Ear structure contains impossible anatomical features."
  },
  {
    id: 10,
    url: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df",
    is_ai: true,
    forensic_report: "Neural network artifacts detected in facial region. Eyes show synthetic reflection patterns. Skin pore distribution follows algorithmic rather than organic patterns."
  }
];

// Mock global leaderboard with players from different countries
export const initialLeaderboard: Player[] = [
  { username: "ShadowHunter", country: "USA", score: 10, accuracy: 100, timestamp: Date.now() - 3600000 },
  { username: "TechNinja", country: "Japan", score: 9, accuracy: 90, timestamp: Date.now() - 7200000 },
  { username: "DataWizard", country: "Germany", score: 9, accuracy: 90, timestamp: Date.now() - 10800000 },
  { username: "PixelMaster", country: "South Korea", score: 8, accuracy: 80, timestamp: Date.now() - 14400000 },
  { username: "AIDetective", country: "UK", score: 8, accuracy: 80, timestamp: Date.now() - 18000000 },
  { username: "ByteKnight", country: "Canada", score: 8, accuracy: 80, timestamp: Date.now() - 21600000 },
  { username: "CyberSleuth", country: "France", score: 7, accuracy: 70, timestamp: Date.now() - 25200000 },
  { username: "CodeBreaker", country: "Australia", score: 7, accuracy: 70, timestamp: Date.now() - 28800000 },
  { username: "LogicMind", country: "Singapore", score: 7, accuracy: 70, timestamp: Date.now() - 32400000 },
  { username: "TruthSeeker", country: "Netherlands", score: 6, accuracy: 60, timestamp: Date.now() - 36000000 },
  { username: "ImageSpy", country: "Sweden", score: 6, accuracy: 60, timestamp: Date.now() - 39600000 },
  { username: "VisualHawk", country: "Brazil", score: 6, accuracy: 60, timestamp: Date.now() - 43200000 },
  { username: "DeepThinker", country: "India", score: 5, accuracy: 50, timestamp: Date.now() - 46800000 },
  { username: "SmartEye", country: "China", score: 5, accuracy: 50, timestamp: Date.now() - 50400000 },
  { username: "PhotoNerd", country: "Spain", score: 5, accuracy: 50, timestamp: Date.now() - 54000000 },
];

export const countryFlags: { [key: string]: string } = {
  "USA": "🇺🇸",
  "Japan": "🇯🇵",
  "Germany": "🇩🇪",
  "South Korea": "🇰🇷",
  "UK": "🇬🇧",
  "Canada": "🇨🇦",
  "France": "🇫🇷",
  "Australia": "🇦🇺",
  "Singapore": "🇸🇬",
  "Netherlands": "🇳🇱",
  "Sweden": "🇸🇪",
  "Brazil": "🇧🇷",
  "India": "🇮🇳",
  "China": "🇨🇳",
  "Spain": "🇪🇸",
  "Mexico": "🇲🇽",
  "Italy": "🇮🇹",
  "Poland": "🇵🇱",
  "Russia": "🇷🇺",
  "South Africa": "🇿🇦",
  "Argentina": "🇦🇷",
  "Norway": "🇳🇴",
  "Finland": "🇫🇮",
  "Denmark": "🇩🇰",
  "Belgium": "🇧🇪",
  "Switzerland": "🇨🇭",
  "Austria": "🇦🇹",
  "Portugal": "🇵🇹",
  "Greece": "🇬🇷",
  "Turkey": "🇹🇷",
  "Thailand": "🇹🇭",
  "Vietnam": "🇻🇳",
  "Philippines": "🇵🇭",
  "Indonesia": "🇮🇩",
  "Malaysia": "🇲🇾",
  "New Zealand": "🇳🇿",
  "Chile": "🇨🇱",
  "Colombia": "🇨🇴",
  "Peru": "🇵🇪",
  "Egypt": "🇪🇬",
  "Israel": "🇮🇱",
  "UAE": "🇦🇪",
  "Saudi Arabia": "🇸🇦",
  "Pakistan": "🇵🇰",
  "Bangladesh": "🇧🇩",
  "Nigeria": "🇳🇬",
  "Kenya": "🇰🇪",
  "Ukraine": "🇺🇦",
  "Czech Republic": "🇨🇿",
  "Romania": "🇷🇴",
  "Hungary": "🇭🇺",
};

export const countries = Object.keys(countryFlags).sort();
