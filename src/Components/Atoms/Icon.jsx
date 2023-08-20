import { URL_DEFAULT_PHOTO } from '../../Utils/constants.js';
import { styled } from 'styled-components';
import useUser from '../../Hooks/useUser.js';

export default function Icon() {
    const { user } = useUser();

    return <StyledIcon
        className='menu'
        src={user ? user.photo : URL_DEFAULT_PHOTO}
        alt={user ? user.name : "Loading..."}
    />
}

const StyledIcon = styled.img`
    cursor: pointer;
`;