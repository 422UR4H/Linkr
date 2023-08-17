import { createContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
    const lsUser = JSON.parse(localStorage.getItem("user"));    
    const [user, setUser] = useState(lsUser?.user);

    function putUser(data) {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data));
    }

    function deleteUser() {
        setUser(null);
        localStorage.removeItem("user");
    }

    return (
        <UserContext.Provider value={{ user, setUser, putUser, deleteUser }}>
            {children}
        </UserContext.Provider>
    );
}
export default UserContext;