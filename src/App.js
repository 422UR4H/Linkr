import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Login from "./Pages/Login";
import UserContext from "./Contexts/UserContext";
import { useEffect, useState } from "react";
import UserPage from "./Pages/UserPage.jsx";
import Register from "./Pages/Register.jsx";
import Timeline from "./Pages/Timeline.jsx";
import useToken from "./Hooks/useToken.js";

export default function App() {
  const { token } = useToken();
  const [user, setUser] = useState();

  useEffect(() => {
    console.log(user);
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/sign-up" element={<Register />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/user/:id" element={<UserPage />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
