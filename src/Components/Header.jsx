import React, { useContext, useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import UserContext from "../Contexts/UserContext";
import SearchBar from "./SearchBar";
import { useWindowSize } from "@uidotdev/usehooks";

export default function Header() {
  const placeholderImage = "/placeholder.jpg";
  const [showLogout, setShowLogout] = useState(false);
  const size = useWindowSize();
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  }
  return (
    <>
      {location.pathname !== "/" && location.pathname !== "/sign-up" && (
        <HeaderContainer>
          <h1>Linkr</h1>
          {size.width > 500 && <SearchBar />}
          <UserAvatar>
            <AiOutlineDown
              className="icon"
              onClick={() => setShowLogout(!showLogout)}
            />
            <img
              src={user ? user.photo : placeholderImage}
              alt={user ? user.name : "Loading.."}
            />
            {showLogout && (
              <LogoutContainer>
                <button onClick={logout}>Logout</button>
              </LogoutContainer>
            )}
          </UserAvatar>
        </HeaderContainer>
      )}
    </>
  );
}

const LogoutContainer = styled.div`
  position: absolute;
  right: 0;
  top: 71px;
  background: #151515;
  width: 120px;
  height: 47px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-bottom-left-radius: 20px;

  button {
    color: #fff;
    font-family: Lato;
    font-size: 17px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.85px;
    background-color: transparent;
    border: 0;
  }
`;

const UserAvatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: white;
  font-size: 20px;

  .icon {
    cursor: pointer;
  }

  img {
    width: 50px;
    height: 50px;
    flex-shrink: 0;
    border-radius: 26.5px;
    object-fit: cover;
    cursor: pointer;
  }
`;

const HeaderContainer = styled.header`
  width: 100%;
  background: #151515;
  height: 72px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 14px;
  padding-bottom: 14px;
  padding-right: 17px;
  padding-left: 17px;
  z-index: 4;
  gap: 30px;

  h1 {
    color: #fff;
    font-family: "Passion One", cursive;
    font-size: 49px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 2.45px;
  }
`;
