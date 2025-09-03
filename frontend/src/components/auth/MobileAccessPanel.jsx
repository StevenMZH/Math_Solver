import { useState, useEffect } from "react";
import Logo4 from "../header/logos/Logo4";
import AccessForm from "./AccessForm";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { useResetAuthForm } from "../../hooks/auth/useResetAuthForm";

export function MobileAccessPanel() {
    const {isAuthFormVisible} = useAuthFormContext();
    const [showTransition, setShowTransition] = useState(false);
    const {resetAuthForm} = useResetAuthForm();

    useEffect(() => {
        if (isAuthFormVisible) {
            setTimeout(() => setShowTransition(true), 10); // Pequeño retraso para activar la transición
        } else {
            setShowTransition(false);
        }
    }, [isAuthFormVisible]);

    return isAuthFormVisible && (
        <div className="login-container">
                <div className={`panelContainer login ${showTransition ? 'slice-transition' : ''}`}>
                    <div className="floating-panel login-exit">
                        <button onClick={() => { resetAuthForm }}> 
                            <img src="./public/images/global/exit.png" alt="exit-login"/> 
                        </button>
                    </div>
                    
                    <Logo4/>
                    <div className="login-forms">
                        <AccessForm/>
                        <LoginForm/>
                        <SignupForm/>
                    </div>
                </div>

                <div className="panel-shadder">
                    <button onClick={() => { resetAuthForm }}> </button>
                </div>
            <style>{`
                .login-container {
                    position: fixed;
                    top: 0;
                    left: 0;

                    display: flex;
                    flex-direction: column-reverse;
                    justify-content: end;
                    align-items: center;
                    
                    width: 100%;
                    height: 100%;
                    min-height: 100vh;
                    z-index: 2000;
                    background-color: #000a;

                }
                .panel-shadder {
                    width: 100%;
                    height: 100%;
                }
                .panel-shadder button {
                    width: 100%;
                    height: 100%;
                    background-color: #0000;
                    border-radius: 0;                
                }
                .login {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 20px;

                    opacity: 0;
                    width: 90vw;
                    overflow: hidden;

                    height: 100%;
                    margin: 0;
                    padding: 15px 20px;
                    border-radius: 10px 0 0 10px;
                    background-color: var(--background);    
                    box-shadow: 0 0 20px var(--panel_border);

                    transition: width 0.3s ease-in-out, opacity 0.5s ease-in-out;
                }
                .slice-transition {
                    opacity: 1;
                    width: 450px;
                    max-width: 450px;
                }

                .login-forms {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                }
                .access-form, .login-form, .signUp-form {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    margin-top: 5px;
                    margin-bottom: 20px;
                    gap: 10px;
                }


                .login-forms label {
                    margin-bottom: 10px;
                }

                .login-forms input {
                    font-size: 14px;
                }

                .login-forms .signup-email {
                    margin-bottom: 8px;
                }

                .login-forms .buttons {
                    display: flex;
                    flex-direction: row-reverse;
                    justify-content: center;
                    align-items: center;
                    margin-top: 20px;
                    gap: 5px;
                    width: 100%;
                    height: 100%;
                }

                .login-forms .buttons button {
                    width: 100%;
                    height: 100%;
                    padding: 10px;
                    box-shadow: 0 0 10px var(--panel_border);
                }
                
                .login-forms .buttons .panel-return {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 40px;
                    padding: 0;
                }
                .login-forms .panel-return img {
                    width: 16px;
                    height: 16px;
                }

                .login-exit {
                    position: absolute;
                    top: 0;
                    right: 0;
                    margin: 20px;
                    padding: 0;
                    align-items: center;    
                }
                .login-exit button {
                    display: flex;
                    border-radius: 10px;
                    justify-content: center;
                    align-items: center;    
                    margin: 0;
                    padding: 5px;
                    width: 35px;
                    height: 35px;
                }
                .login-exit button:hover, .login-return button:hover {
                    background-color: #d55;
                }
                .login-exit img {
                    width: 32px;
                }
                .side-img {
                    min-width: 100vw;
                    background-color: #000;
                }

                .error {
                    color: #dd6688;
                }

            `}</style>
        </div>
    );
};

export default MobileAccessPanel;
