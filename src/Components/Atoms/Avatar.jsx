import { URL_DEFAULT_PHOTO } from '../../Utils/constants.js';
import { styled } from 'styled-components';
import useUser from '../../Hooks/useUser.js';

export default function Avatar({ src, alt }) {
    const { user } = useUser();

    return <StyledAvatar
        className='menu'
        src={src ? src : user ? user.photo : URL_DEFAULT_PHOTO}
        alt={alt ? alt : user ? user.name : "Loading..."}
    />
}
Avatar.defaultProps = { src: null, alt: null };

const StyledAvatar = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
`;