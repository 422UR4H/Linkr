import { forwardRef } from 'react';
import { styled } from 'styled-components';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import Menu from '../Atoms/Menu.jsx';
import Icon from '../Atoms/Icon.jsx';

const UserAvatar = forwardRef((props, logoutRef) => {
    const { toggleShowLogout, signOut, showLogout } = props;

    return (
        <StyledUserAvatar onClick={toggleShowLogout} data-test="avatar">
            {showLogout ?
                <AiOutlineUp />
                :
                <AiOutlineDown />
            }
            <Icon />
            {showLogout &&
                <Menu ref={logoutRef} data-test="menu">
                    <button onClick={signOut} data-test="logout">Logout</button>
                </Menu>
            }
        </StyledUserAvatar>
    )
});
export default UserAvatar;

const StyledUserAvatar = styled.div`
    color: white;
    font-size: 20px;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;

    cursor: pointer;
    
    img {
        width: 50px;
        height: 50px;
        flex-shrink: 0;
        border-radius: 26.5px;
        object-fit: cover;
    }
`;