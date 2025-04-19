import { Link } from 'react-router-dom';

export function MainNav() {
    return (
        <nav className='center mainNav'>
            <ul>
                <li> <Link to="/solver" className='text-title2'>Solvers</Link> </li>
                <li> <Link to="/courses" className='text-title2'>Courses</Link> </li>
                <li> <Link to="/exercises" className='text-title2'>Exercises</Link> </li>
            </ul>
            <style>{`
                .mainNav ul {
                    display: flex;
                    margin: 0;
                    padding: 0 clamp(0px, 1vw, 20px);
                    list-style: none;
                    gap: 5px;
                }


                @media (max-width:880px) {
                    .mainNav ul {
                        margin: 0 7px;
                        padding: 0;
                        gap: 2px;
                    }
                    .mainNav ul li a {
                        padding: 5px 5px;
                        font-size: 9px;
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
