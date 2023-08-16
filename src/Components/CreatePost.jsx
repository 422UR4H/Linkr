import { styled } from "styled-components";

export default function CreatePost() {
  return (
    <>
      <Title>
        <h1>Timeline</h1>
      </Title>
      <Container>
        <ContainerCreatePost>
          <img
            src="https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/2022.png"
            alt=""
          />
          <div className="container2">
            <div>
              <h2>What are you going to share today?</h2>
              <input type="text" placeholder="http://..."></input>
              <textarea
                type="text"
                placeholder="Awesome article about #javascript"
              ></textarea>
            </div>
            <StyledButton>
              <button>Publish</button>
            </StyledButton>
          </div>
        </ContainerCreatePost>
      </Container>
    </>
  );
}

const Container = styled.div`
max-width: 611px;
  width: 100%;

  .container2{
    width: 100%;
  }
`;

const Title = styled.div`
  width: 611px;
  text-align: start;
  h1 {
    font-family: "Oswald", sans-serif;
    color: #ffffff;
    font-size: 43px;
    font-weight: 700;
    line-height: 64px;
  }
`;

const ContainerCreatePost = styled.div`
  display: flex;
  width: 100%;
  height: 209px;
  border-radius: 16px;
  padding: 10px;
  background-color: #ffffff;
  box-shadow: 0px 4px 4px 0px #00000040;
  margin-bottom: 10px;

  img {
    width: 50px;
    height: 50px;
    border-radius: 27px;
    padding: 10px;
  }
  h2 {
    font-family: "Lato", sans-serif;
    padding: 10px 0 15px 0;
    color: #707070;
    font-size: 20px;
    font-weight: 300;
    line-height: 24px;
  }
  input {
    width: 100%;
    height: 13px;
    padding: 15px;
    margin-bottom: 5px;
    background-color: #efefef;
    border-radius: 5px;
    border: none;
    font-family: "Lato", sans-serif;
    font-size: 15px;
    font-weight: 300;
    line-height: 18px;
    &:focus{
      outline: none;
    }
  }
  textarea{
    height: 66px;
    resize: none;
    width:100%;
    font-size: 15px;
    font-weight: 300;
    border-radius: 5px;
    background-color: #efefef;
    border: none;
    padding: 10px;
    &:focus{
      outline: none;
    }
  }
`;

const StyledButton = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 5px;
  button {
    width: 112px;
    height: 31px;
    border-radius: 5px;
    color: white;
    border: none;
    background-color: #1877f2;
    font-family: "Lato", sans-serif;
    font-size: 14px;
    font-weight: 700;
    line-height: 17px;
    &:hover {
      cursor: pointer;
      background-color: #86bbff;
    }
  }
`;
