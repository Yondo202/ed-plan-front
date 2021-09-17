import React, { useRef } from 'react'
import styled from 'styled-components'

export const TableExample = ({ setShowVideo }) => {
    const reff =  useRef()

    const CloseHandle = (e) =>{
        if(reff.current === e.target){
            setShowVideo(false);
        }
    }
    
    return (
        <VideoStyle onClick={CloseHandle} ref={reff} >
            <iframe width="1000" height="562.5" src="https://www.youtube.com/embed/cp4L0w6hh0s?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; fullscreen; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <div />
        </VideoStyle>
    )
}

const VideoStyle = styled.div`
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background-color:rgba(0,0,0,0.5);
    display:flex;
    align-items:flex-start;
    justify-content:center;
    z-index:1000;
    padding-top:4rem;
`