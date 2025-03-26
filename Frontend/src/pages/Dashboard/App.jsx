import React, { createContext, useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import { LogIn } from 'lucide-react';
import OnlineCompiler from '../Home/components/online_compiler';

function Dashboard() {
    const [reviewData, setReviewData] = useState(""); // State to hold review data
    const [roomId, setRoomId] = useState(""); // State to hold room ID
    const [inputRoomId, setInputRoomId] = useState(""); // New state for input value
    const [flag, setFlag] = useState(false)
    const [roomMembers, setRoomMembers] = useState([]); // State to hold room members
    const [username, setUsername] = useState("");

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

                setRoomMembers(prevlist =>{
                    let newlist = [...prevlist, data.username]
                    console.log(newlist)
                    return newlist
                })
            } else {
                console.error("Failed to get username:", data.message);
            }
        } catch (error) {
            console.error("Error fetching username:", error);
        }
    };

    const handleLeave = () =>{
        setFlag(false);
        setRoomId("");
    }

    return (
        <>
            <div className='container w-1'>
                {flag ? 
                 <div className='room-members'>
                    <div className='squad-name'>
                        <h1> Squad </h1>
                    </div>
                    <div className='player-box'>
                        <div className='player-details'>
                            <div className='player'>
                                {roomMembers.map(member => {
                                return <h2 key={member}>{member}</h2>

                                })}
                                
                            </div>
                        </div>
 
                    </div>

                    <div className='room-detail'>
                        <h3> Room ID: {roomId}</h3>
                        <button onClick={handleLeave} className='leave-button'> Leave </button>
                    </div>
                </div> :

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
                </div>}

                <div className='compiler-setup'>
                    <OnlineCompiler setParentReview={setReviewData} room={roomId} setFlag = {setFlag} flag ={flag}/>
                </div>
            </div>

        </>
    );
}

export default Dashboard;