import React, { useState } from 'react';
import { Calendar, User, Mail, Plus, LogIn, Code } from 'lucide-react';
import { useAuthstore } from '../../stores/auth';
import { useNavigate } from 'react-router-dom';
import "./App.css"

const Profile = () => {
  const [roomId, setRoomId] = useState('');
  const [newRoomName, setNewRoomName] = useState('');
  const {authUser}= useAuthstore();
  
  console.log('AuthUser in Profile:', authUser); // Debug log
  const navigate = useNavigate();
  
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


  const handlePractice = () => {
    navigate("/practice")
    // Practice environment logic would go here
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
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-xl font-bold">My Profile</h1>
        </div>
        
        <div className="space-y-6">
          {/* IDE Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">IDE</h2>
            <button 
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded flex items-center justify-center"
              onClick={handlePractice}
            >
              <Code size={18} className="mr-2" />
              Practice
            </button>
          </div>
          

        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        {/* User Profile Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-start space-x-6">
            {/* Profile Picture */}
            <img
              src={userData.profileImage}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
            />
            
            <div className="flex-1">
              {/* Email */}
              <div className="flex items-center text-gray-500 text-sm mb-1">
                <Mail size={14} className="mr-1" />
                <span>{userData?.email || 'Not Available'}</span>
              </div>
              
              {/* Username */}
              <div className="flex items-center text-2xl font-bold">
                <User size={24} className="mr-2 text-gray-700" />
                <h2>{userData?.username || 'Not Available'}</h2>
              </div>
              
              <div className="mt-4 text-gray-600">

                <span>
                  <span className="font-semibold">248</span> Days Active
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Activity Calendar */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <Calendar size={20} className="mr-2 text-gray-700" />
            <h3 className="text-lg font-semibold">Activity Calendar</h3>
          </div>
          
          <div className="overflow-x-auto pb-4">
            <div className="flex items-start">
              {/* Day labels */}
              <div className="mr-2 mt-6">
                <div className="text-xs text-gray-500 h-3 mb-1">Mon</div>
                <div className="text-xs text-gray-500 h-3 mb-1">Wed</div>
                <div className="text-xs text-gray-500 h-3 mb-1">Fri</div>
              </div>
              
              {/* Calendar grid */}
              <div className="flex space-x-1">
                {weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col space-y-1">
                    {Array(7).fill(0).map((_, dayIndex) => {
                      const day = week[dayIndex];
                      if (!day) return <div key={dayIndex} className="w-3 h-3"></div>;
                      
                      // Determine color based on activity count
                      let bgColor = 'bg-gray-100';
                      if (day.count === 1) bgColor = 'bg-green-200';
                      else if (day.count === 2) bgColor = 'bg-green-300';
                      else if (day.count === 3) bgColor = 'bg-green-400';
                      else if (day.count >= 4) bgColor = 'bg-green-500';
                      
                      return (
                        <div 
                          key={dayIndex} 
                          className={`w-3 h-3 ${bgColor} rounded-sm`}
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
              <div className="text-xs text-gray-500 flex w-full justify-between">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
                <span>Jul</span>
                <span>Aug</span>
                <span>Sep</span>
                <span>Oct</span>
                <span>Nov</span>
                <span>Dec</span>
              </div>
            </div>
            
            {/* Legend */}
            <div className="flex items-center justify-end mt-4 text-sm text-gray-500">
              <span className="mr-2">Less</span>
              <div className="flex space-x-1">
                <div className="w-3 h-3 bg-gray-100 rounded-sm"></div>
                <div className="w-3 h-3 bg-green-200 rounded-sm"></div>
                <div className="w-3 h-3 bg-green-300 rounded-sm"></div>
                <div className="w-3 h-3 bg-green-400 rounded-sm"></div>
                <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
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