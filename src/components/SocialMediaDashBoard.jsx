import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { 
  TrendingUp, 
  Users, 
  MessageCircle, 
  Heart, 
  Share2, 
  Moon,
  Sun 
} from 'lucide-react';

// Data Constants
const AUDIENCE_DATA = [
  { 
    platform: 'Instagram', 
    followers: 50000, 
    color: '#E1306C',
    imagePlaceholder: 'src/assets/instagram.png'
  },
  { 
    platform: 'Facebook', 
    followers: 45210, 
    color: '#4267B2',
    imagePlaceholder: 'src/assets/facebook.png'
  },
  { 
    platform: 'Twitter', 
    followers: 32101, 
    color: '#1DA1F2',
    imagePlaceholder: 'src/assets/twitter.png'
  },
  { 
    platform: 'LinkedIn', 
    followers: 21230, 
    color: '#0A66C2',
    imagePlaceholder: 'src/assets/linkedin.png'
  }
];

const ENGAGEMENT_DATA = [
  { month: 'Jan', likes: 4000, comments: 2400, shares: 2400 },
  { month: 'Feb', likes: 3000, comments: 1398, shares: 2210 },
  { month: 'Mar', likes: 2000, comments: 9800, shares: 2290 },
  { month: 'Apr', likes: 2780, comments: 3908, shares: 2000 },
  { month: 'May', likes: 1890, comments: 4800, shares: 2181 }
];

const PLATFORM_BREAKDOWN = [
  { name: 'Instagram', value: 40, color: '#E1306C' },
  { name: 'Facebook', value: 30, color: '#4267B2' },
  { name: 'Twitter', value: 20, color: '#1DA1F2' },
  { name: 'LinkedIn', value: 10, color: '#0A66C2' }
];

// Theme Context
const ThemeContext = React.createContext({
  isDarkMode: false,
  toggleTheme: () => {}
});

// Theme Provider Component
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    document.body.className = isDarkMode ? 'dark' : '';
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Theme Toggle Component
const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = React.useContext(ThemeContext);

  return (
    <button 
      onClick={toggleTheme}
      className={`
        fixed top-6 right-6 z-50 p-3 rounded-full shadow-lg 
        transform transition-all duration-300 hover:scale-110
        ${isDarkMode 
          ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' 
          : 'bg-white text-gray-800 hover:bg-gray-100'
        }
      `}
    >
      {isDarkMode ? <Sun /> : <Moon />}
    </button>
  );
};

// Metric Card Component
const MetricCard = ({ icon, label, value, change }) => {
  const { isDarkMode } = React.useContext(ThemeContext);

  return (
    <div className={`
      ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'} 
      shadow-lg rounded-xl p-6 flex items-center 
      transform transition-all duration-300 hover:scale-105
    `}>
      <div className="mr-4">{icon}</div>
      <div>
        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>{label}</p>
        <div className="flex items-center">
          <h2 className="text-2xl font-bold mr-3">{value}</h2>
          <span className="text-green-600 text-sm flex items-center">
            <TrendingUp size={16} className="mr-1" /> {change}
          </span>
        </div>
      </div>
    </div>
  );
};

// Platform Follower Card Component
const PlatformFollowerCard = ({ platform, followers, color, imagePlaceholder }) => {
  const { isDarkMode } = React.useContext(ThemeContext);

  return (
    <div 
      className={`
        rounded-xl p-6 shadow-lg transition-all duration-300 hover:scale-105
        ${isDarkMode ? 'bg-gray-800' : 'bg-white'}
      `}
    >
      <div className="flex items-center mb-4">
        <div className="w-16 h-16 mr-4 rounded-full overflow-hidden">
          <img 
            src={imagePlaceholder} 
            alt={`${platform} logo`} 
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
          {platform} Followers
        </h3>
      </div>
      <div className="flex items-center">
        <h2 className={`text-3xl font-bold mr-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
          {followers.toLocaleString()}
        </h2>
        <span className="text-green-600 flex items-center">
          <TrendingUp size={20} className="mr-1" /> +8.5%
        </span>
      </div>
    </div>
  );
};

// Audience Distribution Chart Component
const AudienceDistributionChart = () => {
  const { isDarkMode } = React.useContext(ThemeContext);

  return (
    <div className={`
      rounded-xl p-6 shadow-lg
      ${isDarkMode ? 'bg-gray-800' : 'bg-white'}
    `}>
      <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
        Audience Distribution
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={AUDIENCE_DATA}>
          <XAxis 
            dataKey="platform" 
            tick={{ fill: isDarkMode ? '#9CA3AF' : '#4B5563' }}
          />
          <YAxis 
            tick={{ fill: isDarkMode ? '#9CA3AF' : '#4B5563' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: isDarkMode ? '#374151' : 'white',
              color: isDarkMode ? 'white' : 'black'
            }}
          />
          <Bar 
            dataKey="followers" 
            fill="#8884d8" 
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// Platform Breakdown Chart Component
const PlatformBreakdownChart = () => {
  const { isDarkMode } = React.useContext(ThemeContext);

  return (
    <div className={`
      rounded-xl p-6 shadow-lg
      ${isDarkMode ? 'bg-gray-800' : 'bg-white'}
    `}>
      <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
        Platform Breakdown
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={PLATFORM_BREAKDOWN}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            innerRadius={50}
          >
            {PLATFORM_BREAKDOWN.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              backgroundColor: isDarkMode ? '#374151' : 'white',
              color: isDarkMode ? 'white' : 'black'
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

// Main Dashboard Component
export const SocialMediaDashboard = () => {
  const { isDarkMode } = React.useContext(ThemeContext);

  return (
    <div className={`
      min-h-screen transition-colors duration-300
      ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}
    `}>
      <ThemeToggle />

      <div className="container mx-auto px-4 py-8">
        <h1 className={`
          text-4xl font-bold mb-8 text-center
          ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}
        `}>
          Social Media Analytics
        </h1>
        
        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <MetricCard 
            icon={<Users className="text-blue-500" />}
            label="Total Followers"
            value="158,200"
            change="+12.5%"
          />
          <MetricCard 
            icon={<MessageCircle className="text-green-500" />}
            label="Total Interactions"
            value="456,789"
            change="+8.3%"
          />
          <MetricCard 
            icon={<Heart className="text-red-500" />}
            label="Total Likes"
            value="234,567"
            change="+15.2%"
          />
          <MetricCard 
            icon={<Share2 className="text-purple-500" />}
            label="Total Shares"
            value="87,654"
            change="+9.7%"
          />
        </div>

        {/* Individual Platform Followers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {AUDIENCE_DATA.map((platform) => (
            <PlatformFollowerCard 
              key={platform.platform}
              platform={platform.platform}
              followers={platform.followers}
              color={platform.color}
              imagePlaceholder={platform.imagePlaceholder}
            />
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AudienceDistributionChart />
          <PlatformBreakdownChart />
        </div>
      </div>
    </div>
  );
};



