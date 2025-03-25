import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CourseReviewPanel from "../components/courses/courseReviewPanel";
import AppHeader from '../components/global/appHeader';
import Footer from '../components/global/footer';
import SidePanel from '../components/global/sideBar';

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
                        grid-template-columns: repeat(3, 1fr);
                        gap: 15px;
                    }

                    @media (max-width: 1100px) {
                        .coursesGrid {
                            grid-template-columns: repeat(2, 1fr);
                        }
                    }
                    @media (max-width: 880px) {
                        .coursesGrid {
                            grid-template-columns: repeat(1, 1fr);
                        }
                        .coursePreview-container{
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
