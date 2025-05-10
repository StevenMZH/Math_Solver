import axios from "axios";
import GoogleAccessBtn from "./GoogleAccessBtn";
import { useAuthFormContext } from "../../context/AuthFormContext";

export function AccessForm() {
    const {             
        formEmail, setFormEmail,
        formType, setFormType,
        formError, setFormError,
    } = useAuthFormContext();

    const handleAccess = async (e) => {
        e.preventDefault();
        setFormError(null);

        try {
            const response = await axios.get(`http://127.0.0.1:8000/account/check_user/${formEmail}/`);

            if (response.data.exists) { setFormType("login"); } 
            else { setFormType("signup"); }

        } catch (formError) {
            setFormError("Error verifying user,   please try again");
            setFormEmail("");
        }
    };

    return formType==="access" && (
        <form className="access-form center" onSubmit={handleAccess}>
            <div className="box center gap-0">
                <label className="text-title">Hello, Enter your Username</label>
                <label className="text-subtitle">Log In or Sign Up for an Account</label>            
            </div>

            {formError && <p className="text-subtitle error">{formError}</p>}
            <input className="fullwidth text-focus" type="text" placeholder="Email" value={formEmail} onChange={(e) => setFormEmail(e.target.value)} required />

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
