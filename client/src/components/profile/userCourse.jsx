import { Link } from 'react-router-dom';

export function UserCourse({ courseId, classId, name, type }) {
    const topicImages = {
        math: { src: "/images/integral.svg", alt: "Math" },
        physics: { src: "/images/defaultImage.png", alt: "Physics" },
        cs: { src: "/images/cs.png", alt: "Computer Science" },
        electronics: { src: "/images/defaultImage.png", alt: "Electronics" },
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
export default UserCourse;
