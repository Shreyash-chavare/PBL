import React, { useState , useEffect, useRef} from "react";
import './index.css'; // Ensure you have this import to apply Tailwind CSS
import './compiler.css';
import {io} from 'socket.io-client';
import axios from 'axios';
import 'prismjs/themes/prism-tomorrow.css';
import prism from 'prismjs';

const OnlineCompiler = ({setParentReview}) => {
    const [language, setLanguage] = useState("python3");
    const [code, setCode] = useState("");
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [review,setReview]=useState("");
    const socketRef = useRef(null);

    const socket = io("http://localhost:3000");
    useEffect(() => {
        prism.highlightAll();
      }, []);

    useEffect(() => {
        socketRef.current = io("http://localhost:3000", {
            withCredentials: true,
            transports: ['websocket'],
            timeout: 10000,
        });
        

        // Socket event handlers
        socketRef.current.on("connect", () => {
            console.log("Connected to server:", socketRef.current.id);
        });

        socketRef.current.on("connect_error", (error) => {
            console.error("Socket connection error:", error);
        });

        socketRef.current.on("recieved-message", (data) => {
            setCode(data);
        });

        // Cleanup on unmount
        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        };
    }, []);
    


    const handleRunCode = async () => {
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
        }
    };

    const handleTextArea = (e) => {
        setCode(e.target.value);
        socket.emit("message", e.target.value);
    };
    const runcode = async () => {
        try {
          const response = await axios.post('http://localhost:3000/get-code', { code });
          setReview(response.data);
          setParentReview(response.data);
        } catch (error) {
          console.error('Error running code:', error);
        }
      };

      return (
        <div className="flex flex-col items-center h-fill bg-gray-100 p-4">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-6xl">
                <h1 className="text-4xl font-bold mb-6 text-center">JDoodle Compiler</h1>
    
                <div className="flex flex-col lg:flex-row gap-6 mb-6">
                    <div className="w-full lg:w-1/4">
                        <label className="block text-left mb-2 text-lg font-medium">Language:</label>
                        <select
                            className="block w-full p-3 border border-gray-300 rounded-lg text-lg"
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                        >
                            <option value="python3">Python</option>
                            <option value="java">Java</option>
                            <option value="c">C</option>
                            <option value="cpp">C++</option>
                        </select>
                    </div>
                </div>
    
                <div className="relative w-full lg:flex lg:gap-6">
                    {/* Move Review Code button above code body */}
                    <div className="absolute top-[-50px] lg:relative lg:top-auto lg:mt-0 self-start mb-4">
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                            onClick={runcode}
                        >
                            Review Code
                        </button>
                    </div>
    
                    {/* Code and Input */}
                    <div className="w-full lg:w-3/4">
                        <label className="block text-left mb-2 text-lg font-medium">Code:</label>
                        <textarea
                            className="block w-full h-64 p-2 border border-gray-300 rounded-lg resize-none text-lg"
                            placeholder="Write your code here..."
                            value={code}
                            onChange={handleTextArea}
                        ></textarea>
                        <button
                            onClick={handleRunCode}
                            className="run-button mt-2 rounded-lg font-semibold text-md"
                        >
                            Run Code
                        </button>
                    </div>
                    
                </div>
                
    
                <div className="flex flex-col lg:flex-row gap-6 mb-6">
                    <div className="w-full lg:w-1/2 mt-4">
                        <label className="block text-left mb-2 text-lg font-medium">Input (Optional):</label>
                        <textarea
                            className="block w-full h-24 p-4 border border-gray-300 rounded-lg resize-none text-lg"
                            placeholder="Input (Optional)"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="w-full lg:w-1/2 mt-4">
                        <label className="block text-left mb-2 text-lg font-medium">Output:</label>
                        <pre className="bg-gray-200 p-4 text-red-600 rounded-lg text-lg h-24 overflow-x-auto">{output}</pre>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OnlineCompiler;
