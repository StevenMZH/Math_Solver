import { Link } from 'react-router-dom';

export function SearchPreview_course({ id, name, type }) {
    const topicImages = {
        "theory": { src: "../../../public/images/user1.png", alt: "theory" },
        "practice": { src: "../../../public/images/defaultImage.png", alt: "Practice" },
        "test": { src: "../../../public/images/defaultImage.png", alt: "Test" },
    };
    const defaultImage = { src: "../../../public/images/defaultImage.png", alt: "" };
    const topicImage = topicImages[type] || defaultImage;

    return (
        <div className="classPreview-container">
            <img className='circleImage classImage' src={topicImage.src} alt={topicImage.alt} />
            <Link to={`/courses/${id}`}>{name}</Link>
            <style>{`
                .classPreview-container {
                    display: flex;
                    align-items: center;
                    padding: 7px 15px;
                    background-color: var(--panel1);
                }
                .classPreview-container:hover {
                    background-color: var(--panel2);
                }
                .classImage {
                    width: 40px;
                    height: 40px;
                    margin-left: 20px;
                    margin-right: 10px;
                }
                .classPreview-container a {
                    padding: 10px;
                }
            `}</style>
        </div>
    );
}
export default SearchPreview_course;
