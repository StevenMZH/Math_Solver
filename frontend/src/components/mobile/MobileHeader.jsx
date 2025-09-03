import { useState } from "react";
import { useLocation } from 'react-router-dom';

import Logo5 from "../assets/logos/Logo5";

import MobileSearchBar from './MobileSearchBar';
import { useAuthFormContext } from '../../context/AuthFormContext';


export function MobileHeader() {
    const token = localStorage.getItem("accessToken");
    const [searching, setSearching] = useState(false);
    const {setIsAuthFormVisible} = useAuthFormContext();

    const pageTitles = {
        "/home": "Home",
        "/solver": "Solver",
        "/courses": "Courses Hub",
        "/problems": "Problem Hub",
        "/profile": "Profile",
    };

    const location = useLocation();
    const pathname = location.pathname;

    const getPageTitle = () => {
        // Si hay coincidencia directa
        if (pageTitles[pathname]) return pageTitles[pathname];

        // Coincidencias por patrón (para rutas con parámetros dinámicos)
        if (/^\/courses\/[^/]+\/[^/]+$/.test(pathname)) return "Class";
        if (/^\/courses\/[^/]+$/.test(pathname)) return "Course";
        if (/^\/classes\/[^/]+$/.test(pathname)) return "Class";

        return ""; // Valor por defecto
    };

    
    const currentTitle = getPageTitle();
    

    return (
        <div className="MobileHeader">
            <div className="row fullwidth">
                {!searching && (
                <>
                    <div className='flexCenter nav-left'>
                        <Logo5 />
                        <div className='text-title2 font-S'> {currentTitle} </div>
                    </div>            

                    <div className='flexCenter nav-right'>
                        <button className="flexCenter searchButton"  onClick={() => setSearching(true)}>
                            <img className='icon-button' src='/public/images/global/search.png' alt="search" />
                        </button>

                        {!token && (
                            <button onClick={() => setIsAuthFormVisible(true)} className='button-square2 text-title2'>Access</button> 
                        )}
                    </div>
                </>)}
                

                {searching && (<div className='flexCenter nav-center'> <MobileSearchBar setSearching={setSearching}/></div>)}

                {!searching && 
                    <button className="button-square2 more-button">
                        <img className='img-themes more-icon' src="/images/global/more.png" alt="more" />            
                    </button>   
                }

            </div>
        

            <style>{`
                header {
                    position: fixed;
                    top: 0;
                    z-index: 500; 

                    align-items: start;

                    width: 100%;
                    height: 60px;
                    padding: 10px 20px;
                    padding-bottom: 10px;

                    background-color: #0000;
                    font-family: "Work Sans", sans-serif;
                    backdrop-filter: blur(10px);
                }
                .MobileHeader {
                    display: none;
                    width: 100%;
                    justify-content: start;
                    gap: 5px;
                }
                    
                .MobileHeader .nav-left {
                    width: 100%;
                    justify-content: start;
                    gap: 10px;
                }

                .MobileHeader .nav-center {
                    width: 100%;
                }

                .MobileHeader .nav-right {
                    width: 100%;
                    justify-content: end;
                }

                .MobileHeader .nav-right .searchButton {
                    position: relative;
                    width: 30px;
                    height: 30px;
                    padding-bottom: 8px;
                    background-color: #00000000;  

                }
                .MobileHeader .searchButton:hover {
                    background-color: var(--panel2);
                }

                .MobileHeader .icon-button {
                    width: 15px;
                    height: 15px;
                    filter: invert(80%) sepia(0%) saturate(100%) hue-rotate(160deg);
                }
                .MobileHeader .more-button {
                    padding: 5px 5px;
                    margin-top: 2px;
                    width: 35px;
                    background-color: #0000;
                }
                .MobileHeader .more-button:hover {
                    background-color: #fff2;
                }
                .MobileHeader .more-icon {
                }
                .light .MobileHeader .icon-button {
                    filter: invert(10%) sepia(100%) saturate(200%) hue-rotate(160deg);
                }


                @media (max-width: 640px) {
                    .MobileHeader {
                        display: flex;
                    }
                }

            `}</style>
        </div>
    );
};
export default MobileHeader