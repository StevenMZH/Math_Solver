import { Link } from 'react-router-dom';

export function CourseSearchLink({ id, name, type, setSearchTerm, setSearching }) {
    const topicImages = {
        math: { src: "/public/images/courses/integral.svg", alt: "Math" },
        physics: { src: "/public/images/courses/physics.png", alt: "Physics" },
        cs: { src: "/public/images/courses/cs.png", alt: "Computer Science" },
        electronics: { src: "/public/images/courses/electronics.png", alt: "Electronics" },
    };
    const topicNames = {
        math: "Math",
        physics: "Physics",
        cs: "CS",
        electronics: "Electronics",
    };
    const defaultImage = { src: "/public/images/defaultImage.png", alt: "" };
    const topicImage = topicImages[type] || defaultImage;

    const rootStyles = getComputedStyle(document.documentElement);
    const colors = {
        math: rootStyles.getPropertyValue("--course-blue").trim(),
        physics: rootStyles.getPropertyValue("--course-yellow").trim(),
        cs: rootStyles.getPropertyValue("--course-green").trim(),
        electronics: rootStyles.getPropertyValue("--course-red").trim(),
    };
    
    return (
        <div className="courseLink-container column fullwidth">
            <Link className='link-box gap-20' to={`/courses/${id}`} onClick={(e) => {setSearchTerm(""); setSearching(false)}}>
                <img className='circleImage link-img' src={topicImage.src} alt={topicImage.alt} style={{ backgroundColor: colors[type] || "#bbccee" }}/>
                <div className="labelsDiv">
                    <label className='text-title'>{name}</label>
                    <label className='text-subtitle'>{topicNames[type]} Course</label>
                </div>
            </Link>
            <style>{`
                .courseLink-container {
                    font-size: 18px; 
                }

                .courseLink-container .labelsDiv {
                    display: flex;
                    flex-direction: column;
                    margin-top: 2px;
                }
                .courseLink-container .text-subtitle {
                    margin-top: 1px;
                    font-size: 10px;
                }

                .link-img {
                    width: 35px;
                    height: 35px;
                    margin: 0 20px;
                    margin-right: 0px;
                    background-color: var(--imageBg);
                }

                @media (max-width:640px) {
                    .courseLink-container a:hover {
                        background-color: var(--panel2);
                    } 
                }
            `}</style>
        </div>
    );
}
export default CourseSearchLink;
