import { AccountProvider } from "./context/accountContext";
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
