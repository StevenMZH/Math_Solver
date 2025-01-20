import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AlgebraicInput() {
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
        <div>
            {output && (
                <div className="outputSideDiv">
                    <div>
                        <p id="matInput">{`\\(${inputLatex}  =  ${output}\\)`}</p>
                    </div>

                </div>
            )}

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <label id="equationBar-title" data-lang-key="Algebra_Calculus.title"> Assign a Math Problem: </label>
                <div id="equationBar-container" className='flexCenter'>
                    <input type="text" name="math_problem" className='searchBar' id="equationBar" placeholder="Type equation here" value={input} onChange={(e) => setInput(e.target.value)} />
                    <div className='button-container'>
                        <button type="submit" className='searchButton' id="equationBar-submit" data-lang-key="Algebra_Calculus.send">
                            <img className='searchIcon' src='../../../public/images/search_Icon.png' alt="search" />
                        </button>
                    </div>
                </div>
            </form>

        </div>
    );
}

export default AlgebraicInput;
