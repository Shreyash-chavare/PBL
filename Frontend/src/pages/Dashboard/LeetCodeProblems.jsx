import React, { useState, useEffect } from 'react';

const LeetCodeProblems = () => {
    const [problemlist, setProblemlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [questionId, setQuestionId] = useState('');
    const [selectedProblem, setSelectedProblem] = useState(null);
    const [searchLoading, setSearchLoading] = useState(false);

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

    if (loading) return <div className="p-4">Loading LeetCode problems...</div>;
    if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

    return (
        <div className="p-4 space-y-6">
            <div className="bg-white rounded-lg shadow p-4">
                <h2 className="text-xl font-bold mb-4">Search Problem</h2>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={questionId}
                        onChange={(e) => setQuestionId(e.target.value)}
                        placeholder="Enter question ID"
                        className="flex-1 p-2 border rounded"
                    />
                    <button
                        onClick={handleSearchQuestion}
                        disabled={searchLoading}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
                    >
                        {searchLoading ? 'Searching...' : 'Search'}
                    </button>
                </div>

                {selectedProblem && 
                    <div className="mt-4 p-4 border rounded">
                        <h3 className="text-lg font-semibold">{selectedProblem.title}</h3>
                        <div className="mt-2 space-y-2">
                            <p><span className="font-medium">Difficulty:</span> 
                                <span className={`ml-2 px-2 py-1 rounded text-sm ${
                                    selectedProblem.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                                    selectedProblem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-red-100 text-red-800'
                                }`}>
                                    {selectedProblem.difficulty}
                                </span>
                            </p>
                            <p><span className="font-medium">Success Rate:</span> {selectedProblem.acRate?.toFixed(1)}%</p>
                            {selectedProblem.topicTags && 
                                <div>
                                    <span className="font-medium">Topics:</span>
                                    <div className="flex flex-wrap gap-2 mt-1">
                                        {selectedProblem.topicTags.map((tag) => (
                                            <span 
                                                key={tag} 
                                                className="bg-gray-100 px-2 py-1 rounded text-sm"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                }
            </div>

            <div className="bg-white rounded-lg shadow p-4">
                <h2 className="text-xl font-bold mb-4">All Problems</h2>
                {problemlist.length > 0 ? (
                    <div className="space-y-2">
                        {problemlist.map(problem => (
                            <div 
                                key={problem.questionFrontendId}
                                className="p-3 border rounded hover:bg-gray-50"
                            >
                                <span className="font-medium">{problem.questionFrontendId}.</span> {problem.title}
                                <span className={`ml-2 px-2 py-1 rounded text-sm ${
                                    problem.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                                    problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-red-100 text-red-800'
                                }`}>
                                    {problem.difficulty}
                                </span>
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