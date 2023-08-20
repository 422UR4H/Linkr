import { createContext, useState } from "react";

const TrendingContext = createContext();

export function TrendingProvider({ children }) {
    const [trendingHashtags, setTrendingHashtags] = useState([]);

    return (
        <TrendingContext.Provider value={{ trendingHashtags, setTrendingHashtags }}>
            {children}
        </TrendingContext.Provider>
    );
}
export default TrendingContext;