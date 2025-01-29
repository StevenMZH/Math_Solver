import React, { useState, useEffect } from 'react';
import axios from 'axios';
import KatexRenderer from '../global/katexRenderer';

export function Exercise({ exerciseId }) {
    const [exercise, setExercise] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userSolution, setUserSolution] = useState("");

    useEffect(() => {
        const fetchExercise = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/dataBase/exercises/${exerciseId}/`);
                setExercise(response.data);
            } catch (err) {
                setError(err.response ? err.response.data.message : err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchExercise();
    }, [exerciseId]);

    const handleSolutionSubmit = () => {
        alert(`Your solution: ${userSolution}`);
        // Aquí puedes enviar la solución del usuario al backend si es necesario
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!exercise) return <p>No exercise data found.</p>;

    return (
        <div className="panelContainer exercise-container">
            <div className='exerciseName'>
                <label>Exercise: {exercise.name}</label>
            </div>

            <div className='contentFlexBox'>
                {exercise.image && (
                    <img className='imageClass' src={exercise.image} alt="Exercise Image" />
                )}

                <div className="paragraph">
                    <p>{exercise.problemText}</p>
                    <KatexRenderer expression={exercise.problem} />

                    <div className="solution-input">
                        <input type="text" placeholder="Type your solution here..." value={userSolution} onChange={(e) => setUserSolution(e.target.value)} />
                        <button onClick={handleSolutionSubmit}>Submit</button>
                    </div>
                </div>
            </div>


            <style>{`
                .exerciseName {
                    margin-bottom: 10px;
                }

            `}</style>
        </div>
    );
}
export default Exercise;
