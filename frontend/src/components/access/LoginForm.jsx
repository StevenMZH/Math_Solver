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
            console.log(email, password);
            const response = await axios.post("http://127.0.0.1:8000/account/login/", {
                email,
                password
            });

            if (response.data) {
                console.log(response.data)
                localStorage.setItem("accessToken", response.data.access);
                localStorage.setItem("refreshToken", response.data.refresh);
                setIsVisible(false);
                setForm("access");
                setUsername("");
                setPassword("");
                navigate("/profile");
            }
        } catch (error) {
            setPassword("");
            setError("Incorrect email or password");
        }
    };

    return form==="login" && (
        <form className="center login-form" onSubmit={handleLogin}>
            <div className="box center gap-0">
                <label className="text-title">Welcome Back!</label>
                <label className="text-subtitle">Log In with the {username}'s Password</label>
            </div>

            {error && <p className="text-subtitle error">{error}</p>}
            <input className="fullwidth Stext-focus" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />

            <div className="buttons">
                <button className="button-square text-title" type="submit">Log In</button>
                <button className="button-square panel-return" onClick={() => { setForm("access"); setError(""); setUsername("");  setPassword(""); setConfirmPassword(""); setEmail(""); }}> 
                    <img className="img-themes" src="./public/images/global/return.png" alt="return"/> 
                </button>
            </div>
        </form>
    );
};
export default LoginForm;
