import React, { useState, useContext, useEffect } from 'react'
import{ Container} from "components/misc/CustomTheme";
import { IoMdAdd} from "react-icons/io"
import { RiEdit2Line } from "react-icons/ri"
import { VscError, VscSave } from "react-icons/vsc"
import { AddModal, EditModal, DeleteModal } from "components/plan_report/modals/TotolReportModal"
import UserContext from "global/UserContext"
import { useParams, useHistory } from "react-router-dom"
import axios from "global/axiosbase";
import { NumberComma } from "components/misc/NumberComma"
import CkEditor from 'components/misc/CkEditor';
import styled, { keyframes } from 'styled-components';

const TotalFinance = ({ modal }) => {
    const history = useHistory();
    const initial = { managementdetails: [], body:'', code: 0 }
    const ctx = useContext(UserContext);
    const param = useParams().id;
    const [ cond, setCond ] = useState(false);
    const [ errText, setErrText ] = useState(false);
    const [ showAddModal, setShowAddModal ] = useState(false);
    const [ ParentData, setParentData ] = useState([]);
    const [ selected, setSelected ] = useState({});
    const [ editModalShow, setEditModalShow ] = useState(false);
    const [ deleteModalShow, setDeleteModalShow ] = useState(false);
    const [ selectedDetail, setSelectedDetail ] = useState({});

    useEffect(()=>{
        FetchData();
    },[cond])

    const FetchData = () =>{
        axios.get(`managementmains?idd=${param}`).then(res=>{
            if(res.data.length){
                setParentData(res.data);
            }
        })
    }

    const parentAddHandle = () =>{
        let myLeng = ParentData.length
        let result = ParentData[myLeng - 1];

        if(result !== undefined){
            if(result.body !== '' && result.managementdetails.length){
                if(result.id){
                    initial.code = ParentData.length + 1
                    setParentData(prev=>[ ...prev, initial ]);
                }else{
                    ctx.alertFunc("orange", "Өмнөх оруулсан мэдээллээ хадаглана уу...", true);
                }
            }else{
                ctx.alertFunc("orange", "Өмнөх хэсэгийг гүйцэд бөгөлнө үү", true);
            }

        }else{
            initial.code = ParentData.length + 1;
            setParentData(prev=>[ ...prev, initial ]);
        }
    }

    const AddChildHandles = (el) =>{
        setSelected(el);
        setShowAddModal(true);
    }

    const sendHandle = (elem) =>{
        if(elem.body !== '' && elem.managementdetails.length){
            ctx.loadFunc(true);
            if(elem.id){
                axios.put(`managementmains/${elem.id}`, { body: elem.body, code: elem.code, idd: param, }).then(res=>{
                    if(res.data.id){
                        // let myLeng = elem.managementdetails.length - 1
                        elem.managementdetails.map((elems, ind)=>{
                            if(elems.id){
                                axios.put(`managementdetails/${elems.id}`, { ...elems, idd: param, managementmain: res.data.id }).then(res=>{
                                    setCond(prev=>!prev);
                                    ctx.alertFunc('green','Амжилттай',true );
                                    ctx.loadFunc(false);
                                    history.push(`/${param}/report/2`);
                                }).catch(err=>ctx.alertFunc('orange','Алдаа гарлаа',true ));
                            }else{
                                axios.post(`managementdetails`, { ...elems, idd: param, managementmain: res.data.id }).then(res=>{
                                    setCond(prev=>!prev);
                                    ctx.alertFunc('green','Амжилттай',true );
                                    ctx.loadFunc(false);
                                    history.push(`/${param}/report/2`);
                                }).catch(err=>ctx.alertFunc('orange','Алдаа гарлаа',true ));
                            }
                        })
                        axios.put(`totals/${ctx.total?.id}`, { totalreport: true, idd: param });
                    }
                }).catch(err=>ctx.alertFunc('orange','Алдаа гарлаа',true ));
            }else{
                axios.post(`managementmains`, {body: elem.body, code: elem.code, idd: param, }).then(res=>{
                    if(res.data.id){
                        let myLeng = elem.managementdetails.length - 1
                        elem.managementdetails.map((elem, ind)=>{
                            if(myLeng === ind){
                                axios.post(`managementdetails`, { ...elem, idd: param, managementmain: res.data.id }).then(res=>{
                                    setCond(prev=>!prev);
                                    ctx.alertFunc('green','Амжилттай',true );
                                    ctx.loadFunc(false);
                                    history.push(`/${param}/report/2`);

                                    axios.put(`totals/${ctx.total?.id}`, { totalreport: true, idd: param });

                                }).catch(err=>ctx.alertFunc('orange','Алдаа гарлаа',true ));
                            }else{
                                axios.post(`managementdetails`, { ...elem, idd: param, managementmain: res.data.id }).then(res=>{
                                    ctx.alertFunc('green','Амжилттай',true );
                                })
                            }
                        })
                    }
                }).catch(err=>ctx.alertFunc('orange','Алдаа гарлаа',true ));
            }
        }else{
            setErrText(true);
            setTimeout(() => {
                setErrText(false);
            }, 4000)
        }
    }

    const EditHandle = (el, elBig) =>{
        setSelected(elBig);
        setSelectedDetail(el);
        setEditModalShow(true);
    }
    
    const DeleteHandle = (el, elBig) =>{
        setSelected(elBig);
        setSelectedDetail(el);
        setDeleteModalShow(true);
    }

    return (
        <Container style={modal&&{padding:"0px 0px"}} style={modal?{padding:"30px 0px"}:{padding:"30px 30px"}}>
                <div className={modal?`customTable T3 pageRender`:`customTable T3`}>
                    {modal&&<div className="bigTitle">VIII. Удирдлагын багийн уулзалт, тайлан</div>}
                    <div className="headPar">
                    {!modal&&<div className="title">Удирдлагын багийн уулзалт, тайлан</div>}
                        {/* <div className="addBtn"><RiAddLine /><span>Нэмэх</span></div> */}
                    </div>

                    <BigTable className="tableDraw ">
                        <div className="row Header">
                            {/* <div className="col col-1"> дд</div> */}
                            <div className="col col-2"><span className="count">#</span><span className="headFirst">Төслөөс санхүүжилт хүсч буй үйл ажиллагаа</span> </div>
                            <div className="col col-1">Үйл ажиллагааны ангилал</div>
                            <div className="col col-1">Эхлэх хугацаа</div>
                            <div className="col col-1">Дуусах хугацаа</div>
                            <div className="col col-1">Төсөвт зардал ам.дол</div>
                            <div className="col col-1">Төслөөс хүсч буй дүн ам.дол</div>
                            <div className="col col-1">Төслөөс хүсч буй санхүүжилтийн хувь</div>
                            <div className="col col-2">Хариуцах хүн</div>
                            <div className="col col-1">Тухайн ажлын талаар тайлагнах хугацаа</div>
                            <div className="col col-1">Үйлдэл</div>
                        </div>

                        {!ParentData.length&&<div className="contentSector Ghost">
                            <div className="row Content">
                                <div className="col col-2"><span className="count">1.1</span><span className="headFirst">Брэндбүүк, сав баглаа боодлын дизайн боловсруулах</span> </div>
                                <div className="col col-1">Маркетинг</div>
                                <div className="col col-1">2021/6</div>
                                <div className="col col-1">2021/7</div>
                                <div className="col right col-1">20,000</div>
                                <div className="col right col-1">10,000</div>
                                <div className="col right col-1">50%</div>
                                <div className="col col-2">Л.Бат, Маркетингийн менежер</div>
                                <div className="col col-1"></div>
                            </div>
                        </div>}
                        

                        {ParentData.map(el=>{
                            return(
                                <>
                                    {el.code > 1&&<div style={{opacity:"0.6"}} className="row Header">
                                        {/* <div className="col col-1"> дд</div> */}
                                        <div className="col col-2"><span className="count">#</span><span className="headFirst">Төслөөс санхүүжилт хүсч буй үйл ажиллагаа</span> </div>
                                        <div className="col col-1">Үйл ажиллагааны ангилал</div>
                                        <div className="col col-1">Эхлэх хугацаа</div>
                                        <div className="col col-1">Дуусах хугацаа</div>
                                        <div className="col col-1">Төсөвт зардал ам.дол</div>
                                        <div className="col col-1">Төслөөс хүсч буй дүн ам.дол</div>
                                        <div className="col col-1">Төслөөс хүсч буй санхүүжилтийн хувь</div>
                                        <div className="col col-2">Хариуцах хүн</div>
                                        <div className="col col-1">Тухайн ажлын талаар тайлагнах хугацаа</div>
                                        <div className="col col-1"></div>
                                    </div>}
                                
                                    <div key={el.code} className="contentSector">
                                        {el.managementdetails.map(elem=>{
                                            return(
                                                <div className="row Content">
                                                    <div className="col col-2"><span className="count">{el.code}.{elem.code}</span><span className="headFirst">{elem.desc}</span> </div>
                                                    <div className="col col-1">{elem.activity_category}</div>
                                                    <div className="col col-1">{elem.start_date}</div>
                                                    <div className="col col-1">{elem.end_date}</div>
                                                    <div className="col right col-1">{NumberComma(elem.budget_cost)}</div>
                                                    <div className="col right col-1">{NumberComma(elem.want_amount)}</div>
                                                    <div className="col right col-1">{elem.want_finance} %</div>
                                                    <div className="col col-2">{elem.responsible_person}</div>
                                                    <div className="col col-1">{elem.workreport_date}</div>
                                                    <div className="col col-1">
                                                        <div className="editDeletePar">
                                                            <div onClick={()=>EditHandle(elem, el)} className="smBtn"><RiEdit2Line /></div>
                                                            {elem.id&&<div onClick={()=>DeleteHandle(elem, el)}  className="smBtn"><VscError /></div>} 
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                        
                                        <div className="Addition A1">
                                            <div className="TableCount">{el.code}</div>
                                            <div className="editor">
                                            <div onClick={()=>AddChildHandles(el)} className="addBigBtn anime"> <IoMdAdd /> </div>
                                                <div className="title">Гүйцэтгэл:</div>
                                                <CkEditor data={el.body} setParentData={setParentData} setSelected={setSelected} element={el} selected={selected} height={true} />
                                            </div>
                                        </div>

                                        <div className="SaveBtn">
                                            {!el.id?errText?<div className="errTxt">{errText&&`Мэдээлэлээ гүйцэд оруулна уу...`}</div>:<div />:<div />}
                                            <button onClick={()=>sendHandle(el)} className="modalbtn anime"><VscSave style={el.id?{color:"green"}:{color:"rgba(0,0,0,0.3)"}} /> {el.code} . Хадгалах <span></span>  </button>
                                        </div>
                                    </div>
                                </>
                            )
                        })}
                        <div onClick={parentAddHandle} className="addBigBtn A1"> <IoMdAdd /> </div>
                    </BigTable>
                </div>

                {showAddModal&&<AddModal selected={selected} setShowAddModal={setShowAddModal} setParentData={setParentData} />}
                {editModalShow&&<EditModal selected={selected} selectedDetail={selectedDetail} setShowAddModal={setEditModalShow} setParentData={setParentData} />}
                {deleteModalShow&&<DeleteModal selected={selected} selectedDetail={selectedDetail} setShowAddModal={setDeleteModalShow} setParentData={setParentData} />}


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
    50% { transform:scale(1.057); background-color:rgba(20, 100, 220, 0.3); }
    100% { transform:scale(1); background-color:rgb(255, 255, 255,1); }
`

const BigTable = styled.div`
    font-size:12.4px;
    padding:0px 12px;
    .contentSector{
        margin-bottom:30px;
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
            display:flex;
            align-items:center;
            justify-content:center;
            border: 1px solid rgba(0,0,0,.3);
            border-right:none;
            border-top:none;
            padding: 8px;
            &:last-child{
                border: 1px solid rgba(0,0,0,.3);
                border-right: 1px solid rgba(0,0,0,.3);
                border-top:none;
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
            .editDeletePar{
                padding:0px 0px;
                display: flex;
                justify-content:center;
                gap:10px;
                align-items:center;

                .smBtn{
                    cursor:pointer;
                    padding:5px;
                    background-color: #fff;
                    border-color: #ddd;
                    color: #333;
                    border-radius: 4px;
                    border-width: 1px;
                    border-style: solid;
                    display:flex;
                    align-items:center;
                    svg{
                        font-size:16px;
                    }
                    &:hover{
                        background-color:#ddd;
                    }
                }
            }
        }
        .right{
            justify-content:flex-end;
        }
    }
    .contentSector22{
        .col{
            &:last-child{
                display:none;
            }
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
    .Header22{
        .col{
            &:last-child{
                display:none;
            }
        }
       
    }
    
    
`


