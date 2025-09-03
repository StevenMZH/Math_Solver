import { useAuthFormContext } from "../../context/AuthFormContext";
import { useInitAuthForm } from "../../hooks/auth/useInitAuthForm";
import { useLogin } from "../../hooks/auth/useLogin";
import { useResetAuthForm } from "../../hooks/auth/useResetAuthForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function LoginForm () {
    const {             
        formEmail,
        formPassword, setFormPassword,
        formType,
        formError, setFormError
    } = useAuthFormContext();

    const { handleLogin, clearLoginForm } = useLogin();

    return formType==="login" && (
        <form className="center login-form" onSubmit={handleLogin}>
            <div className="box center gap-0">
                <label className="text-title">Welcome Back!</label>
                <label className="text-subtitle">Log In with the {formEmail}'s Password</label>
            </div>

            {formError && <p className="text-subtitle error">{formError}</p>}
            <input className="fullwidth Stext-focus" type="password" placeholder="Password" value={formPassword} onChange={(e) => setFormPassword(e.target.value)} required />

            <div className="buttons">
                <button className="button-square text-title" type="submit">Log In</button>
                <button className="button-square panel-return" onClick={clearLoginForm}> 
                    <img className="img-themes" src="/images/global/return.png" alt="return"/> 
                </button>
            </div>
        </form>
    );
};
export default LoginForm;
