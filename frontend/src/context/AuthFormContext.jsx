import { createContext, useContext, useState } from 'react';

const AuthFormContext = createContext();

export const AuthProvider = ({ children }) => {
    const [formUsername, setFormUsername] = useState("");
    const [formPassword, setFormPassword] = useState("");
    const [formEmail, setFormEmail] = useState("");
    const [formConfirmPassword, setFormConfirmPassword] = useState("");
    const [formType, setFormType] = useState("access"); // "access" o "register"
    const [formError, setFormError] = useState(null);
    const [isAuthFormVisible, setIsAuthFormVisible] = useState(false);

    return (
        <AuthFormContext.Provider value={{
            formUsername, setFormUsername,
            formPassword, setFormPassword,
            formEmail, setFormEmail,
            formConfirmPassword, setFormConfirmPassword,
            formType, setFormType,
            formError, setFormError,
            isAuthFormVisible, setIsAuthFormVisible
        }}>
            {children}
        </AuthFormContext.Provider>
    );
};

export const useAuthFormContext = () => useContext(AuthFormContext);
