import React, { useState, useEffect } from 'react';
import { Calendar, User, Mail, Plus, LogIn, Code, Users } from 'lucide-react';
import { useAuthstore } from '../../stores/auth';
import { useNavigate } from 'react-router-dom';

import "./App.css"

const Profile = () => {
  const [roomId, setRoomId] = useState('');
  const [newRoomName, setNewRoomName] = useState('');
  const { authUser } = useAuthstore();
  const [activityData, setActivityData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [daysActive, setDaysActive] = useState(0);
  const { logout } = useAuthstore();

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

  // Fetch user activity data
  useEffect(() => {
    const fetchActivityData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:3000/api/user/activity', {
          credentials: 'include', // Important for cookies/session
        });

        if (!response.ok) {
          throw new Error('Failed to fetch activity data');
        }

        const data = await response.json();
        console.log(data)
        setActivityData(data);

        // Calculate days active
        setDaysActive(new Set(data.map(item => item.date)).size);
      } catch (err) {
        console.error('Error fetching activity data:', err);
        setError(err.message);
        // Fall back to sample data if API fails
        setActivityData(generateSampleActivityData());
      } finally {
        setIsLoading(false);
      }
    };

    fetchActivityData();
  }, []);

  // Sample user data with real or fallback activity data
  const userData = {
    username: authUser?.name || 'Not Available',
    email: authUser?.email || 'Not Available',
    profileImage: '/api/placeholder/150/150',
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
    navigate('/practice', {
      state: {
        setlang: langId
      }
    })
  };

  const handleCollaborative = () => {
    navigate("/app");
  };

  // Add this handler function near your other handlers
  const handleGoToProblems = () => {
    navigate("/problems");
  };

  const fillMissingDates = (data) => {
    const filledData = [...data];
    const dateSet = new Set(data.map(item => item.date));

    const currentYear = new Date().getFullYear();
    const startOfYear = new Date(currentYear, 0, 1); // January 1st of current year
    const endOfYear = new Date(currentYear, 11, 31); // December 31st of current year

    // Iterate through each day in the current year
    for (let d = new Date(startOfYear); d <= endOfYear; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0];
      if (!dateSet.has(dateStr)) {
        filledData.push({ date: dateStr, count: 0 });
      }
    }

    // Sort by date
    return filledData.sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  // Function to group activity data by month
  const getCalendarData = () => {
    // Make sure we have data for every day in the current year
    const completeData = fillMissingDates(activityData);

    const currentYear = new Date().getFullYear();
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    // Define the order of days (Monday first, Sunday last)
    const dayOrder = [1, 2, 3, 4, 5, 6, 0]; // Mon, Tue, Wed, Thu, Fri, Sat, Sun

    // Create an array to hold calendar data for each month
    const months = [];

    // Process each month
    for (let month = 0; month < 12; month++) {
      const firstDayOfMonth = new Date(currentYear, month, 1);
      const lastDayOfMonth = new Date(currentYear, month + 1, 0);

      // Get the day of week (0-6) for the first day
      const firstDayDOW = firstDayOfMonth.getDay();
      // Convert to our order where Monday is first (0) and Sunday is last (6)
      const firstDayOrderIndex = dayOrder.indexOf(firstDayDOW);

      const weeks = [];
      let currentWeek = Array(7).fill(null); // Start with empty week
      let dayCounter = 0; // Track which day of the week we're on

      // If the month doesn't start on Monday, add empty cells
      if (firstDayOrderIndex > 0) {
        dayCounter = firstDayOrderIndex;
      }

      // Add days to the month grid
      for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
        const currentDate = new Date(currentYear, month, day);
        const dateStr = currentDate.toISOString().split('T')[0];

        // Find position in week (0-6) based on our day order
        const dayOfWeek = currentDate.getDay();
        const dayOrderIndex = dayOrder.indexOf(dayOfWeek);

        // Find matching data or use empty data
        const matchingData = completeData.find(item => item.date === dateStr);
        const dayData = matchingData ? {
          ...matchingData,
          isToday: dateStr === todayStr,
          isFuture: currentDate > today
        } : {
          date: dateStr,
          count: 0,
          isToday: dateStr === todayStr,
          isFuture: currentDate > today
        };

        // Place in current week
        currentWeek[dayOrderIndex] = dayData;
        dayCounter++;

        // If it's the last day of the week or month, push the week and start a new one
        if (dayCounter === 7 || day === lastDayOfMonth.getDate()) {
          weeks.push([...currentWeek]);
          currentWeek = Array(7).fill(null); // Reset for next week
          dayCounter = 0;
        }
      }

      // Create month object with name, weeks data, etc.
      months.push({
        name: new Date(currentYear, month, 1).toLocaleString('default', { month: 'long' }),
        number: month + 1,
        weeks: weeks,
        firstDayIndex: firstDayOrderIndex,
        daysInMonth: lastDayOfMonth.getDate()
      });
    }

    return months;
  };

  const months = isLoading ? [] : getCalendarData();

  const handleLogout = async () => {
    try {
      const result = await logout();
      if (result.success) {
        setIsSettingsOpen(false);
        navigate('/');
        useAuthstore.setState({ authUser: null });
      }
    } catch (error) {
      console.error("Logout failed:", error);
      setIsSettingsOpen(false);
      navigate('/');
    }
  }

  return (
    <div className="h-5/6 bg-[#111111] p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* User Profile Section */}

        <div className="flex items-start space-x-6 justify-between">
          <div className='flex gap-2 justify-around'>

            {/* Profile Picture */}
            <img src="https://avatars.githubusercontent.com/u/1733352?s=80&amp;v=4" jsaction="" className="sFlh5c FyHeAf iPVvYb h-28 rounded-full" alt="Making profile picture private? · Issue #4330 · diaspora/diaspora · GitHub" jsname="kn3ccd" aria-hidden="false" />
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
                  <span className="font-semibold">{daysActive}</span> Days Active
                </span>
              </div>
            </div>
          </div>
          <button onClick={handleLogout} className='bg-red-700 p-2 rounded-lg'>Logout</button>
        </div>

        {/* IDE Options Section */}
        <div>
          <div className="flex items-center mb-6">
            <Code size={20} className="mr-2 text-[#d1d0c5]" />
            <h3 className="text-lg font-semibold text-[#d1d0c5]">Coding Environment</h3>
          </div>

          {/* Rest of IDE options unchanged */}
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

          {isLoading ? (
            <div className="text-gray-400 text-center py-8">Loading activity data...</div>
          ) : error ? (
            <div className="text-red-400 text-center py-8">Error loading activity data</div>
          ) : (
            <div className="overflow-x-auto pb-4">
              <div className="flex items-center">
                {/* Day labels */}


                {/* Calendar grid */}
                {/* Calendar container with month grid layout */}
                <div className="flex flex-wrap gap-3">
                  {months.map((month, monthIndex) => (
                    <div key={monthIndex} className="calendar-month border border-gray-700 rounded-md p-3 bg-gray-900">
                      <h3 className="text-lg font-medium mb-2 text-white">{month.name}</h3>

                      {/* Month grid with day headers */}
                      <div className="">
                        {/* Day headers */}
                        <div className="flex space-x-1 mb-1">
                          <div className="w-3 text-xs text-gray-500">S</div>
                          <div className="w-3 text-xs text-gray-500">M</div>
                          <div className="w-3 text-xs text-gray-500">T</div>
                          <div className="w-3 text-xs text-gray-500">W</div>
                          <div className="w-3 text-xs text-gray-500">T</div>
                          <div className="w-3 text-xs text-gray-500">F</div>
                          <div className="w-3 text-xs text-gray-500">S</div>
                        </div>

                        {/* Calendar grid */}
                        <div className="flex flex-col space-y-1">
                          {month.weeks.map((week, weekIndex) => (
                            <div key={weekIndex} className="flex space-x-1">
                              {week.map((day, dayIndex) => {
                                // Check if the day is null (empty cell)
                                if (day === null) {
                                  return <div key={dayIndex} className="w-3 h-3 bg-transparent"></div>;
                                }

                                // Updated color scheme to match dark theme
                                let bgColor = 'bg-[#2a2a2a]';
                                if (day.count === 1) bgColor = 'bg-[#1e4620]';
                                else if (day.count === 2) bgColor = 'bg-[#2a642c]';
                                else if (day.count === 3) bgColor = 'bg-[#37833b]';
                                else if (day.count >= 4) bgColor = 'bg-[#46a658]';

                                // Add highlight for today
                                if (day.isToday) {
                                  bgColor += ' ring-1 ring-white';
                                }

                                return (
                                  <div
                                    key={dayIndex}
                                    className={`w-3 h-3 ${bgColor} rounded-sm border border-gray-700`}
                                    title={day.date ? `${day.date}: ${day.count} activities` : ''}
                                  ></div>
                                );
                              })}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;