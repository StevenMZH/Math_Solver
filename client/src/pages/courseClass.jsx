import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import HomeNav from '../components/nav/homeNav';
import Footer from '../components/global/footer';
import Exercise from "../components/class/exercise";
import { ClassImage, ClassText, ClassVideo, SideContent } from "../components/class/classAssets";


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
    console.log(classData)

    return (
        <div className="pageContainer">
            <header>
                <HomeNav />
            </header>
            <main>
                <div className="panelContainer class-header">
                    <label>{classData.name}</label>
                </div>

                {classData.content && classData.content.map((item, index) => {
                    switch (item.type) {
                        case "image":
                            return <ClassImage key={index} url={item.content} />;
                        case "video":
                            return <ClassVideo key={index} url={item.content} />;
                        case "text":
                            return <ClassText key={index} text={item.content} />;
                        case "sideContent":
                            return (
                                <SideContent
                                    key={index}
                                    left={item.left}
                                    right={item.right}
                                    leftContent={item.leftContent}
                                    rightContent={item.rightContent}
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
                }

                .class-content {
                    width: 100%;
                    font-size : 12px;
                    align-items: center;
                }

                .rowMargin {
                    margin: 20px 0;
                }

                .videoContainer {
                    margin: 10px 0;
                }
                video, .imageClass {
                    width: 80vw;
                    max-width: 800px;
                    border-radius: 10px;
                    margin: 10px 0;
                }
                
                .contentFlexBox {
                    display: flex;
                    width: 100%;
                    justify-items: center;
                    gap: 20px;
                }
                .contentFlexBox .panelContainer {
                    width: auto;
                    padding: 15px;
                }
                .contentFlexBox video, .contentFlexBox .imageClass {
                    height: auto;
                    width: 40vw;
                }

                .panelContainer {
                    margin: 10px 0;
                }
                
                .paragraph {
                    margin: 10 20px;
                    font-size: 12px;
                    text-align: justify; 
                }

                
                @media (max-width: 768px) {
                    .class-header {
                        margin-top: 35px;
                    }
                }
            `}</style>
        </div>
    );
}

export default CourseClass;
