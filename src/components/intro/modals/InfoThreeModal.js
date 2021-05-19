import React, { useState, useContext } from 'react'
import { CustomModal, InputStyle, MaxDate } from "components/misc/CustomTheme"
import { useParams } from "react-router-dom"
import axios from "global/axiosbase";
import UserContext from "global/UserContext"

export const AddModal = ({ setAddModal, setActivityData }) => {
    const param = useParams().id;
    const [ close,setClose ] = useState('');
    const closeHandle = () =>{
        setClose('contentParent2');
        setTimeout(() => { setAddModal(false); setClose('') }, 300);
    }
    const SubmitHandle = (e) =>{
        e.preventDefault();
        let inp = document.querySelectorAll(".gettInp"); let arr = Array.from(inp); let final = {};
        arr.map(el=>{ final[el.name] = el.value; }); final["idd"] = param
        setClose('contentParent2');
        setTimeout(() => {setActivityData(prev=> [ ...prev, final ]); setAddModal(false); setClose('') }, 300);
    }

    return (
        <CustomModal>
            <div className={`contentParent ${close}`} style={{width:"35rem"}}>
                <div className="head">
                    <div className="title">Эцсийн өмчлөгчдийн мэдээлэл</div>
                    <div onClick={closeHandle} className="close">✖</div>
                </div>
                <form onSubmit={SubmitHandle}>
                    <div className="content">
                        <InputStyle >
                            <div className="label">Ангилал</div>
                            <input type="text" name="category" className="gettInp" required />
                        </InputStyle>
                        <InputStyle >
                            <div className="label">Улсын нэр</div>
                            <input type="text" className="gettInp" name="country" required />
                        </InputStyle>

                        <InputStyle >
                            <div className="label">Эцэг /эх/-ийн нэр</div>
                            <input type="text" className="gettInp" name="parent_name" required />
                        </InputStyle>

                        <InputStyle >
                            <div className="label">Нэр</div>
                            <input type="text" className="gettInp" name="name" required />
                        </InputStyle>

                        <InputStyle >
                            <div className="label">Бүртгэсэн огноо</div>
                            <input type="text" max={MaxDate} className="gettInp" name="approve_date" onFocus={(e) => e.target.type = 'date'} required />
                        </InputStyle>

                        <InputStyle >
                            <div className="label">Эзэмшлийн хувь</div>
                            <input type="number" className="gettInp" name="possess_percent" required />
                        </InputStyle>

                        <div className="modalbtnPar">
                            <button type="submit" className="modalbtn">Хадгалах</button>
                        </div>
                    </div>
                </form>
            </div>
        </CustomModal>
    )
}


