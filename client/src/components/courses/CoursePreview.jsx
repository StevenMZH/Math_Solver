import { Link } from 'react-router-dom';

export function CoursePreview({ id, title, type, description, units }) {

    const topicImages = {
        math: { src: "/images/integral.svg", alt: "Math" },
        physics: { src: "/images/physics.png", alt: "Physics" },
        cs: { src: "/images/cs.png", alt: "Computer Science" },
        electronics: { src: "/images/electronics.png", alt: "Electronics" },
    };
    const defaultImage = { src: "/images/defaultImage.png", alt: "" };
    const topicImage = topicImages[type] || defaultImage;
    const topics = units.map(unit => unit.name);

    const rootStyles = getComputedStyle(document.documentElement);
    const colors = {
        math: rootStyles.getPropertyValue("--course-blue").trim(),
        physics: rootStyles.getPropertyValue("--course-yellow").trim(),
        cs: rootStyles.getPropertyValue("--course-green").trim(),
        electronics: rootStyles.getPropertyValue("--course-red").trim(),
    };

    return (
        <div className="panelContainer coursePreview-container">
            <Link to={`/courses/${id}`}>
                <div className='colorHeader' style={{ backgroundColor: colors[type] || "#bbccee" }}></div>

                <div className='content'>
                    <div className="panel-header text-title">
                        <img className='circleImage classPreview-Image' src={topicImage.src} alt={topicImage.alt} style={{ backgroundColor: colors[type] || "#88bbdd;" }} />
                        <label>{title}</label>
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
            </Link>

            <style>{`
                .coursePreview-container {
                    overflow: hidden;
                    height: 300px;
                    margin:0;
                    padding: 0;
                    border: none;
                }
                .coursePreview-container a {
                    display: flex;
                    flex-direction: column;
                    border: 0;
                    padding: 0;
                    width: 100%;
                    height: 100%;
                    border-radius: 0;
                    transition: background-color 0.3s ease-in-out;
                }
                .coursePreview-container a:hover .content{
                    padding: 35px;
                    padding-top: 25px;
                    transition: padding 0.3s ease-in-out;
                }
                
                .coursePreview-container .colorHeader {
                    display: flex;
                    height: 30px;
                    width: 100%;
                }
                .coursePreview-container .content {
                    width: 100%;
                    height: 100%;
                    padding: 25px;
                    padding-top: 20px;
                }
                .coursePreview-container .panel-header label {
                    font-size: 14px;
                    background-color: var(--alpha);
                    border-color: var(--alpha);
                    text-align: left;
                    padding: 5px 10px;
                }


                .coursePreview-container .classPreview-Image {
                    width: 50px;
                    height: 50px;
                    margin-right: 10px;
                    background-color: var(--imageBg);
                }

                .coursePreview-container .panel-body {
                    text-align: justify;   
                    margin-top: 0px;   
                }
                .coursePreview-container .panel-body p {
                    margin: 0;
                    font-size: 13px;
                    margin-bottom: 15px;
                    margin-top: 5px;
                }

                .coursePreview-container .truncated-text {
                    overflow: hidden;
                    display: -webkit-box;
                    -webkit-line-clamp: 4; /* Num of visible lines */
                    -webkit-box-orient: vertical;
                    text-overflow: ellipsis;
                }

                .coursePreview-container .panel-body label {
                    margin: 0;
                    font-size: 12px;
                }

                .coursePreview-container .panel-body ul {
                    padding-left: 20px;
                    padding-right: 8px;
                    margin-top: 5px;
                    height: 100%;
                    max-height: 200px;
                }
                .coursePreview-container .panel-body ul li {
                    font-size: 13px;
                }

                @media (max-width: 880px) {
                    .coursePreview-container .colorHeader {
                        height: 25px;
                    }
                    .coursePreview-container .content {
                        padding-top: 15px;
                    }
                }
            `}</style>
        </div>
    );
} export default CoursePreview;


