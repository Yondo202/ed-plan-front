import React, { useState, useEffect, useContext, useRef } from 'react'
import UserContext from "global/UserContext"
import styled, { keyframes } from 'styled-components'
import { Link, useParams, useLocation  } from "react-router-dom";
import { IoEye, IoHomeSharp } from "react-icons/io5";
import { RiBookReadFill } from "react-icons/ri"
import { FaYoutube } from "react-icons/fa"
import Advice from "components/misc/Advice"
import ModalMain from "components/pdf/ModalMain"

function Menu() {
    const reff = useRef()
    const loc = useLocation();
    const context = useContext(UserContext);
    const param = useParams().id;
    const [ paramC, setParamCond ] = useState(null);
    const [ showModal, setShowModal ] = useState(false);

    const [ showVideo, setShowVideo ] = useState(false);
    const [ showExample, setShowExample ] = useState(false);
    
    useEffect(()=>{
        if(parseInt(param)){
            setParamCond(param);
            context.UserIdProvider(param);
        }
    },[param]);

    // const ttl = context.total

    const CloseHandle = (e) =>{
        if(reff.current === e.target){
            setShowVideo(false);
        }
    }

    const CloseHandleExample = (e) =>{
        if(reff.current === e.target){
            setShowExample(false);
        }
    }

    return (
        <>
          {loc.pathname === `/${param}` && <Advice />}
           {context.approve?.approve&&<Containers >
                <div className="container menuPar">
                    <div className="row">
                        {/* <Link to={`/${paramC}/intro/1`} className={loc.pathname.includes(`intro`)?`col-md-2 items active`:`col-md-2 items`} ><div ><span >Төслийн болон Аж ахуйн нэгжийн танилцуулга</span></div></Link>
                        <Link to={`/${paramC}/businessinfo/1`} className={loc.pathname.includes(`businessinfo`)?`col-md-2 items active`:`col-md-2 items`} ><div ><span>Дотоодын зах зээл дэх бизнесийн мэдээлэл</span> </div></Link>
                        <Link to={`/${paramC}/export`} className={loc.pathname.includes(`export`)?`col-md-2 items active`:`col-md-2 items`}><div ><span>Экспортын бүтээгдэхүүн, үйлчилгээ</span> </div></Link>
                        <Link to={`/${paramC}/analysis`} className={loc.pathname.includes(`analysis`)?`col-md-2 items active`:`col-md-2 items`}><div ><span>Экспортын зах зээлийн судалгаа</span> </div></Link>
                        <Link to={`/${paramC}/marketing/1`} className={loc.pathname.includes(`marketing`)?`col-md-2 items active`:`col-md-2 items`}><div ><span>Маркетингийн стратеги</span></div></Link>
                        <Link to={`/${paramC}/report/1`} className={loc.pathname.includes(`report`)?`col-md-2 items active`:`col-md-2 items`}><div ><span>Төлөвлөгөө болон уулзалт, тайлан</span></div></Link> */}

                        <Link to={`#`} className={loc.pathname.includes(`intro`)?`col-md-2 items active`:`col-md-2 items`} ><div ><span >Төслийн болон Аж ахуйн нэгжийн танилцуулга</span></div></Link>
                        <Link to={`#`} className={loc.pathname.includes(`businessinfo`)?`col-md-2 items active`:`col-md-2 items`} ><div ><span>Дотоодын зах зээл дэх бизнесийн мэдээлэл</span> </div></Link>
                        <Link to={`#`} className={loc.pathname.includes(`export`)?`col-md-2 items active`:`col-md-2 items`}><div ><span>Экспортын бүтээгдэхүүн, үйлчилгээ</span> </div></Link>
                        <Link to={`#`} className={loc.pathname.includes(`analysis`)?`col-md-2 items active`:`col-md-2 items`}><div ><span>Экспортын зах зээлийн судалгаа</span> </div></Link>
                        <Link to={`#`} className={loc.pathname.includes(`marketing`)?`col-md-2 items active`:`col-md-2 items`}><div ><span>Маркетингийн стратеги</span></div></Link>
                        <Link to={`#`} className={loc.pathname.includes(`report`)?`col-md-2 items active`:`col-md-2 items`}><div ><span>Төлөвлөгөө болон уулзалт, тайлан</span></div></Link>
                    </div>
                </div>
                {/* <div className="itemsLast">
                    <span className="item">Хэвлэх</span>
                    <span style={{borderLeft:`1px solid rgba(0,0,0,0.2)`}} className="item item2">Тохиргоо</span>
                </div> */}
            </Containers>} 

            {context.approve?.approve&&<PreviewTools margin={`8rem`}>
                <Link to={`/${paramC}`} className="Preview home">
                    <div className="title">Нүүр хуудас</div>
                    <IoHomeSharp />
                </Link>
            </PreviewTools>}

            {context.approve?.approve&&<PreviewTools onClick={()=>setShowModal(prev=>!prev)} margin={`11rem`}>
                <div className="Preview see">
                    <div className="title">Урьдчилан харах</div>
                    <IoEye />
                </div>
            </PreviewTools>}

            {context.approve?.approve&&<PreviewTools margin={`8.2rem`}>
                <div onClick={()=>setShowExample(true)} className="Preview example">
                    <div className="title">Жишээ загвар харах</div>
                    <RiBookReadFill />
                </div>
            </PreviewTools>}

            {context.approve?.approve&&<PreviewTools margin={`13.9rem`}>
                {/* <a href="https://drive.google.com/file/d/1H7tb0eDklwtzfte9hSSEfSrYPvZBisPY/view" rel="noreferrer" target="_blank"> */}
                    <div onClick={()=>setShowVideo(true)} className="Preview exampleYoutube">
                        <div className="title">Хүснэгт үүсгэх жишээ</div>
                        <FaYoutube />
                    </div>
                {/* </a> */}
            </PreviewTools>}

            {showVideo?<TableExample onClick={CloseHandle} ref={reff} >
                <iframe width="1000" height="562.5" src="https://www.youtube.com/embed/cp4L0w6hh0s?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; fullscreen; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                <div />
            </TableExample>:null}

            {showExample?<TableExample onClick={CloseHandleExample} ref={reff} >
                <iframe src="https://drive.google.com/file/d/1H7tb0eDklwtzfte9hSSEfSrYPvZBisPY/preview" width="1000" height="800" allow="autoplay"></iframe>
                <div />
            </TableExample>:null}

           {showModal&&<ModalMain setShowModal={setShowModal} />} 
        </>
    )
}

export default Menu

const TableExample = styled.div`
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

const PreviewTools = styled.div`
    display:flex;
    flex-direction:column;
    position:fixed;
    left:0;
    top:${props=>props.margin};
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
        // margin-top:42px;
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
    
    .exampleYoutube{
        margin-left:-155px;
        // margin-top:90px;
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
            color:
        }
        .items{
            color:rgb(200,200,200);
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
            color:rgb(250,250,250);
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