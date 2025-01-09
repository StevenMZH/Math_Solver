import {Link} from 'react-router-dom';

export function HomeNav() {
    return (
        <div className="nav-container">
            <h1>Eulerian Hades</h1>
            <nav>
                <ul className="main-menu">
                    <li>
                        <Link to="/articles">Articles</Link>
                    </li>
                    <li>
                        <Link to="/courses">Courses</Link>
                    </li>
                    <li>
                        <Link to="/exercises">Exercises</Link>
                    </li>
                </ul>
            </nav>
            <style>{`
                header {
                    background-color: var(--header);
                    width: 100%;
                    padding: 20px;
                    padding-bottom: 15px;
                    color: var(--text);
                    justify-content: space-between;
                    align-items: center;
                    top: 0;
                }
                header h1 {
                    margin: 0;
                    font-size: 1em;
                    font-family: Comfortaa;
                }

                .nav-container nav {
                    margin-top: 5px;
                    margin-left: auto;
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
