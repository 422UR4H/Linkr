import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Components/Molecules/Header.jsx";
import TimelinePage from "./Pages/TimelinePage.jsx";
import UserPage from "./Pages/UserPage.jsx";
import Register from "./Pages/RegisterPage.jsx";
import Hashtags from "./Pages/Hashtags.jsx";
import Login from "./Pages/LoginPage.jsx";
import { TrendingProvider } from "./Contexts/TrendingContext.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <TrendingProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/sign-up" element={<Register />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/user/:id" element={<UserPage />} />
          <Route path="/hashtag/:hashtag" element={<Hashtags />} />
        </Routes>
      </TrendingProvider>
    </BrowserRouter>
  );
}