import React, { useState, useContext } from 'react'
import { CustomModal, InputStyle } from "components/misc/CustomTheme"
import { useParams } from "react-router-dom"
import axios from "global/axiosbase";
import UserContext from "global/UserContext"
import { default as NumberFormat } from 'react-number-format';

export const AddModal = ({ setAddModal, setActivityData, Header }) => {
    const param = useParams().id;
    const [ close,setClose ] = useState('');
    const closeHandle = () =>{
        setClose('contentParent2');
        setTimeout(() => { setAddModal(false); setClose('') }, 300);
    }
    const SubmitHandle = (e) =>{
        e.preventDefault();
        let inp = document.querySelectorAll(".gettInp"); let arr = Array.from(inp); let final = {};
        arr.forEach(el=>{ final[el.name] = el.value; }); final["idd"] = param
        setClose('contentParent2');
        setTimeout(() => {setActivityData(prev=> [ ...prev, final ]); setAddModal(false); setClose('') }, 300);
    }

    return (
        <CustomModal>
            <div className={`contentParent ${close}`} style={{width:"35rem"}}>
                <div className="head">
                    <div className="title">Экспортын зах зээлийн судалгаа</div>
                    <div onClick={closeHandle} className="close">✖</div>
                </div>
                <form onSubmit={SubmitHandle}>
                    <div className="content">
                        <InputStyle >
                            <div className="label">{Header.title}</div>
                            <input type="text" name="desc" className="gettInp" required />
                        </InputStyle>
                        <InputStyle >
                            <div className="label">Мян Ам.дол</div>
                            <NumberFormat className="cash gettInp" name={`price`} isNumericString={true} thousandSeparator={true} placeholder="0" required />
                        </InputStyle>

                        <InputStyle >
                            <div className="label">{Header.measure}</div>
                            <NumberFormat className="cash gettInp" name={`measure`} isNumericString={true} thousandSeparator={true} placeholder="0" required />
                        </InputStyle>

                        <InputStyle >
                            <div className="label">{Header.measure} үнэ ам.дол</div>
                            <NumberFormat className="cash gettInp" name={`measure_price`} isNumericString={true} thousandSeparator={true} placeholder="0" required />
                        </InputStyle>

                        <InputStyle >
                            <div className="label">Нийлүүлэгч улс</div>
                            <input type="text" name="country" className="gettInp" required />
                        </InputStyle>

                        <InputStyle >
                            <div className="label">Стандарт</div>
                            <NumberFormat className="gettInp" name={`standart`} isNumericString={true} thousandSeparator={true} required />
                        </InputStyle>

                        <InputStyle >
                            <div className="label">Тариф</div>
                            <NumberFormat className="gettInp" name={`tarif`} isNumericString={true} thousandSeparator={true} required />
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


export const EditModal = ({ setEditModal, setActivityData, selected, Header }) => {
    const param = useParams().id;
    const [ close,setClose ] = useState('');
    const closeHandle = () =>{
        setClose('contentParent2');
        setTimeout(() => { setEditModal(false); setClose('') }, 300);
    }

    const SubmitHandle = (e) =>{
        e.preventDefault();
        let inp = document.querySelectorAll(".gettInp"); let arr = Array.from(inp); let final = {};
        arr.forEach(el=>{ final[el.name] = el.value; }); final["idd"] = param
        setClose('contentParent2');
        setTimeout(() => 
        {
            setActivityData(prev=> [...prev, ...prev.filter(item=>{
                if(item.desc===selected.desc){
                    item.desc = final.desc;
                    item.price = final.price;
                    item.measure = final.measure;
                    item.measure_price = final.measure_price;
                    item.country = final.country;
                    item.standart = final.standart;
                    item.tarif = final.tarif;
                }return
            })]);
                
            setEditModal(false); setClose('');
        }, 300);
    }

    return (
        <CustomModal>
            <div className={`contentParent ${close}`} style={{width:"35rem"}}>
                <div className="head">
                    <div className="title">Экспортын зах зээлийн судалгаа</div>
                    <div onClick={closeHandle} className="close">✖</div>
                </div>

                <form onSubmit={SubmitHandle}>
                    <div className="content">
                        <InputStyle >
                            <div className="label">{Header.title}</div>
                            <input defaultValue={selected.desc} type="text" name="desc" className="gettInp" required />
                        </InputStyle>
                        <InputStyle >
                            <div className="label">Мян Ам.дол</div>
                            <input defaultValue={selected.price} className="cash gettInp" name={`price`} thousandSeparator={true} placeholder="0" required />
                        </InputStyle>

                        <InputStyle >
                            <div className="label">{Header.measure}</div>
                            <input defaultValue={selected.measure} className="cash gettInp" name={`measure`} thousandSeparator={true} placeholder="0" required />
                        </InputStyle>

                        <InputStyle >
                            <div className="label">{Header.measure} үнэ ам.дол</div>
                            <input defaultValue={selected.measure_price} className="cash gettInp" name={`measure_price`} thousandSeparator={true} placeholder="0" required />
                        </InputStyle>

                        <InputStyle >
                            <div className="label">Нийлүүлэгч улс</div>
                            <input defaultValue={selected.country} type="text" name="country" className="gettInp" required />
                        </InputStyle>

                        <InputStyle >
                            <div className="label">Стандарт</div>
                            <input defaultValue={selected.standart} className="gettInp" name={`standart`} thousandSeparator={true} required />
                        </InputStyle>

                        <InputStyle >
                            <div className="label">Тариф</div>
                            <input max={100} defaultValue={selected.tarif} className="gettInp" name={`tarif`} thousandSeparator={true} required />
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

export const DeleteModal = ({ setDeleteModal,setActivityData, selected, Header }) => {
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
        axios.delete(`analysisonedetails/${selected?.id}`).then(res=>{
            setClose('contentParent2');ctx.alertFunc('green','Устгагдлаа',true );
            setTimeout(() => {  setActivityData(prev=>prev.filter(item=>item.id!==res.data.id)); setDeleteModal(false); setClose('') }, 300);
        }).catch(err=>ctx.alertFunc('orange','Алдаа гарлаа',true ));
    }

    return (
        <CustomModal>
            <div className={`contentParent ${close}`} style={{width:"35rem"}}>
                <div className="head">
                    <div className="title">Экспортын зах зээлийн судалгаа</div>
                    <div onClick={closeHandle} className="close">✖</div>
                </div>
                <form onSubmit={SubmitHandle}>
                    <div className="content">
                    <InputStyle style={{opacity:"0.8"}}>
                            <div className="label">{Header.title}</div>
                            <input defaultValue={selected.desc} type="text" name="desc" className="gettInp" required />
                        </InputStyle>
                        <InputStyle style={{opacity:"0.8"}}>
                            <div className="label">Мян Ам.дол</div>
                            <input defaultValue={selected.price} className="cash gettInp" name={`price`} thousandSeparator={true} placeholder="0" required />
                        </InputStyle>

                        <InputStyle style={{opacity:"0.8"}}>
                            <div className="label">{Header.measure}</div>
                            <input defaultValue={selected.measure} className="cash gettInp" name={`measure`} thousandSeparator={true} placeholder="0" required />
                        </InputStyle>

                        <InputStyle style={{opacity:"0.8"}}>
                            <div className="label">{Header.measure} үнэ ам.дол</div>
                            <input defaultValue={selected.measure_price} className="cash gettInp" name={`measure_price`} thousandSeparator={true} placeholder="0" required />
                        </InputStyle>

                        <InputStyle style={{opacity:"0.8"}}>
                            <div className="label">Нийлүүлэгч улс</div>
                            <input defaultValue={selected.country} type="text" name="country" className="gettInp" required />
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

