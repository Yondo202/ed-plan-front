import React, { useEffect, useState, useContext } from 'react'
import styled, { keyframes } from 'styled-components'
import { useParams } from "react-router-dom"
import axios from "global/axiosbase"
import UserContext from "global/UserContext"
import { BsArrowUpLeft } from "react-icons/bs";
import {MaxDate} from "components/misc/BeforeYears"

const Advice = () => {
    const ctx = useContext(UserContext);
    const [ Datas, setDatas ] = useState(false);
    const param = useParams().id;
    const  [ switchCont, setSwitchCont ] = useState(0);

    useEffect(()=>{
        fetchData();
    },[ctx.approve]);

    const fetchData = () =>{
        if(ctx.approve?.approve &&  !ctx.approve?.seen){
            axios.get(`infoones?idd=${param}`, ).then(res=>{
                if(res.data.length){
                    setDatas(false);
                }else{
                    setTimeout(() => {
                        setDatas(true);
                    }, 500);
                }
            });
        }
    }

    const NextStep = () =>{
      setSwitchCont(prev=>prev + 1);
      axios.put(`approves/${ctx.approve.id}`,{ seen: true, year_one: MaxDate.one.toString(), year_two: MaxDate.two.toString(),  year_three: MaxDate.three.toString() })
    }

    return (
        <>
            {Datas&&<Container >
                <div onClick={NextStep} className={switchCont===0?`ghost ghostTwo`:switchCont===1?`ghost`:`none`} >
                    <div className="first"></div>
                    {switchCont===0?<div className="content">
                        <BsArrowUpLeft />
                        Жишээ загвар болон оруулж байгаа мэдээллээ тайлан маягаар харах боломжтой туслах menu
                    </div>:switchCont===1?<div className="stepTwo">
                        <BsArrowUpLeft />
                          Энд дарсанаар эхлэнэ.
                            Амжилттай мэдээллэ хадагласан бол ногоон тэмдэглэгээтэй харагдана.
                    </div>:null}
                    <div onClick={NextStep} className="btn">
                        <button>Дараагийнх</button>
                    </div>
                </div>
            </Container>}
        </>
    )
}

export default Advice

const animateOne = keyframes`
    from{-webkit-mask-image radial-gradient(2rem at 21.3% 14% , transparent 98%, black 100%); }
    to{ -webkit-mask-image radial-gradient(6.4rem at 21.3% 14% , transparent 98%, black 100%); }
` 

const Container = styled.div`
    .ghost{
        position:fixed;
        z-index:1000;
        background-color:rgba(0,0,0,0.5);
        top:0;
        left:0;
        width:100vw;
        height:100vh;
        -webkit-mask-image radial-gradient(6.4rem at 21.3% 14% , transparent 98%, black 100%);
        .content{
            color:white;
            position:absolute;
            top: 22%;
            left: 9%;
            font-size:2rem;
            background-color:rgba(0,0,0,0.7);
            padding:18px 18px;
            border-radius:4px;
            width:30%;
            svg{
                position:absolute;
                top:-10%;
                left:-10%;
                font-size:3rem;
            }
        }
        .stepTwo{
            color:white;
            position:absolute;
            top: 24%;
            left: 29%;
            font-size:2rem;
            background-color:rgba(0,0,0,0.7);
            padding:18px 18px;
            border-radius:4px;
            width:30%;
            svg{
                position:absolute;
                top:-10%;
                left:-10%;
                font-size:3rem;
            }
        }
        .btn{
            position:absolute;
            top: 80%;
            right: 20%;
            button{
                color:white;
                background-color:transparent;
                border:1px solid rgba(255,255,255,0.8);
                padding:4px 28px;
                &:hover{
                    color:black;
                    background-color:white;
                }
            }
            
        }
        @media only screen and (max-width:1670px){
            -webkit-mask-image radial-gradient(6.4rem at 17.3% 14% , transparent 98%, black 100%);
        }
        @media only screen and (max-width:1600px){
            -webkit-mask-image radial-gradient(6.4rem at 15.5% 14% , transparent 98%, black 100%);
        }
        @media only screen and (max-width:1500px){
            -webkit-mask-image radial-gradient(6.4rem at 13.2% 14% , transparent 98%, black 100%);
        }
        @media only screen and (max-width:1400px){
            -webkit-mask-image radial-gradient(5.8rem at 15.9% 14% , transparent 98%, black 100%);
        }
        @media only screen and (max-width:1300px){
            -webkit-mask-image radial-gradient(5.8rem at 13.3% 14% , transparent 98%, black 100%);
        }
    }
    .ghostTwo{
        -webkit-mask-image radial-gradient(5.4rem at 1.3% 15% , transparent 98%, black 100%);
    }
    .none{
        display:none;
    }
`