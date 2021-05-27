import React, { useState, useContext, useEffect } from 'react'
import{ Container, ButtonStyle2} from "components/misc/CustomTheme";
import { IoMdAdd} from "react-icons/io"
import { RiAddLine, RiEdit2Line } from "react-icons/ri"
import { VscError, VscSave } from "react-icons/vsc"
import { AddModal } from "components/plan_report/modals/TotolReportModal"
import UserContext from "global/UserContext"
import { useParams, useHistory } from "react-router-dom"
import axios from "global/axiosbase";
import { NumberComma } from "components/misc/NumberComma"
import CkEditor from 'components/misc/CkEditor';
import styled, { keyframes } from 'styled-components';

const TotalFinance = () => {
    const history = useHistory();
    const initial = { managementdetails: [], body:'', code: 0 }
    const ctx = useContext(UserContext);
    const param = useParams().id;
    const slug = useParams().slug;
    const [ errText, setErrText ] = useState(false);
    const [ showAddModal, setShowAddModal ] = useState(false);
    const [ ParentData, setParentData ] = useState([]);
    const [ selected, setSelected ] = useState({});

    const parentAddHandle = () =>{
        initial.code = ParentData.length + 1
        setParentData(prev=>[ ...prev, initial ]);
    }

    const AddChildHandles = (el) =>{
        setSelected(el);
        setShowAddModal(true);
    }

    const sendHandle = (elem) =>{
        if(elem.body !== '' && elem.managementdetails.length){
            ctx.loadFunc(true);
            axios.post(`managementmains`, {body: elem.body, code: elem.code, idd: param, }).then(res=>{
                if(res.data.id){
                    let myLeng = elem.managementdetails.length - 1
                    elem.managementdetails.map((elem, ind)=>{
                        if(myLeng === ind){
                            axios.post(`managementdetails`, { ...elem, idd: param, managementmain: res.data.id }).then(res=>{
                                ctx.alertFunc('green','Амжилттай',true );
                                ctx.loadFunc(false);
                                history.push(`/${param}/report/2`);
                            }).catch(err=>ctx.alertFunc('orange','Алдаа гарлаа',true ));
                        }else{
                            axios.post(`managementdetails`, { ...elem, idd: param, managementmain: res.data.id }).then(res=>{
                                ctx.alertFunc('green','Амжилттай',true );
                                console.log(`res`, res);
                            })
                        }
                    })
                }
            }).catch(err=>ctx.alertFunc('orange','Алдаа гарлаа',true ));
        }else{
            setErrText(true);
            setTimeout(() => {
                setErrText(false);
            }, 4000)
        }
    }

    return (
        <Container style={{padding:"30px 30px"}}>
                <div className="customTable T3">
                    <div className="headPar">
                        <div className="title">Удирдлагын багийн уулзалт, тайлан</div>
                        {/* <div className="addBtn"><RiAddLine /><span>Нэмэх</span></div> */}
                    </div>

                    <BigTable className="tableDraw ">
                        <div className="row Header">
                            {/* <div className="col col-1"> дд</div> */}
                            <div className="col col-2"><span className="count">#</span><span className="headFirst">Төслөөс санхүүжилт хүсч буй үйл ажиллагаа</span> </div>
                            <div className="col col-2">Үйл ажиллагааны ангилал</div>
                            <div className="col col-1">Эхлэх хугацаа</div>
                            <div className="col col-1">Дуусах хугацаа</div>
                            <div className="col col-1">Төсөвт зардал ам.дол</div>
                            <div className="col col-1">Төслөөс хүсч буй дүн ам.дол</div>
                            <div className="col col-1">Төслөөс хүсч буй санхүүжилтийн хувь</div>
                            <div className="col col-2">Хариуцах хүн</div>
                            <div className="col col-1">Тухайн ажлын талаар тайлагнах хугацаа</div>
                        </div>

                        {!ParentData.length&&<div className="contentSector Ghost">
                            <div className="row Content">
                                <div className="col col-2"><span className="count">1.1</span><span className="headFirst">Брэндбүүк, сав баглаа боодлын дизайн боловсруулах</span> </div>
                                <div className="col col-2">Маркетинг</div>
                                <div className="col col-1">2021/6</div>
                                <div className="col col-1">2021/7</div>
                                <div className="col right col-1">20,000</div>
                                <div className="col right col-1">10,000</div>
                                <div className="col right col-1">50%</div>
                                <div className="col col-2">Л.Бат, Маркетингийн менежер</div>
                                <div className="col col-1">2021/9</div>
                            </div>
                        </div>} 
                        

                        {ParentData.map(el=>{
                            return(
                                <div key={el.code} className="contentSector">
                                    {el.managementdetails.map(elem=>{
                                        return(
                                            <div className="row Content">
                                                <div className="col col-2"><span className="count">{el.code}.{elem.code}</span><span className="headFirst">{elem.desc}</span> </div>
                                                <div className="col col-2">{elem.activity_category}</div>
                                                <div className="col col-1">{elem.start_date}</div>
                                                <div className="col col-1">{elem.end_date}</div>
                                                <div className="col right col-1">{NumberComma(elem.budget_cost)}</div>
                                                <div className="col right col-1">{NumberComma(elem.want_amount)}</div>
                                                <div className="col right col-1">{elem.want_finance} %</div>
                                                <div className="col col-2">{elem.responsible_person}</div>
                                                <div className="col col-1">{elem.workreport_date}</div>
                                            </div>
                                        )
                                    })}
                                    
                                    <div className="Addition A1">
                                        <div className="TableCount">{el.code}</div>
                                        <div className="editor">
                                        <div onClick={()=>AddChildHandles(el)} className="addBigBtn anime"> <IoMdAdd /> </div>
                                            <div className="title">Гүйцэтгэл:</div>
                                            <CkEditor data={el.body} setParentData={setParentData} selected={selected} height={true} />
                                        </div>
                                    </div>

                                    <div className="SaveBtn">
                                        {errText?<div className="errTxt">{errText&&`Мэдээлэлээ гүйцэд оруулна уу...`}</div>:<div />}
                                        <button onClick={()=>sendHandle(el)} className="modalbtn anime"><VscSave /> 1 . Хадгалах  </button>
                                    </div>

                                </div>
                            )
                        })}

                        <div onClick={parentAddHandle} className="addBigBtn A1"> <IoMdAdd /> </div>
                       

                    </BigTable>
                </div>

                {showAddModal&&<AddModal selected={selected} setShowAddModal={setShowAddModal} setParentData={setParentData} />}


            {/* <ButtonStyle2>
                <div className="errTxt">{errText&&`Мэдээлэлээ оруулна уу...`}</div>
                <button type="submit" className="myBtn">Хадгалах</button>
            </ButtonStyle2> */}
        </Container>
    )
}

