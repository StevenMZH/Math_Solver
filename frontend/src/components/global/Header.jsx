import { Link } from 'react-router-dom';

import Logo4 from "../header/logos/Logo4";
import Logo5 from "../header/logos/Logo5";
import PaletteSelector from '../header/PaletteSelector';
import AccessPanel from '../access/AccessPanel';
import Nav from '../header/Nav';
import SearchBar from './SearchBar';
import { useAuthFormContext } from '../../context/AuthFormContext';

export function AppHeader() {
    const {isAuthFormVisible, setIsAuthFormVisible} = useAuthFormContext();
    const token = localStorage.getItem("accessToken");

    return (
        <div className="flexCenter appHeader-container">
            <div className='nav-left'>
                <Logo4 />
                <Logo5 />
                <Nav/>
            </div>

            <div className='flexCenter nav-center'>
                <SearchBar/>
            </div>

            <div className='flexCenter nav-right'>
                {!token && (
                    <button onClick={() => setIsAuthFormVisible(true)} className='button-square2 text-title2'>Access</button>
                )}
                <PaletteSelector />
                {token && (
                    <div className="flexCenter profilePicture-container">
                        <Link to="/profile">
                            <img className='circleImage profilePicture' src='/public/images/nav/defaultUser.png' alt="defaultUserImage" />
                        </Link>
                    </div>

                )}                
            </div>

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
                    font-family: "Work Sans", sans-serif;
                    backdrop-filter: blur(10px);
                }
                .appHeader-container {
                    display: flex;
                    width: 100%;
                    justify-content: start;
                }
                    
                .appHeader-container .nav-left {
                    display: flex;
                    width: 100%;
                    justify-content: start;
                }
                .appHeader-container #logo5 {
                    display: none;
                }

                .appHeader-container .nav-center {
                    width: 100%;
                    justify-content: center;
                }

                .appHeader-container .nav-right {
                    width: 100%;
                    justify-content: end;
                    gap: 7px;
                }

                .appHeader-container .profilePicture-container a, .appHeader-container .profilePicture-container a:hover{
                    background-color: #0000;
                    border: none;
                    padding: 0;
                }
                .appHeader-container .profilePicture{
                    background-color: #00000000;
                    width: 40px;
                    height: 40px;
                    padding: 0;
                }
                .appHeader-container .profilePicture:hover{
                    background-color: #00000000;
                    padding: 0;
                }


                @media (max-width: 880px) {
                    .appHeader-container .nav-left {
                        margin-right: 0px;
                    }
                    .appHeader-container .nav-left #logo4 {
                        display: none;
                    }
                    .appHeader-container .nav-left #logo5 {
                        display: flex;
                    }

                    .appHeader-container .profilePicture {
                        width: 40px;
                        height: 40px;
                    } 
                }

                @media (max-width: 640px) {
                    .appHeader-container {
                        display: none;
                    }

                }

            `}</style>
        </div>
    );
};
export default AppHeader;
