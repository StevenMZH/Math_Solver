import { useAuthFormContext } from "../../context/AuthFormContext"

export const useResetAuthForm = () => {
    const {
        setFormUsername,
        setFormPassword,
        setFormEmail,
        setFormConfirmPassword,
        setFormType,
        setFormError,
        setIsAuthFormVisible
    } = useAuthFormContext();

    const resetAuthForm = () => {
        setIsAuthFormVisible(false);
        setFormType("access");
        setFormError(null);
        setFormUsername("");
        setFormPassword("");
        setFormConfirmPassword("");
        setFormEmail("");
    };

    return { resetAuthForm };
};
