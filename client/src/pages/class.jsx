import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import HomeNav from '../components/nav/homeNav';
import Footer from '../components/global/footer';


export function Class() {
    const { courseId, classId } = useParams();
    const [classData, setClassData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClassData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/dataBase/classes/${classId}`);
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

                <div className="panelContainer class-content" dangerouslySetInnerHTML={{ __html: classData.content }} />
            </main>
            <Footer />


            <style>{`
                .class-header {
                    width: 95vw;
                }

                .class-content {
                    width: 95vw;
                    font-size: 12px;
                    align-items: center;
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

export default Class;
