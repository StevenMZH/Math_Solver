import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CourseReviewPanel from "../components/courses/courseReviewPanel";
import PaletteSelector from '../components/global/paletteSelector';
import LanguageSelector from '../components/global/languageSelector';
import Footer from '../components/global/footer';
import HomeNav from '../components/home/homeNav';
import SearchBar from '../components/global/searchBar';

export function CoursesHub() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/dataBase/courses/')
            .then(response => {
                setCourses(response.data);
            })
            .catch(error => {
                console.error("Hubo un error al obtener los cursos:", error);
            });
    }, []);

    return (
        <div className='pageContainer'>
            <header>
                <HomeNav />
                <PaletteSelector />
            </header>

            <main>
                <div className="coursesGrid">
                {courses.map(course => (
                    <CourseReviewPanel
                        key={course.id}
                        id={course.id}
                        title={course.name}
                        type={course.field}
                        description={course.description}
                        units={course.units} // Pasamos las unidades del curso
                    />
                ))}

                </div>

                <style>{`
                    main {
                        width: 100%;
                    }

                    .coursesGrid {
                        display: grid;
                        width: 100%;
                        grid-template-columns: repeat(4, 1fr);
                        gap: 10px;
                    }

                    @media (max-width: 1200px) {
                        .coursesGrid {
                            grid-template-columns: repeat(3, 1fr);
                        }
                    }
                    @media (max-width: 900px) {
                        .coursesGrid {
                            margin-top: 60px;
                            grid-template-columns: repeat(1, 1fr);
                        }
                        .panel-container {
                            height: auto;
                            margin: 0;
                        }
                    }
                `}</style>
            </main>

            <Footer />
        </div>
    );
}

export default CoursesHub;
