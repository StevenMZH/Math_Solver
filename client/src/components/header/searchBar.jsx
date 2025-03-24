import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import SearchPreview_class from './searchPreview_class';
import SearchPreview_course from './searchPreview_course';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState(null);
    const searchBarRef = useRef(null);

    useEffect(() => {
        if (searchTerm.length > 0) {
            const delayDebounceFn = setTimeout(async () => {
                try {
                    const response = await axios.get(`http://127.0.0.1:8000/dataBase/search/`, {
                        params: { q: searchTerm },
                    });
                    setResults(response.data);
                } catch (error) {
                    console.error('Error during search:', error);
                }
            }, 300); // Retrasa la ejecución 300ms

            return () => clearTimeout(delayDebounceFn); // Limpia el timeout si el usuario sigue escribiendo
        } else {
            setResults(null);
        }
    }, [searchTerm]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (searchBarRef.current && !searchBarRef.current.contains(e.target)) {
                setResults(null);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    return (
        <div className="searchBar-container" ref={searchBarRef}>
            <div className="flexCenter searchContainer">
                <input
                    type="text"
                    className="searchBar courseSearchBar"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search Courses, Classes, Exercises..."
                />
                <div className="button-container">
                    <button type="submit" className="searchButton">
                        <img className='searchIcon' src='/images/search_Icon.png' alt="search" />
                    </button>
                </div>
            </div>

            {results && (results.courses?.length > 0 || results.classes?.length > 0) && (
                <div className="searchResults">
                    {results.courses?.length > 0 && (
                        <>
                            <label className="searchTitle">Cursos</label>
                            {results.courses.map((course) => (
                                <SearchPreview_course
                                    key={course.id}
                                    id={course.id}
                                    name={course.name}
                                    field={course.field}
                                />
                            ))}
                        </>
                    )}

                    {results.course_classes?.length > 0 && (
                        <>
                            <label className="searchTitle">Clases</label>
                            {results.course_classes.map((courseClass) => (
                                <SearchPreview_class
                                    key={courseClass.id}
                                    id={courseClass.id}
                                    name={courseClass.name}
                                    field={courseClass.class_type}
                                />
                            ))}
                        </>
                    )}
                </div>
            )}
            <style>{`
                .searchContainer {
                    position: relative;
                    width: 100%;

                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .searchBar {
                    width: clamp(280px, 40vw, 60vw);
                    padding: 8px 15px;
                    border-radius: 20px;
                    border: none;

                    font-size: 12px;
                    box-sizing: border-box;
                    box-shadow: 0 0 10px var(--panel_border);
                    outline-color: var(--panel1);
                }

                .button-container{                    
                    display: flex;
                    justify-content: end;
                    align-items: center;

                    width: 100%;
                    height: 100%;
                }
                .searchButton {
                    position: absolute;
                    top: 0;

                    padding: 6px;
                    padding-bottom: 3px;
                    border: none;
                    border-radius: 50%;
                    margin-right: 3px;
                    margin-top: 2px;
                    
                    align-items: center;
                    background-color: #00000000;  

                }
                .searchButton:hover {
                    background-color: #00000022;
                }
                .searchIcon {
                    width: 14px;
                    height: 14px;
                }

                .searchTitle {
                    display: block;
                    padding: 5px 0;
                    padding-left: 20px;
                }

                .searchResults {
                    position: absolute;
                    padding: 20px 0;
                    top: calc(75%); /* Desplaza el contenedor hacia abajo del input */
                    width: 100%;
                    width: clamp(280px, 40vw, 60vw);
                    max-height: 300px;
                    overflow-y: auto; /* Activa el scroll si el contenido excede el alto */
                    border-radius: 5px;
                    z-index: 1000; /* Asegura que el contenedor esté por encima de otros elementos */
                    background-color: var(--panel1);

                    border: 2px solid #ddd;
                    border-right: 0;
                    border-radius: 10px 0 0 10px;
                    box-shadow: 0 0 20px var(--panel_border);
                }
                .searchResults:hover {
                    display: block;
                }
                .searchResults > div {
                    padding: 5px;
                    cursor: pointer;
                    transition: background-color 0.2s;
                }
                .searchResults > div:hover {
                    background-color: #f0f0f010;
                }
                .searchResults > div:hover .searchTitle {
                    font-weight: bold;
                }

                @media (max-width: 640px) {
                    .searchBar-container {
                        margin: 0 5px;
                    }
                    .searchBar {
                        width: clamp(260px, 60vw, 60vw);
                        height: 30px;
                        font-size: 11px;
                    }
                    .searchResults {
                        width: clamp(260px, 60vw, 60vw);
                    }
                }

                @media (max-width: 420px) {
                    .searchBar {
                        width: clamp(200px, 60vw, 60vw);
                        height: 30px;
                        font-size: 8.5px;
                    }
                    .searchResults {
                        width: clamp(200px, 60vw, 60vw);
                    }
                }


            `}</style>
        </div>
    );
};

export default SearchBar;
