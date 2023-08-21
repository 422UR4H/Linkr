import { useWindowSize } from '@uidotdev/usehooks';
import { styled } from 'styled-components';
import SearchBar from '../SearchBar.jsx';
import Trending from '../Trending.jsx';
import Avatar from '../Atoms/Avatar.jsx';

export default function MainTemplate({ textHeader, src, alt, children }) {
    const size = useWindowSize();

    return (
        <StyledMainTemplate>
            <div>
                {size.width <= 720 && <SearchBar className="search-bar" />}

                <AvatarAndTitle $width={!!src && !!alt}>
                    {src && alt && <Avatar src={src} alt={alt} />}
                    <h1 data-test="hashtag-title">{textHeader}</h1>
                </AvatarAndTitle>

                <StyledContent>
                    {children}
                    {size.width > 720 &&
                        <Trending />
                    }
                </StyledContent>
            </div>
        </StyledMainTemplate>
    );
}
MainTemplate.defaultProps = { src: "", alt: "" };

export const StyledMainTemplate = styled.main`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    
    &>div {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        max-width: calc(100% - 20px);
        @media (max-width: 720px) {
            max-width: 100%;
        }
        p {
            color: #707070;
            font-size: 40px;
        }
        .search-bar {
            margin-top: 10px;
            max-width: calc(100% - 20px) !important;
        }
    }
`;

const StyledContent = styled.div`
    display: flex;
    width: 100%;
    gap: 25px;
    justify-content: center;
`;

const AvatarAndTitle = styled.div`
    display: flex;
    align-items: center;
    gap: 18px;
    width: 100%;
    max-width: ${({ $width }) => $width ? "840px" : "970px"};
    margin-top: 53px;
    margin-bottom: 40px;
    padding-left: 20px;
    padding-right: 20px;

    @media (max-width: 720px) {
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