export default TotalFinance

const animate = keyframes`
    0% { transform:scale(1); background-color:rgb(255, 255, 255,1); }
    50% { transform:scale(1.12); background-color:rgba(20, 220, 100, 0.3); }
    100% { transform:scale(1); background-color:rgb(255, 255, 255,1); }
`

const BigTable = styled.div`
    padding:0px 12px;
    .contentSector{
        text-align:center;
        background-color: white;

        .SaveBtn{
            padding:15px 18px;
            margin:0px -12px;
            border:1px solid rgba(0,0,0,0.2);
            border-top:none;
            display:flex;
            justify-content:space-between;
            .errTxt{
                transition:all 0.4s ease;
                text-align:center;
                background-color: #f6c343;
                border-radius:5px;
                font-size:13px !important;
                font-weight:500;
                color:black !important;
                line-height:34px;
                padding:0px 25px;
            }
            .modalbtn{
                font-weight:500;
                cursor:pointer;
                padding:8px 10px;
                background-color: #fff;
                border-color: #ddd;
                color: #333;
                border-radius: 4px;
                border-width: 1px;
                border-style: solid;
                display:flex;
                align-items:center;
                justify-content:center;
                width:20%;
                box-shadow:1px 1px 8px -4px;
                gap:20px;
                svg{
                    font-size:17px;
                }
                &:hover{
                    background-color:rgba(20,140,220,0.1);
                    box-shadow:1px 1px 10px -4px;
                }
            }
            .anime{
                animation: ${animate} 2.2s ease;
            }
        }
        
        .Addition{
            display:flex;
            justify-content:space-between;
            margin:0px -12px;
            .TableCount{
                border:1px solid rgb(0,0,0,0.3);
                border-right:none;
                border-top:none;
                width:3.33%;
                display:flex;
                align-items:center;
                justify-content:center;
                font-weight:500;
            }
            .editor{
                width:96.67%;
                .title{
                    text-align:left;
                    padding:10px 15px;
                    font-weight:500;
                    border-left:1px solid rgb(0,0,0,0.3);
                    border-right:1px solid rgb(0,0,0,0.3);
                }
            }
        }
        .col{
            border: 1px solid rgba(0,0,0,.3);
            border-right:none;
            border-top:none;
            padding: 8px;
            &:last-child{
                border: 1px solid rgba(0,0,0,.3);
                border-right: 1px solid rgba(0,0,0,.3);
            }
            &:first-child{
                text-align:left;
                display:flex;
                padding: 0px;
                .count{
                    padding:8px;
                    border-right: 1px solid rgba(0,0,0,.3);
                    height:100%;
                    width:20%;
                    text-align:center;
                }
                .headFirst{
                    width:80%;
                    padding:8px;
                }
            }
        }
        .right{
            text-align:right;
        }
    }
    .Ghost{
        opacity:0.5;
    }
    .addBigBtn{
        transition:all 0.2s ease;
        cursor:pointer;
        border:1px solid rgb(0,0,0,0.2);
        border-top:none;
        padding:8px 10px;
        box-shadow:1px 1px 9px -6px;
        text-align:center;
        svg{
            font-size:21px;
        }
        &:hover{
            background-color:rgba(30,100,210,0.2);
        }
    }
    .A1{
        margin:0px -12px;
    }
    .anime{
        animation: ${animate} 1s ease;
    }

    .Header{
        text-align:center;
        &:first-child{
            font-weight:500;
            background-color: #E7E9EB;
        }
        &:last-child{
            border-bottom: 1px solid rgba(0,0,0,.3);
        }
        .col{
            border: 1px solid rgba(0,0,0,.3);
            border-right:none;
            padding: 8px;
            &:last-child{
                border-right: 1px solid rgba(0,0,0,.3);
            }
            &:first-child{
                text-align:left;
                display:flex;
                padding: 0px;
                .count{
                    padding:8px;
                    border-right: 1px solid rgba(0,0,0,.3);
                    height:100%;
                    width:20%;
                    text-align:center;
                }
                .headFirst{
                    width:80%;
                    padding:8px;
                }
            }
        }
    }
    
    
`


