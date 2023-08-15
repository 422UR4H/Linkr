import { useContext } from "react";
import TokenContext from "../Contexts/TokenContext.jsx";

export default function useToken() {
    return useContext(TokenContext);
}