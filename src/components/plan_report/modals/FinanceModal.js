import React, { useState, useContext } from 'react'
import { CustomModal, InputStyle } from "components/misc/CustomTheme"
import { useParams } from "react-router-dom"
import axios from "global/axiosbase";
import UserContext from "global/UserContext"
import { default as NumberFormat } from 'react-number-format';

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
        arr.forEach(el=>{
            if( el.name === 'budget'){
                final[el.name] = parseInt(el.value.replaceAll(',',''));
            }else{ final[el.name] = el.value }
        }); final["idd"] = param
        setClose('contentParent2');
        setTimeout(() => {setActivityData(prev=> [ ...prev, final ]); setAddModal(false); setClose('') }, 300);
    }

    return (
        <CustomModal>
            <div className={`contentParent ${close}`} style={{width:"35rem"}}>
                <div className="head">
                    <div className="title">Үйл ажиллагаа болон санхүүгийн төлөвлөгөө</div>
                    <div onClick={closeHandle} className="close">✖</div>
                </div>
                <form onSubmit={SubmitHandle}>
                    <div className="content">
                        <InputStyle >
                            <div className="label">Үйл ажиллагаа</div>
                            <input type="text" name="titile" className="gettInp" required />
                        </InputStyle>

                        <InputStyle >
                            <div className="label">Төсөв ам.дол</div>
                            <NumberFormat className="cash gettInp" name='budget' isNumericString={true} thousandSeparator={true} placeholder="0" required />
                        </InputStyle>

                        <InputStyle >
                            <div className="label">Хугацаа</div>
                            <input type="text" className="gettInp" name="time" required />
                        </InputStyle>

                        {/* <InputStyle >
                            <div className="label">Хариуцах хүн</div>
                            <input type="text" className="gettInp" name="response_person" required />
                        </InputStyle> */}

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
        arr.forEach(el=>{
            if( el.name === 'budget'){
                final[el.name] = parseInt(el.value.replaceAll(',',''));
            }else{ final[el.name] = el.value }
        }); final["idd"] = param
        setClose('contentParent2');
        setTimeout(() => 
        {
            setActivityData(prev=> [...prev, ...prev.filter(item=>{
                if(item.titile===selected.titile){
                    item.titile = final.titile;
                    item.budget = final.budget;
                    item.parent_name = final.parent_name;
                    item.time = final.time;
                    item.response_person = final.response_person;
            }})]);
            setEditModal(false); setClose('');
        }, 300);
    }

    return (
        <CustomModal>
            <div className={`contentParent ${close}`} style={{width:"35rem"}}>
                <div className="head">
                    <div className="title">Үйл ажиллагаа болон санхүүгийн төлөвлөгөө</div>
                    <div onClick={closeHandle} className="close">✖</div>
                </div>
                <form onSubmit={SubmitHandle}>
                    <div className="content">
                        <InputStyle >
                            <div className="label">Үйл ажиллагаа</div>
                            <input defaultValue={selected?.titile} type="text" name="titile" className="gettInp" required />
                        </InputStyle>

                        <InputStyle >
                            <div className="label">Төсөв ам.дол</div>
                            <NumberFormat defaultValue={selected?.budget}  className="cash gettInp" name='budget' isNumericString={true} thousandSeparator={true} placeholder="0" required />
                        </InputStyle>

                        <InputStyle >
                            <div className="label">Хугацаа</div>
                            <input defaultValue={selected?.time} type="text" className="gettInp" name="time" required />
                        </InputStyle>

                        {/* <InputStyle >
                            <div className="label">Хариуцах хүн</div>
                            <input defaultValue={selected?.response_person} type="text" className="gettInp" name="response_person" required />
                        </InputStyle> */}

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
        arr.forEach(el=>{ final[el.name] = el.value; }); final["idd"] = param;
        axios.delete(`finance-plans/${selected?.id}`).then(res=>{
            setClose('contentParent2');ctx.alertFunc('green','Устгагдлаа',true );
            setTimeout(() => {  setActivityData(prev=>prev.filter(item=>item.id!==res.data.id)); setDeleteModal(false); setClose('') }, 300);
        }).catch(err=>ctx.alertFunc('orange','Алдаа гарлаа',true ));
    }

    return (
        <CustomModal>
            <div className={`contentParent ${close}`} style={{width:"35rem"}}>
                <div className="head">
                    <div className="title">Үйл ажиллагаа болон санхүүгийн төлөвлөгөө</div>
                    <div onClick={closeHandle} className="close">✖</div>
                </div>
                <form onSubmit={SubmitHandle}>
                    
                    <div className="content">
                        <InputStyle style={{opacity:"0.5"}}>
                            <div className="label">Үйл ажиллагаа</div>
                            <input defaultValue={selected?.titile} type="text" name="titile" className="gettInp" required />
                        </InputStyle>

                        <InputStyle style={{opacity:"0.5"}}>
                            <div className="label">Төсөв ам.дол</div>
                            <NumberFormat defaultValue={selected?.budget} className="cash gettInp" name='budget' isNumericString={true} thousandSeparator={true} placeholder="0" required />
                        </InputStyle>

                        <InputStyle style={{opacity:"0.5"}}>
                            <div className="label">Хугацаа</div>
                            <input defaultValue={selected?.time} type="text" className="gettInp" name="time" required />
                        </InputStyle>

                        {/* <InputStyle style={{opacity:"0.5"}}>
                            <div className="label">Хариуцах хүн</div>
                            <input defaultValue={selected?.response_person} type="text" className="gettInp" name="response_person" required />
                        </InputStyle> */}

                        <div className="modalbtnPar">
                            <button type="submit" className="modalbtn">Устгах</button>
                        </div>
                    </div>

                </form>
            </div>
        </CustomModal>
    )
}

