import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAccessContext } from "./AccessContext";

export function SignupForm({ isVisible, setIsVisible }) {
    const navigate = useNavigate();
    const {
        username, setUsername,
        password, setPassword,
        email, setEmail,
        confirmPassword, setConfirmPassword,
        form, setForm,
        error, setError
    } = useAccessContext();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.post("http://127.0.0.1:8000/account/auth/login/", {
                email,
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
            setPassword("");
            setError("Incorrect email or password");
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
            const response = await axios.post("http://127.0.0.1:8000/account/auth/registration/", {
                username,
                email,
                password: password,
            });

            if (response.data?.key) {
                await handleLogin(e); // login automático después de registrar
            }
        } catch (error) {
            setError("Account not created, please check your information");
        }
    };

    return form === "signup" && (
        <form className="signUp-form center" onSubmit={handleSignUp}>
            <div className="box center gap-0">
                <label className="text-title">Get Started!</label>
                <label className="text-subtitle">Sign Up for your new Account</label>
            </div>

            {error && <p className="text-subtitle error">{error}</p>}
            <input className="fullwidth text-focus" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            <input className="fullwidth text-focus" type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input className="fullwidth text-focus" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <input className="fullwidth text-focus" type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />

            <div className="buttons">
                <button className="button-square text-title" type="submit">Sign Up</button>
                <button className="panel-return button-square" type="button" onClick={() => {
                    setForm("access");
                    setError("");
                    setUsername("");
                    setPassword("");
                    setConfirmPassword("");
                    setEmail("");
                }}>
                    <img className="img-themes" src="./public/images/global/return.png" alt="return" />
                </button>
            </div>
        </form>
    );
};

export default SignupForm;
