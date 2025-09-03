import { useState, useEffect } from 'react';
import axios from 'axios';

export const useCourses = (lang = 'en') => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [failLoad, setFailLoad] = useState(false);

    useEffect(() => {
        setLoading(true);

        axios.get('http://127.0.0.1:8000/courses/courses/')
            .then(response => {
                setCourses(response.data);
                setLoading(false);
                // console.log(response.data)
            })
            .catch(error => {
                console.error("Hubo un error al obtener los cursos:", error);
                setFailLoad(true);
                setLoading(false);
            });
    }, [lang]);

    return { courses, loading, failLoad };
};
