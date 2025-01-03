import {Link} from 'react-router-dom';

export function CourseReviewPanel({id, title, type, description, topics }) {

    const topicImages = {
        math: { src: "../../../images/defaultImage.png", alt: "Math" },
        physics: { src: "../../../images/defaultImage.png", alt: "Physics" },
        cs: { src: "../../../images/defaultImage.png", alt: "Computer Science" },
        electronics: { src: "../../../images/defaultImage.png", alt: "Electronics" },
    };
    const defaultImage = { src: "images/example5.jpg", alt: "" };
    const topicImage = topicImages[type] || defaultImage;

    return (
        <div className="panel-container">
            <div className="panel-header">
                <img className='circleImage' src={topicImage.src} alt={topicImage.alt} />
                <Link to={`/courses/${id}`}>{title}</Link>
            </div>
            <div className="panel-body">
                <label>Description:</label>
                <p className='truncated-text'>{description}</p>
                <label>Topics:</label>
                {topics && topics.length > 0 && (
                    <ul>
                        { topics.map((topic, index) => (<li key={index}>{topic}</li> ))}
                    </ul>
                )}
            </div>

            <style>{`
                .panel-container {
                    border: 5px solid var(--panel1);
                    border-radius: 10px;
                    padding: 20px;
                    margin: 10px 0;
                    background-color: var(--panel1);
                    text-align: center;
                    position: relative;
                    overflow: hidden;
                    height: 300px;
                }

                .panel-header {
                    display: flex;
                    align-items: center;
                    margin-bottom: 10px;
                }

                .panel-header a {
                    font-size: 12px;
                    background-color: var(--alpha);
                    border-color: var(--alpha);
                }
                
                .panel-header a:hover {
                    background-color: var(--button_hover);
                    border-color: var(--button_hover);
                }

                .circleImage {
                    width: 50px;
                    height: 50px;
                    border-radius: 100%;
                    margin-right: 10px;
                    object-fit: cover;
                    overflow: hidden;
                    object-fit: cover;
                    background-size: 150%;
                }

                .panel-body {
                    text-align: justify;                
                }

                .panel-body p {
                    margin: 0;
                    font-size: 12px;
                    color: #333;
                    margin-bottom: 10px;
                    margin-top: 3px;
                }

                .truncated-text {
                    overflow: hidden;
                    display: -webkit-box; /* Necesario para usar -webkit-line-clamp */
                    -webkit-line-clamp: 4; /* Número de líneas visibles */
                    -webkit-box-orient: vertical; /* Orientación del texto */
                    text-overflow: ellipsis; /* Adds "..." at the end */
                    }


                .panel-body label {
                    margin: 0;
                    font-size: 14px;
                    color: #555;
                }

                .panel-body ul {
                    list-style-type: disc;
                    padding-left: 20px; /* Mantén el padding para la indentación */
                    margin-top: 5px;
                    max-height: 100px; /* Ajusta el alto máximo de la lista */
                    overflow-y: auto; /* Agrega desplazamiento vertical si excede el espacio */
                    overflow-x: hidden; /* Evita el desplazamiento horizontal */
                }

                .panel-body ul::-webkit-scrollbar {
                    width: 6px;
                }

                .panel-body ul::-webkit-scrollbar-track {
                    background: #555;
                    border-radius: 10px;
                }
                .panel-body ul::-webkit-scrollbar-thumb {
                    background: #333;
                    border-radius: 10px;
                }
                .panel-body ul::-webkit-scrollbar-thumb:hover {
                    background: #222;
                }
                .panel-body ul li {
                    font-size: 13px;
                    color: #333;
                }

            `}</style>
        </div>
    );
}

export default CourseReviewPanel;
