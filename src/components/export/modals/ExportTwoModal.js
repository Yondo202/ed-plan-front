import React, { useState, useContext } from 'react'
import { CustomModal, InputStyle } from "components/misc/CustomTheme"
import { useParams } from "react-router-dom"
import axios from "global/axiosbase";
import UserContext from "global/UserContext"
import { default as NumberFormat } from 'react-number-format';

export const AddModal = ({ setAddModal, setActivityData, SelectedName, titles }) => {
    const param = useParams().id;
    const [ close,setClose ] = useState('');
    const closeHandle = () =>{
        setClose('contentParent2');
        setTimeout(() => { setAddModal(false); setClose('') }, 300);
    }
    const SubmitHandle = (e) =>{
        e.preventDefault();
        let inp = document.querySelectorAll(".gettInpp"); let arr = Array.from(inp); let final = {};
        arr.forEach(el=>{
            if(el.name !== "desc"){
                final[el.name] = parseFloat(el.value.replaceAll(',',''));
            }else{
                final[el.name] = el.value;
            }
        }); final["idd"] = param
        setClose('contentParent2');
        setTimeout(() => {setActivityData(prev=> [ ...prev, final ]); setAddModal(false); setClose('') }, 300);
    }

    return (
        <CustomModal>
            <div className={`contentParent ${close}`} style={{width:"35rem"}}>
                <div className="head">
                    <div className="title">Өртгийн тооцоолол</div>
                    <div onClick={closeHandle} className="close">✖</div>
                </div>
                <form onSubmit={SubmitHandle}>
                    <div className="content">
                        <InputStyle >
                            <div className="label">{SelectedName}</div>
                            <input type="text" className="gettInpp" name="desc" required />
                        </InputStyle>
                        <InputStyle >
                            <div className="label">{titles.one}</div>
                            <NumberFormat max={12} className="cash gettInpp" name={`size`} isNumericString={true} thousandSeparator={true} placeholder="0" required />
                        </InputStyle>

                        <InputStyle >
                            <div className="label">{titles.two}</div>
                            <NumberFormat className="cash gettInpp" name={`usd`} isNumericString={true} thousandSeparator={true} placeholder="0" required />
                        </InputStyle>

                        <InputStyle >
                            <div className="label">{titles.three}</div>
                            <NumberFormat className="cash gettInpp" name={`mnt`} isNumericString={true} thousandSeparator={true} placeholder="0" required />
                        </InputStyle>

                        <div className="modalbtnPar">
                            <button type="submit" className="modalbtn">Нэмэх</button>
                        </div>
                    </div>
                </form>
            </div>
        </CustomModal>
    )
}


export const EditModal = ({ setEditModal, setActivityData, selected, SelectedName, titles }) => {
    const param = useParams().id;
    const [ close,setClose ] = useState('');
    const closeHandle = () =>{
        setClose('contentParent2');
        setTimeout(() => { setEditModal(false); setClose('') }, 300);
    }

    const SubmitHandle = (e) =>{
        e.preventDefault();
        let inp = document.querySelectorAll(".gettInpp"); let arr = Array.from(inp); let final = {};
        arr.forEach(el=>{ 
            if(el.name !== "desc"){
                final[el.name] = parseFloat(el.value.replaceAll(',',''));
            }else{
                final[el.name] = el.value;
            }
        }); final["idd"] = param
        setClose('contentParent2');
        setTimeout(() => 
        {
            setActivityData(prev=> [...prev, ...prev.filter(item=>{
                if(item.desc===selected.desc){
                    item.desc = final.desc;
                    item.size = final.size;
                    item.usd = final.usd;
                    item.mnt = final.mnt;
                }})]);
            setEditModal(false); setClose('');
        }, 300);
    }

    return (
        <CustomModal>
            <div className={`contentParent ${close}`} style={{width:"35rem"}}>
                <div className="head">
                    <div className="title">Өртгийн тооцоолол</div>
                    <div onClick={closeHandle} className="close">✖</div>
                </div>


                <form onSubmit={SubmitHandle}>
                    <div className="content">
                        <InputStyle >
                            <div className="label">{SelectedName}</div>
                            <input defaultValue={selected?.desc} type="text" name="desc" className="gettInpp" required />
                        </InputStyle>
                        <InputStyle >
                            <div className="label">{titles.one}</div>
                            <NumberFormat  defaultValue={selected?.size} className="cash gettInpp" name={`size`} isNumericString={true} thousandSeparator={true} placeholder="0" required />
                        </InputStyle>

                        <InputStyle >
                            <div className="label">{titles.two}</div>
                            <NumberFormat defaultValue={selected?.usd} className="cash gettInpp" name={`usd`} isNumericString={true} thousandSeparator={true} placeholder="0" required />
                        </InputStyle>

                        <InputStyle >
                            <div className="label">{titles.three}</div>
                            <NumberFormat defaultValue={selected?.mnt} className="cash gettInpp" name={`mnt`} isNumericString={true} thousandSeparator={true} placeholder="0" required />
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

export const DeleteModal = ({ setDeleteModal,setActivityData, selected, SelectedName, url, titles }) => {
    const ctx = useContext(UserContext);
    const param = useParams().id;
    const [ close,setClose ] = useState('');
    const closeHandle = () =>{
        setClose('contentParent2');
        setTimeout(() => { setDeleteModal(false); setClose('') }, 300);
    }

    const SubmitHandle = (e) =>{
        e.preventDefault();
        let inp = document.querySelectorAll(".gettInpp"); let arr = Array.from(inp); let final = {};
        arr.forEach(el=>{ if(el.name !== "desc"){
                final[el.name] = parseFloat(el.value.replaceAll(',',''));
            }else{
                final[el.name] = el.value;
            } }); final["idd"] = param;
        axios.delete(`${url}/${selected?.id}`).then(res=>{
            setClose('contentParent2');ctx.alertFunc('green','Устгагдлаа',true );
            setTimeout(() => {  setActivityData(prev=>prev.filter(item=>item.id!==res.data.id)); setDeleteModal(false); setClose('') }, 300);
        }).catch(err=>ctx.alertFunc('orange','Алдаа гарлаа',true ));
    }

    return (
        <CustomModal>
            <div className={`contentParent ${close}`} style={{width:"35rem"}}>
                <div className="head">
                    <div className="title">Өртгийн тооцоолол</div>
                    <div onClick={closeHandle} className="close">✖</div>
                </div>
                <form onSubmit={SubmitHandle}>
                    <div className="content">
                        <InputStyle style={{opacity:"0.7"}} >
                            <div className="label">{SelectedName}</div>
                            <input value={selected?.desc} type="text" name="desc" className="gettInpp" required />
                        </InputStyle>
                        <InputStyle style={{opacity:"0.7"}}>
                            <div  className="label">{titles.one}</div>
                            <NumberFormat value={selected?.size} className="cash gettInpp" name={`size`} isNumericString={true} thousandSeparator={true} placeholder="0" required />
                        </InputStyle>

                        <InputStyle style={{opacity:"0.7"}}>
                            <div className="label">{titles.two}</div>
                            <NumberFormat value={selected?.usd} className="cash gettInpp" name={`usd`} isNumericString={true} thousandSeparator={true} placeholder="0" required />
                        </InputStyle>

                        <InputStyle style={{opacity:"0.7"}}>
                            <div className="label">{titles.three}</div>
                            <NumberFormat value={selected?.mnt} className="cash gettInpp" name={`mnt`} isNumericString={true} thousandSeparator={true} placeholder="0" required />
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

