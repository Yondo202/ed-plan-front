import React, { useState, useEffect, useContext } from 'react'
import UserContext from "global/UserContext"
import styled, { keyframes } from 'styled-components'
import { Link, useParams  } from "react-router-dom";

function Home() {
    const ctx = useContext(UserContext);
    const param = useParams().id;
    const [ paramC, setParamCond ] = useState(null);
    useEffect(()=>{
        if(parseInt(param)){ setParamCond(param);  }
    },[param]);

    return (
        <>
         <HomeComponent className="container">
         <div className="row">
             
                 <div className="col-md-2 col-sm-2 itemsCol">
                     <div className="itemsPar">
                         <div className="mains">
                             <Link to={`/${paramC}/intro/1`}  className={ctx.total?.projectinfo?`itemsActive`:`items`}>Төслийн товч танилцуулга</Link>
                             <div className="line line2" ></div>
                             <Link to={`/${paramC}/intro/2`} className={ctx.total?.infoone?`itemsActive`:`items`}>Бүтэц, зохион байгуулалт</Link>
                             <div className="line line2" ></div>
                             <Link to={`/${paramC}/intro/3`} className={ctx.total?.infotwo?`itemsActive`:`items`}>Гэрчилгээ, үйл ажиллагааны мэдээлэл</Link>
                             <div className="line line2" ></div>
                             <Link to={`/${paramC}/intro/4`} className={ctx.total?.infothree?`itemsActive`:`items`}>Эцсийн өмчлөгчдийн мэдээлэл</Link>
                             {/* <div className="line line2" ></div>
                             <Link to="/intro/4" className="itemsActive">СВОТ</Link>
                             <div className="line line2" ></div>
                             <Link to="/intro/5" className="itemsActive">Төслийн баг</Link> */}
                         </div>
                         {/* <div className="lineFull lineFull2" ></div>
                         <div className="resultActive">ААН-ийн өнөөгийн боломжийг бүрэн харуулсан</div> */}
                     </div>
                 </div>

                 <div className="col-md-2 col-sm-2 itemsCol">
                     <div className="itemsPar">
                         <div className="mains">
                             <Link to={`/${paramC}/businessinfo/1`} className={ctx.total?.businessone?`itemsActive`:`items`}>Танилцуулга</Link>
                             <div className="line line2" ></div>
                             <Link to={`/${paramC}/businessinfo/2`} className={ctx.total?.busone?`itemsActive`:`items`}>Борлуулалтын мэдээлэл</Link>
                             <div className="line line2" ></div>
                             <Link to={`/${paramC}/businessinfo/3`} className={ctx.total?.bustwo?`itemsActive`:`items`}>Санхүүгийн нөөц, боломж</Link>
                         </div>
                     </div>
                 </div>

                 <div className="col-md-2 col-sm-2 itemsCol">
                     <div className="itemsPar">
                         <div className="mains">
                             <Link to={`/${paramC}/export/1`} className={ctx.total?.exportone?`itemsActive`:`items`}>Экспортын бүтээгдэхүүн</Link>
                             <div className="line " ></div>
                             <Link to={`/${paramC}/export/2`} className={ctx.total?.exporttwo?`itemsActive`:`items`}>Өртгийн тооцоолол</Link>
                         </div>
                     </div>
                 </div>

                 <div className="col-md-2 col-sm-2 itemsCol">
                     <div className="itemsPar">
                         <div className="mains">
                             <div className="items">Экспортын зах зээлийн судалгаа</div>
                             <div className="line " ></div>
                             <div className="items">Зорилтот зах зээл</div>
                             <div className="line " ></div>
                             <div className="items">Экспортыг өрсөлдөөний орчин, өрсөлдөгчийн судалгаа</div>
                             <div className="line " ></div>
                             <div className="items">SWOT шинжилгээ</div>
                             <div className="line " ></div>
                             <div className="items">Экспортын борлуулалтын төлөвлөгөө</div>
                         </div>
                     </div>
                 </div>

                 <div className="col-md-2 col-sm-2 itemsCol">
                     <div className="itemsPar">
                         <div className="mains">
                             <div className="items">Бүтээгдэхүүн</div>
                             <div className="line " ></div>
                             <div className="items">Үнэ</div>
                             <div className="line " ></div>
                             <div className="items">Зах зээлд нэвтрэлт, хуваарилалтын сувгууд</div>
                             <div className="line " ></div>
                             <div className="items">Идэвхижүүлэлт</div>
                             <div className="line " ></div>
                             <div className="items">Үйл явц</div>
                         </div>
                     </div>
                 </div>

                 <div className="col-md-2 col-sm-2 itemsCol">
                     <div className="itemsPar">
                         <div className="mains">
                             <div className="items">Үйл ажиллагаа болон санхүүгийн төлөвлөгөө</div>
                             <div className="line " ></div>
                             <div className="items">Удирдлагын багийн уулзалт, тайлан</div>
                      
                         </div>
                     </div>
                 </div>
                
                 
                
             </div>
     </HomeComponent>
     </>
    )
}

export default Home

