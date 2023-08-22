import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components';
import api from '../Services/api';
import { DISCORD_METADATA_IMAGE_URL, PLACEHOLDER_IMAGE, TRELLO_METADATA_IMAGE_URL } from '../Utils/constants';
import { createdLinkTitle, isImageLink, validateImageUrl } from '../Utils/utils';

export default function Metadata({ link }) {
    const [metadata, setMetadata] = useState(null);
    useEffect(()=>{
        getPostMetadataInfo();
    },[])

    function getPostMetadataInfo() {
        if (!link || isImageLink(link)) return; // Prevent API calls to extract metadata from an invalid link, in this case a image link
        api.urlMetadata(link)
          .then((res) => {
            const meta = res.data;
    
            const cleanedMetadataImage = link?.includes("discord.com") ? DISCORD_METADATA_IMAGE_URL :
              link?.includes("trello.com") ? TRELLO_METADATA_IMAGE_URL :
                meta.images && meta.images[0] ? meta.images[0] : "";
    
            const metadatas = {
              description: meta.description ? meta.description : "",
              title: meta.title ? meta.title : "",
              image: cleanedMetadataImage
            }
    
            validateImageUrl(cleanedMetadataImage)
              .then((res) => setMetadata(metadatas))
              .catch((error) => {
                metadatas.image = PLACEHOLDER_IMAGE;
                setMetadata(metadatas);
              })
          }).catch(error => console.log(error))
      }

    function metadataTitle() {
        return metadata && metadata.title ? metadata.title : createdLinkTitle(link ? link : "https://www.example");
    }
    function metadataDescription() {
        return metadata ? metadata.description : "";
    }

    function metadataImage() {
        return metadata ? metadata.image : PLACEHOLDER_IMAGE;
    }
    return (
        <SCMetadata data-test="link" href={link} target="_blank">
            <SCMetadataInfo>
                <h1 className="metadata-title">{metadataTitle()}</h1>
                <h2 className="metadata-description">{metadataDescription()}</h2>
                <span>{link?.trim()}</span>
            </SCMetadataInfo>
            <div className="metadata-image">
                <img src={metadataImage()} alt="" />
            </div>
        </SCMetadata>
    )
}


const SCMetadata = styled.a`
  display: flex;
  width: 100%;
  max-width: 503px;
  min-height: 155px;

  flex-shrink: 0;
  border-radius: 11px;
  border: 1px solid #4d4d4d;
  overflow: hidden;
  justify-content: space-between;
  text-decoration: none !important;
  @media (max-width: 720px) {
    max-width: 100%;
  }
  @media (max-width: 500px) {
    height: fit-content;
    max-height: fit-content;
  }

  .metadata-image {
    width: 100%;
    max-width: 153.44px;
    border-radius: 0px 12px 13px 0px;
    overflow: hidden;
    flex-shrink: 0;
    @media (max-width: 500px) {
      max-width: 100px;
    }
    img {
      width: 100%;
      height: 100%;
      border-radius: 0px 12px 13px 0px;
      object-fit: cover;
    }
  }
`;

const SCMetadataInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 10px;
  max-width: 247px;

  @media (max-width: 500px) {
    padding: 7px;
    height: fit-content;
    max-width:calc(100% - 100px);
  }


  span {
    overflow: hidden;
    color: #cecece;
    font-family: Lato;
    font-size: 11px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    @media (max-width: 500px) {
      font-size: 9px;
    }
  }

  h1 {
    width: 100%;
    color: #cecece;
    font-family: Lato;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    @media (max-width: 500px) {
      font-size: 11px;
    }
  }

  h2 {
    width: 100%;
    color: #9b9595;
    font-family: Lato;
    font-size: 11px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    @media (max-width: 500px) {
      font-size: 9px;
    }
  }
`;