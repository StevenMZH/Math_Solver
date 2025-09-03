import { useState, useEffect } from 'react';
import axios from 'axios';

export const useCourseLesson = (courseId, classId) => {
    const [classData, setClassData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notFound_error, setNotFound_error] = useState(false);
    const [failLoad, setFailLoad] = useState(false);

    useEffect(() => {
        const fetchClassData = async () => {
            try {
                const response = await axios.get(`${window._env_.REACT_APP_API_URL}/courses/courses/${courseId}/${classId}`);
                setClassData(response.data);
                // console.log(response.data)
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