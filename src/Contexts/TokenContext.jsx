import { createContext, useState } from "react";

const TokenContext = createContext();

export function TokenProvider({ children }) {
    const lsToken = JSON.parse(localStorage.getItem("token"));
    const [token, setToken] = useState(lsToken?.token);

    function login(auth) {
        setToken(auth.token);
        localStorage.setItem("token", JSON.stringify(auth));
    }

    function logout() {
        setToken(null);
        localStorage.removeItem("token");
    }

    return (
        <TokenContext.Provider value={{ token, login, logout }}>
            {children}
        </TokenContext.Provider>
    );
}
export default TokenContext;