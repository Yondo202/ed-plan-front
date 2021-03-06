import React, { useState, useEffect, useContext, useRef } from 'react'
import UserContext from "global/UserContext"
import styled, { keyframes } from 'styled-components'
import { Link, useParams, useLocation  } from "react-router-dom";
import { IoEye, IoHomeSharp } from "react-icons/io5";
import { RiBookReadFill } from "react-icons/ri"
import { FaYoutube } from "react-icons/fa"
import Advice from "components/misc/Advice"
import { TableExample } from "components/misc/Videos"
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
                    {loc.pathname !== `/${param}` && <Link to={`/${paramC}`} className="ToHome"><IoHomeSharp /></Link>}
                    <div className="row">
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

            {/* {<PreviewTools >
                <Link to={`/${paramC}`} className="Preview home attach">
                    <div className="title">Файл хавсаргах</div>
                    <IoHomeSharp />
                </Link>
            </PreviewTools>} */}

            {context.approve?.approve&&<PreviewTools onClick={()=>setShowModal(prev=>!prev)} margin={`11rem`}>
                <div className="Preview see">
                    <div className="title">Урьдчилан харах</div>
                    <IoEye />
                </div>
            </PreviewTools>}
            

            {context.approve?.approve&&<PreviewTools margin={`8.2rem`}>
            {/* <a href="https://drive.google.com/file/d/1H7tb0eDklwtzfte9hSSEfSrYPvZBisPY/view" rel="noreferrer" target="_blank">
                
            </a> */}
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

            {showVideo?<TableExample setShowVideo={setShowVideo} />:null}

            {showExample?<GoogleDrive onClick={CloseHandleExample} ref={reff} >
                <iframe src="https://drive.google.com/file/d/1H7tb0eDklwtzfte9hSSEfSrYPvZBisPY/preview" width="1000" height="800" allow="autoplay"></iframe>
                <div />
            </GoogleDrive>:null}

           {showModal&&<ModalMain setShowModal={setShowModal} admin={false} />} 
        </>
    )
}

export default Menu

const GoogleDrive = styled.div`
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
    .attach{
        margin-left:-117px;
        // margin-top:-42px;
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
        position:relative;
        width:100%;
        .ToHome{
            transition:all 0.2s ease;
            cursor:pointer;
            z-index:3;
            position:absolute;
            top:0;
            left:50%;
            transform: translate(-50%, 0%);
            clip-path: polygon(50% 100%, 0 0, 100% 0);
            background-color:#f2f2f2;
            height:65px;
            width:50px;
            display:flex;
            align-items:start;
            justify-content:center;
            svg{
                margin-top:10px;
                font-size:17px;
                color:#666666;
            }
            &:hover{
                // background-color:#000;
                width:100px;
                // svg{
                //     color:#fff;
                // }
            }
        }
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