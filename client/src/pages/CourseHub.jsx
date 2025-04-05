import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CoursePreview, { CoursePreview_wireframe } from "../components/courses/CoursePreview";
import { FailLoad_Message } from '../components/assets/errorMessages';
import { Loading_floatingPanel } from '../components/assets/TransitionPages';
import { MiniLoadingAnim } from '../components/assets/anims';

export function CoursesHub( ) {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [failLoad, setFailLoad] = useState(false);

    useEffect(() => {
        setLoading(true);

        axios.get('http://127.0.0.1:8000/dataBase/courses/')
            .then(response => {
                setCourses(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Hubo un error al obtener los cursos:", error);
                setFailLoad(true);
            })
    }, [])


    return (
        <div className='page-container'>
                {loading ?  (  
                    <>
                        {failLoad ? (<FailLoad_Message/>) : (<Loading_floatingPanel/>) }
                        <div className='coursesGrid'>
                            {Array.from({ length: 6 }).map((_, index) => ( <CoursePreview_wireframe key={index} /> ))}                    
                        </div>
                    </>
        
                ) : ( 
                    <div className='coursesGrid'>
                        { courses.map(course => (
                            <CoursePreview
                                key={course.id}
                                id={course.id}
                                title={course.name}
                                type={course.field}
                                description={course.description}
                                units={course.units}
                            />
                        ))}
                    </div>
                    )
                }

                <style>{`
                        .page-container {
                            width: 100%;
                            display: flex;
                            flex-direction: column;
                            gap: 20px;
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
                            .coursePreview-container, .coursePreviewWF-container{
                                height: auto;
                                margin: 0;
                            }
                        }
                    `}</style>
        </div>
    );
}

export default CoursesHub;
