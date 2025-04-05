import { Link } from 'react-router-dom';

export function SearchResult_class({ id, name, type, setSearchTerm }) {
    const topicImages = {
        "theory": { src: "/public/images/theory.png", alt: "theory" },
        "practice": { src: "/public/images/defaultImage.png", alt: "Practice" },
        "test": { src: "/public/images/defaultImage.png", alt: "Test" },
    };
    const defaultImage = { src: "/public/images/defaultImage.png", alt: "" };
    const topicImage = topicImages[type] || defaultImage;

    return (
        <div className="classLink-container">
            <Link to={`/classes/${id}`} onClick={(e) => setSearchTerm("")}>
                <div className="img-container">
                    <img className='circleImage img-link' src={topicImage.src} alt={topicImage.alt} />
                </div>
                <div className="labelsDiv">
                    <label className='text-title'>{name}</label>
                    <label className='text-subtitle'>Class</label>
                </div>
            </Link>
            <style>{`
                .classLink-container {
                    display: flex;
                    flex-direction: column;
                    width: 100%
                    align-items: center;
                    border: 0;
                    font-size: 18px; 
                }
                .classLink-container a {
                    display: flex;
                    align-items: center;
                    padding: 5px 10px;
                    border-radius: 0;
                    border: none;
                    background-color: #0000;
                } 
                .classLink-container a:hover {
                    background-color: #0003;
                } 
                .classLink-container .labelsDiv {
                    display: flex;
                    flex-direction: column;
                    margin-top: 2px;
                }
                .classLink-container .text-subtitle {
                    margin-top: 1px;
                    font-size: 10px;
                }
                
                .classLink-container .img-container {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 35px;
                    height: 35px;
                    background-color: var(--course-blue);
                    border-radius: 100%;
                    margin: 0 20px;
                    margin-right: 15px;
                }
                .img-link {
                    width: 23px;
                    height: 23px;
                }

            `}</style>
        </div>
    );
}
export default SearchResult_class;
