import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Footer from '../components/global/footer';
import AppHeader from '../components/global/appHeader';
import CourseUnit from '../components/courses/courseUnits';
import CourseProgress from '../components/courses/courseProgress';
import FormulaSheet from '../components/courses/formulaSheet';

export function Course() {
    const { courseId } = useParams(); // Obtener el courseId de la URL
    const [course, setCourse] = useState(null);

    useEffect(() => {
        if (!courseId) {
            console.error('Course ID is missing');
            return;
        }

        axios.get(`http://127.0.0.1:8000/dataBase/courses/${courseId}/`)
            .then(response => {
                console.log('API Response:', response.data); // Log de la respuesta de la API
                setCourse(response.data); // Guarda la respuesta en el estado
            })
            .catch(error => console.error("Error fetching course:", error));
    }, [courseId]); // Asegúrate de que la dependencia sea el courseId

    return (
        <div className='pageContainer'>
            <main>
                <div className='columnDiv'>
                    <div className='progress-formula'>
                        <CourseProgress
                            finished={10}
                            total={64}
                        />
                        <div className='top-formulaSheet'>
                            {course?.formulas && course.formulas.length > 0 && (
                                <FormulaSheet formulas={course.formulas} />
                            )}
                        </div>
                    </div>

                    <div className='units'>
                        {Array.isArray(course?.units) && course.units.length > 0 ? (
                            course.units.map((unit, index) => (
                                <CourseUnit
                                    key={unit.id}
                                    courseId={course.id}
                                    num={index}
                                    name={unit.name}
                                    classes={unit.classes || []}
                                />
                            ))
                        ) : (
                            <div className='panelContainer noUnits-container'>
                                <label>No units available</label>
                            </div>
                        )}
                    </div>

                    <div className='bottom-formulaSheet'>
                        {course?.formulas && course.formulas.length > 0 && (
                            <FormulaSheet formulas={course.formulas} />
                        )}
                    </div>


                </div>

                <style>{`
                    .main {
                        width: 100%;
                    }

                    .progress-container, .sheet-container, .noUnits-container {
                        width: 70vw;
                    }

                    .columnDiv {
                        display: flex;
                        flex-direction: row;
                        gap: 20px;
                    }
                    
                    .progress-formula, .units, .bottom-formulaSheet {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        gap: 20px;
                    }

                    .bottom-formulaSheet {
                        display: none;
                    }


                    .units{
                        width: 100%;
                    }
                        
                    .progress-container, .sheet-container {
                        width: 20vw;
                    }

                    @media (max-width: 880px) {
                        .columnDiv {
                            display: flex;
                            flex-direction: column;
                            gap: 20px;
                        }
                        .units {
                            gap: 10px;
                        }
                        .progress-formula {
                            position: static;
                        }
                        .progress-container, .sheet-container, .unit-container {
                            width: 90vw;
                        }

                        .bottom-formulaSheet {
                            display: flex;
                        }
                        .top-formulaSheet {
                            display: none;
                        }
                    }

                `}</style>
            </main>

            <Footer />
        </div>
    );
}

export default Course;
