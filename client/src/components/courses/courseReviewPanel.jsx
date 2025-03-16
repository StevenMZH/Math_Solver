import { Link } from 'react-router-dom';

export function CourseReviewPanel({ id, title, type, description, units }) {

    const topicImages = {
        math: { src: "/images/integral.svg", alt: "Math" },
        physics: { src: "/images/defaultImage.png", alt: "Physics" },
        cs: { src: "/images/cs.png", alt: "Computer Science" },
        electronics: { src: "/images/defaultImage.png", alt: "Electronics" },
    };
    const defaultImage = { src: "/images/defaultImage.png", alt: "" };
    const topicImage = topicImages[type] || defaultImage;
    const topics = units.map(unit => unit.name);

    return (
        <div className="panelContainer panel-container">
            <div className="panel-header text-title">
                <img className='circleImage classPreview-Image' src={topicImage.src} alt={topicImage.alt} />
                <Link to={`/courses/${id}`}>{title}</Link>
            </div>
            <div className="panel-body">
                <label className='text-subtitle'>Description:</label>
                <p className='truncated-text text-focus'>{description}</p>
                <label className='text-subtitle'>Topics:</label>
                {topics && topics.length > 0 && (
                    <ul className='overflowScrollBar_yPanel'>
                        {topics.map((topic, index) => (<li key={index} className='text-focus'>{topic}</li>))}
                    </ul>
                )}
            </div>

            <style>{`
                .panel-container {
                    overflow: hidden;
                    height: 300px;
                    margin:0;
                }
                .panel-header a {
                    font-size: 13px;
                    background-color: var(--alpha);
                    border-color: var(--alpha);
                    text-align: left;
                    padding: 5px 10px;
                }
                .panel-header a:hover {
                    background-color: var(--button_hover);
                    border-color: var(--button_hover);
                }

                .classPreview-Image {
                    width: 50px;
                    height: 50px;
                    margin-right: 10px;
                    background-color: var(--imageBg);
                }

                .panel-body {
                    text-align: justify;   
                    margin-top: 0px;             
                }
                .panel-body p {
                    margin: 0;
                    font-size: 13px;
                    margin-bottom: 10px;
                    margin-top: 3px;
                }

                .truncated-text {
                    overflow: hidden;
                    display: -webkit-box;
                    -webkit-line-clamp: 4; /* Num of visible lines */
                    -webkit-box-orient: vertical;
                    text-overflow: ellipsis;
                }

                .panel-body label {
                    margin: 0;
                    font-size: 12px;
                }

                .panel-body ul {
                    padding-left: 20px;
                    padding-right: 8px;
                    margin-top: 5px;
                    max-height: 90px;
                }
                .panel-body ul li {
                    font-size: 13px;
                }

            `}</style>
        </div>
    );
}

export default CourseReviewPanel;