import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import OnlineCompiler from '../Home/components/online_compiler';

function Dashboard() {
    const [reviewData, setReviewData] = useState(""); // State to hold review data

    

    return (
        <>
            <div className='container w-1'>
                <div className='room-members'> {/* contains members, room ID and leave button */}
                    <div className='squad-name'>
                        <h1> Squad </h1>
                    </div>
                    <div className='player-box'> {/* TO DO: add status, make a function to display players */}
                        <div className='player-details'>
                            <div className='player'>
                                <h2>Player</h2>
                            </div>
                        </div>
 
                    </div>

                    <div className='room-detail'> {/* contains room ID and leave button */}
                        <h3> Room ID: room-code-id</h3>
                        <button className='leave-button'> Leave </button>
                    </div>
                </div>
                <div className='compiler-setup'> {/* Compiler */}
                    <OnlineCompiler setParentReview={setReviewData} />
                </div>
            </div>
        </>
    );
}

export default Dashboard;