import { useState, useEffect } from 'react';
import axios from 'axios';

export const useCourseLesson = (classId) => {
    const [classData, setClassData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notFound_error, setNotFound_error] = useState(false);
    const [failLoad, setFailLoad] = useState(false);

    useEffect(() => {
        const fetchClassData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/courses/courses/${classId}`);
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

    return [classData, loading, notFound_error, failLoad];
}