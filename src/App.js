import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Post from "./Components/Post";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import UserContext from "./Contexts/UserContext";
import { useState } from "react";
import Timeline from "./Pages/Timeline";
import UserPage from "./Pages/UserPage";

export default function App() {
  const [user, setUser] = useState();
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/user/:id" element={<UserPage />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
