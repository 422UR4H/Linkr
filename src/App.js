import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Post from "./Components/Post";
import ResetStyle from "./Styles/ResetStyle";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import UserContext from "./Contexts/UserContext";
import { useState } from "react";

export default function App() {
  const [user, setUser] = useState();
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Header />
        <ResetStyle />
        <Post />
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
