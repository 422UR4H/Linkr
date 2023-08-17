import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Login from "./Pages/Login";
import UserPage from "./Pages/UserPage.jsx";
import Register from "./Pages/Register.jsx";
import Timeline from "./Pages/Timeline.jsx";

export default function App() {
  return (
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/sign-up" element={<Register />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/user/:id" element={<UserPage />} />
          </Routes>
        </BrowserRouter>
  );
}
