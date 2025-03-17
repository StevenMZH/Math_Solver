import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AlgebraicSolver() {
    const [input, setInput] = useState('');
    const [inputLatex, setInputLatex] = useState('')
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setOutput('');

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/simplify/', { equation: input });
            setOutput(response.data.simplified_equation);
            setInputLatex(response.data.inputLatex);
        } catch (err) {
            setError(err.response?.data?.error || 'Syntax Error');
        }
    };

    // Ejecutar MathJax.typeset() cada vez que el output cambie
    useEffect(() => {
        if (output) {
            window.MathJax && window.MathJax.typeset();
        }
    }, [output]);

    return (
        <div className='solver' id='algebraicSolver'>
            {output && (
                <div className="output-container">
                    <p id="mathOutput">{`\\(${inputLatex}  =  ${output}\\)`}</p>
                </div>
            )}

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <label className="title"> Assign a Math Problem: </label>

                <div className="input-container flexCenter">
                    <input type="text" name="math_problem" className='inputBar' placeholder="Type equation here" value={input} onChange={(e) => setInput(e.target.value)} />
                    <div className='button-container'>
                        <button type="submit" className='submitButton' data-lang-key="Algebra_Calculus.send">
                            <img className='searchIcon' src='../../../public/images/search_Icon.png' alt="search" />
                        </button>
                    </div>
                </div>
            </form>

            <style>{`
                #algebraicSolver .input-container {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin-top: 10px;
                    margin-bottom: 10px;
                }

                #algebraicSolver .title {
                    margin-top: 60px; 
                    margin-bottom: 10px; 
                    display: block; 
                }
                
                #algebraicSolver .inputBar {
                    width: 700px;
                    height: 40px;
                    padding: 10px;
                    border: none;
                    cursor: pointer;
                    transition: background-color 0.3s, color 0.3s;
                    font-size: 13px;
                    background-color: var(--bar);
                }

                #algebraicSolver .button-container {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: end;
                    align-items: center;
                }
                #algebraicSolver .submitButton {
                    position: absolute;
                    top: 0;    
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: #00000000;
                    margin-top: 2px;
                    margin-right: 3px;
                    padding: 10px;
                    border: none;
                    border-radius: 50%;
                }
                #algebraicSolver .searchButton:hover {
                    background-color: #00000022;
                }
                #algebraicSolver .searchIcon {
                    width: 16px;
                    height: 16px;
                }

                @media (max-width: 768px) {
                    #algebraicSolver .inputBar {
                        width: 80vw;
                    }
                }
            `}</style>
        </div>
    );
}

export default AlgebraicSolver;
