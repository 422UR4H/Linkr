import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useWindowSize } from "@uidotdev/usehooks";
import { styled } from 'styled-components';
import UserAvatar from './UserAvatar.jsx';
import useToken from '../../Hooks/useToken.js';
import SearchBar from "./SearchBar.jsx";

//test protection change
export default function Header() {
    const [showLogout, setShowLogout] = useState(false);
    const { logout } = useToken();
    const logoutRef = useRef();
    const location = useLocation();
    const size = useWindowSize();
    const navigate = useNavigate();

    useEffect(() => {
        window.addEventListener('click', listenerOutsiteClick);
        return () => {
            window.removeEventListener('click', listenerOutsiteClick);
        };
    }, []);

    function listenerOutsiteClick(event) {
        if (logoutRef.current && !event.target.classList.contains('menu')) {
            setShowLogout(false);
        }
    }

    function toggleShowLogout() {
        setShowLogout(!showLogout);
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
                    <h1 onClick={() => navigate('/timeline')}>Linkr</h1>
                    {size.width > 720 && <SearchBar />}
                    <UserAvatar
                        onClick={toggleShowLogout}
                        signOut={signOut}
                        showLogout={showLogout}
                        logoutRef={logoutRef}
                    />
                </HeaderContainer>
            )}
        </>
    );
}

const HeaderContainer = styled.header`
    background: #151515;
    width: 100%;
    height: 72px;
    padding: 14px 17px;
    
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
    gap: 30px;

    z-index: 4;

    h1{
        color: #FFF;
        font-family: 'Passion One', 'cursive';
        font-size: 49px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        letter-spacing: 2.45px;
        cursor: pointer;
    }
`;
