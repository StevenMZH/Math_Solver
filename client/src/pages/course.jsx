import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import PaletteSelector from '../components/global/paletteSelector';
import LanguageSelector from '../components/global/languageSelector';
import Footer from '../components/global/footer';
import HomeNav from '../components/home/homeNav';
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
            <header>
                <HomeNav />
                <PaletteSelector />
            </header>

            <main>
                <div className='columnDiv'>
                    <div className='progress-formula'>
                        <CourseProgress
                            finished={10}
                            total={64}
                        />
                        {course?.formulas && course.formulas.length > 0 && (
                            <FormulaSheet formulas={course.formulas} />
                        )}
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
                        gap: 40px;
                    }

                    .progress-formula, .units {
                        flex: 1;
                    }
                        
                    .progress-container, .sheet-container {
                        width: 20vw;
                    }

                    @media (max-width: 768px) {
                        main {
                            padding-top: 50px;
                        }
                        .columnDiv {
                            display: block;
                            gap: 0px;
                        }
                        .progress-formula {
                            position: static;
                        }
                        .progress-container, .sheet-container {
                            width: 70vw;
                        }
                    }

                    @media (max-width: 600px) {
                        .progress-container, .sheet-container, .unit-container {
                            width: 90vw;
                        }

                        .class-container a {
                            width: 70%;
                        }
                    }
                `}</style>
            </main>

            <Footer />
        </div>
    );
}

export default Course;
