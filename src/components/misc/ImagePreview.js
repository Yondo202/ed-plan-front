import React, { useRef, useState } from 'react'
import styled, { keyframes } from 'styled-components'

const ImagePreview = ({ url, setSeeImg }) => {
    const [ classN, setClassN ] = useState(false);
    const targetRef = useRef();

    const closeHandle = (e) =>{
        if(targetRef.current === e.target){
            setClassN(true);
            setTimeout(() => {
                setSeeImg(prev=>!prev);
            }, 300)
        }
    }
    const closeTwo = () =>{
        setClassN(true);
        setTimeout(() => {
            setSeeImg(prev=>!prev);
        }, 300)
    }

    return (
        <Ghost ref={targetRef} onClick={closeHandle}>
            <div className={`ImgPar ${classN&&`ImgPar2`}`}>
                <div onClick={closeTwo} className="Close">
                    <span>✖</span>
                </div>
                <img src={url} alt="img" />
            </div>
        </Ghost>
    )
}

export default ImagePreview

const animate = keyframes`
    0%{ opacity:0; transform:scale(0); margin-left:50px; }
    100%{ opacity:1; transform:scale(1); margin-left:0px; }
`

const Ghost = styled.div`
    display:flex;
    position:fixed;
    width:100%;
    height:100%;
    top:0;
    left:0;
    z-index:999;
    background-color:rgba(0,0,0,0.5);
    align-items:center;
    justify-content:center;
    overflow-y:scroll;
    .ImgPar{
        position:relative;
        border-radius:5px;
        padding:10px;
        margin-top:-14rem;
        background-color:white;
        animation:${animate} 0.3s ease;
        width:30rem;
        .Close{
            transition:all 0.3s ease;
            cursor:pointer;
            height:30px;
            width:30px;
            padding:2px;
            position:absolute;
            background-color:rgb(240,240,240);
            display:flex;
            align-items:center;
            justify-content:center;
            font-size:20px;
            border-radius:50%;
            top:-12px;
            right:-12px;
            &:hover{
                transform:scale(1.2);
            }
        }
        img{
            height:auto;
            width:100%;
            object-fit:contain;
        }
    }
    .ImgPar2{
        transition:all 0.3s ease;
        transform:scale(0);
        opacity:0;
    }
`
