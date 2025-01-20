import { Link } from 'react-router-dom';

export function CourseClass({ courseId, classId, name, type }) {
    const topicImages = {
        "theory": { src: "/images/user1.png", alt: "theory" },
        "practice": { src: "/images/defaultImage.png", alt: "Practice" },
        "test": { src: "/images/defaultImage.png", alt: "Test" },
    };
    const defaultImage = { src: "/images/defaultImage.png", alt: "" };
    const topicImage = topicImages[type] || defaultImage;

    return (
        <div className="class-container">
            <img className='circleImage classImage' src={topicImage.src} alt={topicImage.alt} />
            <Link to={`/courses/${courseId}/${classId}`}>{name}</Link>
            <style>{`
                .class-container {
                    display: flex;
                    align-items: center;
                    padding-top: 10px;
                }
                .classImage {
                    width: 40px;
                    height: 40px;
                    margin-left: 20px;
                    margin-right: 10px;
                }
                .class-container a {
                    padding: 10px;
                }
            `}</style>
        </div>
    );
}
export default CourseClass;
