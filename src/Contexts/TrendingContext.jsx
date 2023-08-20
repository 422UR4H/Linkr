import { createContext, useState } from "react";

const TrendingContext = createContext();

export function TrendingProvider({ children }) {
    const [trendingHashtags, setTrendingHashtags] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    function updateTrendingHashtags() {

    }

    return (
        <TrendingContext.Provider value={{ trendingHashtags, setTrendingHashtags }}>
            {children}
        </TrendingContext.Provider>
    );
}
export default TrendingContext;