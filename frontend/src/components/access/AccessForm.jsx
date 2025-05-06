import axios from "axios";
import { useAccessContext } from "./AccessContext";
import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleAccessBtn from "./GoogleAccessBtn";


export function AccessForm ({ isVisible, setIsVisible }) {
    const { username, setUsername, password, setPassword, email, setEmail, confirmPassword, setConfirmPassword, form, setForm, error, setError} = useAccessContext();

    const handleAccess = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.get(`http://127.0.0.1:8000/account/check_user/${email}/`);
            
            if (response.data.exists) {
                setForm("login");
                console.log(response.data);
            } else {
                setForm("signup");
            }
        } catch (error) {
            setError("Error verifying user,   please try again");
            setEmail("");
        }
    };

    return form==="access" && (
        <form className="access-form center" onSubmit={handleAccess}>
            <div className="box center gap-0">
                <label className="text-title">Hello, Enter your Username</label>
                <label className="text-subtitle">Log In or Sign Up for an Account</label>            
            </div>

            {error && <p className="text-subtitle error">{error}</p>}
            <input className="fullwidth text-focus" type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />

            <div className="buttons">
                <button className="button-square text-title" type="submit">Continue</button>
            </div>    
            <div className="fullwidth social-login">
                    <GoogleAccessBtn/>
                    {/* <GithubAccessBtn/> */}
            </div>

        </form>
    );
};
export default AccessForm;
