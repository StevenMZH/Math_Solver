import { Link } from 'react-router-dom';

export function ClassSearchLink({ id, name, type, setSearchTerm, setSearching }) {
    const topicImages = {
        "theory": { src: "/public/images/classes/theory.png", alt: "theory" },
        "practice": { src: "/public/images/classes/defaultImage.png", alt: "Practice" },
        "test": { src: "/public/images/classes/defaultImage.png", alt: "Test" },
    };
    const defaultImage = { src: "/public/images/defaultImage.png", alt: "" };
    const topicImage = topicImages[type] || defaultImage;

    return (
        <div className="classLink-container column fullwidth">
            <Link className='link-box gap-20' to={`/classes/${id}`} onClick={(e) => {setSearchTerm(""); setSearching(false)}}>
                <div className="img-container center">
                    <img className='circleImage img-link' src={topicImage.src} alt={topicImage.alt} />
                </div>
                <div className="labelsDiv">
                    <label className='text-title'>{name}</label>
                    <label className='text-subtitle'>Class</label>
                </div>
            </Link>
            <style>{`
                .classLink-container {
                    font-size: 18px; 
                }
                .classLink-container .labelsDiv {
                    display: flex;
                    flex-direction: column;
                    margin-top: 2px;
                }
                .classLink-container .text-subtitle {
                    font-size: 10px;
                }
                
                .classLink-container .img-container {
                    width: 35px;
                    height: 35px;
                    background-color: var(--course-blue);
                    border-radius: 100%;
                    margin: 0 20px;
                    margin-right: 0px;
                }
                .img-link {
                    width: 23px;
                    height: 23px;
                }

                @media (max-width:640px) {
                    .classLink-container a:hover {
                        background-color: var(--panel2);
                    } 
                }

            `}</style>
        </div>
    );
}
export default ClassSearchLink;
