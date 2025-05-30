import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Trophy, AlertCircle, Loader2, Zap, RefreshCw } from 'lucide-react';

function App() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchMatches = async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    }
    
    try {
      const response = await fetch('http://localhost:5000/api/matches');
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! status: ${response.status} - ${errorData.error || 'Unknown Backend Error'}`);
      }
      const data = await response.json();
      setMatches(data);
      setError(null);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
      if (isRefresh) {
        setRefreshing(false);
      }
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const isToday = date.toDateString() === today.toDateString();
    const isTomorrow = date.toDateString() === tomorrow.toDateString();
    
    const timeOptions = { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    };
    
    const dateOptions = { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    };
    
    if (isToday) {
      return `Today, ${date.toLocaleTimeString([], timeOptions)}`;
    } else if (isTomorrow) {
      return `Tomorrow, ${date.toLocaleTimeString([], timeOptions)}`;
    } else {
      return `${date.toLocaleDateString([], dateOptions)}, ${date.toLocaleTimeString([], timeOptions)}`;
    }
  };

  const handleRefresh = () => {
    fetchMatches(true);
  };

  const getLeagueIcon = (leagueName) => {
    if (leagueName.toLowerCase().includes('premier')) return '⚽';
    if (leagueName.toLowerCase().includes('champions')) return '🏆';
    if (leagueName.toLowerCase().includes('europa')) return '🌟';
    if (leagueName.toLowerCase().includes('liga')) return '⚽';
    if (leagueName.toLowerCase().includes('bundesliga')) return '⚽';
    if (leagueName.toLowerCase().includes('serie')) return '⚽';
    return '🏟️';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <Loader2 className="w-16 h-16 text-purple-400 animate-spin mx-auto mb-4" />
            <div className="absolute inset-0 w-16 h-16 bg-purple-400/20 rounded-full animate-ping mx-auto"></div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Loading Matches</h2>
          <p className="text-purple-300">Fetching the latest soccer fixtures...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-red-500/10 backdrop-blur-lg border border-red-500/20 rounded-2xl p-8 max-w-md w-full text-center">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-4">Connection Error</h2>
          <p className="text-red-300 mb-4">{error}</p>
          <p className="text-gray-400 text-sm">Please check your backend server and API key configuration.</p>
          <button 
            onClick={() => fetchMatches()} 
            className="mt-6 bg-red-500 hover:bg-red-600 text-white px-4 sm:px-6 py-2 rounded-xl transition-all duration-200 transform hover:scale-105 text-sm sm:text-base"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-2 sm:p-3 rounded-2xl mb-2 sm:mb-0 sm:mr-4">
              <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
              Soccer Central
            </h1>
          </div>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto px-4">
            Stay updated with the latest upcoming matches from top leagues around the world
          </p>
          
          {/* Refresh Button */}
          <div className="mt-6">
            <button 
              onClick={handleRefresh}
              disabled={refreshing || loading}
              className="group bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:from-gray-500 disabled:to-gray-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 disabled:scale-100 shadow-lg hover:shadow-xl flex items-center mx-auto"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              {refreshing ? 'Refreshing...' : 'Refresh Matches'}
            </button>
          </div>
        </div>

        {/* Matches Grid */}
        <div className="max-w-7xl mx-auto">
          {matches.length > 0 ? (
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {matches.map((match, index) => (
                <div 
                  key={match.id} 
                  className="group bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 min-w-0 overflow-hidden"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: 'fadeInUp 0.6s ease-out forwards'
                  }}
                >
                  {/* League Badge */}
                  <div className="flex items-center justify-between mb-3 sm:mb-4 min-w-0">
                    <div className="flex items-center bg-gradient-to-r from-purple-500/20 to-blue-500/20 px-2 sm:px-3 py-1 rounded-full min-w-0 flex-1 mr-2 overflow-hidden">
                      <span className="text-base sm:text-lg mr-1 sm:mr-2 flex-shrink-0">{getLeagueIcon(match.league)}</span>
                      <span className="text-xs sm:text-sm font-medium text-purple-300 truncate min-w-0">
                        {match.league}
                      </span>
                    </div>
                    <Trophy className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 opacity-60 flex-shrink-0" />
                  </div>

                  {/* Teams */}
                  <div className="text-center mb-4 sm:mb-6">
                    <div className="flex flex-col space-y-3 mb-2">
                      <div className="w-full">
                        <h3 className="text-sm sm:text-base lg:text-lg font-bold text-white group-hover:text-purple-300 transition-colors duration-200 truncate px-1" title={match.homeTeam}>
                          {match.homeTeam}
                        </h3>
                      </div>
                      <div className="bg-gradient-to-r from-purple-500 to-blue-500 px-3 py-1 rounded-full mx-auto">
                        <span className="text-white font-bold text-xs sm:text-sm">VS</span>
                      </div>
                      <div className="w-full">
                        <h3 className="text-sm sm:text-base lg:text-lg font-bold text-white group-hover:text-blue-300 transition-colors duration-200 truncate px-1" title={match.awayTeam}>
                          {match.awayTeam}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Date and Time */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-center text-gray-300">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-purple-400 flex-shrink-0" />
                      <span className="text-xs sm:text-sm font-medium text-center">
                        {formatDateTime(match.dateTime)}
                      </span>
                    </div>
                  </div>

                  {/* Hover effect indicator */}
                  <div className="mt-3 sm:mt-4 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 sm:py-16">
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl sm:rounded-2xl p-8 sm:p-12 max-w-md mx-auto">
                <Calendar className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">No Matches Found</h3>
                <p className="text-gray-400 text-sm sm:text-base">No upcoming matches found in the next 10 days.</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-white/10">
          <p className="text-gray-400 text-xs sm:text-sm">
            Powered by Football-Data.org API • Updated in real-time
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default App;