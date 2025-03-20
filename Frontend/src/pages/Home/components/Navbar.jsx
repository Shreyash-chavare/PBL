import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className='sticky top-0 z-50 w-full bg-white shadow-sm'>
            <div className='flex justify-between items-center px-6 py-4'>
                <div className="title text-4xl font-bold text-blue-600">
                    CodeSquad
                </div>
                <div className="flex gap-6">
                    <div className="relative group">
                        <button className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-blue-50 transition-all duration-200 font-semibold text-gray-700 min-w-[120px]">
                            Languages
                            <svg 
                                className="transform transition-transform duration-200 group-hover:rotate-180" 
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 24 24" 
                                width={20} 
                                height={20}
                                fill="none"
                            >
                                <path 
                                    d="M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9" 
                                    stroke="currentColor" 
                                    strokeWidth="1.5" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                />
                            </svg>
                        </button>
                        <div className="absolute right-0 top-full mt-1 w-52 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top scale-95 group-hover:scale-100">
                            <ul className="py-1 divide-y divide-gray-100">
                                <li className="group/item hover:bg-blue-50 transition-colors">
                                    <a href="#" className="px-3 py-2 flex items-center gap-2 w-full">
                                        <span className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 font-mono text-sm">C++</span>
                                        <span className="font-medium text-gray-700">C++ 11</span>
                                    </a>
                                </li>
                                <li className="group/item hover:bg-blue-50 transition-colors">
                                    <a href="#" className="px-3 py-2 flex items-center gap-2 w-full">
                                        <span className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-red-600 font-mono text-sm">Ja</span>
                                        <span className="font-medium text-gray-700">Java</span>
                                    </a>
                                </li>
                                <li className="group/item hover:bg-blue-50 transition-colors">
                                    <a href="#" className="px-3 py-2 flex items-center gap-2 w-full">
                                        <span className="w-8 h-8 rounded-lg bg-yellow-100 flex items-center justify-center text-yellow-600 font-mono text-sm">C</span>
                                        <span className="font-medium text-gray-700">C</span>
                                    </a>
                                </li>
                                <li className="group/item hover:bg-blue-50 transition-colors">
                                    <a href="#" className="px-3 py-2 flex items-center gap-2 w-full">
                                        <span className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-red-600 font-mono text-sm">Py</span>
                                        <span className="font-medium text-gray-700">Python</span>
                                    </a>
                                </li>

                            </ul>
                        </div>
                    </div>

                    <div className="relative group">
                        <button className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-blue-50 transition-all duration-200 font-semibold text-gray-700 min-w-[120px]">
                            IDE
                            <svg 
                                className="transform transition-transform duration-200 group-hover:rotate-180" 
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 24 24" 
                                width={20} 
                                height={20}
                                fill="none"
                            >
                                <path 
                                    d="M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9" 
                                    stroke="currentColor" 
                                    strokeWidth="1.5" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                />
                            </svg>
                        </button>
                        <div className="absolute right-0 top-full mt-1 w-52 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top scale-95 group-hover:scale-100">
                            <ul className="py-1 divide-y divide-gray-100">
                                <li className="group/item hover:bg-blue-50 transition-colors">
                                    <Link to="/practice" className="px-3 py-2 flex items-center gap-2 w-full">
                                        <span className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                                            </svg>
                                        </span>
                                        <span className="font-medium text-gray-700">Online</span>
                                    </Link>
                                </li>
                                <li className="group/item hover:bg-blue-50 transition-colors">
                                    <Link to="/api/login" className="px-3 py-2 flex items-center gap-2 w-full">
                                        <span className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                                            </svg>
                                        </span>
                                        <span className="font-medium text-gray-700">Collaborative</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
