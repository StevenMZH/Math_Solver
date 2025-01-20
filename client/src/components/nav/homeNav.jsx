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
                <div className='logInButtons-container'>
                    <Link to={`/login`}>Log In</Link>
                    <Link to={`/sign_up`}>Sign Up</Link>
                </div>
                <PaletteSelector />
                <UserPanel />
            </div>

            <style>{`
                header {
                    background-color: var(--header);
                    width: 100%;
                    padding: 15px 20px;
                    color: var(--text);
                    justify-content: space-between;
                    align-items: center;
                    top: 0;
                    font-family: Comfortaa;
                }
                .nav-container {
                    display: flex;
                    width: 100%;
                    justify-content: start;
                }
                .nav-container nav {
                    margin-top: 5px;
                    margin-left: auto;
                }

                .leftNav {
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
                    padding: 0;
                    margin: 0;
                    display: flex;
                    gap: 8px;
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


                .main-menu li {
                    display: block;
                }

                .main-menu li a {
                    text-decoration: none;
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
