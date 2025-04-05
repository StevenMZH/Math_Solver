import { Link } from 'react-router-dom';

export function CourseClass_link({ courseId, classId, name, type }) {
    const topicImages = {
        "theory": { src: "/public/images/theory.png", alt: "theory" },
        "practice": { src: "/public/images/practice.png", alt: "Practice" },
        "test": { src: "/public/images/test.png", alt: "Test" },
    };
    const defaultImage = { src: "/public/images/defaultImage.png", alt: "" };
    const topicImage = topicImages[type] || defaultImage;
    return (
        <div className="class-link">
            <Link className='text-title2' to={`/courses/${courseId}/${classId}`}>
                <div className="img-container">
                    <img className='circleImage classImage' src={topicImage.src} alt={topicImage.alt} />
                </div>
                <label>{name}</label>
            </Link>
            <style>{`
                .class-link {
                    display: flex;
                    align-items: center;
                }
                .class-link a {
                    display: flex;
                    align-items: center;
                    gap: 15px;                
                    padding: 10px 20px;
                    width: 100%;    
                    font-size: 13px;
                    border: none;
                }
                .class-link a:hover {
                    border: none;
                }
                
                .class-link .img-container {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 40px;
                    height: 40px;
                    background-color: var(--course-blue);
                    border-radius: 100%;
                }
                .classImage {
                    width: 30px;
                    height: 30px;
                }
            `}</style>
        </div>
    );
}
export default CourseClass_link;
