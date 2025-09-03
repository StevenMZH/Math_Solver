import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ClassSearchLink from '../header/ClassSearchLink';
import CourseSearchLink from '../header/CourseSearchLink';
import { useAccountContext } from '../../context/accountContext';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState(null);
    const searchBarRef = useRef(null);
    const {language} = useAccountContext()

    useEffect(() => {
        if (searchTerm.length > 0) {
            const delayDebounceFn = setTimeout(async () => {
                try {
                    const response = await axios.get(`http://127.0.0.1:8000/courses/search/`, {
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
        <div className="SearchBar-container" ref={searchBarRef}>
            <div className="flexCenter searchContainer">
                <input
                    type="text"
                    className="SearchBar text-focus courseSearchBar"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search Courses, Classes, Exercises..."
                />
                <div className="button-container">
                    <button type="submit" className="searchButton">
                        <img className='searchIcon' src='/images/global/search.png' alt="search" />
                    </button>
                </div>
            </div>

            <div className={`searchResults scrollBar2-y ${(results && (results.courses?.length > 0 || results.classes?.length > 0)) ? 'show' : ''}`}>
                {results && (results.courses?.length > 0 || results.classes?.length > 0) && (
                <>
                    {results.courses?.length > 0 && (
                        <>
                            <label className="text-subtitle searchTitle">Cursos</label>
                            {results.courses.map((course) => (
                                <CourseSearchLink
                                    key={course.id}
                                    id={course.id}
                                    name={course.name[language]}
                                    type={course.field}
                                    setSearchTerm={setSearchTerm}
                                />
                            ))}
                        </>
                    )}

                    {results.course_classes?.length > 0 && (
                        <>
                            <label className="text-subtitle searchTitle">Clases</label>
                            {results.course_classes.map((courseClass) => (
                                <ClassSearchLink
                                    key={courseClass.id}
                                    id={courseClass.id}
                                    name={courseClass.name[language]}
                                    type={courseClass.type}
                                    setSearchTerm={setSearchTerm}
                                />
                            ))}
                        </>
                    )}
                </>)}
            </div>
            <style>{`
                .searchContainer {
                    position: relative;
                    width: 100%;

                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .SearchBar {
                    width: clamp(275px, 40vw, 60vw);
                    padding: 8px 15px;
                    border-radius: 20px;
                    border: none;

                    font-size: 12px;
                    box-sizing: border-box;
                    box-shadow: 0 0 10px var(--panel_border);
                    outline-color: var(--panel1);
                    background-color: var(--bar);
                }
                .SearchBar:focus {
                    background-color: var(--button);
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
                .SearchBar-container .searchIcon {
                    width: 14px;
                    height: 14px;
                    filter: invert(80%) sepia(0%) saturate(100%) hue-rotate(160deg);
                }
                .light .SearchBar-container  .searchIcon {
                    filter: invert(10%) sepia(100%) saturate(200%) hue-rotate(160deg);
                }
                .searchTitle {
                    display: block;
                    padding: 5px 0;
                    padding-top: 10px;
                    padding-left: 20px;
                }

                .searchResults {
                    position: absolute;
                    padding: 10px 0;
                    top: calc(75%); /* Desplaza el contenedor hacia abajo del input */
                    width: 100%;
                    width: clamp(275px, 40vw, 60vw);
                    max-height: 0px;
                    overflow-y: auto; /* Activa el scroll si el contenido excede el alto */
                    border-radius: 5px;
                    z-index: 1000; /* Asegura que el contenedor esté por encima de otros elementos */
                    background-color: var(--panel2);

                    border: 2px solid #ddd;
                    border: none;
                    border-right: 0;
                    border-radius: 10px;
                    box-shadow: 0 0 20px var(--panel_border);
                
                    opacity: 0;
                    transition: max-height 0.2s ease-in-out, opacity 0.3s ease-in-out;
                }
                .searchResults:hover {
                    display: block;
                }
                .searchResults.show {
                    max-height: 300px;
                    opacity: 1;
                }

                .searchResults > div {
                    cursor: pointer;
                    transition: background-color 0.2s;
                }

                .searchResults::-webkit-scrollbar {
                    width: 8px;
                }

                @media (max-width: 640px) {
                    .SearchBar {
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
