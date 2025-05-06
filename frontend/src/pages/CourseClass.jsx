import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { ClassCard, ClassCard2, ClassImage, ClassText, ClassVideo } from "../components/class/classAssets";
import { NotFound_Message, FailLoad_Message } from "../components/assets/errorMessages";
import LoadingAnim from "../components/assets/anims";
import LoadingScreen from "../components/assets/TransitionPages";



export function CourseClass() {
    const { courseId, classId } = useParams();
    const [classData, setClassData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notFound_error, setNotFound_error] = useState(false);
    const [failLoad, setFailLoad] = useState(false);

    useEffect(() => {
        const fetchClassData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/courses/course/${courseId}/${classId}`);
                setClassData(response.data);
            } catch (err) {
                if (err.response && err.response.status === 404) {
                    setNotFound_error(true);
                } else {
                    setFailLoad(true);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchClassData();
    }, [classId]);

    if (loading) return ( <LoadingScreen/> ) ;
    if (notFound_error) return (
        <div className="page-center">
            <NotFound_Message message="This Class does not exist" />
        </div>
    )

    
    if (failLoad) return (
        <div className="page column">
            <FailLoad_Message message="Failed to load class data. Please try again later." />
        </div>
    )

    return (
        <div className="page column">
            <div className="panel class-header">
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
                    margin-top: 10px;
                }

                .cardAsset {
                    display: flex;
                    width: 100%;
                    justify-items: center;
                    gap: 0;
                }
                .videoAsset video, .imageAsset img {
                    width: 100%;
                    box-shadow: 0 0 10px var(--panel_border);
                }
                .dark .textAsset {
                    color: #b8b8b8;
                    font-weight: 500;
                    font-size: 14px;
                    text-align: justify; 
                }
                .light .textAsset {
                    color: #333;
                    font-weight: 500;
                    font-size: 14px;
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
};

export default CourseClass;
