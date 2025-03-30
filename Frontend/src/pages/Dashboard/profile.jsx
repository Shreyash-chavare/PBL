import React, { useState } from 'react';
import { Calendar, User, Mail, Plus, LogIn, Code, Users } from 'lucide-react';
import { useAuthstore } from '../../stores/auth';
import { useNavigate } from 'react-router-dom';
import "./App.css"

const Profile = () => {
  const [roomId, setRoomId] = useState('');
  const [newRoomName, setNewRoomName] = useState('');
  const {authUser}= useAuthstore();
  
  console.log('AuthUser in Profile:', authUser); // Debug log
  const navigate = useNavigate();
  
  // Add state for selected language
  const [selectedLanguage, setSelectedLanguage] = useState('python'); // Default language

  // Add language options
  const languages = [
    { id: 'python', name: 'Python', icon: '🐍' },
    { id: 'java', name: 'Java', icon: '☕' },
    { id: 'cpp', name: 'C++', icon: '⚡' },
    { id: 'c', name: 'C', icon: '🔧' },
  ];

  // Sample user data
  const userData = {
    username: authUser?.name || 'Not Available',
    email: authUser?.email || 'Not Available',
    profileImage: '/api/placeholder/150/150',
    // Sample activity data (representing a year of activity)
    activityData: generateSampleActivityData()
  };

  function generateSampleActivityData() {
    const data = [];
    const today = new Date();
    for (let i = 0; i < 365; i++) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      data.push({
        date: date.toISOString().split('T')[0],
        count: Math.floor(Math.random() * 5) // 0-4 contributions per day
      });
    }
    return data;
  }

  // Update the handleLanguage function
  const handleLanguage = (langId) => {
    setSelectedLanguage(langId);
    navigate('/practice', { state:{
      setlang: langId
    }})
  };

  const handleCollaborative = () => {
    navigate("/app");
  };

  // Add this handler function near your other handlers
  const handleGoToProblems = () => {
    navigate("/problems");
  };

  // Function to group activity data by week
  const getCalendarData = () => {
    const weeks = [];
    for (let i = 0; i < 53; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        const index = i * 7 + j;
        if (index < userData.activityData.length) {
          week.push(userData.activityData[index]);
        }
      }
      if (week.length > 0) {
        weeks.push(week);
      }
    }
    return weeks;
  };

  const weeks = getCalendarData();

  return (
    <div className="h-5/6 bg-[#111111] p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* User Profile Section */}
        <div className="flex items-start space-x-6">
          {/* Profile Picture */}
          <img
            src={userData.profileImage}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-2 border-gray-700"
          />
          
          <div className="flex-1">
            {/* Email */}
            <div className="flex items-center text-gray-400 text-sm mb-1">
              <Mail size={14} className="mr-1" />
              <span>{userData?.email || 'Not Available'}</span>
            </div>
            
            {/* Username */}
            <div className="flex items-center text-2xl font-bold text-[#d1d0c5]">
              <User size={24} className="mr-2 text-[#d1d0c5]" />
              <h2>{userData?.username || 'Not Available'}</h2>
            </div>
            
            <div className="mt-4 text-[#d1d0c5]">
              <span>
                <span className="font-semibold">248</span> Days Active
              </span>
            </div>
          </div>
        </div>

        {/* IDE Options Section */}
        <div>
          <div className="flex items-center mb-6">
            <Code size={20} className="mr-2 text-[#d1d0c5]" />
            <h3 className="text-lg font-semibold text-[#d1d0c5]">Coding Environment</h3>
          </div>
          
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              {languages.map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => handleLanguage(lang.id)}
                  className={`px-4 py-2 rounded flex items-center gap-2 transition-colors
                    ${selectedLanguage === lang.id 
                      ? 'bg-[#3a3a3a] text-[#d1d0c5] border border-[#4a4a4a]' 
                      : 'bg-[#2a2a2a] text-gray-400 hover:bg-[#3a3a3a] hover:text-[#d1d0c5]'}`}
                >
                  <span className="pointer-events-none">{lang.icon}</span>
                  {lang.name}
                </button>
              ))}
            </div>

            <div className="flex gap-4">
              <button 
                className="bg-[#2a2a2a] hover:bg-[#3a3a3a] text-[#d1d0c5] py-3 px-8 rounded flex items-center justify-center transition-colors"
                onClick={handleCollaborative}
              >
                <Users size={18} className="mr-2" />
                Collaborative
              </button>
              <button 
                className="bg-[#2a2a2a] hover:bg-[#3a3a3a] text-[#d1d0c5] py-3 px-8 rounded flex items-center justify-center transition-colors"
                onClick={handleGoToProblems}
              >
                <Code size={18} className="mr-2" />
                Go to Problems
              </button>
            </div>
          </div>
        </div>
        
        {/* Activity Calendar */}
        <div>
          <div className="flex items-center mb-6">
            <Calendar size={20} className="mr-2 text-[#d1d0c5]" />
            <h3 className="text-lg font-semibold text-[#d1d0c5]">Activity Calendar</h3>
          </div>
          
          <div className="overflow-x-auto pb-4">
            <div className="flex items-start">
              {/* Day labels */}
              <div className="mr-2 mt-6">
                <div className="text-xs text-gray-400 h-3 mb-1">Mon</div>
                <div className="text-xs text-gray-400 h-3 mb-1">Wed</div>
                <div className="text-xs text-gray-400 h-3 mb-1">Fri</div>
              </div>
              
              {/* Calendar grid */}
              <div className="flex space-x-1">
                {weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col space-y-1">
                    {Array(7).fill(0).map((_, dayIndex) => {
                      const day = week[dayIndex];
                      if (!day) return <div key={dayIndex} className="w-3 h-3"></div>;
                      
                      // Updated color scheme to match dark theme
                      let bgColor = 'bg-[#2a2a2a]';
                      if (day.count === 1) bgColor = 'bg-[#1e4620]';
                      else if (day.count === 2) bgColor = 'bg-[#2a642c]';
                      else if (day.count === 3) bgColor = 'bg-[#37833b]';
                      else if (day.count >= 4) bgColor = 'bg-[#46a658]';
                      
                      return (
                        <div 
                          key={dayIndex} 
                          className={`w-3 h-3 ${bgColor} rounded-sm border border-gray-700`}
                          title={`${day.date}: ${day.count} contributions`}
                        ></div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Month labels */}
            <div className="flex mt-2 ml-6">
              <div className="text-xs text-gray-400 flex w-full justify-between">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(month => (
                  <span key={month}>{month}</span>
                ))}
              </div>
            </div>
            
            {/* Legend */}
            <div className="flex items-center justify-end mt-4 text-sm text-gray-400">
              <span className="mr-2">Less</span>
              <div className="flex space-x-1">
                <div className="w-3 h-3 bg-[#2a2a2a] rounded-sm border border-gray-700"></div>
                <div className="w-3 h-3 bg-[#1e4620] rounded-sm border border-gray-700"></div>
                <div className="w-3 h-3 bg-[#2a642c] rounded-sm border border-gray-700"></div>
                <div className="w-3 h-3 bg-[#37833b] rounded-sm border border-gray-700"></div>
                <div className="w-3 h-3 bg-[#46a658] rounded-sm border border-gray-700"></div>
              </div>
              <span className="ml-2">More</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;