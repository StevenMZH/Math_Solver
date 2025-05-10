import { useState, useEffect } from 'react';
import axios from 'axios';

export const useCourse = (courseId) => {
    const [course, setCourse] = useState(null);
    const [loadingPage, setLoadingPage] = useState(false);
    const [failPageLoad, setFailPageLoad] = useState(false);
    const [notFound_error, setNotFoundError] = useState(false);

    useEffect(() => {
        if (!courseId) {
            console.error('Course ID is missing');
            return;
        }
        setLoadingPage(true);

        axios.get(`http://127.0.0.1:8000/courses/courses/${courseId}/`)
            .then(response => {
                setCourse(response.data);
                setLoadingPage(false);
                setFailPageLoad(false);
                console.log(response.data)
            })
            .catch(error => {
                if (error.response && error.response.status === 404) {
                    setNotFoundError(true);
                    setLoadingPage(false);
                    setFailPageLoad(false);
                    console.log(error);
                } else {
                    setLoadingPage(false);
                    setFailPageLoad(true);
                    console.log(error);
                }
            });
    }, [courseId]);

    return [course, loadingPage, failPageLoad, notFound_error];
}