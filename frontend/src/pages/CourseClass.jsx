import { useParams } from "react-router-dom";

import { ClassCard, ClassCard2, ClassImage, ClassText, ClassVideo } from "../components/lesson/classAssets";
import { NotFound_Message, FailLoad_Message } from "../components/assets/errorMessages";
import LoadingScreen from "../components/assets/TransitionPages";
import { useCourseLesson } from "../hooks/content/useCourseLesson";
import { useAccountContext } from "../context/accountContext";
import { useEffect, useState } from "react";
import axiosAuthTokens from "../services/axiosAuthTokens";

export function CourseClass() {
    const { courseId, classId } = useParams();
    const [classData, loading, notFound_error, failLoad] = useCourseLesson(courseId, classId);
    const { language, daily_streak, setDaily_streak, contentProgress, setContentProgress, last_activity, setLast_activity, longest_daily_streak, setLongest_daily_streak } = useAccountContext();
    const [atBottom, setAtBottom] = useState(false);

    const [savedCourse, setSavedCourse] = useState(false);
    const [savedLesson, setSavedLesson] = useState(false);

    // useEffect(() => {
    //     if(localStorage.getItem('accessToken')){
    //         const handleScroll = () => {
    //             const bottomReached = window.innerHeight + window.scrollY >= document.body.offsetHeight - 5;
    //             console.log("Scroll event - bottomReached:", bottomReached);
    //             if (bottomReached) {
    //                 setAtBottom(true);
    //             }
    //         };
    //         window.addEventListener('scroll', handleScroll);
    //         return () => window.removeEventListener('scroll', handleScroll);
    //     }
    // }, []);

    useEffect(() => {
        if (atBottom) {
            const courseExists = contentProgress.some(p => p.object_id === courseId);
            const lessonExists = contentProgress.some(p => p.object_id === classId);

            if (!lessonExists && !savedLesson) {
                axiosSaveActivity({
                    status: 'completed',
                    object_id: classId,
                    content_type: 'courselesson',
                });
                setSavedLesson(true);
            }

            if (!courseExists && !savedCourse) {
                axiosSaveActivity({
                    status: 'in progress',
                    object_id: courseId,
                    content_type: 'course',
                });
                setSavedCourse(true);
            }
            console.log(lessonExists, savedCourse, courseExists, savedCourse)
        }
    }, [atBottom, contentProgress]);


    const axiosSaveActivity = async ({ status, object_id, content_type }) => {
        try {
            await axiosAuthTokens.post('account/register_activity/', {
                status,
                object_id,
                content_type,
            });
            setContentProgress(prev => [...prev, { status, object_id, content_type }]);

            const today = new Date().toISOString().slice(0, 10);
            if (last_activity !== today) {
                if(daily_streak == longest_daily_streak){ setLongest_daily_streak(daily_streak + 1); }
                setDaily_streak(daily_streak + 1);
                setLast_activity(today);
            }
        } catch (err) {
            console.error('Error saving activity:', err);
        }
    };



    if (loading) return <LoadingScreen />;
    if (notFound_error) return <div className="page-center"><NotFound_Message message="This Class does not exist" /></div>;
    if (failLoad) return <div className="page column"><FailLoad_Message message="Failed to load class data. Please try again later." /></div>;

    const content = classData.content?.[language] || classData.content?.['en'] || [];

    return (
        <div className="page column">
            <div className="panel class-header">
                <label className="text-title">{classData.name[language]}</label>
            </div>
            
            {classData && (Array.isArray(content) ? content : []).map((item, index) => {
                if (!item || typeof item !== 'object') return null;

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
                .textAsset {
                    width: 100%;
                    padding: 15px;
                    border-radius: 10px;
                    overflow-wrap: break-word
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
                    .textAsset {
                        width: 100%;
                        border-radius: 10px;
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
