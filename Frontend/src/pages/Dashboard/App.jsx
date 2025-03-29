import React, { createContext, useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import { LogIn } from 'lucide-react';
import OnlineCompiler from '../Home/components/online_compiler';
import { io } from 'socket.io-client';

function Dashboard() {
    const [reviewData, setReviewData] = useState(""); // State to hold review data
    const [roomId, setRoomId] = useState(""); // State to hold room ID
    const [inputRoomId, setInputRoomId] = useState(""); // New state for input value
    const [flag, setFlag] = useState(false)
    const [roomMembers, setRoomMembers] = useState([]); // State to hold room members
    const [username, setUsername] = useState("");
    const socketRef = useRef(null);
    
    
    
    useEffect(() => {
      socketRef.current = io("http://localhost:3000")
        socketRef.current.on("members-update", (members) => {
          console.log("members", members)
          setRoomMembers( members);
          // console.log(membersembers)
        });
    }, []);

    const handleJoinRoom = async () => {
        if (!inputRoomId.trim()) return;
        try {
            const response = await fetch(`http://localhost:3000/getUsername`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Accept": "application/json"
                }
            });

            const data = await response.json();
            
            if (response.ok) {
              setUsername(data.username);
              setRoomId(inputRoomId);
              setFlag(true);
              setInputRoomId("");
              console.log(`Got username: ${data.username}`);

              socketRef.current.emit("join-room", inputRoomId);

              socketRef.current.emit("add-member", {
                room: inputRoomId,
                username: data.username
              });

                // console.log("members", roomMembers)
            } else {
                console.error("Failed to get username:", data.message);
            }
        } catch (error) {
            console.error("Error fetching username:", error);
        }
    };

    const handleLeave = () =>{
      if(socketRef.current) {
        socketRef.current.emit("leave-room");
        
        socketRef.current.emit("remove-member", {
          room: roomId,
          username: username
        });
        setFlag(false);
        setRoomId("");
        setRoomMembers([])
      }
    }

    return (
      <>
        <div className="container w-1 pt">
          <div className='w-2/5'>

          {flag ? (
            <div className="room-members">
              <div className="squad-name">
                <h1> Squad </h1>
              </div>
              <div className="player-box">
                <div className="player-details">
                  <div className="player">
                    {roomMembers.map((member) => {
                      return <h2 key={member}>{member}</h2>;
                    })}
                  </div>
                </div>
              </div>

              <div className="room-detail">
                <h3> Room ID: {roomId}</h3>
                <button onClick={handleLeave} className="leave-button">
                  {" "}
                  Leave{" "}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-2 bg-[#111111] w-full h-1/3 roomjoin">
              <label className="text-sm text-gray-300">Join Room</label>
              <div className="flex">
                <input
                  type="text"
                  placeholder="Enter Room ID"
                  className="flex-1 p-2 rounded-l text-white bg-[#1a1a1a]  border-gray-700 placeholder-gray-500 outline-none focus:ring-0"
                  value={inputRoomId}
                  onChange={(e) => setInputRoomId(e.target.value)}
                  />
                <button
                  className="bg-[#1a1a1a] text-[#d1d0c5] p-2 rounded-r hover:bg-[#111111] border-gray-700 transition-colors duration-200"
                  onClick={handleJoinRoom}
                >
                  <LogIn size={16} />
                </button>
              </div>
            </div>
          )}

          <div className='w-full h-2/3'>
            <h2>Problem Statment</h2>
          </div>

          </div>
          <div className="compiler-setup">
            <OnlineCompiler
              setParentReview={setReviewData}
              room={roomId}
              setFlag={setFlag}
              flag={flag}
            />
          </div>
        </div>
      </>
    );
}

export default Dashboard;