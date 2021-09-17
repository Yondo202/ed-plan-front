import React from 'react'
import styled from "styled-components"
import { IoMdCheckmarkCircle } from "react-icons/io"
import { CgDanger } from "react-icons/cg"

export const Loading = () => {
    return (
        <LoadingStyle>
            <div>
                <img src="/img/gif.gif" alt="gif" />
            </div>
        </LoadingStyle>
    )
}

const LoadingStyle = styled.div`
    position:fixed;
    z-index:1000;
    top:0;
    left:0;
    height:100vh;
    width:100vw;
    background-color:rgba(255,255,255,0.6);
    display:flex;
    align-items:center;
    justify-content:center;
    img{
        margin-top:-200px;
        width:120px;
        height:auto;
    }
`
export const Alert = ({alert}) => {
    return (
      <AlertStyle style={alert.cond === true ? { bottom: `100px`, opacity: `1`, borderLeft: `4px solid ${alert.color}` } : { bottom: `50px`, opacity: `0` }} >
        {alert.color === "green" ? <IoMdCheckmarkCircle style={{ color: `${alert.color}` }} className="true" /> : <CgDanger style={{ color: `${alert.color}` }} className="true" />}
        <span>{alert.text}</span>
      </AlertStyle>
    )
}

const AlertStyle = styled.div`
    z-index:10002;
    transition:all 0.5s ease;
    position:fixed;
    bottom:100px;
    left:2%;
    display:flex;
    align-items:center;
    border:1px solid rgba(0,0,0,0.2);
    // border-left:4px solid green;
    background-color:white;
    padding:10px 40px; 
    font-weight:400;
    color:black;
    border-radius:6px;
    font-size:17px;
    opacity:1;
    font-weight:600;
    .true{
        margin-right:14px;
        font-size:24px;
    }
`