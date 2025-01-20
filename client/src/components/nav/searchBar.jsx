import React, { useState } from 'react';
import axios from 'axios';
import CourseClass from '../courses/courseClassLink';
import SearchPreview_class from '../courses/searchPreview_class';
import SearchPreview_course from '../courses/searchPreview_course';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState(null);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/dataBase/search/`, {
                params: { q: searchTerm }, // Parámetros de consulta
            });
            setResults(response.data); // Almacena los resultados en el estado
        } catch (error) {
            console.error('Error during search:', error);
        }
    };
    return (
        <div className="searchBar-container">
            <div className="flexCenter searchContainer">
                <input
                    type="text"
                    className="searchBar courseSearchBar"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search Courses, Classes, Exercises..."
                />
                <div className="button-container">
                    <button type="submit" className="searchButton" onClick={handleSearch}>
                        <img className='searchIcon' src='../../../public/images/search_Icon.png' alt="search" />
                    </button>
                </div>
            </div>

            {results && results.courses.length > 0 && results.course_classes.length > 0 && (
                <div className='searchResults'>

                    {results.courses.length > 0 && (
                        <>
                            <label className='searchTitle'>Cursos</label>
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

                    {results.course_classes.length > 0 && (
                        <>
                            <label className='searchTitle'>Clases</label>
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
                    width: 100%;
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    position: relative;
                    width: fit-content; /* Ajusta el ancho al contenido */
                }

                .searchBar {
                    width: clamp(280px, 40vw, 60vw);
                    font-size: 12px;
                    border-radius: 20px;
                    padding: 8px 15px;
                    box-sizing: border-box;
                }

                .button-container{
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: end;
                    align-items: center;
                }
                .searchButton {
                    top: 0;
                    position: absolute;
                    border: none;
                    background-color: #00000000;
                    border-radius: 50%;
                    padding: 6px;
                    padding-bottom: 3px;
                    margin-right: 3px;
                    margin-top: 2px;
                    cursor: pointer;
                    align-items: center;
                    justify-content: center;
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
                    position: absolute; /* Se posiciona fuera del flujo normal */
                    padding: 20px 0;
                    top: calc(75%); /* Desplaza el contenedor hacia abajo del input */
                    width: 100%; /* Asegura que ocupe el mismo ancho que el contenedor padre */
                    width: clamp(280px, 40vw, 60vw);
                    max-height: 300px; /* Opcional: limita la altura */
                    overflow-y: auto; /* Activa el scroll si el contenido excede el alto */
                    border-radius: 5px;
                    z-index: 1000; /* Asegura que el contenedor esté por encima de otros elementos */
                    background-color: var(--panel1);
                    border: 2px solid #ddd; /* Borde para separar visualmente */
                    border-radius: 20px;
                    }
            `}</style>
        </div>
    );
}

export default SearchBar;
