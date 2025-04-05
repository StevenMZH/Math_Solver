import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loading_floatingPanel } from '../assets/TransitionPages';
import Logo6 from '../header/logos/Logo6';

function AlgebraicSolver({setFailLoad}) {
    const [input, setInput] = useState('');
    const [inputLatex, setInputLatex] = useState('')
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [start, setStart] = useState(true);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setFailLoad(false);



        try {
            setLoading(true);
            const response = await axios.post('http://127.0.0.1:8000/api/simplify/', { equation: input });
            setOutput(response.data.simplified_equation);
            setInputLatex(response.data.inputLatex);
            setFailLoad(false);
            setStart(false);
        } catch (err) {
            if (err.response) {
                setError(err.response?.data?.error || 'Unknown Server Error');
            } else {
                setFailLoad(true);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (output) {
            window.MathJax && window.MathJax.typeset();
        }
    }, [output]);

    return (
        <div className='solver' id='algebraicSolver'>
            {loading && (
                <Loading_floatingPanel/>
            )}
            
            {output && (
                <div className="panelContainer">
                    <div className='overflowScrollBar_xPanel output-container'>
                        <label id="mathOutput">{`\\(${inputLatex}  =  ${output}\\)`}</label>
                     </div>   
                </div>
            )}

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                {start && <Logo6/>}
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

                #algebraicSolver .panelContainer {
                    width: 90vw;
                    min-height: 60vh;
                    padding: 20px 25px;
                    padding-bottom: 10px;
                    border: none;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                #algebraicSolver form {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                #algebraicSolver .output-container {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: start;
                    max-width: 100%;
                    font-size: clamp(12px, 2.5dvw, 20px);
                    border: none;
                }
                #algebraicSolver #mathOutput {
                    display: flex;
                    align-items: center;
                    min-width: 100%;
                    min-height: 60vh;
                    width: fit-content;
                    padding: 30px 0;
                }

                #algebraicSolver .output-container::-webkit-scrollbar {
                    height: 8px;
                }
                #algebraicSolver .output-container::-webkit-scrollbar-track {
                    background: var(--scrollBar_bg);
                    border-radius: 0px;
                }
                #algebraicSolver .output-container::-webkit-scrollbar-thumb {
                    background: var(--scrollBar);
                    border-radius: 0px;
                }
                #algebraicSolver .output-container::-webkit-scrollbar-thumb:hover {
                    background: var(--scrollBar_hover);
                }

                mjx-assistive-mml {
                    display: none !important;
                }

                #algebraicSolver .input-container {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin-top: 20px;
                    margin-bottom: 10px;
                }

                #algebraicSolver .title {
                    margin-top: 50px; 
                    margin-bottom: 10px; 
                    display: block; 
                    font-size: 15px; 
                }
                
                #algebraicSolver .inputBar {
                    width: 700px;
                    height: 40px;
                    padding: 10px;
                    padding-right: 40px;
                    border: none;
                    cursor: pointer;
                    transition: background-color 0.3s, color 0.3s;
                    font-size: 13px;
                    background-color: var(--panel-light);
                    box-shadow: 0 0 20px var(--panel_border);
                    color: #000;
                }

                #algebraicSolver .button-container {
                    width: 700px;
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
                    #algebraicSolver .inputBar, #algebraicSolver .button-container {
                        width: 80vw;
                    }
                }
            `}</style>
        </div>
    );
}

export default AlgebraicSolver;