const animate2 = keyframes`
    0% { margin-top:-15px; opacity:0; }
    100% { margin-top:0px; opacity:1;  }
`
const animate5 = keyframes`
    0% { height:5vh; }
    100% { height:6vh; }
`
const animation3 = keyframes`
    0% { transform:scale(1); }
    50% { transform:scale(1.2); }
    100% { transform:scale(1); }
`

const HomeComponent = styled.div`
    text-align:center;
    font-size:13px;
    a{
        text-decoration:none;
    }
    .itemsCol{
        border-right:1px solid rgba(0,0,0,0.3);
        border-right-style:dashed;
        &:last-child{
            border:1px solid rgba(0,0,0,0);
        }
        .itemsPar{
            height:80vh;
            width:100%;
            display:flex;
            flex-direction:column;
            align-items:center;
            justify-content:space-between;
            margin-top:50px;
            .mains{
                width:100%;
                display:flex;
                flex-direction:column;
                align-items:center;
                .items{
                    animation: ${animate2} 1.2s ease;
                    width:93%;
                    border-radius:4px;
                    padding:7px 10px;
                    border:1px solid rgba(0,0,0,0.2);
                    color:rgba(0,0,0,0.5);
                    position:relative;
                    &::before{
                        content:"-";
                        position:absolute;
                        display:flex;
                        align-items:center;
                        justify-content:center;
                        z-index:1;
                        bottom:-7px;
                        right:-1%;
                        border:1px solid #C1C1C1;
                        background-color:white;
                        color:#C1C1C1;
                        width:18px;
                        height:18px;
                        border-radius:50%;
                    }
                }
                .itemsActive{
                    box-shadow:1px 1px 10px -6px;
                    font-weight:500;
                    width:93%;
                    border-radius:4px;
                    padding:7px 10px;
                    border:1.5px solid rgba(255,255,255,1);
                    color:rgba(0,0,0,1);
                    position:relative;
                    background-color:#89E673;
                    &::before{
                        animation:${animation3} 0.7s ease;
                        content:"✔";
                        position:absolute;
                        display:flex;
                        align-items:center;
                        justify-content:center;
                        z-index:1;
                        bottom:-7px;
                        right:-1%;
                        border:1px solid green;
                        background-color:white;
                        color:green;
                        width:19px;
                        height:19px;
                        border-radius:50%;
                    }
                }
                .line{
                    animation: ${animate5} 1s ease;
                    position:relative;
                    height:6vh;
                    width:1.2px;
                    background-color:#C1C1C1;
                    &::after{
                        content:"";
                        bottom:-2px;
                        left:-480%;
                        position:absolute;
                        height:12px;
                        width:12px;
                        background-color:#C1C1C1;
                        clip-path: polygon(53% 31%, 100% 0, 50% 100%, 0 0);
                    }
                }
                .line2{
                    background-color:#535352;
                    &::after{
                        background-color:#535352;
                    }
                }
            }
            .lineFull{
                position:relative;
                height:100%;
                width:1.2px;
                background-color:#C1C1C1;
                &::after{
                    content:"";
                    bottom:-2px;
                    left:-480%;
                    position:absolute;
                    height:12px;
                    width:12px;
                    background-color:#C1C1C1;
                    clip-path: polygon(53% 31%, 100% 0, 50% 100%, 0 0);
                }
            }
            .lineFull2{
                background-color:#535352;
                &::after{
                    background-color:#535352;
                }
            }
            .resultDesable{
                height:92px;
                display:flex;
                width:93%;
                border-radius:4px;
                padding:7px 10px;
                border:1px solid rgba(0,0,0,0.2);
                color:rgba(0,0,0,0.5);
                position:relative;
                &::before{
                    content:"-";
                    position:absolute;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    z-index:1;
                    top:-9px;
                    right:5%;
                    border:1px solid #C1C1C1;
                    background-color:white;
                    color:#C1C1C1;
                    width:18px;
                    height:18px;
                    border-radius:50%;
                }
            }
            .resultActive{
                height:92px;
                display:flex;
                width:93%;
                border-radius:4px;
                padding:7px 10px;
                border:1px solid rgba(0,0,0,0.2);
                color:black;
                position:relative;
                background-color:#89E673;
                font-weight:500;
                &::before{
                    content:"✔";
                    position:absolute;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    z-index:1;
                    top:-9px;
                    right:5%;
                    border:1px solid green;
                    background-color:white;
                    color:green;
                    width:18px;
                    height:18px;
                    border-radius:50%;
                }
            }
            .resultWaiting{
                height:92px;
                display:flex;
                width:93%;
                border-radius:4px;
                padding:7px 10px;
                border:1px solid rgba(0,0,0,0.2);
                color:black;
                position:relative;
                background-color:#F7FF48;
                &::before{
                    content:"...";
                    position:absolute;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    z-index:1;
                    top:-9px;
                    right:5%;
                    border:1px solid #F8FF5D;
                    background-color:white;
                    color:black;
                    width:18px;
                    height:18px;
                    border-radius:50%;
                }
            }
        }
    }
    
`