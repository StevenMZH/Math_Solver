import { useAuthFormContext } from "../../context/AuthFormContext"

export const useInitAuthForm = () => {
    const {
        setFormUsername,
        setFormPassword,
        setFormConfirmPassword,
        setFormType,
        setFormError,
    } = useAuthFormContext();

    const initAuthForm = () => {
        setFormType("access");
        setFormError(null);
        setFormUsername("");
        setFormPassword("");
        setFormConfirmPassword("");
    };

    return { initAuthForm };
};