export const EditModal = ({ setEditModal, setActivityData, selected }) => {
    const param = useParams().id;
    const [ close,setClose ] = useState('');
    const closeHandle = () =>{
        setClose('contentParent2');
        setTimeout(() => { setEditModal(false); setClose('') }, 300);
    }

    const SubmitHandle = (e) =>{
        e.preventDefault();
        let inp = document.querySelectorAll(".gettInp"); let arr = Array.from(inp); let final = {};
        arr.map(el=>{ final[el.name] = el.value; }); final["idd"] = param
        setClose('contentParent2');
        setTimeout(() => 
        {
            setActivityData(prev=> [...prev, ...prev.filter(item=>{
                if(item.name===selected.name && item.parent_name===selected.parent_name){
                    item.category = final.category;
                    item.country = final.country;
                    item.parent_name = final.parent_name;
                    item.name = final.name;
                    item.approve_date = final.approve_date;
                    item.possess_percent = final.possess_percent;
                }})]);
            setEditModal(false); setClose('');
        }, 300);
    }

    return (
        <CustomModal>
            <div className={`contentParent ${close}`} style={{width:"35rem"}}>
                <div className="head">
                    <div className="title">Эцсийн өмчлөгчдийн мэдээлэл</div>
                    <div onClick={closeHandle} className="close">✖</div>
                </div>

                <form onSubmit={SubmitHandle}>
                    <div className="content">
                        <InputStyle >
                            <div className="label">Ангилал</div>
                            <input defaultValue={selected?.category} type="text" name="category" className="gettInp" required />
                        </InputStyle>
                        <InputStyle >
                            <div className="label">Улсын нэр</div>
                            <input defaultValue={selected?.country} type="text" className="gettInp" name="country" required />
                        </InputStyle>

                        <InputStyle >
                            <div className="label">Эцэг /эх/-ийн нэр</div>
                            <input defaultValue={selected?.parent_name} type="text" className="gettInp" name="parent_name" required />
                        </InputStyle>

                        <InputStyle >
                            <div className="label">Нэр</div>
                            <input defaultValue={selected?.name} type="text" className="gettInp" name="name" required />
                        </InputStyle>

                        <InputStyle >
                            <div className="label">Бүртгэсэн огноо</div>
                            <input defaultValue={selected?.approve_date} type="text" max={MaxDate} className="gettInp" name="approve_date" onFocus={(e) => e.target.type = 'date'} required />
                        </InputStyle>

                        <InputStyle >
                            <div className="label">Эзэмшлийн хувь</div>
                            <input defaultValue={selected?.possess_percent} type="number" className="gettInp" name="possess_percent" required />
                        </InputStyle>

                        <div className="modalbtnPar">
                            <button type="submit" className="modalbtn">Хадгалах</button>
                        </div>
                    </div>
                </form>
            </div>
        </CustomModal>
    )
}

export const DeleteModal = ({ setDeleteModal,setActivityData, selected }) => {
    const ctx = useContext(UserContext);
    const param = useParams().id;
    const [ close,setClose ] = useState('');
    const closeHandle = () =>{
        setClose('contentParent2');
        setTimeout(() => { setDeleteModal(false); setClose('') }, 300);
    }

    const SubmitHandle = (e) =>{
        e.preventDefault();
        let inp = document.querySelectorAll(".gettInp"); let arr = Array.from(inp); let final = {};
        arr.map(el=>{ final[el.name] = el.value; }); final["idd"] = param;
        axios.delete(`infothrees/${selected?.id}`).then(res=>{
            setClose('contentParent2');ctx.alertFunc('green','Устгагдлаа',true );
            setTimeout(() => {  setActivityData(prev=>prev.filter(item=>item.id!==res.data.id)); setDeleteModal(false); setClose('') }, 300);
        }).catch(err=>ctx.alertFunc('orange','Алдаа гарлаа',true ));
    }

    return (
        <CustomModal>
            <div className={`contentParent ${close}`} style={{width:"35rem"}}>
                <div className="head">
                    <div className="title">Эцсийн өмчлөгчдийн мэдээлэл</div>
                    <div onClick={closeHandle} className="close">✖</div>
                </div>
                <form onSubmit={SubmitHandle}>
                    <div className="content">
                        <InputStyle  style={{opacity:"0.5"}}>
                            <div className="label">Эцэг /эх/-ийн нэр</div>
                            <input defaultValue={selected?.parent_name} type="text" className="gettInp" name="parent_name" required />
                        </InputStyle>

                        <InputStyle style={{opacity:"0.5"}}>
                            <div className="label">Нэр</div>
                            <input defaultValue={selected?.name} type="text" className="gettInp" name="name" required />
                        </InputStyle>

                        <InputStyle style={{opacity:"0.5"}}>
                            <div className="label">Бүртгэсэн огноо</div>
                            <input defaultValue={selected?.approve_date} type="text" max={MaxDate} className="gettInp" name="approve_date" onFocus={(e) => e.target.type = 'date'} required />
                        </InputStyle>

                        <InputStyle style={{opacity:"0.5"}}>
                            <div className="label">Эзэмшлийн хувь</div>
                            <input defaultValue={selected?.possess_percent} type="number" className="gettInp" name="possess_percent" required />
                        </InputStyle>

                        <div className="modalbtnPar">
                            <button type="submit" className="modalbtn">Устгах</button>
                        </div>
                    </div>
                </form>
            </div>
        </CustomModal>
    )
}

