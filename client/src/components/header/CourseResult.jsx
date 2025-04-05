import { Link } from 'react-router-dom';

export function SearchResult_course({ id, name, type, setSearchTerm }) {
    const topicImages = {
        math: { src: "/public/images/integral.svg", alt: "Math" },
        physics: { src: "/public/images/physics.png", alt: "Physics" },
        cs: { src: "/public/images/cs.png", alt: "Computer Science" },
        electronics: { src: "/public/images/electronics.png", alt: "Electronics" },
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
        <div className="courseLink-container">
            <Link to={`/courses/${id}`} onClick={(e) => setSearchTerm("")}>
                <img className='circleImage link-img' src={topicImage.src} alt={topicImage.alt} style={{ backgroundColor: colors[type] || "#bbccee" }}/>
                <div className="labelsDiv">
                    <label className='text-title'>{name}</label>
                    <label className='text-subtitle'>{topicNames[type]} Course</label>
                </div>
            </Link>
            <style>{`
                .courseLink-container {
                    display: flex;
                    flex-direction: column;
                    width: 100%
                    align-items: center;
                    border: 0;
                    font-size: 18px; 
                }
                .courseLink-container a {
                    display: flex;
                    padding: 5px 10px;
                    align-items: center;
                    border-radius: 0;
                    border: none;
                    background-color: #0000;
                } 
                .courseLink-container a:hover {
                    background-color: #0003;
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
                    margin-right: 15px;
                    background-color: var(--imageBg);
                }
            `}</style>
        </div>
    );
}
export default SearchResult_course;
