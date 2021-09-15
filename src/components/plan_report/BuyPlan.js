import React, { useState, useEffect } from 'react'
import{ Container, ButtonStyle2} from "components/misc/CustomTheme";
import { RiAddLine, RiEdit2Line } from "react-icons/ri"
import { VscError } from "react-icons/vsc"
import { AddModal, EditModal, DeleteModal } from "components/plan_report/modals/BuyPlanModal"
import { useHistory } from "react-router-dom"
import { useParams } from "react-router-dom"
import axios from "global/axiosbase";
import { NumberComma } from "components/misc/NumberComma"
import { Parser } from "html-to-react";
import styled from 'styled-components';
const parser = new Parser();

const InfoThree = ({modal}) => {
    const history = useHistory();
    const param = useParams().id;
    const [ errText, setErrText ] = useState(false);
    const [ errText2, setErrText2 ] = useState('');
    const [ addModal, setAddModal ] = useState(false);
    const [ editModal, setEditModal ] = useState(false);
    const [ deleteModal, setDeleteModal ] = useState(false);

    const [ activityData, setActivityData ] = useState([]);
    const [ selected, setSelected ] = useState({});

    const [ cond, setCond ] = useState(false);
    
    useEffect(()=>{
        fetchDataActivity();
    },[cond]);

    const fetchDataActivity = () =>{
       axios.get(`buy-plans?idd=${param}`).then(res=>{
          if(res.data.length){
            setActivityData(res.data);
          }
      });
    }

    const onSubmit = () =>{
        if(activityData.length===0){
            setErrText(true);
            setErrText2('Мэдээллийг гүйцэд оруулна уу...');
        }else{
            history.push(`/${param}/firstpage`);
        }
    }

    const EditShowModal = () =>{
        if(selected.id){
            setEditModal(true);
        }
    }

    const DeleteShowModal = () =>{
        if(selected.id){
            setDeleteModal(true);
        }
    }

    return (
        <Container style={modal?{padding:"0px 0px"}:{padding:"40px 40px"}} className="contianer-fluid">
                <div className={modal?`customTable pageRender LastRotate`:`customTable T3`}>
                    {modal&&<div className="bigTitle">VIII. Худалдан авах ажиллагааны төлөвлөгөө</div>}
                    {!modal&&<div className="headPar">
                        <div className="title">{modal?`Худалдан авах ажиллагааны төлөвлөгөө`:`Худалдан авах ажиллагааны төлөвлөгөө`}</div>
                        <TopButtons>
                            <div onClick={()=>setAddModal(true)} className="addBtn"><RiAddLine /><span>Нэмэх</span></div>
                            <div onClick={EditShowModal} className={`addBtn ${selected.id?``:`opacity`} `}><RiEdit2Line /><span>Засах</span></div>
                            <div onClick={DeleteShowModal} className={`addBtn ${selected.id?``:`opacity`} `}><VscError /><span>Устгах</span></div>
                        </TopButtons>
                    </div>}
                    <table >
                        <tbody>
                            <tr className="center">
                                <th>дд</th>
                                <th>Худалдан авах бараа, ажил, үйлчилгээний нэр, төрөл, тоо хэмжээ, хүчин чадал</th>
                                <th>Төсөвт өртөг (төгрөг)</th>
                                <th>Худалдан авах ажиллагаанд мөрдөх журам</th>
                                <th>Үнэлгээний хороо байгуулах огноо</th>
                                <th>Тендер зарлах огноо</th>
                                <th>Гэрээ байгуулах огноо</th>
                                <th>Гэрээ дуусгавар  болох, дүгнэх огноо</th>
                                <th className="showing" >Тайлбар, тодруулга</th>
                            </tr>
                            
                            {activityData.map((el,ind)=>{
                                return(
                                    <tr onClick={()=>setSelected(el)} key={ind} className={`cusorItems ${selected.id===el.id?`Selected`:``}`}>
                                            <td>{ind+1}</td>
                                            <td>{parser.parse(el.some_indicator)}</td>
                                            <td className="right">{NumberComma(el.plan_cost)} ₮</td>
                                            <td className="center">{el.rule}</td>
                                            <td className="center">{el.foundation_date}</td>
                                            <td className="center">{el.tender_date}</td>
                                            <td className="center">{el.contract_startdate}</td>
                                            <td className="center">{el.contract_enddate}</td>
                                            <td className="showing" style={{padding:`8px`, minWidth:300}}>{parser.parse(el.description)}</td>
                                    </tr>
                                )
                            })}
                            {activityData.length===0&&<tr className="ghost">
                                    <td>1</td>
                                    <td></td>
                                    <td className="right">154,000 ₮</td>
                                    <td className="center">Нээлттэй шалгаруулалт</td>
                                    <td className="center">2021-08-15</td>
                                    <td className="center">2021-02-05</td>
                                    <td className="center">2021-01-02</td>
                                    <td className="center">2021-11-11</td>
                                    <td className="center">.....</td>
                            </tr>}

                        </tbody>
                    </table>
                </div>

               {!modal&&<ButtonStyle2>
                    <div className="errTxt">{errText&&`${errText2}`}</div>
                    <button onClick={onSubmit} type="submit" className="myBtn">Хадгалах</button>
                </ButtonStyle2>}
            
            {addModal&&<AddModal setCond={setCond} setActivityData={setActivityData} setAddModal={setAddModal} />}
            {editModal&&<EditModal setCond={setCond} selected={selected} setAddModal={setEditModal} />}
            {deleteModal&&<DeleteModal setCond={setCond} selected={selected} setAddModal={setDeleteModal} />}
            {/* {deleteModal&&<DeleteModal titles={{one:`Хувь`, two:`Кг ам.дол /АНУ/`, three:`Кг ам.дол /Монгол/`}} url={`exportthrees`} SelectedName={"Өртгийн задаргаа"} selected={selected} setActivityData={setActivityData} setDeleteModal={setDeleteModal} />} */}
            
        </Container>
    )
}

export default InfoThree


const TopButtons = styled.div`
    display:flex;
    gap:18px;
    margin-bottom:8px;
    .opacity{
        opacity:0.7;
        &:hover{
            background-color:#fff;
        }
    }
`