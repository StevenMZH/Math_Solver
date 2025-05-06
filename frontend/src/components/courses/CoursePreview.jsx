import { Link } from 'react-router-dom';

export function CoursePreview({ id, title, type, description, units=[] }) {

    const topicImages = {
        math: { src: "./public/images/courses/integral.svg", alt: "Math" },
        physics: { src: "./public/images/courses/physics.png", alt: "Physics" },
        cs: { src: "./public/images/courses/cs.png", alt: "Computer Science" },
        electronics: { src: "./public/images/courses/electronics.png", alt: "Electronics" },
    };
    const defaultImage = { src: "./public/images/defaultImage.png", alt: "" };
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
        <div className="panel p0 CoursePreview-container">
            <Link className='box fullscreen' to={`/courses/${id}`}>
                    <div className='fullscreen shader-container CoursePreview-colorHeader' style={{ backgroundColor: colors[type] || "#bbccee" }}>
                        <div className="shader-shadow1"/>
                    </div>

                <div className='box p25 gap-20 CoursePreview-content'>
                    <div className="row-start gap-20 ">
                        <div className="circleImage shader-container">        
                            <img src={topicImage.src} alt={topicImage.alt} style={{ backgroundColor: colors[type] || "#88bbdd;" }} />
                            <div className="shader-shadow1"/>
                        </div>
                        
                        <label className='text-title CoursePreview-title'>{title}</label>
                    </div>

                    <div className="box text-start gap-10">
                        <div className="box gap-5">
                            <label className='text-subtitle font-XS'>Description:</label>
                            <p className='truncated-text text-focus'>{description}</p>
                        </div>
                        
                        {topics && topics.length > 0 && (
                            <div className='box gap-5'>
                                <label className='text-subtitle font-XS'>Topics:</label>
                                <ul className='scrollBar2-y CoursePreview-topics'>
                                    {topics.map((topic, index) => (<li key={index} className='text-focus'>{topic}</li>))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </Link>

            <style>{`                
                .CoursePreview-container a {
                    transition: background-color 0.3s ease-in-out;
                }
                .CoursePreview-colorShader {
                    background-color: #0002;
                }
                .CoursePreview-colorHeader{
                    height: 30px;
                }
                .CoursePreview-content{
                    padding-top: 20px;
                }
                a:hover .CoursePreview-content{
                    padding: 35px;
                    padding-top: 25px;
                    transition: padding 0.3s ease-in-out;
                }
                .CoursePreview-topics {
                    max-height: 50px;
                }

                .CoursePreview-title {
                    font-size: 14px;
                }


                .CoursePreview-container .CoursePreview-icon {
                    width: 50px;
                    height: 50px;
                    margin-right: 10px;
                    background-color: var(--imageBg);
                }


                .CoursePreview-container .truncated-text {
                    overflow: hidden;
                    display: -webkit-box;
                    -webkit-line-clamp: 3; /* Num of visible lines */
                    -webkit-box-orient: vertical;
                    text-overflow: ellipsis;
                }

                .CoursePreview-container .panel-body label {
                    margin: 0;
                    font-size: 12px;
                }

                .CoursePreview-container ul {
                    padding-left: 20px;
                    height: 100%;
                    max-height: 60px;
                }
                .CoursePreview-container .panel-body ul li {
                    font-size: 13px;
                }

                @media (max-width: 880px) {
                    .CoursePreview-container .CoursePreview-colorHeader {
                        height: 25px;
                    }
                    .CoursePreview-container .content {
                        padding-top: 15px;
                    }
                }
            `}</style>
        </div>
    );
} export default CoursePreview;


export function CoursePreview_wireframe({ title, type, description, units }) {

    return (
        <div className="panel p0 CoursePreviewWF-container">
            <div className="CoursePreview-colorHeader"></div>

            <div className="CoursePreviewWF-content panel-box gap-10">
                <div className="row-start gap-10">
                    <div className="circleImage radius-full skeleton"></div>
                    <div className="skeleton CoursePreviewWF-title"></div>
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

                .CoursePreviewWF-container {
                    height: 300px;
                }
                .CoursePreviewWF-content div {
                    border-radius: 20px;
                }

                .CoursePreviewWF-container .title, 
                .CoursePreviewWF-container .subtitle, 
                .CoursePreviewWF-container p, 
                .CoursePreviewWF-container li {
                    padding: 0;
                    border-radius: 20px;
                    height: 10px;
                }

                .CoursePreviewWF-title {
                    width: 170px;
                    height: 20px;
                }

                .CoursePreviewWF-container .description-segment .subtitle {
                    width: 90px;
                    height: 12px;
                    margin-bottom: 10px;
                }

                .CoursePreviewWF-container .topics-segment .subtitle {
                    width: 55px;
                    height: 12px;
                    margin-bottom: 10px;
                }

                .CoursePreviewWF-container p {
                    width: 100%;
                    height: 9px;
                }

                .CoursePreviewWF-container .p-last {
                    width: 30%;
                }

                .CoursePreviewWF-container .li-1 {
                    width: 300px;
                }

                .CoursePreviewWF-container .li-2 {
                    width: 200px;
                }

                .CoursePreviewWF-container .li-3 {
                    width: 150px;
                }

                .CoursePreviewWF-container .CoursePreview-colorHeader {
                    display: flex;
                    height: 30px;
                    width: 100%;
                    background-color: var(--wireframe-content); 
                }

                .CoursePreviewWF-container .paragraph, 
                .CoursePreviewWF-container ul {
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                    text-align: justify;
                    margin-bottom: 10px;
                }

                .CoursePreviewWF-container .panel-body {
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                }

                .CoursePreviewWF-container .panel-body ul {
                    padding-left: 20px;
                    padding-right: 8px;
                    margin-top: 5px;
                    list-style-type: none;
                }

                .CoursePreviewWF-container .panel-body ul li {
                    font-size: 13px;
                }

                @media (max-width: 880px) {
                    .CoursePreviewWF-container .CoursePreview-colorHeader {
                        height: 25px;
                    }
                    .CoursePreviewWF-container .content {
                        padding-top: 15px;
                    }
                }
            `}</style>
        </div>
    );
}
