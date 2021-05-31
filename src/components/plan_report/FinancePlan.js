import React, { useState, useContext, useEffect } from 'react'
import{ Container, ButtonStyle2} from "components/misc/CustomTheme";
import { RiAddLine,RiEdit2Line } from "react-icons/ri"
import { VscError } from "react-icons/vsc"
import { AddModal, EditModal, DeleteModal } from "components/plan_report/modals/FinanceModal"
import { useHistory } from "react-router-dom"
import UserContext from "global/UserContext"
import { useParams } from "react-router-dom"
import axios from "global/axiosbase";
import { NumberComma } from "components/misc/NumberComma"

const FinancePlan = ({modal}) => {
    const history = useHistory();
    const param = useParams().id;
    const ctx = useContext(UserContext);
    const [ errText, setErrText ] = useState(false);
    const [ addModal, setAddModal ] = useState(false);
    const [ editModal, setEditModal ] = useState(false);
    const [ deleteModal, setDeleteModal ] = useState(false);
    const [ activityData, setActivityData ] = useState([]);
    const [ selected, setSelected ] = useState({});
    const [ total, setTotal ] = useState(0);
    
    useEffect(()=>{
        fetchDataActivity();
    },[]);
    
    useEffect(()=>{
        if(activityData.length){
            let arr = [];
            activityData.map(el=>{arr.push(el.budget)});
            setTotal(arr.reduce((a, b)=> a + b));
        }
    },[activityData])

    const fetchDataActivity = async () =>{
      await axios.get(`finance-plans?idd=${param}`).then(res=>{
          if(res.data.length){
            setActivityData(res.data);
          }
      });
    }

    const onSubmit = (e) =>{
        e.preventDefault();
        if(activityData.length !== 0){
            ctx.loadFunc(true);
            setErrText(false);
                activityData.map(el=>{
                    if(el.id){
                        axios.put(`finance-plans/${el.id}`, { ...el, total}).then(res=>{
                                axios.put(`totals/${ctx.total?.id}`, { financeplan: true, idd: param }).then(res=>{
                                    ctx.alertFunc('green','Амжилттай',true );
                                    ctx.loadFunc(false);
                                    history.push(`/${param}/report/2`);
                                }).catch(err=>ctx.alertFunc('orange','Алдаа гарлаа',true ));
                        }).catch(err=>ctx.alertFunc('orange','Алдаа гарлаа',true ));
                    }else{
                        axios.post(`finance-plans`,{ ...el, total}).then(res=>{
                                axios.put(`totals/${ctx.total?.id}`, { financeplan: true, idd: param }).then(res=>{
                                    ctx.alertFunc('green','Амжилттай',true );
                                    ctx.loadFunc(false);
                                    history.push(`/${param}/report/2`);
                                }).catch(err=>ctx.alertFunc('orange','Алдаа гарлаа',true ));
                        }).catch(err=>ctx.alertFunc('orange','Алдаа гарлаа',true ));
                    }
                })
        }else{
            setErrText(true);
        }
    }

    return (
        <Container style={modal&&{padding:"0px 0px"}} className="contianer">
            <form onSubmit={onSubmit}>
                <div className={modal?`customTable pageRender`:`customTable`}>
                    {modal&&<div className="bigTitle">VII. Үйл ажиллагаа болон санхүүгийн төлөвлөгөө</div>}
                    <div className="headPar">
                        {!modal&&<div className="title">Үйл ажиллагаа болон санхүүгийн төлөвлөгөө</div>}
                        <div onClick={()=>setAddModal(true)} className="addBtn"><RiAddLine /><span>Нэмэх</span></div>
                    </div>
                    <table >
                        <tr>
                            <th>дд</th>
                            <th>Үйл ажиллагаа</th>
                            <th style={{textAlign:"center"}}>Төсөв ам.дол</th>
                            <th>Хугацаа</th>
                            <th>Хариуцах хүн</th>
                            <th></th>
                        </tr>
                        {activityData.map((el,i)=>{
                            return(
                                <tr key={i}>
                                    <td>{i+1}</td>
                                    <td>{el.titile}</td>
                                    <td style={{textAlign:"right"}}>{NumberComma(el.budget)}</td>
                                    <td>{el.time}</td>
                                    <td>{el.response_person}</td>
                                    <td className="editDelete">
                                        <div className="editDeletePar">
                                            <div onClick={()=> { setSelected(el); setEditModal(true); }} className="smBtn"><RiEdit2Line /></div>
                                            <div onClick={()=> { if(el.id){ setSelected(el); setDeleteModal(true) }else{ setActivityData(prev=>prev.filter(items=>items.name!==el.name && items.parent_name!==el.parent_name ))}}} className="smBtn"><VscError /></div>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                        {activityData.length!==0&&
                            <tr >
                                <th style={{backgroundColor:"white"}}></th>
                                <th style={{backgroundColor:"white"}}>Нийт</th>
                                <th style={{backgroundColor:"white", textAlign:"right"}}>{total}</th>
                                <th style={{backgroundColor:"white"}}></th>
                                <th style={{backgroundColor:"white"}}></th>
                                <th style={{backgroundColor:"white"}}></th>
                            </tr>}

                        {activityData.length===0&&<tr className="ghost">
                                <td>1</td>
                                <td>Вэбсайт хөгжүүлэх</td>
                                <td>10,000</td>
                                <td>8-9 сар</td>
                                <td>Маркетингийн менежер</td>
                                <td></td>
                            </tr>}
                    </table>
                </div>

                {!modal&&<ButtonStyle2>
                    <div className="errTxt">{errText&&`Мэдээлэлээ оруулна уу...`}</div>
                    <button type="submit" className="myBtn">Хадгалах</button>
                </ButtonStyle2>}
            </form>
            
            {addModal&&<AddModal setActivityData={setActivityData} setAddModal={setAddModal} />}
            {editModal&&<EditModal selected={selected} setActivityData={setActivityData} setEditModal={setEditModal} />}
            {deleteModal&&<DeleteModal selected={selected} setActivityData={setActivityData} setDeleteModal={setDeleteModal} />}
            
        </Container>
    )
}

export default FinancePlan
