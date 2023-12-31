import { useWindowSize } from '@uidotdev/usehooks';
import { styled } from 'styled-components';
import SearchBar from '../Molecules/SearchBar.jsx';
import Trending from '../Trending.jsx';
import Avatar from '../Atoms/Avatar.jsx';
import Button from '../../Styles/Button.js';
import FollowButton from '../../Styles/Button_Follow.js';
import {BsFillPersonCheckFill} from "react-icons/bs";
export default function MainTemplate({ textHeader, src, alt, children ,follow_btn_on_click,follow_btn_text,show_follow_btn,follow_btn_disabled}) {
    const size = useWindowSize();
  

    return (
        <StyledMainTemplate>
            <div>
                {size.width <= 720 && <SearchBar className="search-bar" />}

                <AvatarAndTitle className='avatar-and-title' $width={!!src && !!alt}>
                   <div className='info'>
                   {src && alt && <Avatar src={src ? src : '/placeholder.jpg'} alt={alt} />}
                    <h1 data-test="hashtag-title">{textHeader}</h1>
                   </div>
                    {  show_follow_btn && 
                        <FollowButton disabled={follow_btn_disabled} data-test="follow-btn" onClick={()=> follow_btn_on_click()} >
                            {size.width < 720 ? <BsFillPersonCheckFill/> : follow_btn_text}
                        </FollowButton>
                    }
                </AvatarAndTitle>

                <StyledContent>
                    <div className="posts">
                        {children}
                    </div>
                    <Trending />
                </StyledContent>
            </div>
        </StyledMainTemplate>
    );
}
MainTemplate.defaultProps = { src: "", alt: "" };

const StyledContent = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 25px;
    z-index: 1;

    .infinite-scroll-container{
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 16px;
    }

    .posts {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        max-width: 611px;
        gap: 29px;
        margin-bottom: 20px;

        @media (max-width: 720px) {
            max-width: 100%;
        }
        
    }
    @media (max-width: 720px) {
        flex-direction: column;
        align-items: center;
    }
`;

export const StyledMainTemplate = styled.main`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;

    .no-posts{
        color: #a1a1a1;
        font-size: 15px;
    }

    .loading{
        font-size: 40px;
        color: white;
        font-family: "Oswald", sans-serif;
        margin-top: 20px;
        text-align: center;
    }

    .not-found {
        color: white;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-family: Oswald;
        font-size: 30px;
        white-space: nowrap;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 30px;
    }
    
    &>div {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        max-width: calc(100% - 20px);

        @media (max-width: 720px) {
            max-width: 100%;
        }
        &>p {
            color: #707070;
            font-size: 40px;
        }
        .search-bar {
            margin-top: 10px;
            max-width: calc(100% - 20px) !important;
        }
    }
`;

const AvatarAndTitle = styled.div`
    display: flex;
    align-items: center;
    justify-content:space-between;
    gap: 18px;
    width: 100%;
    max-width: ${({ $width }) => $width ? "935px" : "970px"};
    margin-top: 53px;
    margin-bottom: 40px;
    padding-inline: 20px;

    .info{
        display: flex;
        align-items: center;
        gap: 20px;
    }
    
    @media (max-width: 720px) {
        max-width: 100%;
        margin-block: 20px;
    }
    h1{
        color: #FFF;
        font-family: 'Oswald';
        font-size: 43px;
        font-weight: 700;
        line-height: normal;

        @media (max-width: 500px) {
            font-size: 33px;
        }
    }
`;