import React, { useState, useEffect, useContext } from 'react'
import UserContext from "global/UserContext"
import styled, { keyframes } from 'styled-components'
import { Link, useParams, useLocation  } from "react-router-dom";
import { IoEye, IoHomeSharp } from "react-icons/io5";
import { RiBookReadFill } from "react-icons/ri"
import Advice from "components/misc/Advice"

function Menu() {
    const loc = useLocation();
    const context = useContext(UserContext);
    const param = useParams().id;
    const [ paramC, setParamCond ] = useState(null);
    
    useEffect(()=>{
        if(parseInt(param)){
            setParamCond(param);
            context.UserIdProvider(param);
        }
    },[param]);

    return (
        <>
          {loc.pathname === `/${param}` && <Advice />} 
           {context.approve?.approve&&<Containers >
                <div className="container menuPar">
                    <div className="row">
                        <Link to={`/${paramC}/intro/1`} className={loc.pathname.includes(`intro`)?`col-md-2 items active`:`col-md-2 items`} ><div ><span >Төслийн болон Аж ахуйн нэгжийн танилцуулга</span></div></Link>
                        <Link to={`/${paramC}/businessinfo/1`} className={loc.pathname.includes(`businessinfo`)?`col-md-2 items active`:`col-md-2 items`} ><div ><span>Дотоодын зах зээл дэх бизнесийн мэдээлэл</span> </div></Link>
                        <Link to={`/${paramC}/export/1`} className={loc.pathname.includes(`export`)?`col-md-2 items active`:`col-md-2 items`}><div ><span>Экспортын бүтээгдэхүүн, үйлчилгээ</span> </div></Link>
                        <Link to={`/${paramC}`} className={loc.pathname.includes(`baba`)?`col-md-2 items active`:`col-md-2 items`}><div ><span>Экспортын зах зээлийн судалгаа</span> </div></Link>
                        <Link to={`/${paramC}/marketing/1`} className={loc.pathname.includes(`marketing`)?`col-md-2 items active`:`col-md-2 items`}><div ><span>Маркетингийн стратеги</span></div></Link>
                        <Link to={`/${paramC}/report/1`} className={loc.pathname.includes(`report`)?`col-md-2 items active`:`col-md-2 items`}><div ><span>Төлөвлөгөө болон уулзалт, тайлан</span></div></Link>
                    </div>
                </div>
                {/* <div className="itemsLast">
                    <span className="item">Хэвлэх</span>
                    <span style={{borderLeft:`1px solid rgba(0,0,0,0.2)`}} className="item item2">Тохиргоо</span>
                </div> */}
            </Containers>} 

            {context.approve?.approve&&<PreviewTools>
                <Link to={`/${paramC}`} className="Preview home">
                    <div className="title">Нүүр хуудас</div>
                    <IoHomeSharp />
                </Link>
            </PreviewTools>}

            {context.approve?.approve&&<PreviewTools>
                <div className="Preview see">
                    <div className="title">Урьдчилан харах</div>
                    <IoEye />
                </div>
            </PreviewTools>}

            {context.approve?.approve&&<PreviewTools>
                <a href="https://drive.google.com/file/d/1H7tb0eDklwtzfte9hSSEfSrYPvZBisPY/view?usp=sharing" target="_blank">
                    <div className="Preview example">
                        <div className="title">Жишээ загвар харах</div>
                        <RiBookReadFill />
                    </div>
                </a>
            </PreviewTools>}
        </>
    )
}

export default Menu

const PreviewTools = styled.div`
    display:flex;
    flex-direction:column;
    position:fixed;
    left:0;
    top:8rem;
    z-index:2;
    font-weight:500;
    a{
        text-decoration:none;
    }
    
    .Preview{
        transition:all 0.3s ease;
        display:flex;
        align-items:center;
        color:rgb(${props=>props.theme.textColor});
        padding:10px;
        background-color:white;
        .title{
            transition:all 0.3s ease;
            margin-right:10px;
            margin-left:10px;
            font-size:13px;
        }
        svg{
            font-size:18px;
        }
    }
    .see{
        margin-top:42px;
        margin-left:-123px;
        cursor:pointer;
        box-shadow:1px -2px 10px -8px;
        border-radius:0px 3px 0px 0px;
        &:hover{
            // background-color:rgb(${props=>props.theme.textColor});
            // color:white;
            margin-left:-0px;
        }
    }
    
    .example{
        margin-left:-145px;
        cursor:pointer;
        box-shadow:1px 2px 10px -8px;
        border-radius:0px 0px 3px 0px;
        &:hover{
            // background-color:rgb(${props=>props.theme.textColor});
            // color:white;
            margin-left:-0px;
        }
    }
    .home{
        margin-left:-93px;
        margin-top:-42px;
        cursor:pointer;
        box-shadow:1px 2px 10px -8px;
        border-radius:0px 0px 3px 0px;
        &:hover{
            // background-color:rgb(${props=>props.theme.textColor});
            // color:white;
            margin-left:-0px;
        }
    }
`

const animate = keyframes`
    0% { opacity:0; transform:translateY(-10px); }
    100% { opacity:1; transform:translateY(0px); }
`

const Containers = styled.div`
    background-color:rgba(${props=>props.theme.ColorRgb},1);
    color:white;
    font-size:${props=>props.theme.fontSize};
    font-weight:500;
    .menuPar{
        text-align:center;
        a{
            text-decoration:none;
            color:white;
        }
        .items{
            cursor:pointer;
            padding-top:13px;
            padding-bottom:13px;
            border-right:1px solid rgba(255,255,255,0.2);
            &:hover{
                // background-color:rgba(${props=>props.theme.ColorRgb},0.8);
                background-color:#11457c;
                // opacity:0.9;
            }
            &:last-child{
                border-right:1px solid rgba(255,255,255,0);
            }
        }
        .active{
            // background-color:#11457c;
            position:relative;
            &:before{
                transition:all 0.4s ease;
                animation: ${animate} 0.4s ease;
                content:"";
                position:absolute;
                bottom:-10px;
                left:45%;
                z-index:99;
                width: 0;
                height: 0;
                border-left: 15px solid transparent;
                border-right: 15px solid transparent;
                border-top: 10px solid rgba(${props=>props.theme.ColorRgb},1);
            }
        }
    }
`