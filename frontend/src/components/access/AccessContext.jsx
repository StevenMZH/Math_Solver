import { createContext, useState, useContext } from "react";

export const AccessContext = createContext();

export function AccessProvider ({ children }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [form, setForm] = useState("access");
    const [error, setError] = useState(null);

  return (
    <AccessContext.Provider value={{ username, setUsername, password, setPassword, email, setEmail, confirmPassword, setConfirmPassword, form, setForm, error, setError}}>
      {children}
    </AccessContext.Provider>
  );
};

export const useAccessContext = () => useContext(AccessContext);

