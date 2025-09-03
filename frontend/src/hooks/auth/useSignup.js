import axios from "axios";
import { useAuthFormContext } from "../../context/AuthFormContext";
import { useLogin } from "./useLogin";

export const useSignup = () => {
    const {
        formUsername,
        formEmail,
        formPassword, setFormPassword,
        formConfirmPassword, setFormConfirmPassword,
        setFormError,
        setIsAuthFormVisible
    } = useAuthFormContext();

    const { handleLogin } = useLogin(setIsAuthFormVisible);

    const handleSignUp = async (e) => {
        e.preventDefault();
        setFormError(null);

        if (formPassword !== formConfirmPassword) {
            setFormPassword("");
            setFormConfirmPassword("");
            setFormError("Passwords do not match");
            return;
        }

        try {
            // console.log(formUsername, formEmail, formPassword)
            const response = await axios.post(`${window._env_.REACT_APP_API_URL}/account/register/`, {
                username: formUsername,
                email: formEmail,
                password: formPassword,
            });

            if (response.data) {
                await handleLogin(e); // login automático después de registrar
            }
        } catch (err) {
            if (err.response && err.response.data) {
                const errorData = err.response.data;
        
                const firstField = Object.keys(errorData)[0];
                const firstError = errorData[firstField][0];
        
                setFormError(`${firstField}: ${firstError}`);
            } else {
                setFormError("Unexpected error. Please try again.");
            }
        }
    };

    return { handleSignUp };
};
