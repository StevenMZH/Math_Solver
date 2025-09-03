import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthFormContext } from "../../context/AuthFormContext";

export const useLogin = () => {
    const navigate = useNavigate();
    const {
        formEmail,
        formPassword, setFormPassword,
        setFormUsername,
        setFormType,
        setFormError,
        setIsAuthFormVisible
    } = useAuthFormContext();

    const clearLoginForm = () => {
        setFormUsername("");
        setFormPassword("");
        setFormType("access");
        setFormError(null);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setFormError(null);

        try {
            const response = await axios.post("http://127.0.0.1:8000/account/login/", {
                email: formEmail,
                password: formPassword
            });
            // console.log(response)
            if (response.data.access) {
                localStorage.setItem("accessToken", response.data.access);
                localStorage.setItem("refreshToken", response.data.refresh);
                setIsAuthFormVisible(false);
                clearLoginForm();
                
                window.location.href = "/profile";
            }
        } catch (err) {
            setFormPassword("");
            setFormError("Incorrect email or password");
        }
    };

    return { handleLogin, clearLoginForm };
};
