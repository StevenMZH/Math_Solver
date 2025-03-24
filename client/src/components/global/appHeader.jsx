import { Link } from 'react-router-dom';
import { useState } from "react";

import Logo0 from "../header/logos/logo0";
import Logo1 from "../header/logos/logo1";
import Logo2 from "../header/logos/logo2";
import Logo3 from "../header/logos/logo3";
import Logo4 from "../header/logos/logo4";
import Logo5 from "../header/logos/logo5";
import SearchBar from '../header/searchBar';
import PaletteSelector from '../header/paletteSelector';
import LoginPanel from '../header/loginPanel';
import MainNav from '../header/mainNav';

export function AppHeader() {
    const [isLoginVisible, setIsLoginVisible] = useState(false);
    const token = localStorage.getItem("accessToken");

    return (
        <div className="flexCenter appHeader-container">
            <div className='nav-left'>
                <Logo4 />
                <Logo5 />
                <MainNav/>
            </div>

            <div className='flexCenter nav-center'>
                <SearchBar />
            </div>

            <div className='flexCenter nav-right'>
                {!token && (
                    <div className='accessButton-container'>
                        <button onClick={() => setIsLoginVisible(true)}>Access</button>
                    </div>
                )}
                <PaletteSelector />
                {token && (
                    <div className="flexCenter profilePicture-container">
                        <Link to="/profile">
                            <img className='circleImage profilePicture' src='/images/user2.png' alt="defaultUserImage" />
                        </Link>
                    </div>

                )}                
            </div>

            <LoginPanel isVisible={isLoginVisible} setIsVisible={setIsLoginVisible}/>

            <style>{`
                header {
                    position: fixed;
                    top: 0;
                    z-index: 1000; 

                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;

                    width: 100%;
                    height: 72px;
                    padding: 20px;
                    padding-bottom: 15px;

                    background-color: #0000;
                    color: var(--text);
                    font-family: Comfortaa;
                    backdrop-filter: blur(10px);
                }
                .appHeader-container {
                    display: flex;
                    width: 100%;
                    justify-content: start;
                    font-weight: 800;
                }
                    
                .nav-left {
                    display: flex;
                    width: 100%;
                    justify-content: start;
                }
                #logo5 {
                    display: none;
                }

                .nav-center {
                    width: 100%;
                    justify-content: center;
                }

                .nav-right {
                    width: 100%;
                    justify-content: end;
                }
                .accessButton-container {
                    margin: 0 5px;
                }
                .accessButton-container button {
                    padding: 6px;
                }

                .profilePicture-container a, .profilePicture-container a:hover{
                    background-color: #0000;
                    border: none;
                    padding: 0;
                }
                .profilePicture{
                    background-color: #00000000;
                    width: 40px;
                    height: 40px;
                    padding: 0;
                }
                .profilePicture:hover{
                    background-color: #00000000;
                    padding: 0;
                }

                @media (max-width:880px) {
                    header {
                        flex-direction: column;
                        padding: 10px;
                        align-items: flex-start;
                    }

                    .nav-left {
                        flex-direction: column;
                        margin-right: 30px;
                    }

                    .logo-container{
                        margin-top: 15px;
                        margin-bottom: 5px;
                    }
                }

                @media (max-width: 640px) {
                    .nav-left {
                        margin-right: 0px;
                    }
                    .nav-left #logo4 {
                        display: none;
                    }
                    .nav-left #logo5 {
                        display: flex;
                    }
                    .nav-right {
                        flex-direction: row-reverse;
                    }
                    .logo-container{ 
                        margin: 0;
                        margin-bottom: 10px;
                    }
                    .profilePicture {
                        width: 35px;
                        height: 35px;
                    } 
                }

            `}</style>
        </div>
    );
};
export default AppHeader;
