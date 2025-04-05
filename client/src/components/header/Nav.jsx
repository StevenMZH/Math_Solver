import { Link } from 'react-router-dom';

export function MainNav() {
    return (
        <nav className='mainNav'>
            <ul>
                <li> <Link to="/solver" className='text-title2'>Solvers</Link> </li>
                <li> <Link to="/courses" className='text-title2'>Courses</Link> </li>
                <li> <Link to="/exercises" className='text-title2'>Exercises</Link> </li>
            </ul>
            <style>{`
                .mainNav {
                    display: flex;
                    align-items: center;
                }
                .mainNav ul {
                    display: flex;
                    margin: 0;
                    padding: 0 clamp(0px, 1vw, 20px);
                    list-style: none;
                    gap: 5px;
                }
                .mainNav ul li a {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: #0000;
                    padding: 5px 10px;
                    border: 2px solid #0000;
                    border-radius: 25px;
                    font-size: 10px;
                    background-color: var(--background);
                    backdrop-filter: blur(10px);
                }
                .mainNav ul li a:hover {
                    background-color: var(--button_hover);
                    border: 2px solid #0000;
                    transition: background-color 0.3s, color 1s;
                }

                @media (max-width:880px) {
                    .mainNav ul {
                        padding: 0;
                    }
                    .mainNav ul li a {
                        padding: 5px 8px;
                    }
                }

                @media (max-width: 640px) {
                    .mainNav {
                        display: none;
                    }
                }

            `}</style>
        </nav>
    );
};
export default MainNav;
