import React, { createContext, useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import { LogIn } from 'lucide-react';
import OnlineCompiler from '../Home/components/online_compiler';

function Dashboard() {
    const [reviewData, setReviewData] = useState(""); // State to hold review data
    const [roomId, setRoomId] = useState(""); // State to hold room ID
    const [inputRoomId, setInputRoomId] = useState(""); // New state for input value

    const handleJoinRoom = () => {
        if (inputRoomId.trim()) {
            setRoomId(inputRoomId);
            console.log(`Joining room with ID: ${inputRoomId}`);
            setInputRoomId(""); // Clear input after joining
        }
    };

    return (
        <>
            <div className='container w-1'>
                {/* <div className='room-members'>
                    <div className='squad-name'>
                        <h1> Squad </h1>
                    </div>
                    <div className='player-box'>
                        <div className='player-details'>
                            <div className='player'>
                                <h2>Player</h2>
                            </div>
                        </div>
 
                    </div>

                    <div className='room-detail'>
                        <h3> Room ID: room-code-id</h3>
                        <button className='leave-button'> Leave </button>
                    </div>
                </div> */}


                <div className="space-y-2">
                    <label className="text-sm text-black-300">Join Room</label>
                    <div className="flex">
                        <input
                            type="text"
                            placeholder="Enter Room ID"
                            className="flex-1 p-2 rounded-l text-black"
                            value={inputRoomId}
                            onChange={(e) => setInputRoomId(e.target.value)}
                        />
                        <button
                            className="bg-blue-600 text-white p-2 rounded-r hover:bg-blue-700"
                            onClick={handleJoinRoom}
                        >
                            <LogIn size={16} />
                        </button>
                    </div>
                </div>

                <div className='compiler-setup'>
                    <OnlineCompiler setParentReview={setReviewData} room={roomId}/>
                </div>
            </div>

        </>
    );
}

export default Dashboard;