import React from 'react'
import { styled } from 'styled-components'
import { BiRepost } from 'react-icons/bi'

export default function RepostBanner({reposted_by_name}) {
  return (
    <SCRepostBanner>
       <h1> <BiRepost/> Re-posted by {reposted_by_name ? reposted_by_name : "Someone"}</h1>
    </SCRepostBanner>
  )
}

const SCRepostBanner = styled.div`
    width: 100%;
    border-radius: 16px;
    background: #1E1E1E;
    flex-shrink: 0;
    position: absolute;
    left: 0;
    top: -30px;
    height: 40px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    z-index: 0;
    padding-left: 13px;
    padding-top: 7px;

    h1{
        color: #FFF;
        font-family: Lato;
        font-size: 11px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        display: flex;
        align-items: center;
        gap: 10px;
    }
`;
