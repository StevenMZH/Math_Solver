import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import HomeNav from '../components/nav/homeNav';
import Footer from '../components/global/footer';

export function AuthPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false); // Estado para alternar entre login y sign up
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleAuth = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');

        if (isSignUp && password !== confirmPassword) {
            setErrorMessage('Las contraseñas no coinciden.');
            setLoading(false);
            return;
        }

        const url = isSignUp
            ? 'http://localhost:8000/api/signup/'
            : 'http://localhost:8000/api/login/';

        const payload = { username, password };
        if (isSignUp) payload.confirm_password = confirmPassword;

        try {
            const response = await axios.post(url, payload);

            if (response.status === 201 || response.status === 200) {
                const data = response.data;
                console.log(isSignUp ? 'Registro exitoso:' : 'Login exitoso:', data);

                // Guardar token en sessionStorage
                sessionStorage.setItem('token', data.token);

                // Redirigir tras login/registro exitoso
                navigate('/dashboard');
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.detail || 'Error en la autenticación.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pageContainer">
            <header>
                <HomeNav />
            </header>

            <main className='flexCenter'>
                <form className="panelContainer authContainer" onSubmit={handleAuth}>
                    <div className='topForm'>
                        <h2>{isSignUp ? 'Sign Up' : 'Log In'}</h2>
                    </div>

                    <div className='flexCenter centerForm'>
                        <div className='y-margin'>
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className='y-margin'>
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {isSignUp && (
                            <div className='y-margin'>
                                <label htmlFor="confirm-password">Confirm Password</label>
                                <input
                                    type="password"
                                    id="confirm-password"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                        )}
                        {!isSignUp && (
                            <div className='y-margin checkbox-container'>
                                <input
                                    type="checkbox"
                                    id="remember-me"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                />
                                <label htmlFor="remember-me">Remember me</label>
                            </div>
                        )}
                        <Link to="/forgot-password" className="links">Forgot password?</Link>
                    </div>

                    {errorMessage && <p className="error-message">{errorMessage}</p>}

                    <div className='bottomForm'>
                        <button type="submit" className="authButton" disabled={loading}>
                            {loading ? (isSignUp ? 'Signing Up...' : 'Logging in...') : isSignUp ? 'Sign Up' : 'Login'}
                        </button>
                    </div>

                    <p className="toggleAuth">
                        {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
                        <span onClick={() => setIsSignUp(!isSignUp)} className="toggleLink">
                            {isSignUp ? 'Log In' : 'Sign Up'}
                        </span>
                    </p>
                </form>
            </main>

            <Footer />

            <style>{`
                .authContainer {
                    width: 30vw;
                    height: auto;
                    padding: 40px;
                    display: flex;
                    flex-direction: column;
                }
                .topForm {
                    width: 100%;
                    justify-content: start;
                }
                .centerForm {
                    width: 100%;
                    height: auto;
                    justify-content: center;
                    flex-direction: column;
                }
                .bottomForm {
                    width: 100%;
                    justify-content: end;
                }
                .y-margin {
                    margin: 10px 0;
                }
                .checkbox-container {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                }
                .error-message {
                    color: red;
                    text-align: center;
                    margin-top: 10px;
                }
                .authButton:disabled {
                    background-color: #ccc;
                    cursor: not-allowed;
                }
                .toggleAuth {
                    text-align: center;
                    margin-top: 15px;
                }
                .toggleLink {
                    color: blue;
                    cursor: pointer;
                    font-weight: bold;
                }
                .toggleLink:hover {
                    text-decoration: underline;
                }
            `}</style>
        </div>
    );
}

export default AuthPage;
