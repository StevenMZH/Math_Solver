import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Logo4 from "../components/header/logos/logo4";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
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
                navigate("/profile"); // Redirige al dashboard tras un login exitoso
            }
        } catch (error) {
            setError("Credenciales incorrectas. Inténtalo de nuevo.");
        }
    };

    return (
        <div className="pageContainer">
            <div className="login-container">
                <div className="panelContainer login">
                    <Logo4/>
                    {error && <p className="error">{error}</p>}
                    <form onSubmit={handleSubmit} className="login-form">
                        <input type="text" placeholder="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <button type="submit">Login</button>
                    </form>
                    <div className="side-img">

                    </div>
                </div>

            </div>

            <style>{`
                .login-container {
                    display: grid;
                    width: 100%;
                    grid-template-columns: repeat(2, 1fr);
                }
                .login {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    flex-direction: column;
                    align-items: left;
                    justify-content: center;
                    min-height: 100vh;
                    margin: 0;
                    border-radius: 0 10px 10px 0;
                    background-color: #eee;
                }

                .login-form {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                }

            `}</style>
        </div>
    );
};

export default Login;
