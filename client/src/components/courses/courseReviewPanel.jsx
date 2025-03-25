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
        <div className="panelContainer coursePreview-container">
            <div className='colorHeader'></div>
            <div className='content'>
                <div className="panel-header text-title">
                    <img className='circleImage classPreview-Image' src={topicImage.src} alt={topicImage.alt} />
                    <Link to={`/courses/${id}`}>{title}</Link>
                </div>
                <div className="panel-body">
                    <label className='text-subtitle'>Description:</label>
                    <p className='truncated-text text-focus'>{description}</p>

                    {topics && topics.length > 0 && (
                        <>
                            <label className='text-subtitle'>Topics:</label>
                            <ul className='overflowScrollBar_yPanel'>
                                {topics.map((topic, index) => (<li key={index} className='text-focus'>{topic}</li>))}
                            </ul>
                        </>
                    )}
                </div>
            </div>

            <style>{`
                .coursePreview-container {
                    overflow: hidden;
                    height: 300px;
                    margin:0;
                    padding: 0;
                    border: none;
                }
                .coursePreview-container .colorHeader {
                    display: flex;
                    height: 30px;
                    width: 100%;
                    background-color: #88bbee;
                }
                .coursePreview-container .content {
                    width: 100%;
                    height: 100%;
                    padding: 20px;
                    padding-top: 10px;
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
                    margin-bottom: 15px;
                    margin-top: 5px;
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

                @media (max-width: 880px) {
                    .coursePreview-container .colorHeader {
                        height: 25px;
                    }
                    .coursePreview-container .content {
                        padding-top: 7px;
                    }
                }
            `}</style>
        </div>
    );
}

export default CourseReviewPanel;