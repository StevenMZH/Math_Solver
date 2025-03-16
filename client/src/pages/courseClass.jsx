import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import HomeNav from '../components/nav/homeNav';
import Footer from '../components/global/footer';
import Exercise from "../components/class/exercise";
import { ClassCard, ClassCard2, ClassImage, ClassText, ClassVideo } from "../components/class/classAssets";


export function CourseClass() {
    const { courseId, classId } = useParams(); // Obtén los parámetros de la URL
    const [classData, setClassData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClassData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/dataBase/courses/${courseId}/${classId}`);
                setClassData(response.data);
            } catch (err) {
                setError(err.response ? err.response.data.message : err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchClassData();
    }, [courseId, classId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    console.log(classData);

    return (
        <div className="pageContainer">
            <header>
                <HomeNav />
            </header>
            <main>
                <div className="panelContainer class-header">
                    <label className="text-title">{classData.name}</label>
                </div>

                {classData.content && classData.content.map((item, index) => {
                    switch (item.type) {
                        case "image":
                            return <ClassImage key={index} url={item.content} />;
                        case "video":
                            return <ClassVideo key={index} url={item.content} />;
                        case "text":
                            return <ClassText key={index} text={item.content} />;
                        case "card":
                            return (
                                <ClassCard
                                    key={index}
                                    multimedia_type={item.multimedia_type}
                                    multimedia={item.multimedia}
                                    text={item.text}
                                />
                            );
                        case "card2":
                            return (
                                <ClassCard2
                                    key={index}
                                    multimedia_type={item.multimedia_type}
                                    multimedia={item.multimedia}
                                    text={item.text}
                                />
                            );
                        default:
                            return null;
                    }
                })}


            </main>
            <Footer />


            <style>{`
                .class-header {
                    width: 100%;
                    margin-top: 0;
                }
                .class-content {
                    width: 100%;
                    font-size : 12px;
                    align-items: center;
                }

                .segment-margin {
                    margin: 20px 0;
                }

                .cardAsset {
                    display: flex;
                    width: 100%;
                    justify-items: center;
                    gap: 0;
                }
                .videoAsset, .imageAsset {
                    width: 100%;
                }
                .textAsset {
                    font-size: 12px;
                    text-align: justify; 
                }

                .videoAsset video{
                    width: 100%;
                    max-width: 800px;
                    border-radius: 10px;
                }

                .cardAsset video, .cardAsset .imageAsset {
                    height: auto;
                    width: 40vw;
                    border-radius: 10px 0 0 10px;
                }
                .cardAsset .textAsset {
                    width: auto;
                    padding: 15px;
                    border-radius: 0 10px 10px 0;
                }
                
                .reverseCard {
                    flex-direction: row-reverse;
                }
                .reverseCard video, .reverseCard .imageAsset {
                    border-radius: 0 10px 10px 0;
                }
                .reverseCard textAsset {
                    border-radius: 10px 0 0 10px;
                }


                
                @media (max-width: 768px) {
                    .cardAsset , .reverseCard {
                        flex-direction: column;
                    }
                    .cardAsset video, .cardAsset .imageAsset {
                        width: 100%;
                        border-radius: 10px 10px 0 0;
                    }
                    .cardAsset .textAsset {
                        border-radius: 0 0 10px 10px;
                    }
                }
            `}</style>
        </div>
    );
}

export default CourseClass;
