import React from 'react'
import { styled } from 'styled-components';

export default function Trending() {
    return (
        <Container>
            <h1>trending</h1>
            <div className="tags">
                <p># javascript</p>
                <p># react</p>
                <p># react-native</p>
                <p># material</p>
                <p># web-dev</p>
                <p># mobile</p>
                <p># css</p>
                <p># html</p>
                <p># node</p>
                <p># sql</p>
            </div>
        </Container>
    )
}

const Container = styled.div`
  width: 301px;
  height: 406px;
  border-radius: 16px;
  flex-shrink: 0;
  background: #171717;
  
  h1{
    color: #FFF;
    font-family: Oswald;
    font-size: 27px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    border-bottom: 1px solid #484848;
    padding: 12px;
  }

  .tags{
    padding-left: 12px;
    padding-top: 22px;
    display: flex;
    flex-direction: column;
    gap: 7px;
      p{
        color: #FFF;
        font-family: Lato;
        font-size: 19px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        letter-spacing: 0.95px;
    }
  }
`;