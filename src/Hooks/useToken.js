import { useContext } from "react";
import TokenContext from "../contexts/TokenContext.jsx";

export default function useToken() {
    return useContext(TokenContext);
}