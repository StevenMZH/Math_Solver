import axios from "axios";
import { useAccessContext } from "./AccessContext";

import GoogleAccessBtn from "./GoogleAccessBtn";
import GithubAccessBtn from "./GithubAccessBtn";

export function AccessForm ({ isVisible, setIsVisible }) {
    const { username, setUsername, password, setPassword, email, setEmail, confirmPassword, setConfirmPassword, form, setForm, error, setError} = useAccessContext();

    const handleAccess = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.get(`http://127.0.0.1:8000/dataBase/check_user/${username}/`);
            
            if (response.data.exists) {
                setForm("login");
                console.log(response.data);
            } else {
                setForm("signup");
            }
        } catch (error) {
            setError("Error verifying user,   please try again");
            setUsername("");
        }
    };

    return form==="access" && (
        <form className="access-form" onSubmit={handleAccess}>
            <label className="text-title"></label>
            <label className="text-title">Hello, Enter your Username</label>
            <label className="text-subtitle">Log In or Sign Up for an Account</label>

            {error && <p className="text-subtitle error">{error}</p>}
            <input className="text-focus" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />

            <div className="buttons">
                <button className="text-title" type="submit">Continue</button>
            </div>    
            <div className="social-login">
                    <GoogleAccessBtn/>
                    <GithubAccessBtn/>
            </div>

        </form>
    );
};
export default AccessForm;
