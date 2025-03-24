import { Link } from 'react-router-dom';

export function CourseClass_link({ courseId, classId, name, type }) {
    const topicImages = {
        "theory": { src: "/images/user1.png", alt: "theory" },
        "practice": { src: "/images/defaultImage.png", alt: "Practice" },
        "test": { src: "/images/defaultImage.png", alt: "Test" },
    };
    const defaultImage = { src: "/images/defaultImage.png", alt: "" };
    const topicImage = topicImages[type] || defaultImage;

    return (
        <div className="classLink">
            <img className='circleImage classImage' src={topicImage.src} alt={topicImage.alt} />
            <Link className='text-title2' to={`/courses/${courseId}/${classId}`}>{name}</Link>
            <style>{`
                .classLink {
                    display: flex;
                    align-items: center;
                    padding: 0;
                }
                .classImage {
                    width: 40px;
                    height: 40px;
                    margin-left: 20px;
                    margin-right: 10px;
                }
                .classLink a {
                    padding: 10px;
                    font-size: 13px;
                }
            `}</style>
        </div>
    );
}
export default CourseClass_link;
