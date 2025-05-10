import CoursePreview, { CoursePreview_wireframe } from "../components/courses/CoursePreview";
import { FailLoad_Message } from '../components/assets/errorMessages';
import { Loading_floatingPanel } from '../components/assets/TransitionPages';
import { useCourses } from '../hooks/useCourses';
import { useAccountContext } from "../context/accountContext";

export function CoursesHub( ) {
    const { language } = useAccountContext();
    const { courses, loading, failLoad } = useCourses(language);

    return (
        <div className='page gap-20'>
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
                                title={(course.name[language])}
                                type={course.field}
                                description={course.description[language]}
                                units={course.units}
                            />
                        ))}
                    </div>
                    )
                }

                <style>{`
                        .CoursePreview-container, .CoursePreviewWF-container {
                            height: 300px;
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
                            .CoursePreview-container, .CoursePreviewWF-container{
                                height: auto;
                            }
                        }

                        @media (max-width: 640px) {
                            .coursesGrid {
                                gap: 10px;
                            }
                        }
                    `}</style>
        </div>
    );
}

export default CoursesHub;
