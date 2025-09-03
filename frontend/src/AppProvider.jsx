import { AccountProvider } from "./context/AccountContext";
import { AuthProvider } from "./context/AuthFormContext";

const AppProviders = ({ children }) => {
    return (
        <AuthProvider>
            <AccountProvider>
                {children}
            </AccountProvider>
        </AuthProvider>
    );
};

export { AppProviders };
