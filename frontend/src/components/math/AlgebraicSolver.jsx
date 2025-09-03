import { useState, useEffect } from 'react';
import axios from 'axios';
import { Loading_floatingPanel } from '../assets/transitionPages';
import Logo6 from '../assets/logos/Logo6';
import { LoadingAnimXS } from '../assets/anims';

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
            const response = await axios.post(`${window._env_.REACT_APP_API_URL}/api/simplify/`, { equation: input });
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
            {start && loading && <Loading_floatingPanel/>}

            {output && (
                <div className="panel center">
                    <button className='box-floating m10 button-alpha' onClick={() => navigator.clipboard.writeText(output)}> 
                        <img className='img-size20 img-themes' src="/images/global/copy.png" alt="copy" /> 
                    </button>
                    
                    <div className='scrollBar-x'>
                        <label id="mathOutput">{`\\(${inputLatex}  =  ${output}\\)`}</label>
                     </div>   
                </div>
            )}

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <form onSubmit={handleSubmit} className='box center'>
                {start && <Logo6/>}
                <div className="box input-container center">
                    <div className="fullwidth end">
                        <input type="text" name="math_problem" className='inputBar' placeholder="Type equation here" value={input} onChange={(e) => setInput(e.target.value)} />
                        <button type="submit" className='submitButton' data-lang-key="Algebra_Calculus.send">
                            <img className='searchIcon' src='/images/global/search.png' alt="search" />
                        </button>
                        {!start && loading &&<LoadingAnimXS/>}
                    </div>
                </div>
            </form>

            <style>{`

                #algebraicSolver .panel {
                    min-heightss: 60vh;
                    padding: 20px 25px;
                    padding-bottom: 10px;
                }

                #algebraicSolver #mathOutput {
                    display: flex;
                    align-items: center;
                    min-width: 100%;
                    min-height: 60vh;
                    width: fit-content;
                    padding: 30px 0;
                }

                mjx-assistive-mml {
                    display: none !important;
                }

                #algebraicSolver .input-container {
                    position: relative;
                    width: 700px;
                    height: 40px;
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
                    width: 100%;
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

                #algebraicSolver .loadingAnimXS-container {
                    position: absolute;
                    top: 50%;
                    right: -25px;
                    transform: translate(0%, -50%);
                }

                #algebraicSolver .submitButton {
                    position: absolute;
                    top: 50%;
                    right: 0;
                    transform: translate(0%, -50%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: #00000000;
                    margin-right: 5px;
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
                    #algebraicSolver .input-container{
                        width: 80vw;
                    }
                }
            `}</style>
        </div>
    );
}

export default AlgebraicSolver;
