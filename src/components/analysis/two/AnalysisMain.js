import React, { useState, useContext, useEffect } from 'react'
import {MdKeyboardArrowRight} from 'react-icons/md'
import { IoMdCheckmark } from "react-icons/io"
import{ Container, ButtonStyle2, InputStyle} from "components/misc/CustomTheme";
import { RiAddLine } from "react-icons/ri"
import { VscError } from "react-icons/vsc"
import { AddModal, DeleteModal } from "components/analysis/two/AnalysisModal"
import { useHistory } from "react-router-dom"
import UserContext from "global/UserContext"
import { useParams } from "react-router-dom"
import axios from "global/axiosbase";
import styled, { keyframes } from 'styled-components';

const AnalysisMain = () => {
    const history = useHistory();
    const param = useParams().id;
    const slug = useParams().slug;
    const ctx = useContext(UserContext);
    const [ errValue, setErrValue ] = useState('');
    const [ errText, setErrText ] = useState(false);
    const [ addModal, setAddModal ] = useState(false);
    const [ deleteModal, setDeleteModal ] = useState(false);
    const [ activityData, setActivityData ] = useState([]);
    const [ selected, setSelected ] = useState({});
    const [ addTable, setAddTable ] = useState([]);
    const [ Headers, setHeaders ] = useState({ head1: null, head2: null, head3: null, head4: null });
    const [ getHeader, setGetHeader ] = useState(false);

    useEffect(()=>{
        fetchDataActivity();
    },[]);

    const fetchDataActivity = async () =>{
      await axios.get(`analysistwos?parent=${slug}&idd=${param}`).then(res=>{
          if(res.data.length){
            setActivityData(res.data);
            let re = res.data[0];
            setHeaders({ head1: re.head2, head2: re.head2, head3: re.head3, head4: re.head4 });
            setGetHeader(true);
          }
      });
    }

    const onSubmit = (e) =>{
        e.preventDefault();
        let arrCond = activityData.filter(item=> item.target === true);
        if(activityData.length !== 0){
            setErrText(false);
            if(arrCond.length === 0){
                setErrText(true);
                setErrValue('Голлох зорилтот орныг сонгоно уу...');
                setTimeout(() => {
                    setErrText(false);
                }, 5000);
            }else{
                ctx.loadFunc(true);
                activityData.map(el=>{
                    if(el.id){
                        axios.put(`analysistwos/${el.id}`,{ ...el, parent: slug, ...Headers}).then(res=>{
                                ctx.alertFunc('green','Амжилттай',true );
                                ctx.loadFunc(false);
                                history.push(`/${param}/analysis/3/${slug}`);
                        }).catch(err=>ctx.alertFunc('orange','Алдаа гарлаа',true ));
                    }else{
                        axios.post(`analysistwos`, { ...el, parent: slug, ...Headers}).then(res=>{
                                axios.put(`totals/${ctx.total?.id}`, { analysistwo: true, idd: param }).then(res=>{
                                    ctx.alertFunc('green','Амжилттай',true );
                                    ctx.loadFunc(false);
                                    history.push(`/${param}/analysis/3/${slug}`);
                                }).catch(err=>ctx.alertFunc('orange','Алдаа гарлаа',true ));
                        }).catch(err=>ctx.alertFunc('orange','Алдаа гарлаа',true ));
                    }
                });
            }
        }else{
            setErrText(true);
            setErrValue('Мэдээлэлээ оруулна уу...');
            setTimeout(() => {
                setErrText(false);
            }, 5000);
        }
    }

    const AddHandle = () =>{
        setAddModal(true);
    }

    const addColumn = () =>{
        let leng = addTable.length
        let inp = document.querySelector(".inpHead");
        if(leng > 0){
            if(!inp){
                if(leng < 4){
                    let obj = {};
                    obj[`value`] = `dd`;
                    obj[`add${leng + 1}`] = ``;
                    obj[`name`] = `add${leng + 1}`;
                    obj[`head`] = ``;
                    obj[`headname`] = `head${leng + 1}`;
                    obj["approve"] = false;
                    setAddTable(prev=>[ ...prev, obj]);
                }
            }else{
                inp.classList += " red"
            }
        }else{
            if(leng < 4){
                let obj = {};
                obj[`value`] = `dd`;
                obj[`add${leng + 1}`] = ``;
                obj[`name`] = `add${leng + 1}`;
                obj[`head`] = ``;
                obj[`headname`] = `head${leng + 1}`;
                obj["approve"] = false;
                setAddTable(prev=>[...prev, obj]);
            }
        }
    }

    const headText = () =>{
        let inp = document.querySelector(".inpHead");
        if(inp.value){
            inp.classList =- " red";
            inp.classList += " inpHead";
            setAddTable(prev=> [...prev, ...prev.filter(item=>{
                if(item.headname === inp.name){
                    item.approve = true;
                    item.head = inp.value;
                    item.headname = inp.name;
                }
            })]);

            if(inp.name === "head1"){
                setHeaders({ head1: inp.value });
            }
            if(inp.name === "head2"){
                setHeaders({ head1: Headers.head1, head2: inp.value, });
            }
            if(inp.name === "head3"){
                setHeaders({ head1: Headers.head1, head2: Headers.head2, head3: inp.value, });
            }
            if(inp.name === "head4"){
                setHeaders({ head1: Headers.head1, head2: Headers.head2, head3: Headers.head3, head4: inp.value, });
            }
            
        }else{
            inp.classList += " red"
        }
    }

    console.log(`activityDataa`, activityData);

    const TargetHandle = (element) =>{
        console.log(`element`, element);

        setActivityData(prev=> [ ...prev.filter(item=>{
            if(item.code === element.code){
                item.target = true
            }else{
                item.target = false
            }
        }),...prev])

    }

    return (
        <Container className="contianer-fluid">
            <form onSubmit={onSubmit}>
                <div style={{marginBottom:14}} className="customTable T3">
                    <div className="headPar">
                        <div className="title">Зорилтот зах зээл</div>
                        <div onClick={()=>AddHandle()} className="addBtn"><RiAddLine /><span>Нэмэх</span></div>
                    </div>
                    <table >
                        <tr>
                            <th>дд</th>
                            <th>Харьцуулах улс, орнууд</th>
                            <th>Худалдах үнэ</th>
                            <th>Стандарт шаардлага багатай</th>
                            <th>Тариф</th>
                            <th>Тээвэрлэлтийн хувьд ойр байдал</th>

                            {getHeader? 
                            <>
                              {Headers.head1?<th>{Headers.head1}</th>:null}  
                              {Headers.head2?<th>{Headers.head2}</th>:null}  
                              {Headers.head3?<th>{Headers.head3}</th>:null}  
                              {Headers.head4?<th>{Headers.head4}</th>:null}  
                            </>
                            :addTable.map(el=>{
                                return(
                                    <>
                                        {!el.approve?<InputHead key={Math.random()}>
                                            <div className="content">
                                                <InputStyle  style={{marginBottom:0}} className="inputt">
                                                    <input defaultValue={el.head} type="text" className="inpHead" autoFocus name={el.headname} required />
                                                </InputStyle>
                                                <div onClick={headText} className="smBtn"><IoMdCheckmark /></div>
                                            </div>
                                            
                                        </InputHead>:<th key={Math.random()}>{el.head}</th>}
                                    </>
                                )
                            })}
                            <CustomThead className="center">{activityData.length === 0 && addTable.length !==4 && <span onClick={addColumn} className="child">+</span>}  Нийлбэр оноо</CustomThead>
                            <th></th>
                        </tr>

                        {activityData.map((el,i)=>{
                            return(
                                <tr style={el.target?{fontWeight:"600"}:{fontWeight:"400"}} key={el.code}>
                                    <td>{i+1}</td>
                                    <td>{el.country}</td>
                                    <td className="center">{el.price}</td>
                                    <td className="center">{el.standart}</td>
                                    <td className="center">{el.tarif}</td>
                                    <td className="center">{el.traffic_range}</td>
                                    {el.add1?<td className="center">{el.add1}</td>:null}
                                    {el.add2?<td className="center">{el.add2}</td>:null}
                                    {el.add3?<td className="center">{el.add3}</td>:null}
                                    {el.add4?<td className="center">{el.add4}</td>:null}
                                    {/* {addTable.map(el=>{
                                        return(
                                            <td key={Math.random()}>{el.desc}</td>
                                        )
                                    })} */}
                                    <td className="center" style={{fontWeight:"600"}}>{el.total}</td>
                                    <td className="editDelete">
                                        <div className="editDeletePar">
                                            {/* <div onClick={()=> { setSelected(el); setEditModal(true); }} className="smBtn"><RiEdit2Line /></div> */}
                                            <div onClick={()=> { if(el.id){ setSelected(el); setDeleteModal(true) }else{ setActivityData(prev=>prev.filter(items=>items.country!==el.country))}}} className="smBtn"><VscError /></div>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                        
                        {activityData.length===0&&<tr className="ghost">
                                <td>1</td>
                                <td>Хонг Конг</td>
                                <td>3</td>
                                <td>1</td>
                                <td>1</td>
                                <td>2</td>
                                {addTable.map(el=>{
                                    return(
                                        <td key={Math.random()}>0</td>
                                    )
                                })}
                                <td>7</td>
                                <td></td>
                            </tr>}
                    </table>
                </div>

                <TargetButtons>
                    <div className="title">Голлох зорилтот орныг сонгох:</div>
                    <div className="menu">
                        {activityData.map(el=>{
                            return(
                                <div key={el.code}
                                 onClick={el.id?console.log("done!"):()=>TargetHandle(el)}
                                 className={el.target?`buttons A11`:`buttons`}
                                 ><span>{el.country}</span><MdKeyboardArrowRight /> <MdKeyboardArrowRight className="one" /> <MdKeyboardArrowRight className="two" /></div>
                            )
                        })}
                    </div>
                </TargetButtons>

                <ButtonStyle2>
                    <div className="errTxt">{errText&&`${errValue}`}</div>
                    <button type="submit" className="myBtn">Хадгалах</button>
                </ButtonStyle2>
            </form>
            
            {addModal&&<AddModal Headers={Headers} getHeader={getHeader} addTable={addTable} setActivityData={setActivityData} activityData={activityData} setAddModal={setAddModal} />}
            {/* {editModal&&<EditModal  selected={selected} setActivityData={setActivityData} setEditModal={setEditModal} />} */}
            {deleteModal&&<DeleteModal selected={selected} setActivityData={setActivityData} setDeleteModal={setDeleteModal} />}
            
        </Container>
    )
}

export default AnalysisMain;

const animation3 = keyframes`
    0% { transform:scale(0); }
    50% { transform:scale(1.2); }
    100% { transform:scale(1); }
`

const InputHead = styled.th`
    .content{
        display:flex;
        align-items:center;
        .smBtn{
            margin:10px;
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
    
`
const CustomThead = styled.th`
    position:relative;
    .child{
        transition:all 0.4s ease;
        position:absolute;
        left:-8px;
        background-color:green;
        height:16px;
        width:16px;
        display:flex;
        align-items:center;
        justify-content:center;
        color:white;
        border-radius:50%;
        font-weight:500;
        cursor:pointer;
        &:hover{
            background-color:#4CBB17;
            transform:scale(1.2);
        }
    }
`
const TargetButtons = styled.div`
        margin-top:28px;
        .title{
            font-weight:500;
            margin-bottom:20px;
            font-size:15px;
        }
        .menu{
            display:flex;
            .buttons{
                color: rgba(${props=>props.theme.textColor},0.8);
                text-decoration:none;
                margin-right:18px;
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
                // &:hover{
                //     box-shadow:1px 1px 16px -7px;
                //     .one{
                //         margin-left:0px;
                //         transform:scale(1);
                //     }
                //     .two{
                //         margin-left:0px;
                //         transform:scale(1);
                //     }
                // }
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
            .A11{
                position:relative;
                color: green;
                border:1px solid rgba(0,0,0,0.2);
                box-shadow:1px 1px 14px -6px;
                &::before{
                    animation:${animation3} 0.7s ease;
                    content:"✔";
                    position:absolute;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    z-index:1;
                    bottom:-7px;
                    right:0%;
                    border:1px solid green;
                    background-color:white;
                    color:green;
                    width:19px;
                    height:19px;
                    border-radius:50%;
                }
            }
        }
` 