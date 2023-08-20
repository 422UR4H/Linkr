import { useContext } from "react";
import TrendingContext from "../Contexts/TrendingContext.jsx";

export default function useTrending() {
    return useContext(TrendingContext);
}