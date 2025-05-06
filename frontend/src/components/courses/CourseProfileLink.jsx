import { Link } from 'react-router-dom';
import {courseFields, courseFields_imgs} from './courseVars'

export function CourseProfileLink({ id="linearAlgebra", name="Example", description="", type="electronics", classes=3, finished=3, completionDate=""}) {
    const topicImages = {
        math: { src: "/images/courses/integral.svg", alt: "Math" },
        physics: { src: "/images/courses/physics.png", alt: "Physics" },
        cs: { src: "/images/courses/cs.png", alt: "Computer Science" },
        electronics: { src: "/images/courses/electronics.png", alt: "Electronics" },
    };
    const defaultImage = { src: "/images/defaultImage.png", alt: "" };
    const topicImage = topicImages[type] || defaultImage;

    const rootStyles = getComputedStyle(document.documentElement);
    const colors = {
        math: rootStyles.getPropertyValue("--course-blue").trim(),
        physics: rootStyles.getPropertyValue("--course-yellow").trim(),
        cs: rootStyles.getPropertyValue("--course-green").trim(),
        electronics: rootStyles.getPropertyValue("--course-red").trim(),
    };

    const percentage = ((finished / classes) * 100).toFixed(1)
    
    return (
        <>
            <Link className='box radius-10 gap-15 course-profileLink' to={`/courses/${id}`} onClick={(e) => {setSearchTerm(""); setSearching(false)}}>
                <div className='column row-start gap-5 shader-container link-header' style={{ backgroundColor: colors[type] || "#bbccee" }}>
                    <img className='CourseProfileLink-img' src={topicImage.src} alt={topicImage.alt} />
                    <label className='text-title2 color-dark'>{courseFields[type]} Course</label>
                    <div className="shader-shadow1 radius10-top"></div>
                </div>
                
                <div className='box p20 p10-h gap-20'>
                    <div className="box gap-2">
                        <label className='text-title font-L'>{name}</label>
                        <label className='font-XS'>{description}</label>            
                    </div>
                    {(classes === finished) && completionDate && <label className='fullwidth text-end text-title2'>Completed on {completionDate}</label>}
                
                    {(classes !== finished) && <div className="center gap-5">
                        <div className="fullwidth  radius-10 CourseProfileLink-progress">
                            <div className="fullscreen shader-container radius-10" style={{ backgroundColor: colors[type] || "#bbccee", width: `${percentage}%` }}>
                                <div className="shader-light1"/>
                            </div>
                        </div>
                        
                        <label>{finished}/{classes}</label>
                        <label>({ percentage }%)</label> 
                    </div>}
                </div>

            </Link>
            <style>{`

                .link-header {
                    padding: 5px 10px;
                    border-radius: 10px 10px 0 0;
                }
                .CourseProfileLink-img {
                    width: 30px;
                    height: 30px;
                    background-color: #0000;
                }

                .CourseProfileLink-progress {
                    height: 5px;
                    background-color: var(--button_hover);
                }
            `}</style>
        </>
    )
}
export default CourseProfileLink;
