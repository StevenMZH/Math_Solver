import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import HomeNav from '../components/nav/homeNav';
import Footer from '../components/global/footer';

export function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/api/login/', {
                username,
                password,
                remember_me: rememberMe,
            });

            if (response.status === 200) {
                const data = response.data;
                // Manejar token, sesión o redirección según sea necesario
                console.log('Login exitoso:', data);
                // Ejemplo: Guardar el token en localStorage
                localStorage.setItem('token', data.token);
            }
        } catch (error) {
            if (error.response) {
                // Error del servidor o credenciales inválidas
                console.error('Error en la autenticación:', error.response.data);
            } else {
                // Error de conexión o de red
                console.error('Error de red:', error.message);
            }
        }
    };

    return (
        <div className="pageContainer">
            <header>
                <HomeNav />
            </header>

            <main className='flexCenter'>
                <form className="panelContainer loginContainer" onSubmit={handleLogin}>
                    <div className='topForm'>
                        <h2>Log In</h2>
                    </div>
                    <div className='flexCenter centerForm'>
                        <div className='y-margin'>
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        </div>
                        <div className='y-margin'>
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <div className='y-margin'>
                            <input type="checkbox" id="remember-me" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                            <label htmlFor="remember-me">Remember me</label>
                        </div>
                        <Link to="/forgot-password" className="links">Forgot password?</Link>
                    </div>
                    <div className='bottomForm'>
                        <button type="submit" className="loginButton">Login</button>
                    </div>
                </form>
            </main>

            <Footer />

            <style>{`
                .loginContainer {
                    width: 30vw;
                    height: 60vh;
                    padding: 40px;
                    display: flex;
                    flex-direction: column;
                }
                .topForm{
                    width:100%;
                    justify-content: start;
                }
                .centerForm{
                    width:100%;
                    height: 100%;
                    justify-content: center;
                    flex-direction: column;
                }
                .bottomForm{
                    width:100%;
                    justify-content: end;
                }
                .y-margin {
                    margin: 10px 0;
                }
            `}</style>
        </div>
    );
}

export default Login;
