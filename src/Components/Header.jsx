import { DEFAULT_USER_NAME, URL_DEFAULT_PHOTO } from '../Utils/constants.js';
import { AiOutlineDown, AiOutlineUp, AiOutlineSearch } from 'react-icons/ai';
import { useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import UserContext from '../Contexts/UserContext';
import useToken from '../Hooks/useToken.js';
import SearchBar from "./SearchBar";
import { useWindowSize } from "@uidotdev/usehooks";


export default function Header() {
    const [showLogout, setShowLogout] = useState(false);
    const { user, setUser } = useContext(UserContext);
    const { logout } = useToken();
    const logoutRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();
    const size = useWindowSize();

    useEffect(() => {
        // logoutRef.current = 0;
        window.addEventListener('click', listenerOutsiteClick);
        return () => {
            window.removeEventListener('click', listenerOutsiteClick);
        };
    }, []);

    function toggleShowLogout() {
        setShowLogout(!showLogout);
    }

    console.log(logoutRef.current)
    function listenerOutsiteClick(event) {
        if (logoutRef.current && !event.target.classList.contains('menu')) {
            setShowLogout((prevShowLogout) => !prevShowLogout);
        }
    }

    function signOut() {
        toggleShowLogout();
        logout();
        navigate('/');
    }

    return (
        <>
            {location.pathname !== '/' && location.pathname !== '/sign-up' && (

                <HeaderContainer>
                    <h1>Linkr</h1>
                    {/* <div className='search-bar'>
                        <AiOutlineSearch className='icon' />
                        <input name='search' id='search' required type="text" placeholder='Search for people' />
                    </div> */}
                    {size.width > 500 && <SearchBar />}
                    <UserAvatar>
                        {showLogout ?
                            <AiOutlineUp className='menu' onClick={toggleShowLogout} />
                            :
                            <AiOutlineDown className='menu' onClick={toggleShowLogout} />
                        }
                        <img
                            className='menu'
                            onClick={toggleShowLogout}
                            src={user ? user.photo : URL_DEFAULT_PHOTO}
                            alt={user ? user.name : "Loading..."}
                        />
                        {showLogout && (
                            <LogoutContainer ref={logoutRef}>
                                <button onClick={signOut}>Logout</button>
                            </LogoutContainer>
                        )}
                    </UserAvatar>
                </HeaderContainer>
            )}
        </>
    )
}

const LogoutContainer = styled.nav`
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
    z-index: 4;

    button {
        color: #FFF;
        font-family: 'Lato', 'sans-serif';
        font-size: 17px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        letter-spacing: 0.85px;
        background-color: transparent;
        border: 0;

        width: inherit;
        height: inherit;
        border-bottom-left-radius: inherit;
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
    .menu {
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

    .search-bar{
        max-width: 563px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        
        .icon{
            font-size: 30px;
            color: #C6C6C6;
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            cursor: pointer;
        }
    }

    input{
        width: 100%;
        height: 45px;
        flex-shrink: 0;
        border-radius: 8px;
        background: #FFF;
        border: 0;
        padding-left: 14px;

        &:focus{
            outline: none;
        }
        &::placeholder{
            color: #C6C6C6;
            font-family: Lato;
            font-size: 19px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
        }
    }

    h1{
        color: #FFF;
        font-family: 'Passion One', cursive;
        font-size: 49px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        letter-spacing: 2.45px;
    }
`;
