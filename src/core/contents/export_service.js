import React, { useEffect, useState, useContext } from 'react'
import UserContext from "global/UserContext"
import { HeaderTwo } from "components/misc/CustomTheme"
import { BrowserRouter as Switch, Link, Route, useLocation, useParams, useHistory } from "react-router-dom";
import ExportOne from "components/export/ExportOne"
import{ Container } from "components/misc/CustomTheme";
import ExportTwo from "components/export/ExportTwo2"
import ExportThree from "components/export/ExportThree2"
import styled from 'styled-components';
import { MdKeyboardArrowRight } from "react-icons/md"
import axios from 'global/axiosbase';

function Intro_main() {
    const history = useHistory();
    const ctx = useContext(UserContext);
    const params = useParams().id;
    let loc = useLocation();
    const [ Products, setProducts ] = useState([]);
    const [ ProductName, setProductName ] = useState(null);

    useEffect(()=>{
        FetchProducts();
        if(!loc.pathname.includes(`/export/`)){
            setProductName(null);
        }
    },[loc.pathname])

    const FetchProducts = async () =>{
       await axios.get(`export-products?idd=${params}`).then(res=>{
           setProducts(res.data);
       })
    }

    const clickHanlde = (element) => {
        if(element === "show1" && ctx.productId){
            history.push(`/${params}/export/1/${ctx.productId}`);
        }
        if(element === "show2" && ctx.productId){
            history.push(`/${params}/export/2/${ctx.productId}`);
        }
        if(element === "show3" && ctx.productId){
            history.push(`/${params}/export/3/${ctx.productId}`);
        }
    }

    const PostHandleClick = (el) =>{
        axios.put(`export-products/${el.id}`, { selected:true }).then(res=>{
            ctx.fetchProductId(params);
            ctx.setCond(prev=>!prev);
        })
    }

    return (
        <HeaderTwo className="container">
            <div className="smMenuPar">
                <button onClick={()=>clickHanlde("show1")} disabled={ctx.total?.exportone?false:true} className={`itemsPar ${ctx.total?.exportone&&`Active`} ${loc.pathname.includes(`/export/1`)&&`itemsPar2`}`}><span>Экспортын бүтээгдэхүүн {ProductName&&` - ${ProductName}`} </span></button>
                <button onClick={()=>clickHanlde("show2")} disabled={ctx.total?.exportthree?false:true} className={`itemsPar ${ctx.total?.exportthree&&`Active`} ${loc.pathname.includes(`/export/2`)&&`itemsPar2`}`} ><span>Өртгийн тооцоолол</span></button>
                <button onClick={()=>clickHanlde("show3")} disabled={ctx.total?.exporttwo?false:true} className={`itemsPar ${ctx.total?.exporttwo&&`Active`} ${loc.pathname.includes(`/export/3`)&&`itemsPar2`}`} ><span>Өртгийн задаргаа</span></button>
                {/* <button onClick={()=>clickHanlde("show5")} className={`itemsPar ${loc.pathname===`/${params}/export/5`&&`itemsPar2`}`}><span>Төслийн баг</span></button> */}
            </div>
            
            <Route exact path="/:id/export">
                <Container>
                    <TargetButtons>
                        <div className="title">Экспортын борлуулалтын голлох бүтээгдэхүүн ( сонгох )</div>
                        <div className="menu">
                            {Products.map(el=>{
                                return(
                                    <Link onClick={()=>PostHandleClick(el)} key={Math.random()}
                                     to={`/${params}/export/1/${el.id}`}
                                    className={el.exporttwo?.id?`buttons`:`buttons A1`}><span>{el.name}</span><MdKeyboardArrowRight /> <MdKeyboardArrowRight className="one" /> <MdKeyboardArrowRight className="two" /></Link>
                                )
                            })}
                        </div>
                    </TargetButtons>
                </Container>
            </Route>

            <Route exact path="/:id/export/1/:slug/"><ExportOne setProductName={setProductName} /></Route>
            <Route exact path="/:id/export/2/:slug/"><ExportTwo setProductName={setProductName} /></Route>
            <Route exact path="/:id/export/3/:slug/"><ExportThree setProductName={setProductName} /></Route>
        </HeaderTwo>
    )
}

export default Intro_main

const TargetButtons = styled.div`
        .title{
            font-weight:500;
            margin-bottom:20px;
            font-size:15px;
        }
        .menu{
            display:flex;
            .buttons{
                text-decoration:none;
                margin-right:10px;
                transition:all 0.3s ease;
                cursor:pointer;
                border-radius:5px;
                padding:8px 60px;
                padding-right:30px;
                border:1px solid rgba(0,0,0,0.2);
                display:flex;
                align-items:center;
                justify-content:space-between;
                box-shadow:1px 1px 8px -6px;
                &:hover{
                    box-shadow:1px 1px 16px -7px;
                    .one{
                        margin-left:0px;
                        transform:scale(1);
                    }
                    .two{
                        margin-left:0px;
                        transform:scale(1);
                    }
                }
                span{
                    font-weight:500;
                    margin-right:30px;
                }
                svg{
                    opacity:0.6;
                    height:100%;
                    font-size:16px;
                }
                .one{
                    transition:all 0.3s ease;
                    margin-left:-15px;
                    transform:scale(0);
                }
                .two{
                    transition:all 0.3s ease;
                    margin-left:-15px;
                    transform:scale(0);
                }

            }
            .A1{
                color: rgba(${props=>props.theme.textColor},0.8);
            }
        }
` 
