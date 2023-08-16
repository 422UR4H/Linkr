import React, { useContext, useRef, useState } from 'react'
import { AiOutlineDown, AiOutlineSearch } from 'react-icons/ai';
import { useLocation, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import UserContext from '../Contexts/UserContext';
import UserSearchSuggestion from './UserSearchSuggestion';
import axios from 'axios';

export default function Header() {
    const placeholderImage = "https://i.kym-cdn.com/entries/icons/facebook/000/016/546/hidethepainharold.jpg";
    const [showLogout, setShowLogout] = useState(false);
    const [searching, setSearching] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [searchValue, setSearchValue] = useState("");
    const searchRef = useRef();
    function logout() {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/');
    }

    function handleSearchChanged(e) {
        setSearchValue(e.target.value);
        setSearching(true);
        axios.get(`${process.env.REACT_APP_API_URL}/users/${searchValue}`)
            .then(res => {
                //console.log(res);
                setSuggestions(res.data);
                setSearching(false);
            })
            .catch(err => {
                console.log(err);
                setSuggestions([]);
                setSearching(false);
            })
    }
    return (
        <>
            {
                location.pathname !== '/' && location.pathname !== '/sign-up' &&

                <HeaderContainer>
                    <h1>Linkr</h1>
                    <div className='search-bar'>
                        <AiOutlineSearch className='icon' />
                        <input ref={searchRef} value={searchValue} onChange={(e) => handleSearchChanged(e)} name='search' id='search' required type="text" placeholder='Search for people' />
                        {
                            searchValue.length > 0 &&
                            <SearchSuggestions>
                                {
                                    searching &&

                                    <SearchDefaultSuggestion>
                                        <p>{searching ? "Searching.." : suggestions?.length > 0 ? "" : "No results found"}</p>
                                    </SearchDefaultSuggestion>
                                }
                                {
                                    suggestions?.map(user_suggestion => {
                                        return (
                                            <UserSearchSuggestion
                                                key={user_suggestion.id}
                                                user_id={user_suggestion.id}
                                                photo={user_suggestion.photo}
                                                username={user_suggestion.name}
                                            />
                                        )
                                    })
                                }
                            </SearchSuggestions>
                        }
                    </div>
                    <UserAvatar>
                        <AiOutlineDown className='icon' onClick={() => setShowLogout(!showLogout)} />
                        <img src={user ? user.photo : placeholderImage} alt={user ? user.name : "Juvenal"} />
                        {showLogout &&
                            <LogoutContainer>
                                <button onClick={logout}>Logout</button>
                            </LogoutContainer>
                        }
                    </UserAvatar>
                </HeaderContainer>
            }
        </>

    )
}

const SearchDefaultSuggestion = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    padding: 8px;
    p{
        color: #515151;
        font-family: Lato;
        font-size: 15px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }
`;

const SearchSuggestions = styled.nav`
    position: absolute;
    left: 0;
    top: 40px;
    width: 100%;
    height: fit-content;
    border-radius: 8px;
    background: #E7E7E7;
    border-top-right-radius: 0;
    border-top-left-radius: 0;
    z-index: 3;
`;

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

    button{
        color: #FFF;
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

    .icon{
        cursor: pointer;
    }

    img{
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
