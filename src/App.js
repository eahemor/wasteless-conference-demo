import React, { useState } from 'react';
import {
  GraduationCap, Globe, Recycle, Users, Home, BarChart3,
  Trophy, User, Plus, Target, LogOut, CheckCircle, Award, TrendingUp
} from 'lucide-react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (userData) => {
    setCurrentUser(userData);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 max-w-md mx-auto">
      {!isLoggedIn ? (
        <LoginScreen onLogin={handleLogin} />
      ) : (
        <Dashboard user={currentUser} onLogout={handleLogout} />
      )}
    </div>
  );
}

const LoginScreen = ({ onLogin }) => {
  const [selectedUser, setSelectedUser] = useState('');

  const demoUsers = [
    { 
      id: '1', 
      name: 'Karen Davis', 
      university: 'University of Greenwich', 
      points: 1250, 
      badges: ['🌱', '♻️', '🏆'],
      country: 'Italy'
    },
    { 
      id: '2', 
      name: 'Peace Joy', 
      university: 'University of Greenwich', 
      points: 890, 
      badges: ['🌱', '♻️'],
      country: 'Turkey'
    },
    { 
      id: '3', 
      name: 'Oasis Central', 
      university: 'University of Greenwich', 
      points: 2100, 
      badges: ['🌱', '♻️', '🏆', '👑'],
      country: 'UK'
    },
  ];

  const handleLogin = () => {
    const user = demoUsers.find(u => u.id === selectedUser);
    if (user) {
      onLogin(user);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="bg-primary rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Recycle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">WasteLess App</h1>
          <p className="text-gray-600 mt-2">"Turning Trash Into Treasure"</p>
        </div>

        <div className="flex items-center justify-center mb-4 p-3 bg-blue-50 rounded-lg">
          <GraduationCap className="w-5 h-5 text-blue-600 mr-2" />
          <span className="text-blue-800 font-medium">University of Greenwich</span>
        </div>

        <div className="flex items-center justify-center mb-4 p-3 bg-green-50 rounded-lg">
          <Globe className="w-5 h-5 text-green-600 mr-2" />
          <span className="text-green-800 text-sm">International Student Friendly</span>
        </div>

        <div className="flex items-center justify-center mb-6 p-3 bg-yellow-50 rounded-lg">
          <Users className="w-5 h-5 text-yellow-600 mr-2" />
          <span className="text-yellow-800 text-sm">85% willing to change habits</span>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Demo User Profile (For IC-ETSI 2025 Conference)
          </label>
          <select 
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary text-sm"
          >
            <option value="">Select a demo profile...</option>
            {demoUsers.map(user => (
              <option key={user.id} value={user.id}>
                {user.name} ({user.country}) - {user.points} pts {user.badges.join(' ')}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleLogin}
          disabled={!selectedUser}
          className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all"
        >
          Enter WasteLess App
        </button>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-600 text-center">
            <strong>Research Impact:</strong> Based on 23 international student interviews
            <br />
            <strong>Conference:</strong> IC-ETSI 2025 - June 16th | Ebenezer Ahemor
          </p>
        </div>
      </div>
    </div>
  );
};

const Dashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('home');

  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'log', label: 'Log', icon: Plus },
    { id: 'stats', label: 'Stats', icon: BarChart3 },
    { id: 'leaderboard', label: 'Leaders', icon: Trophy },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeContent user={user} />;
      case 'log':
        return <WasteLogger user={user} />;
      case 'stats':
        return <Analytics user={user} />;
      case 'leaderboard':
        return <Leaderboard user={user} />;
      case 'profile':
        return <Profile user={user} onLogout={onLogout} />;
      default:
        return <HomeContent user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-800">WasteLess</h1>
              <p className="text-sm text-gray-600">Welcome, {user.name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-lg font-bold text-primary">{user.points}</div>
                <div className="text-xs text-gray-500">points</div>
              </div>
              <button onClick={onLogout} className="p-2 text-gray-500 hover:text-gray-700">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="pb-20">
        {renderContent()}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg max-w-md mx-auto">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 px-2 text-center transition-all ${
                activeTab === tab.id
                  ? 'text-primary border-t-2 border-primary bg-green-50'
                  : 'text-gray-500'
              }`}
            >
              <tab.icon className="w-5 h-5 mx-auto mb-1" />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const HomeContent = ({ user }) => {
  return (
    <div className="p-4 space-y-6">
      <div className="bg-gradient-to-r from-primary to-green-600 rounded-xl p-6 text-white shadow-lg">
        <h2 className="text-xl font-bold mb-2">Your Impact This Month</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-2xl font-bold">12.5kg</div>
            <div className="text-green-100">Waste Diverted</div>
          </div>
          <div>
            <div className="text-2xl font-bold">85%</div>
            <div className="text-green-100">Recycling Rate</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="font-semibold mb-4">Quick Log Waste</h3>
        <div className="grid grid-cols-2 gap-3">
          <button className="p-4 bg-blue-50 rounded-lg text-center hover:bg-blue-100 transition-colors">
            <div className="text-2xl mb-2">♻️</div>
            <div className="text-sm font-medium">Recycling</div>
            <div className="text-xs text-gray-500">+10 pts</div>
          </button>
          <button className="p-4 bg-green-50 rounded-lg text-center hover:bg-green-100 transition-colors">
            <div className="text-2xl mb-2">🥬</div>
            <div className="text-sm font-medium">Compost</div>
            <div className="text-xs text-gray-500">+15 pts</div>
          </button>
          <button className="p-4 bg-yellow-50 rounded-lg text-center hover:bg-yellow-100 transition-colors">
            <div className="text-2xl mb-2">📱</div>
            <div className="text-sm font-medium">E-Waste</div>
            <div className="text-xs text-gray-500">+25 pts</div>
          </button>
          <button className="p-4 bg-purple-50 rounded-lg text-center hover:bg-purple-100 transition-colors">
            <div className="text-2xl mb-2">👕</div>
            <div className="text-sm font-medium">Textiles</div>
            <div className="text-xs text-gray-500">+20 pts</div>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="font-semibold mb-4 flex items-center">
          <Award className="w-5 h-5 mr-2 text-yellow-500" />
          Achievement Badges
        </h3>
        
        <div className="grid grid-cols-4 gap-4 mb-6">
          {user.badges.map((badge, index) => (
            <div key={index} className="text-center p-3 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
              <div className="text-3xl mb-2">{badge}</div>
              <div className="text-xs font-medium text-gray-700">Level {index + 1}</div>
              <div className="text-xs text-gray-500">Earned</div>
            </div>
          ))}
        </div>

        <div className="border-t pt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-3">🎯 Next Badges to Unlock</h4>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <div className="text-2xl mb-1 opacity-50">⚡</div>
              <div className="text-xs text-gray-600">Speed Logger</div>
              <div className="text-xs text-gray-500">5 quick logs</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <div className="text-2xl mb-1 opacity-50">🌍</div>
              <div className="text-xs text-gray-600">Eco Warrior</div>
              <div className="text-xs text-gray-500">30 day streak</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <div className="text-2xl mb-1 opacity-50">👥</div>
              <div className="text-xs text-gray-600">Team Player</div>
              <div className="text-xs text-gray-500">Join challenge</div>
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-blue-800">Progress to Next Badge</span>
            <span className="text-sm text-blue-600">⚡ Speed Logger</span>
          </div>
          <div className="bg-blue-200 rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '60%' }}></div>
          </div>
          <div className="text-xs text-blue-600 mt-1">3/5 quick logs completed</div>
        </div>
      </div>

      <div className="bg-blue-50 rounded-xl p-6">
        <h3 className="font-semibold mb-2 text-blue-800">📊 Research Impact</h3>
        <div className="space-y-2 text-sm text-blue-700">
          <div className="flex justify-between">
            <span>Your improvement:</span>
            <span className="font-bold">+22% vs baseline</span>
          </div>
          <div className="flex justify-between">
            <span>Campus target:</span>
            <span className="font-bold">20% improvement</span>
          </div>
          <div className="flex justify-between">
            <span>Conference:</span>
            <span className="font-bold">IC-ETSI 2025 ✨</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const WasteLogger = ({ user }) => {
  const [selectedType, setSelectedType] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);

  const wasteTypes = [
    { id: 'recycling', name: 'Recycling', emoji: '♻️', points: 10, color: 'bg-blue-50' },
    { id: 'compost', name: 'Compost', emoji: '🥬', points: 15, color: 'bg-green-50' },
    { id: 'general', name: 'General', emoji: '🗑️', points: 5, color: 'bg-gray-50' },
    { id: 'electronics', name: 'E-Waste', emoji: '📱', points: 25, color: 'bg-purple-50' },
    { id: 'textiles', name: 'Textiles', emoji: '👕', points: 20, color: 'bg-pink-50' },
    { id: 'batteries', name: 'Batteries', emoji: '🔋', points: 30, color: 'bg-yellow-50' },
  ];

  const handleSubmit = () => {
    if (selectedType) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setSelectedType('');
        setQuantity(1);
      }, 2500);
    }
  };

  if (showSuccess) {
    const selectedWaste = wasteTypes.find(type => type.id === selectedType);
    const pointsEarned = selectedWaste ? selectedWaste.points * quantity : 0;
    
    return (
      <div className="p-4">
        <div className="bg-white rounded-xl p-8 text-center shadow-lg">
          <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Excellent Work!</h2>
          <p className="text-gray-600 mb-4">
            You earned <span className="font-bold text-primary text-xl">{pointsEarned} points</span>!
          </p>
          <div className="text-5xl mb-4">{selectedWaste?.emoji}</div>
          <div className="bg-green-50 rounded-lg p-4 mb-4">
            <p className="text-sm text-green-800">
              <strong>Impact:</strong> You're helping achieve our 20% campus improvement goal!
            </p>
          </div>
          <p className="text-sm text-gray-500">
            Every action counts toward sustainable campus living! 🌍
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-bold mb-6">Log Your Waste</h2>
        
        <div className="mb-6">
          <label className="block font-medium mb-3">What type of waste?</label>
          <div className="grid grid-cols-2 gap-3">
            {wasteTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={selectedType === type.id 
                  ? 'p-4 rounded-lg border-2 border-primary bg-green-50 text-center transition-all transform hover:scale-105 shadow-md'
                  : `p-4 rounded-lg border-2 border-gray-200 ${type.color} text-center transition-all transform hover:scale-105`
                }
              >
                <div className="text-3xl mb-2">{type.emoji}</div>
                <div className="font-medium text-sm">{type.name}</div>
                <div className="text-xs text-gray-500">{type.points} pts</div>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block font-medium mb-3">Quantity</label>
          <div className="flex items-center justify-center space-x-6">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-xl font-bold hover:bg-gray-300 transition-colors"
            >
              -
            </button>
            <span className="text-3xl font-bold w-16 text-center text-primary">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold hover:bg-green-600 transition-colors"
            >
              +
            </button>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!selectedType}
          className="w-full bg-primary text-white py-4 rounded-lg font-semibold hover:bg-green-600 disabled:bg-gray-300 transition-all transform hover:scale-105 disabled:hover:scale-100"
        >
          Log Waste & Earn Points
        </button>
      </div>
    </div>
  );
};

const Analytics = ({ user }) => {
  return (
    <div className="p-4 space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm text-center">
          <TrendingUp className="w-6 h-6 text-primary mx-auto mb-2" />
          <div className="text-2xl font-bold text-primary">85%</div>
          <div className="text-xs text-gray-600">Recycling Rate</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm text-center">
          <Award className="w-6 h-6 text-accent mx-auto mb-2" />
          <div className="text-2xl font-bold text-accent">{user.points}</div>
          <div className="text-xs text-gray-600">Points</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm text-center">
          <Target className="w-6 h-6 text-secondary mx-auto mb-2" />
          <div className="text-2xl font-bold text-secondary">12.5kg</div>
          <div className="text-xs text-gray-600">Diverted</div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="font-semibold mb-4">Monthly Progress Toward 20% Goal</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">January</span>
            <div className="flex-1 mx-4 bg-gray-200 rounded-full h-4">
              <div className="bg-primary h-4 rounded-full transition-all duration-1000" style={{ width: '65%' }}></div>
            </div>
            <span className="text-sm font-bold text-primary">65%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">February</span>
            <div className="flex-1 mx-4 bg-gray-200 rounded-full h-4">
              <div className="bg-primary h-4 rounded-full transition-all duration-1000" style={{ width: '72%' }}></div>
            </div>
            <span className="text-sm font-bold text-primary">72%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">March</span>
            <div className="flex-1 mx-4 bg-gray-200 rounded-full h-4">
              <div className="bg-primary h-4 rounded-full transition-all duration-1000" style={{ width: '85%' }}></div>
            </div>
            <span className="text-sm font-bold text-primary">85%</span>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6">
        <h3 className="font-semibold mb-4 text-gray-800">📊 Research Findings</h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span>Improvement vs baseline:</span>
            <span className="font-bold text-green-600">+22%</span>
          </div>
          <div className="flex justify-between">
            <span>Campus target achieved:</span>
            <span className="font-bold text-green-600">20% ✓</span>
          </div>
          <div className="flex justify-between">
            <span>Student engagement:</span>
            <span className="font-bold text-green-600">34%</span>
          </div>
          <div className="flex justify-between">
            <span>Conference presentation:</span>
            <span className="font-bold text-blue-600">IC-ETSI 2025</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Leaderboard = ({ user }) => {
  // Sample leaderboard data for international students
  const leaderboardData = [
    {
  id: 1, 
  name: "Karen Davis", 
  country: "Italy", 
  points: 1250, 
  badges: 3, 
  avatar: "🇮🇹", // Changed to Italy flag
  wasteLogged: "12.5kg",
  recyclingRate: "85%"
},
{ 
  id: 2, 
  name: "Peace Joy", 
  country: "Turkey", 
  points: 1180, 
  badges: 3, 
  avatar: "🇹🇷", // Changed to Turkey flag
  wasteLogged: "11.2kg",
  recyclingRate: "82%"
},
{ 
  id: 3, 
  name: "Oasis Central", 
  country: "UK", // Changed to UK instead of London
  points: 1150, 
  badges: 2, 
  avatar: "🇬🇧", // Changed to UK flag
  wasteLogged: "10.8kg",
  recyclingRate: "78%"
},
    { 
      id: 4, 
      name: "Raj Patel", 
      country: "India", 
      points: 1095, 
      badges: 2, 
      avatar: "🇮🇳",
      wasteLogged: "9.5kg",
      recyclingRate: "76%"
    },
    { 
      id: 5, 
      name: "Sophie Martin", 
      country: "France", 
      points: 1020, 
      badges: 2, 
      avatar: "🇫🇷",
      wasteLogged: "8.9kg",
      recyclingRate: "74%"
    },
    { 
      id: 6, 
      name: "Kenji Tanaka", 
      country: "Japan", 
      points: 980, 
      badges: 2, 
      avatar: "🇯🇵",
      wasteLogged: "8.1kg",
      recyclingRate: "71%"
    },
    { 
      id: 7, 
      name: "Lisa Johnson", 
      country: "USA", 
      points: 945, 
      badges: 1, 
      avatar: "🇺🇸",
      wasteLogged: "7.8kg",
      recyclingRate: "69%"
    },
    { 
      id: 8, 
      name: "Carlos Mendez", 
      country: "Mexico", 
      points: 890, 
      badges: 1, 
      avatar: "🇲🇽",
      wasteLogged: "7.2kg",
      recyclingRate: "65%"
    }
  ];

  const getRankIcon = (rank) => {
    switch(rank) {
      case 1: return "🥇";
      case 2: return "🥈";
      case 3: return "🥉";
      default: return `#${rank}`;
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-xl p-6 text-white shadow-lg">
        <h2 className="text-2xl font-bold mb-2 flex items-center">
          🏆 International Student Leaderboard
        </h2>
        <p className="text-green-100">Compete with fellow international students across campus!</p>
      </div>

      {/* Stats Overview */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h3 className="font-semibold mb-3 flex items-center">
          📈 Community Impact
        </h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-lg font-bold text-green-600">8 Students</div>
            <div className="text-xs text-gray-600">Active This Week</div>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-lg font-bold text-blue-600">68.1kg</div>
            <div className="text-xs text-gray-600">Total Diverted</div>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <div className="text-lg font-bold text-purple-600">75%</div>
            <div className="text-xs text-gray-600">Avg Recycling</div>
          </div>
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="font-semibold mb-4 text-center">🏆 Top Performers</h3>
        <div className="flex justify-center items-end space-x-4 mb-6">
          {/* 2nd Place */}
          <div className="text-center">
            <div className="w-16 h-20 bg-gradient-to-br from-gray-300 to-gray-400 rounded-lg flex items-center justify-center mb-2">
              <span className="text-2xl">{leaderboardData[1].avatar}</span>
            </div>
            <div className="text-sm font-bold">{leaderboardData[1].name.split(' ')[0]}</div>
            <div className="text-xs text-gray-600">{leaderboardData[1].points} pts</div>
            <div className="text-lg">🥈</div>
          </div>

          {/* 1st Place */}
          <div className="text-center">
            <div className="w-20 h-24 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-lg flex items-center justify-center mb-2 shadow-lg">
              <span className="text-3xl">{leaderboardData[0].avatar}</span>
            </div>
            <div className="text-sm font-bold">{leaderboardData[0].name.split(' ')[0]}</div>
            <div className="text-xs text-gray-600">{leaderboardData[0].points} pts</div>
            <div className="text-xl">🥇</div>
          </div>

          {/* 3rd Place */}
          <div className="text-center">
            <div className="w-16 h-20 bg-gradient-to-br from-orange-300 to-orange-400 rounded-lg flex items-center justify-center mb-2">
              <span className="text-2xl">{leaderboardData[2].avatar}</span>
            </div>
            <div className="text-sm font-bold">{leaderboardData[2].name.split(' ')[0]}</div>
            <div className="text-xs text-gray-600">{leaderboardData[2].points} pts</div>
            <div className="text-lg">🥉</div>
          </div>
        </div>
      </div>

      {/* Full Leaderboard */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 bg-gray-50 border-b">
          <h3 className="font-semibold flex items-center">
            👥 Full Rankings - International Students
          </h3>
        </div>
        
        <div className="divide-y divide-gray-100">
          {leaderboardData.map((student, index) => {
            const rank = index + 1;
            const isCurrentUser = user && student.name === user.name;
            
            return (
              <div 
                key={student.id} 
                className={`p-4 flex items-center space-x-4 hover:bg-gray-50 transition-colors ${
                  isCurrentUser ? 'bg-green-50 border-l-4 border-green-500' : ''
                }`}
              >
                {/* Rank */}
                <div className="flex-shrink-0 w-12 text-center">
                  <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                    rank <= 3 ? 'text-lg' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {getRankIcon(rank)}
                  </div>
                </div>

                {/* Avatar & Info */}
                <div className="flex items-center space-x-3 flex-1">
                  <div className="text-2xl">{student.avatar}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-gray-900">{student.name}</span>
                      {isCurrentUser && (
                        <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                          You
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-600">{student.country}</div>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center space-x-6 text-sm">
                  <div className="text-center">
                    <div className="font-bold text-green-600">{student.points}</div>
                    <div className="text-xs text-gray-500">points</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-blue-600">{student.wasteLogged}</div>
                    <div className="text-xs text-gray-500">diverted</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-purple-600">{student.recyclingRate}</div>
                    <div className="text-xs text-gray-500">recycling</div>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex items-center space-x-1">
                  {Array.from({ length: student.badges }, (_, i) => (
                    <div key={i} className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Team Challenges */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="font-semibold mb-4 flex items-center">
          👥 International Student Challenges
        </h3>
        
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200">
            <div className="flex justify-between items-center mb-2">
              <div className="font-medium text-blue-800">🏠 International Dormitory Challenge</div>
              <div className="text-sm text-blue-600">3 days left</div>
            </div>
            <div className="text-sm text-blue-700 mb-3">
              International students vs. local students - Most recycling logged wins!
            </div>
            <div className="flex justify-between text-sm">
              <span>Progress: 2nd place</span>
              <span className="font-bold text-blue-600">+100 pts reward</span>
            </div>
            <div className="mt-2 bg-blue-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '68%' }}></div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-4 border border-orange-200">
            <div className="flex justify-between items-center mb-2">
              <div className="font-medium text-orange-800">🌍 Cultural Exchange Challenge</div>
              <div className="text-sm text-orange-600">2 days left</div>
            </div>
            <div className="text-sm text-orange-700 mb-3">
              Share waste management practices from your home country
            </div>
            <div className="flex justify-between text-sm">
              <span>Progress: 3/5 countries shared</span>
              <span className="font-bold text-orange-600">+75 pts reward</span>
            </div>
            <div className="mt-2 bg-orange-200 rounded-full h-2">
              <div className="bg-orange-500 h-2 rounded-full" style={{ width: '60%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Research Impact Section */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
        <h3 className="font-semibold mb-4 text-gray-800">📊 Research Impact - IC-ETSI 2025</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">68.1kg</div>
            <div className="text-xs text-gray-600">Total waste diverted by international students</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">75%</div>
            <div className="text-xs text-gray-600">Average recycling rate improvement</div>
          </div>
        </div>
        <div className="mt-4 text-center">
          <div className="text-sm text-gray-700">
            <strong>Research Goal:</strong> 20% improvement among international students ✅ 
            <span className="text-green-600 font-bold"> ACHIEVED!</span>
          </div>
          <div className="text-xs text-blue-600 mt-2">
            Based on 23 international student interviews at University of Greenwich
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200 text-center">
        <h3 className="font-semibold mb-2 text-gray-800">🎯 Climb the International Rankings!</h3>
        <p className="text-sm text-gray-700 mb-3">
          Log more waste disposal activities to earn points and represent your country!
        </p>
        <div className="text-xs text-gray-600">
          <strong>Pro tip:</strong> Consistent daily logging gives bonus points! 🌟
        </div>
      </div>
    </div>
  );
};

const Profile = ({ user, onLogout }) => {
  return (
    <div className="p-4 space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="text-center mb-6">
          <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <User className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-xl font-bold">{user.name}</h2>
          <p className="text-gray-600">{user.university}</p>
          <p className="text-sm text-gray-500">International Student from {user.country}</p>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{user.points}</div>
            <div className="text-xs text-gray-600">Total Points</div>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{user.badges.length}</div>
            <div className="text-xs text-gray-600">Badges</div>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">15</div>
            <div className="text-xs text-gray-600">Day Streak</div>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="w-full bg-gray-500 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
        >
          Logout
        </button>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="font-semibold mb-4 flex items-center">
          <Award className="w-5 h-5 mr-2 text-yellow-500" />
          Badge Collection ({user.badges.length}/12)
        </h3>
        
        <div className="grid grid-cols-4 gap-3 mb-4">
          {user.badges.map((badge, index) => (
            <div key={index} className="text-center p-2 bg-yellow-100 rounded-lg border border-yellow-300">
              <div className="text-2xl mb-1">{badge}</div>
              <div className="text-xs font-medium">Level {index + 1}</div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-orange-800">🎯 Next Badge: Speed Logger</span>
            <span className="text-sm text-orange-600">⚡</span>
          </div>
          <div className="text-xs text-orange-700 mb-2">Log waste 5 times in one day</div>
          <div className="bg-orange-200 rounded-full h-2 mb-1">
            <div className="bg-orange-500 h-2 rounded-full transition-all duration-500" style={{ width: '60%' }}></div>
          </div>
          <div className="text-xs text-orange-600">3/5 completed today</div>
        </div>
      </div>

      <div className="bg-blue-50 rounded-xl p-6">
        <h3 className="font-semibold mb-2 text-blue-800">About WasteLess App</h3>
        <p className="text-sm text-blue-700 mb-3">
          Helping international students navigate UK waste disposal systems through gamification and education.
        </p>
        <div className="text-xs text-blue-600">
          Based on research with 23 international students at University of Greenwich
        </div>
      </div>
    </div>
  );
};

export default App;
