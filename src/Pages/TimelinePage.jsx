import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import useToken from "../Hooks/useToken.js";
import MainTemplate from "../Components/Templates/MainTemplate.jsx";
import CreatePost from "../Components/CreatePost";
import Post from "../Components/Post";
import api from "../Services/api.js";
import useTrending from "../Hooks/useTrending.js";


export default function Timeline() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const { setTrendingHashtags } = useTrending();
    const { token } = useToken();
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) return navigate("/");
        reload();
    }, []);

    async function reload() {
        setLoading(true);

        try {
            setPosts((await api.getPosts(token)).data);
            setTrendingHashtags((await api.getAllHashtags(token)).data);
            setLoading(false);
        } catch (err) {
            console.log(err);
            alert("An error occured while trying to fetch the posts, please refresh the page");
            setError(true);
        }
    }

    return (
        <MainTemplate textHeader="timeline">
            <StyledTimeline>
                <CreatePost reload={reload} />
                {loading ? (
                    <p className="loading">Loading...</p>
                ) : error ? (
                    <p>
                        An error occured while trying to fetch the posts, please refresh the page
                    </p>
                ) : posts.length === 0 ? (
                    <p data-test="message">There are no posts yet.</p>
                ) : (
                    posts.map((post) => (
                        <Post
                            reload={reload}
                            key={post.id}
                            avatar_photo_url={post.user_photo}
                            name={post.user_name}
                            description={post.description}
                            like_count={post.likes_count}
                            link={post.link}
                            owner_id={post.owner_id}
                            post_id={post.id}
                            default_liked={post.default_liked}
                            metadata_title={post.metadata?.title}
                            metadata_description={post.metadata?.description}
                            metadata_image={post.metadata?.image}
                            first_liker_name={post.first_liker_name}
                            second_liker_name={post.second_liker_name}
                        />
                    ))
                )}
            </StyledTimeline>
        </MainTemplate>
    );
}

const StyledTimeline = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 611px;

    .loading{
        font-size: 40px;
        color: white;
        font-family: Oswald;
        margin-top: 20px;
    }
    @media (max-width: 720px) {
        width: 100%;
    }
`;