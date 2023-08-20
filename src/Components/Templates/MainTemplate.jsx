import { useWindowSize } from '@uidotdev/usehooks';
import { styled } from 'styled-components';
import SearchBar from '../SearchBar.jsx';
import Trending from '../Trending.jsx';

export default function MainTemplate({ textHeader, children }) {
    const size = useWindowSize();

    return (
        <StyledMainTemplate>
            <div>
                {size.width <= 720 && <SearchBar className="search-bar" />}
                <Title>
                    <h1>{textHeader}</h1>
                </Title>

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

const Title = styled.div`
    max-width: 930px;
    width: 100%;
    margin-top: 23px;
    padding: 15px;
    
    h1 {
        font-family: "Oswald", sans-serif;
        color: #ffffff;
        font-size: 43px;
        font-weight: 700;
        line-height: 64px;
    }
    @media (max-width: 720px) {
        display: flex;
        justify-content: center;
        margin-top: 0px;

        h1 {
            width: 611px;
        }
    }
`;