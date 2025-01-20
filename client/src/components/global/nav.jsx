import React, { useState } from 'react';

const Nav = () => {
    // Estado para rastrear el submenú activo
    const [activeMenu, setActiveMenu] = useState(null);

    const handleToggleClick = (menuName) => {
        setActiveMenu((prevMenu) => (prevMenu === menuName ? null : menuName));
    };

    return (
        <div className="nav-container">
            <h1>Eulerian Hades</h1>
            <nav>
                <ul className="main-menu">
                    <li>
                        <a
                            href="#!"
                            className="menu-toggle"
                            onClick={() => handleToggleClick('math')}
                        >
                            Math
                        </a>
                        <ul
                            className="submenu"
                            style={{
                                display: activeMenu === 'math' ? 'block' : 'none',
                            }}
                        >
                            <li><a href="/" data-lang-key="nav.Algebra_Calculus">Algebra / Calculus</a></li>
                            <li><a href="/graphTheory" data-lang-key="nav.Graph Theory">Graph Theory</a></li>
                            <li><a href="/linealAlgebra">Lineal Algebra</a></li>
                        </ul>
                    </li>
                    <li>
                        <a
                            href="#!"
                            className="menu-toggle"
                            onClick={() => handleToggleClick('cs')}
                        >
                            Computer Science
                        </a>
                        <ul
                            className="submenu"
                            style={{
                                display: activeMenu === 'cs' ? 'block' : 'none',
                            }}
                        >
                            <li><a href="/introCS">Introduction</a></li>
                            <li><a href="/sortingAlgorithms">Sorting Algorithms</a></li>
                            <li><a href="/searchingAlgorithms">Searching Algorithms</a></li>
                            <li><a href="/dataStructures">Data Structures</a></li>
                        </ul>
                    </li>
                    <li>
                        <a
                            href="#!"
                            className="menu-toggle"
                            onClick={() => handleToggleClick('electronics')}
                        >
                            Electronics
                        </a>
                        <ul
                            className="submenu"
                            style={{
                                display: activeMenu === 'electronics' ? 'block' : 'none',
                            }}
                        >
                            <li><a href="/introCircuits">Introduction</a></li>
                            <li><a href="/basicCircuits">Basic Circuits</a></li>
                            <li><a href="/digitalCircuits">Digital Circuits</a></li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Nav;
