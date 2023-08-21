import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TrendingProvider } from "./Contexts/TrendingContext.jsx";
import Header from "./Components/Molecules/Header.jsx";
import UserPage from "./Pages/UserPage.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import TimelinePage from "./Pages/TimelinePage.jsx";
import RegisterPage from "./Pages/RegisterPage.jsx";
import HashtagsPage from "./Pages/HashtagsPage.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <TrendingProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/sign-up" element={<RegisterPage />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/user/:id" element={<UserPage />} />
          <Route path="/hashtag/:hashtag" element={<HashtagsPage />} />
        </Routes>
      </TrendingProvider>
    </BrowserRouter>
  );
}