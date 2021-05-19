import React, { useState, useContext } from 'react'
import { CustomModal, InputStyle } from "components/misc/CustomTheme"
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
                    <div className="title">Үйл ажиллагааны мэдээлэл</div>
                    <div onClick={closeHandle} className="close">✖</div>
                </div>
                <form onSubmit={SubmitHandle}>
                    <div className="content">
                        <InputStyle >
                            <div className="label">Үйл ажиллагааны код</div>
                            <input type="number" name="code" className="gettInp" required />
                        </InputStyle>
                        <InputStyle >
                            <div className="label">Үйл ажиллагааны чиглэл</div>
                            <input type="text" className="gettInp" name="direct" required />
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
                if(item.code===selected.code){
                    item.id = selected.id;
                    item.idd = final.idd;
                    item.direct = final.direct;
                    item.code = final.code;
                }})]);
            setEditModal(false); setClose('');
        }, 300);
    }

    return (
        <CustomModal>
            <div className={`contentParent ${close}`} style={{width:"35rem"}}>
                <div className="head">
                    <div className="title">Үйл ажиллагааны мэдээлэл</div>
                    <div onClick={closeHandle} className="close">✖</div>
                </div>
                <form onSubmit={SubmitHandle}>
                    <div className="content">
                        <InputStyle >
                            <div className="label">Үйл ажиллагааны код</div>
                            <input type="number" defaultValue={selected?.code} name="code" className="gettInp" required />
                        </InputStyle>
                        <InputStyle >
                            <div className="label">Үйл ажиллагааны чиглэл</div>
                            <input type="text" defaultValue={selected?.direct} className="gettInp" name="direct" required />
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
        
        axios.delete(`infotwodetails/${selected?.id}`).then(res=>{
            setClose('contentParent2');ctx.alertFunc('green','Устгагдлаа',true );
            setTimeout(() => {  setActivityData(prev=>prev.filter(item=>item.id!==res.data.id)); setDeleteModal(false); setClose('') }, 300);
        }).catch(err=>ctx.alertFunc('orange','Алдаа гарлаа',true ));
    }

    return (
        <CustomModal>
            <div className={`contentParent ${close}`} style={{width:"35rem"}}>
                <div className="head">
                    <div className="title">Үйл ажиллагааны мэдээлэл</div>
                    <div onClick={closeHandle} className="close">✖</div>
                </div>
                <form onSubmit={SubmitHandle}>
                    <div  className="content">
                        <InputStyle style={{opacity:"0.4"}} >
                            <div className="label">Үйл ажиллагааны код</div>
                            <input type="number" defaultValue={selected?.code} name="code" className="gettInp" required />
                        </InputStyle>
                        <InputStyle style={{opacity:"0.4"}} >
                            <div className="label">Үйл ажиллагааны чиглэл</div>
                            <input type="text" defaultValue={selected?.direct} className="gettInp" name="direct" required />
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

