import { useParams } from 'react-router-dom';
import CourseUnit from '../components/courses/CourseUnit';
import CourseProgress from '../components/courses/CourseProgress';
import FormulaSheet from '../components/courses/FormulaSheet';
import { FailLoad_Message, NotFound_Message } from '../components/assets/errorMessages';
import LoadingScreen from '../components/assets/transitionPages';
import { useCourse } from '../hooks/content/useCourse';

export function Course() {
    const { courseId } = useParams(); // Obtener el courseId de la URL
    const [course, loadingPage, failPageLoad, notFound_error] = useCourse(courseId);

    return (
        <>
            {notFound_error ? ( <div className='page-center'> <NotFound_Message message={"This Course does not exist"} /> </div> ) : 
            failPageLoad ? ( <div className="page"> <FailLoad_Message /> </div> ) : 
            loadingPage ? ( <div className="page"> <LoadingScreen/> </div>) : 
            (
                <div className='page gap-10'>
                    <div className='fullwidth row columnDiv'>
                        <div className='progress-formula'>
                            <CourseProgress finished={10} total={64} />
                            <div className='top-formulaSheet'>
                                {course?.formulas?.length > 0 && <FormulaSheet formulas={course.formulas} />}
                            </div>
                        </div>

                        <div className='fullwidth units'>
                            {Array.isArray(course?.units) && course.units.length > 0 ? (
                                course.units.map((unit, index) => (
                                    <CourseUnit
                                        key={unit.id}
                                        courseId={course.id}
                                        num={index}
                                        name={unit.name}
                                        classes={unit.lessons || []}
                                    />
                                ))
                            ) : (
                                <div className='panel fullwidth noUnits-container'>
                                    <label className='text-title2'>No Units Available</label>
                                </div>
                            )}
                        </div>

                        <div className='bottom-formulaSheet'>
                            {course?.formulas?.length > 0 && <FormulaSheet formulas={course.formulas} />}
                        </div>
                    </div>
                </div>
            )}


            <style>{`

                    .progress-container, .sheet-container{
                        width: 70vw;
                    }

                    .columnDiv {
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
                        .progress-container, .sheet-container, .unit-container, .noUnits-container {
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
        </>
    )
}

export default Course;
