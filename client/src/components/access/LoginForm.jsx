import axios from "axios";
import { useAccessContext } from "./AccessContext";
import { useNavigate } from "react-router-dom";

export function LoginForm ({ isVisible, setIsVisible }) {
    const navigate = useNavigate();
    const { username, setUsername, password, setPassword, email, setEmail, confirmPassword, setConfirmPassword, form, setForm, error, setError} = useAccessContext();
    
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
                setForm("access");
                setUsername("");
                setPassword("");
                navigate("/profile");
            }
        } catch (error) {
            console.log(error)
            setPassword("");
            setError("Incorrect Password, Auth Failed");
        }
    };

    return form==="login" && (
        <form className="login-form" onSubmit={handleLogin}>
            <label className="text-title">Welcome Back!</label>
            <label className="text-subtitle">Log In with the {username}'s Password</label>

            {error && <p className="text-subtitle error">{error}</p>}
            <input className="text-focus" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />

            <div className="buttons">
                <button className="text-title" type="submit">Log In</button>
                <button className="panel-return" onClick={() => { setForm("access"); setError(""); setUsername("");  setPassword(""); setConfirmPassword(""); setEmail(""); }}> 
                    <img src="/public/images/return.png" alt="return"/> 
                </button>
            </div>
        </form>
    );
};
export default LoginForm;
