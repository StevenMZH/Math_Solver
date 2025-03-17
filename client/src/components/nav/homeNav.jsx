import { Link } from 'react-router-dom';
import Logo0 from "./logos/logo0";
import Logo1 from "./logos/logo1";
import Logo2 from "./logos/logo2";
import Logo3 from "./logos/logo3";
import Logo4 from "./logos/logo4";
import SearchBar from './searchBar';
import PaletteSelector from './paletteSelector';
import UserPanel from './userPanel';

export function HomeNav() {
    const token = localStorage.getItem("accessToken");

    return (
        <div className="flexCenter nav-container">
            <div className='leftNav'>
                <Logo4 />
                <nav>
                    <ul className="main-menu">
                        <li>
                            <Link to="/solver">Solvers</Link>
                        </li>
                        <li>
                            <Link to="/courses">Courses</Link>
                        </li>
                        <li>
                            <Link to="/exercises">Exercises</Link>
                        </li>
                    </ul>
                </nav>
            </div>

            <div className='flexCenter centerNav'>
                <SearchBar />
            </div>

            <div className='flexCenter rightNav'>
                {!token && (

                    <div className='logInButtons-container'>
                        <Link to={`/login`}>Log In</Link>
                        <Link to={`/sign_up`}>Sign Up</Link>
                    </div>
                )}
                <PaletteSelector />
                <UserPanel />
            </div>

            <style>{`
                header {
                    position: fixed;
                    display: flex;
                    flex-direction: column;
                    background-color: #0000;
                    width: 100%;
                    height: 72px;
                    padding: 20px;
                    padding-bottom: 15px;
                    color: var(--text);
                    justify-content: center;
                    align-items: center;
                    top: 0;
                    font-family: Comfortaa;
                    backdrop-filter: blur(10px);
                }
                nav {
                    align-content: center;
                    margin-bottom: 3px;
                }
                a {
                    text-decoration: none;
                    background-color: var(--button);
                    color: var(--text);
                    padding: 3px 5px;
                    border: 2px solid var(--button);
                    border-radius: 25px;
                    transition: background-color 0.3s, color 0.3s;
                    font-size: 0.65em;
                }
                a:hover {
                    background-color: var(--button_hover);
                    border: 2px solid var(--button_hover);
                    color: var(--text);
                }

                .nav-container {
                    display: flex;
                    width: 100%;
                    justify-content: start;
                    font-weight: 800;
                }
                    
                .leftNav {
                    display: flex;
                    width: 100%;
                    justify-content: start;
                }
                .centerNav {
                    width: 100%;
                    justify-content: center;
                }
                .rightNav {
                    width: 100%;
                    justify-content: end;
                }

                .logInButtons-container {
                    margin-right: 5px;
                }
                .logInButtons-container a {
                    padding: 10px;
                }


                .main-menu {
                    list-style: none;
                    padding: 0 30px;
                    padding-left: 30px;
                    margin: 0;
                    display: flex;
                    gap: 5px;
                }
                .main-menu li {
                    display: block;
                }
                
                .main-menu li a {
                    text-decoration: none;
                    background-color: #0000;
                    color: var(--text);
                    padding: 5px 10px;
                    border: 2px solid #0000;
                    border-radius: 25px;
                    font-size: 0.65em;
                    background-color: var(--background);
                    backdrop-filter: blur(10px);
                }
                .main-menu li a:hover {
                    background-color: var(--button_hover);
                    border: 2px solid #0000;
                    color: var(--text);
                    transition: background-color 0.3s, color 1s;
                }

                @media (max-width: 768px) {
                    header {
                        flex-direction: column;
                        padding: 10px;
                        align-items: flex-start;
                    }
                    
                    .nav-container nav {
                        align-self: flex-start;
                    }
                    .nav-container nav ul li a {
                        font-size: 0.7em;
                        margin: 0;
                        padding: 2px 5px;
                    }
                    .nav-container nav ul {
                        flex-direction: column;
                        gap: 2px;
                    }
                }

                @media (max-width: 600px) {
                    header h1 {
                        font-size: 0.9em;
                    }
                }

            `}</style>
        </div>
    );
};
export default HomeNav;
