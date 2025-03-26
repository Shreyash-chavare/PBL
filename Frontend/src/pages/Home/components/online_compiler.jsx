import React, { useState, useEffect, useRef, useContext } from "react";
import './index.css';
import './compiler.css';
import { io } from 'socket.io-client';
import axios from 'axios';
import 'prismjs/themes/prism-tomorrow.css';
import prism from 'prismjs';
import { Play, Save, Download, Settings, RefreshCw, X } from 'lucide-react';

const OnlineCompiler = ({ setParentReview , room , setFlag , flag}) => {
    const [language, setLanguage] = useState(() => localStorage.getItem('compiler_language') || "python3");
    const [code, setCode] = useState(() => localStorage.getItem('compiler_code') || "");
    const [input, setInput] = useState(() => localStorage.getItem('compiler_input') || "");
    const [output, setOutput] = useState("");
    const [review, setReview] = useState("");
    const [socketId, setSocketId] = useState("");
    const [isRunning, setIsRunning] = useState(false);
    const [showReview, setShowReview] = useState(false);
    const socketRef = useRef(null);

    // Save code to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('compiler_code', code);
    }, [code]);

    // Save language to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('compiler_language', language);
    }, [language]);

    // Save input to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('compiler_input', input);
    }, [input]);

    useEffect(() => {
        prism.highlightAll();
    }, []);

    useEffect(() => {
        if (room) {
            handleJoinRoom();
        }
    }, [room]);

    const handleJoinRoom = () => {
        socketRef.current.emit("join-room", room);
        setFlag(true);
    };

    useEffect(() => {

        if (!socketRef.current) {
            socketRef.current = io("http://localhost:3000", {
                withCredentials: true,
                transports: ['websocket'],
                timeout: 10000,
                reconnection: true,
                reconnectionDelay: 1000,
                reconnectionDelayMax: 5000,
                reconnectionAttempts: 5
            });

            socketRef.current.on("connect", () => {
                console.log("Connected to server:", socketRef.current.id);
                setSocketId(socketRef.current.id);
            });

            socketRef.current.on("connect_error", (error) => {
                console.error("Socket connection error:", error);
            });

            socketRef.current.on("message", (data) => {
                setCode(data);
            });
        }

        return () => {
            if (socketRef.current && socketRef.current.connected) {
                console.log("Cleaning up socket connection");
                socketRef.current.disconnect();
                socketRef.current = null;
            }
        };
    }, []);

    const handleRunCode = async () => {
        setIsRunning(true);
        setOutput("Running...");

        const requestData = {
            language,
            versionIndex: language === "python3" ? "3" : "0",
            script: code,
            stdin: input,
        };

        try {
            const response = await fetch("http://localhost:3000/api/compile", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestData),
            });

            if (!response.ok) {
                throw new Error("Server error: " + response.statusText);
            }

            const result = await response.json();
            setOutput(result.output || result.error);
        } catch (error) {
            setOutput("Error: " + error.message);
        } finally {
            setIsRunning(false);
        }
    };

    const handleTextArea = (e) => {
        setCode(e.target.value);
        socketRef.current.emit("message", e.target.value);
    };

    const runcode = async () => {
        try {
            setReview("");
            setShowReview(false);
            
            const response = await axios.post('http://localhost:3000/get-code', { code });
            setReview(response.data);
            setParentReview(response.data);
            setShowReview(true);
        } catch (error) {
            console.error('Error running code:', error);
        }
    };

    return (
        <div className={`compiler-container ${showReview ? 'review-open' : ''}`}>
            <div className="compiler-header">
                <div className="language-selector">
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="language-select"
                    >
                        <option value="python3">Python</option>
                        <option value="java">Java</option>
                        <option value="c">C</option>
                        <option value="cpp">C++</option>
                    </select>
                </div>
                <div className="compiler-controls">
                    <button className="control-btn" onClick={handleRunCode} disabled={isRunning}>
                        <Play className="icon" />
                        {isRunning ? 'Running...' : 'Run'}
                    </button>
                    <button className="control-btn" onClick={runcode}>
                        <RefreshCw className="icon" />
                        Review
                    </button>
                    <button className="control-btn">
                        <Save className="icon" />
                        Save
                    </button>
                    <button className="control-btn">
                        <Download className="icon" />
                        Download
                    </button>
                    <button className="control-btn">
                        <Settings className="icon" />
                        Settings
                    </button>
                </div>
            </div>

            <div className="compiler-body">
                <div className="editor-pane">
                    <div className="editor-header">
                        <span className="file-name">main.{language === 'python3' ? 'py' : language === 'java' ? 'java' : language === 'c' ? 'c' : 'cpp'}</span>
                    </div>
                    <textarea
                        className="code-editor"
                        placeholder="Write your code here..."
                        value={code}
                        onChange={handleTextArea}
                        spellCheck="false"
                    />
                </div>

                <div className="io-pane">
                    <div className="input-section">
                        <div className="section-header">Input</div>
                        <textarea
                            className="io-textarea"
                            placeholder="Enter input (optional)"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                    </div>
                    <div className="output-section">
                        <div className="section-header">Output</div>
                        <pre className="output-display">{output}</pre>
                    </div>
                </div>
            </div>

            {showReview && (
                <div className="review-panel">
                    <div className="review-header">
                        <h3>Code Review</h3>
                        <button className="close-btn" onClick={() => setShowReview(false)}>
                            <X className="icon" />
                        </button>
                    </div>
                    <div className="review-content">
                        {review}
                    </div>
                </div>
            )}
        </div>
    );
};

export default OnlineCompiler;
