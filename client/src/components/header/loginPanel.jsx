import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Logo4 from "./logos/logo4";

const LoginPanel = ({ isVisible, setIsVisible }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const [phase, setPhase] = useState("access");
    const navigate = useNavigate();

    const handleAccess = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.get(`http://127.0.0.1:8000/dataBase/check_user/${username}/`);
            
            if (response.data.exists) {
                setPhase("login");
                console.log(response.data);
            } else {
                setPhase("signup");
            }
        } catch (error) {
            setError("Error verifying user,   please try again");
            setUsername("");
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.post("http://127.0.0.1:8000/dataBase/token/", {
                username,
                password
            });

            if (response.data.access) {
                localStorage.setItem("accessToken", response.data.access);
                localStorage.setItem("refreshToken", response.data.refresh);
                setIsVisible(false);
                setUsername("");
                setPassword("");
                navigate("/profile");
            }
        } catch (error) {
            setPassword("");
            setError("Incorrect Password, Auth Failed");
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
            setPassword("");
            setConfirmPassword("");
            setError("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post("http://127.0.0.1:8000/dataBase/register/", {
                username,
                email,
                password
            });

            if (response.data.success) {
                setConfirmPassword("");
                setEmail("");

                await handleLogin(e);
            }
        } catch (error) {
            setError("Account not created, Auth Failed");
        }
    };

    return isVisible && (
        <div className="login-container">
                <div className="panelContainer login">
                    <Logo4/>
                    <div className="login-forms">
                        {phase==="access" && (
                            <form className="access-phases" onSubmit={handleAccess}>
                                <label className="text-title"></label>
                                <label className="text-title">Hello, Enter your Username</label>
                                <label className="text-subtitle">Log In or Sign Up for an Account</label>

                                {error && <p className="text-subtitle error">{error}</p>}
                                <input className="text-focus" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                                
                                <button className="text-title" type="submit">Continue</button>
                            </form>
                        )}

                        {phase==="login" && (
                            <form className="login-form" onSubmit={handleLogin}>
                                <label className="text-title">Welcome Back!</label>
                                <label className="text-subtitle">Log In with the {username}'s Password</label>

                                {error && <p className="text-subtitle error">{error}</p>}
                                <input className="text-focus" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />

                                <button className="text-title" type="submit">Log In</button>
                            </form>
                        )}
                          
                        {phase==="signup" && (
                            <form className="signUp-form" onSubmit={handleSignUp}>
                                <label className="text-title">Get Started!</label>
                                <label className="text-subtitle">Enter a Password for your new Account</label>


                                {error && <p className="text-subtitle error">{error}</p>}
                                <input className="text-focus" type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                <input className="text-focus" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                <input className="text-focus" type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />

                                <button className="text-title" type="submit">Sign Up</button>
                            </form>
                        )}
                    </div>
                    
                    <div className="floating-panel login-exit">
                        <button onClick={() => { setIsVisible(false); setPhase("access"); setError("");}}> 
                            <img src="/public/images/exit.png" alt="exit-login"/> 
                        </button>
                    </div>
                </div>

                <div className="panel-shadder">
                    <button onClick={() => { setIsVisible(false); setPhase("access"); setError("");}}> </button>
                </div>


            <style>{`
                .login-container {
                    position: fixed;
                    top: 0;
                    left: 0;

                    display: flex;
                    flex-direction: row-reverse;
                    justify-content: end;
                    align-items: center;
                    
                    width: 100%;
                    height: 100%;
                    min-height: 100vh;
                    z-index:2000;
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
                    
                    width: 450px;
                    height: 100%;
                    margin: 0;
                    padding: 15px 20px;
                    border-radius: 10px 0 0 10px;
                    background-color: var(--background);    
                    box-shadow: 0 0 20px var(--panel_border);
                }

                .login-forms {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                }
                .access-phases, .login-form, .signUp-form {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    margin-top: 5px;
                    margin-bottom: 30px;
                    gap: 10px;
                }


                .login-forms label {
                    margin-bottom: 10px;
                }

                .login-forms input {
                    background-color: var(--panel1);
                    font-size: 14px;
                    padding: 10px;
                }

                .login-forms button {
                    margin-top: 20px;
                    padding: 10px;
                    box-shadow: 0 0 10px var(--panel_border);
                }
                
                .login-exit {
                    position: fixed;
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
                .login-exit button:hover {
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

export default LoginPanel;
