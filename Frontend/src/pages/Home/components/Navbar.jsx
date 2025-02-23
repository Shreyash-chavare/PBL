import React from 'react'
import './Navbar.css'

const Navbar = () => {
    return (
        <div className='nav flex justify-between p-2 align-middle'>
            <div className="title text-4xl">
                CodeSquad
            </div>
            <div className="navright flex gap-5 mr-16 text-center align-middle">
                <div className="language flex flex-col">
                    <button className="langs flex align-middle">Languages
                        <svg className='mt-auto' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color={"#4c4b4b"} fill={"none"}>
                            <path d="M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg></button>
                    <div className="langdropdown pt-3">
                        <ul>

                            <li>C++ 11</li>
                            <li>Java</li>
                            <li>JavaScript</li>
                            <li>Ruby</li>
                            <li>Go</li>
                        </ul>
                    </div>
                </div>
                <div className="ide flex flex-col">
                    <button className="ides flex align-middle">IDE
                        <svg className='mt-auto' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color={"#4c4b4b"} fill={"none"}>
                            <path d="M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg></button>
                    <div className="idedropdown pt-3">
                        <ul>

                            <li>Online</li>
                            <li>Collaborative</li>
                            
                        </ul>
                    </div>
                </div>
                
                
            </div>
        </div>
    )
}

export default Navbar
