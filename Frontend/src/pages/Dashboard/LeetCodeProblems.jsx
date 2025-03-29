import React, { useState, useEffect } from 'react';
import "./problems.css"; 
const LeetCodeProblems = () => {
    const [problemlist, setProblemlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [questionId, setQuestionId] = useState('');
    const [selectedProblem, setSelectedProblem] = useState(null);
    const [searchLoading, setSearchLoading] = useState(false);
    const [expandedProblemId, setExpandedProblemId] = useState(null);

    const convertHtmlToPlainText = (html) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    };

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                console.log('Starting problems fetch...'); // Debug log
                const response = await fetch('http://localhost:3000/api/leetcode/problems', {
                    credentials: 'include',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                });
                
                const data = await response.json();
                
                if (!response.ok) {
                    throw new Error(data.error || `Server error: ${response.status}`);
                }

                console.log('Problems fetched successfully:', data); // Debug log
                setProblemlist(data);
                setLoading(false);
            } catch (err) {
                console.error('Error details:', err); // Debug log
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProblems();
    }, []);

    const handleSearchQuestion = async () => {
        if (!questionId.trim()) return;

        setSearchLoading(true);
        setError(null);
        try {
            const response = await fetch(`http://localhost:3000/api/leetcode/problem/:${questionId}`, {
                credentials: 'include',
                headers: {
                    'Accept': 'application/json'
                }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to fetch problem details');
            }

            setSelectedProblem(data);
        } catch (err) {
            console.error('Search error:', err);
            setError(err.message);
        } finally {
            setSearchLoading(false);
        }
    };

    const handleProblemClick = async (problemId) => {
        if (expandedProblemId === problemId) {
            setExpandedProblemId(null);
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/api/leetcode/problem/:${problemId}`, {
                credentials: 'include',
                headers: {
                    'Accept': 'application/json'
                }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to fetch problem details');
            }

            setSelectedProblem(data);
            setExpandedProblemId(problemId);
        } catch (err) {
            console.error('Error fetching problem details:', err);
            setError(err.message);
        }
    };

    if (loading) return <div className="p-4">Loading LeetCode problems...</div>;
    if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

    return (
        <div className="problem-container">
            <div className="problem-section">
                <h2 className="section-title">Search Problem</h2>
                <div className="search-container">
                    <input
                        type="text"
                        value={questionId}
                        onChange={(e) => setQuestionId(e.target.value)}
                        placeholder="Enter question ID"
                        className="search-input"
                    />
                    <button
                        onClick={handleSearchQuestion}
                        disabled={searchLoading}
                        className="search-button"
                    >
                        {searchLoading ? 'Searching...' : 'Search'}
                    </button>
                </div>

                {selectedProblem && (
                    <div className="expanded-content">
                        <h3 className="section-title">{selectedProblem.title}</h3>
                        <div>
                            <p>
                                <span className="font-medium">Difficulty: </span>
                                <span className={`difficulty-badge difficulty-${selectedProblem.difficulty.toLowerCase()}`}>
                                    {selectedProblem.difficulty}
                                </span>
                            </p>
                            <p><span className="font-medium">Success Rate: </span>{selectedProblem.acRate?.toFixed(1)}%</p>
                            
                            <div>
                                <span className="font-medium">Topics: </span>
                                <div className="flex flex-wrap gap-2 mt-1">
                                    {selectedProblem.topicTags.map((tag) => (
                                        <span key={tag.name} className="topic-tag">
                                            {tag.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="problem-section">
                <h2 className="section-title">All Problems</h2>
                {problemlist.length > 0 ? (
                    <div className="space-y-2">
                        {problemlist.map(problem => (
                            <div key={problem.questionFrontendId}>
                                <div 
                                    onClick={() => handleProblemClick(problem.questionFrontendId)}
                                    className="problem-card"
                                >
                                    <div className="problem-header">
                                        <div>
                                            <span className="font-medium">{problem.questionFrontendId}. </span>
                                            {problem.title}
                                        </div>
                                        <span className={`difficulty-badge difficulty-${problem.difficulty.toLowerCase()}`}>
                                            {problem.difficulty}
                                        </span>
                                    </div>
                                </div>
                                
                                {expandedProblemId === problem.questionFrontendId && selectedProblem && (
                                    <div className="expanded-content">
                                        <div className="space-y-4">
                                            <div className='flex justify-between'>
                                                <div>
                                                    <h3 className="section-title">{selectedProblem.title}</h3>
                                                    <div className="problem-content">
                                                        {convertHtmlToPlainText(selectedProblem.content)}
                                                    </div>
                                                </div>
                                                <button className="open-problem-btn">
                                                    Open Problem
                                                </button>
                                            </div>
                                            <div className="">
                                                <div>
                                                    <p className="text-sm text-gray-400">Success Rate</p>
                                                    <p className="font-medium">{selectedProblem.acRate?.toFixed(1)}%</p>
                                                </div>
                                                <div>
                                   
                                                </div>
                                            </div>
                                            
                                            <div>
                                                <p className="text-sm text-gray-400 mb-2">Topics</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {selectedProblem.topicTags.map((tag) => (
                                                        <span 
                                                            key={tag.name}
                                                            className="topic-tag"
                                                        >
                                                            {tag.name}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No problems available</p>
                )}
            </div>
        </div>
    );
};

export default LeetCodeProblems;