import { useAuthFormContext } from "../../context/AuthFormContext";
import { useInitAuthForm } from "../../hooks/auth/useInitAuthForm";
import { useResetAuthForm } from "../../hooks/auth/useResetAuthForm";
import { useSignup } from "../../hooks/auth/useSignup";

export function SignupForm() {
    const {             
        formUsername, setFormUsername,
        formPassword, setFormPassword,
        formEmail, setFormEmail,
        formConfirmPassword, setFormConfirmPassword,
        formType,
        formError,
    } = useAuthFormContext();

    const { handleSignUp } = useSignup();
    const { initAuthForm } = useInitAuthForm();
    

    return formType === "signup" && (
        <form className="signUp-form center" onSubmit={handleSignUp}>
            <div className="box center gap-0">
                <label className="text-title">Get Started!</label>
                <label className="text-subtitle">Sign Up for your new Account</label>
            </div>

            {formError && <p className="text-subtitle error">{formError}</p>}
            <input className="fullwidth text-focus" type="text" placeholder="Username" value={formUsername} onChange={(e) => setFormUsername(e.target.value)} required />
            <input className="fullwidth text-focus" type="email" placeholder="Email Address" value={formEmail} onChange={(e) => setFormEmail(e.target.value)} required />
            <input className="fullwidth text-focus" type="password" placeholder="Password" value={formPassword} onChange={(e) => setFormPassword(e.target.value)} required />
            <input className="fullwidth text-focus" type="password" placeholder="Confirm Password" value={formConfirmPassword} onChange={(e) => setFormConfirmPassword(e.target.value)} required />

            <div className="buttons">
                <button className="button-square text-title" type="submit">Sign Up</button>
                <button className="panel-return button-square" type="button" onClick={initAuthForm}>
                    <img className="img-themes" src="/images/global/return.png" alt="return" />
                </button>
            </div>
        </form>
    );
};

export default SignupForm;
