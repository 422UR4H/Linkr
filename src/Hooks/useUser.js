import { useContext } from "react";
import UserContext from "../Contexts/UserContext.jsx";

export default function useUser() {
    return useContext(UserContext);
}