export function CoursePreview_wireframe({ title, type, description, units }) {

    return (
        <div className="panelContainer coursePreviewWF-container">
            <div className="colorHeader"></div>

            <div className="content">
                <div className="panel-header">
                    <div className="circleImage classPreview-Image skeleton"></div>
                    <div className="title skeleton"></div>
                </div>

                <div className="panel-body">
                    <div className="description-segment">
                        <div className="subtitle skeleton"></div>
                        <div className="paragraph">
                            <p className="skeleton"></p>
                            <p className="skeleton"></p>
                            <p className="p-last skeleton"></p>
                        </div>
                    </div>

                    <div className="topics-segment">
                        <div className="subtitle skeleton"></div>
                        <ul>
                            <li className="li-1 skeleton"></li>
                            <li className="li-2 skeleton"></li>
                            <li className="li-3 skeleton"></li>
                        </ul>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes darkSkeleton-loading {
                    0% { background-color: var(--wireframe-content); opacity: 0.4; }
                    50% { background-color: var(--wireframe-content); opacity: 1; }
                    100% { background-color: var(--wireframe-content); opacity: 0.4; }
                }

                @keyframes lightSkeleton-loading {
                    0% { background-color: var(--wireframe-content); opacity: 0.3; }
                    50% { background-color: var(--wireframe-content); opacity: 0.85; }
                    100% { background-color: var(--wireframe-content); opacity: 0.3; }
                }

                .skeleton {
                    animation: darkSkeleton-loading 3s infinite ease-in-out;
                }
                .light .skeleton {
                    animation: lightSkeleton-loading 3s infinite ease-in-out;
                }

                .coursePreviewWF-container {
                    overflow: hidden;
                    height: 300px;
                    margin: 0;
                    padding: 0;
                    border: none;
                }

                .coursePreviewWF-container .title, 
                .coursePreviewWF-container .subtitle, 
                .coursePreviewWF-container p, 
                .coursePreviewWF-container li {
                    padding: 0;
                    border-radius: 20px;
                    height: 10px;
                }

                .coursePreviewWF-container .title {
                    width: 170px;
                    height: 20px;
                }

                .coursePreviewWF-container .description-segment .subtitle {
                    width: 90px;
                    height: 12px;
                    margin-bottom: 10px;
                }

                .coursePreviewWF-container .topics-segment .subtitle {
                    width: 55px;
                    height: 12px;
                    margin-bottom: 10px;
                }

                .coursePreviewWF-container p {
                    width: 100%;
                    height: 9px;
                }

                .coursePreviewWF-container .p-last {
                    width: 30%;
                }

                .coursePreviewWF-container .li-1 {
                    width: 300px;
                }

                .coursePreviewWF-container .li-2 {
                    width: 200px;
                }

                .coursePreviewWF-container .li-3 {
                    width: 150px;
                }

                .coursePreviewWF-container .colorHeader {
                    display: flex;
                    height: 30px;
                    width: 100%;
                    background-color: var(--wireframe-content); 
                }

                .coursePreviewWF-container .content {
                    width: 100%;
                    height: 100%;
                    padding: 25px;
                    padding-top: 20px;
                }

                .coursePreviewWF-container .classPreview-Image {
                    width: 50px;
                    height: 50px;
                    margin-right: 20px;
                }

                .coursePreviewWF-container .paragraph, 
                .coursePreviewWF-container ul {
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                    text-align: justify;
                    margin-bottom: 10px;
                }

                .coursePreviewWF-container .panel-body {
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                }

                .coursePreviewWF-container .panel-body ul {
                    padding-left: 20px;
                    padding-right: 8px;
                    margin-top: 5px;
                    list-style-type: none;
                }

                .coursePreviewWF-container .panel-body ul li {
                    font-size: 13px;
                }

                @media (max-width: 880px) {
                    .coursePreviewWF-container .colorHeader {
                        height: 25px;
                    }
                    .coursePreviewWF-container .content {
                        padding-top: 15px;
                    }
                }
            `}</style>
        </div>
    );
}
