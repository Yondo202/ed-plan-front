import React, { useEffect, useState, useContext } from 'react';
import {Container, ButtonStyle2} from "components/misc/CustomTheme";
import BusinessInfoOne from "components/business_info/businessInfoOne"
import BusinessInfoTwo from "components/business_info/businessInfoTwo"
import axios from "global/axiosbase"
import { useParams, useHistory } from 'react-router-dom';
import UserContext from "global/UserContext"
import styled, { keyframes } from 'styled-components';
import { RiArrowDownSLine } from 'react-icons/ri'

const BusOneMain = ({ modal }) => {
    const ctx = useContext(UserContext);
    const history = useHistory();
    const param = useParams().id;
    const [ cond, setCond ] = useState(false);

    const [ cond2, setCond2 ] = useState(false);
    const [ errText, setErrText ] = useState('');
    const [ countOne, setCountOne ] = useState(0);
    const [ countTwo, setCountTwo ] = useState(0);
    const [ countThree, setCountThree ] = useState(0);
    const [ target, setTarget ] = useState("");

    const [ getValue, setGetValue ] = useState('');

    useEffect(()=>{
        const fetchOne = async () =>{
            await axios.get(`busones/count?idd=${param}`).then(res=>{
                setCountOne(res.data);
            })
            await axios.get(`bustwos/count?idd=${param}`).then(res=>{
                setCountTwo(res.data);
            })
            await axios.get(`busthrees/count?idd=${param}`).then(res=>{
                setCountThree(res.data);
            })
        }
        fetchOne();
    },[cond]);
    
    const clickHandle = () =>{
        if(countOne > 0 && countTwo > 1 && countThree > 1 ){
            ctx.loadFunc(true);
            axios.put(`totals/${ctx.total?.id}`, { busone: true, idd: param }).then(res=>{
                ctx.alertFunc('green','Амжилттай',true );
                ctx.loadFunc(false);
                history.push(`/${param}/businessinfo/3`);
            });
        }else{
            ctx.alertFunc("orange", "Мэдээллээ гүйцэд оруулна уу", true);
        }
    }

    useEffect(()=>{
        void async function Fetch(){
            let app = await axios.get(`approves?idd=${ctx?.userId}`);
            console.log(`app`, app)
            if(app.data[0]?.value){
                setGetValue(app.data[0]?.value);
            }
        }()
    },[cond2])

    const TargetHandle = e =>{
        setTarget(e);
    }

    const NextStep = () =>{
        if(target!==''){
            ctx.loadFunc(true);
            axios.put(`approves/${ctx.approve.id}`, { value:target }).then(_=>{
                ctx.loadFunc(false)
                setCond2(prev=>!prev);
            }).catch(_=>ctx.alertFunc("orange", "Алдаа гарлаа", true))
            setTimeout(() => ctx.loadFunc(false), 3000)
        }else{
            setErrText('Төрөлөө сонгоно уу');
        }
    }

    return (
        <Container style={modal&&{padding:"0px 0px"}}>

            {getValue===''?<TargetButtons className="TargetParent">
                <div className="title">Төрөлөө сонгоно уу?</div>
                <div className="Target">
                    <div onClick={()=>TargetHandle("Ам.доллар")} className={`items ${target==="Ам.доллар"?`A11`:``}`}><span>Ам.доллар</span><RiArrowDownSLine /></div>
                    <div onClick={()=>TargetHandle("Төгрөг")}  className={`items ${target==="Төгрөг"?`A11`:``}`}><span>Төгрөг</span> <RiArrowDownSLine /></div>
                </div>

                <ButtonStyle2 >
                    <div className="errTxt">{errText}</div>
                    <button onClick={NextStep}  className="myBtn">Хадгалах</button>
                </ButtonStyle2>
            </TargetButtons>:null}

            {getValue!==''?
            <>
                <BusinessInfoOne modal={modal} cond2={cond} setCond2={setCond} value={getValue}  />
                <BusinessInfoTwo
                    title={`Дотоод борлуулалт -  ${getValue}`}
                    subTitle={{ 
                        one: "Дотоодын борлуулалт (голлох бүтээгдэхүүнээр)", 
                        // two: "Экспорт (голлох бүтээгдэхүүнээр)"
                    }}
                    url={"bustwos"}
                    urlDetail={"bustwodetails"}
                    helpField={"bustwo"}
                    helpField2={"bustwodetails"}
                    cond2={cond}
                    setCond2={setCond}
                    modal={modal}
                />

                <BusinessInfoTwo
                    title={`Экспортын борлуулалт- ${getValue}`}
                    subTitle={{ one: "Экспорт (голлох бүтээгдэхүүнээр)", two: "Экспорт (улсаар)" }}
                    url={"busthrees"}
                    urlDetail={"busthreedetails"}
                    helpField={"busthree"}
                    helpField2={"busthreedetails"}
                    cond2={cond}
                    setCond2={setCond}
                    modal={modal}
                />
                {!modal&&<ButtonStyle2 >
                    <div className="errTxt"></div>
                    <button onClick={clickHandle}  className="myBtn">Дараагийн</button>
                </ButtonStyle2>}
            </>:null}

            
            
           
        </Container>
    )
}

export default BusOneMain

const animate22 = keyframes`
  0% { transform:scale(0);  }
  100% { transform:scale(1); }
`

const TargetButtons = styled.div`
    background-color: #FFFFFF;
    padding: 20px 0px;
    .title{
        font-weight: 500;
        margin-bottom: 20px;
        font-size: 15px;
    }
    .Target{
        display: flex;
        .items{
            gap: 20px;
            color: rgba(0, 18, 41, 0.8);
            text-decoration: none;
            margin-right: 18px;
            transition: all 0.3s ease 0s;
            cursor: pointer;
            border-radius: 5px;
            padding: 8px 30px 8px 60px;
            border: 1px solid rgba(0, 0, 0, 0.2);
            display: flex;
            -webkit-box-align: center;
            align-items: center;
            -webkit-box-pack: justify;
            justify-content: space-between;
            box-shadow: 1px 1px 8px -6px;
            svg{
            opacity: 0.6;
            height: 100%;
            font-size: 16px;
            }
        }
        .A11{
            position: relative;
            color: green;
            border: 1px solid rgba(0, 0, 0, 0.2);
            box-shadow: 1px 1px 14px -6px;
            &:before{
            animation: ${animate22} 0.4s ease;
            content: "✔";
            position: absolute;
            display: flex;
            -webkit-box-align: center;
            align-items: center;
            -webkit-box-pack: center;
            justify-content: center;
            z-index: 1;
            bottom: -7px;
            right: 0%;
            border: 1px solid green;
            background-color: white;
            color: green;
            width: 19px;
            height: 19px;
            border-radius: 50%;
            }
        }
    }
`