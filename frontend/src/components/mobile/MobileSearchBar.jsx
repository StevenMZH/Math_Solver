import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ClassSearchLink from '../header/ClassSearchLink';
import CourseSearchLink from '../header/CourseSearchLink';
import { useAccountContext } from '../../context/accountContext';

const SearchBar = ({setSearching}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState(null);
    const searchBarRef = useRef(null);
    const {language} = useAccountContext();

    useEffect(() => {
        if (searchTerm.length > 0) {
            const delayDebounceFn = setTimeout(async () => {
                try {
                    const response = await axios.get(`http://127.0.0.1:8000/courses/search/`, {
                        params: { q: searchTerm },
                    });
                    setResults(response.data);
                    console.log(response.data)
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
        <div className="flexCenter mobileSearchBar-container" ref={searchBarRef}>
            <button className="return"  onClick={() => setSearching(false)} >
                <img className='icon-button' src='/public/images/global/back.png' alt="search" />
            </button>

            <div className="flexCenter searchContainer">
                <input
                    type="text"
                    className="mobileSearchBar text-focus courseSearchBar"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search Courses, Classes, Exercises..."
                />
                <div className="button-container">
                    <button type="submit" className="searchButton">
                        <img className='icon-button' src='/public/images/global/search.png' alt="search" />
                    </button>
                </div>
            </div>

            <div className='searchResults show'>
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
                                    setSearching={setSearching}
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
                                    setSearching={setSearching}
                                />
                            ))}
                        </>
                    )}
                </>)}
            </div>
            <style>{`

                .mobileSearchBar-container {
                    min-width: 100vw;
                    padding: 0 3vw;
                    height: 60px;
                    gap: 5px;
                    paddding-top: 3px;
                    background-color: var(--background); 
                }
                .mobileSearchBar-container .return {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 35px;
                    height: 35px;
                    background-color: #0000;
                }
                .mobileSearchBar-container .return:hover {
                    background-color: var(--button_hover);
                }

                .mobileSearchBar-container .searchContainer {
                    position: relative;
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .mobileSearchBar-container .mobileSearchBar {
                    width: 100%;
                    padding: 8px 15px;
                    border-radius: 20px;
                    border: none;

                    font-size: 12px;
                    box-sizing: border-box;
                    box-shadow: 0 0 10px var(--panel_border);
                    outline-color: var(--panel1);
                    background-color: var(--bar);
                }                
                .mobileSearchBar-container .mobileSearchBar:focus {
                    background-color: var(--button);
                }

                .mobileSearchBar-container .button-container{                    
                    display: flex;
                    justify-content: end;
                    align-items: center;

                    width: 100%;
                    height: 100%;
                }
                .mobileSearchBar-container .searchButton {
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
                .mobileSearchBar-container .searchButton:hover {
                    background-color: #00000022;
                }
                .mobileSearchBar-container .icon-button {
                    width: 14px;
                    height: 14px;
                    filter: invert(80%) sepia(0%) saturate(100%) hue-rotate(160deg);
                }
                .light .mobileSearchBar-container .icon-button {
                    filter: invert(10%) sepia(100%) saturate(200%) hue-rotate(160deg);
                }

                .mobileSearchBar-container .searchTitle {
                    display: block;
                    padding: 5px 0;
                    padding-top: 10px;
                    padding-left: 20px;
                }

                .mobileSearchBar-container .searchResults {
                    position: absolute;
                    padding: 10px 0px;
                    top: calc(100%); /* Desplaza el contenedor hacia abajo del input */
                    left: 0;
                    min-width: 100vw;
                    min-height: 100vh;
                    width: clamp(275px, 90vw, 100vw);
                    overflow-y: auto; /* Activa el scroll si el contenido excede el alto */
                    border-radius: 5px;
                    z-index: 1000; /* Asegura que el contenedor esté por encima de otros elementos */
                    background-color: var(--background);

                    border: 2px solid #ddd;
                    border: none;
                    border-radius: 10px;
                    box-shadow: none;
                
                    transition: max-height 0.2s ease-in-out, opacity 0.3s ease-in-out;
                }
                .mobileSearchBar-container .searchResults:hover {
                    display: block;
                }


                .mobileSearchBar-container .searchResults > div {
                    cursor: pointer;
                    transition: background-color 0.2s;
                }

                .mobileSearchBar-container .searchResults::-webkit-scrollbar {
                    display: none;
                }

            `}</style>
        </div>
    );
};

export default SearchBar;
