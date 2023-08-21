import { forwardRef } from 'react';
import { styled } from 'styled-components';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import Menu from '../Atoms/Menu.jsx';
import Avatar from '../Atoms/Avatar.jsx';

const UserAvatar = forwardRef(({ onClick, signOut, showLogout, logoutRef}) => {

    return (
        <StyledUserAvatar ref={logoutRef}  className="menu"  onClick={onClick} data-test="avatar">
            {showLogout ?
                <AiOutlineUp className="menu" onClick={onClick} />
                :
                <AiOutlineDown className="menu" onClick={onClick} />
            }
            <Avatar />
            {showLogout &&
                <Menu  >
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
        width: 53px;
        height: 53px;
    }
`;