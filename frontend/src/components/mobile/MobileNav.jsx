import { Link } from 'react-router-dom';
import { useState } from "react";

import AccessPanel from '../access/AccessPanel';
import { AccessProvider } from '../access/AccessContext';

export function MobileNav() {
    const [isLoginVisible, setIsLoginVisible] = useState(false);
    const token = localStorage.getItem("accessToken");

    return (
        <div className="MobileNav">
            
            <Link to="/solver" className='nav-a'> <img className='nav-img icon1' src='/public/images/nav/solver.png' alt="Solver" /> <label className='text-subtitle'>Solver</label> </Link>
            <Link to="/courses" className='nav-a'> <img className='nav-img icon2' src='/public/images/nav/courses.png' alt="Courses" /> <label className='text-subtitle'>Courses</label> </Link>
            <Link to="/exercises" className='nav-a'> <img className='nav-img icon3' src='/public/images/nav/exercises.png' alt="Exercises" /> <label className='text-subtitle'>Exercises</label> </Link>

            {!token ? (
                <button className='nav-a' onClick={() => setIsLoginVisible(true)}> 
                    <img className='nav-img icon4' src='/public/images/nav/profile.png' alt="Profile" /> 
                    <label className='text-subtitle'>Profile</label>
                </button>
            ) : (  
                <Link to="/profile" className='nav-a'> 
                    <img className='nav-img icon4' src='/public/images/nav/profile.png' alt="Profile" /> 
                    <label className='text-subtitle'>Profile</label> 
                </Link> 
            )}    

            <AccessProvider>
                <AccessPanel isVisible={isLoginVisible} setIsVisible={setIsLoginVisible}/>
            </AccessProvider>

            <style>{`
                .MobileNav {
                    position: fixed;
                    bottom: 0;
                    z-index:400; 

                    display: none;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                    gap: 0px;
                    padding: 3px 10px;

                    width: 100%;
                    height: auto;
                    border-radius: 20px 20px 0 0;

                    background-color: var(--panel2);
                    font-family: "Work Sans", sans-serif;
                    
                    grid-template-columns: repeat(4, 1fr);

                    box-shadow: 0 0 10px var(--panel_border);
                }
                
                .MobileNav .nav-a{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: end;
                    gap: 3px;

                    width: 100%;
                    height: 100%;
                    background-color: #0000;
                }
                .MobileNav .nav-a:hover {
                    filter: invert(50%) sepia(100%) saturate(200%) hue-rotate(160deg);
                }
                .light .MobileNav .nav-a:hover {
                    filter: invert(50%) sepia(80%) saturate(300%) hue-rotate(160deg);
                }
                .MobileNav a label, .MobileNav button label {
                    font-size: 9px;
                }

                .MobileNav .nav-img {
                    width: 26px;
                    filter: invert(60%) sepia(100%) saturate(0%) hue-rotate(160deg);
                    transition: background-color 5s ease-in;
                }
                .light .MobileNav .nav-img {
                    filter: invert(50%) sepia(100%) saturate(0%) hue-rotate(160deg);
                }


                
                .MobileNav .icon1 {
                    width: 21px;
                    margin-bottom: 1px;
                }
                .MobileNav .icon3 {
                    width: 24px;
                    margin-left: 5px;
                }
                .MobileNav .icon4 {
                    width: 26px;
                }                

                @media (max-width:640px) {
                    .MobileNav {
                        display: grid;
                    }
                }

            `}</style>
        </div>
    );
};
export default MobileNav;
