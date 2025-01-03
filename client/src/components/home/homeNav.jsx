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
        </div>
    );
};
export default HomeNav;
