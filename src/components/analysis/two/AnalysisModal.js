import React, { useState, useContext } from 'react'
import { CustomModal, InputStyle } from "components/misc/CustomTheme"
import { useParams } from "react-router-dom"
import axios from "global/axiosbase";
import UserContext from "global/UserContext"
import { default as NumberFormat } from 'react-number-format';

export const AddModal = ({ setAddModal, setActivityData, addTable, getHeader,Headers, activityData }) => {
    const param = useParams().id;
    const [ close,setClose ] = useState('');
    const closeHandle = () =>{
        setClose('contentParent2');
        setTimeout(() => { setAddModal(false); setClose('') }, 300);
    }
    const SubmitHandle = (e) =>{
        e.preventDefault();
        let inp = document.querySelectorAll(".gettInp"); let arr = Array.from(inp); let final = {}; let total = [];
        arr.forEach(el=>{
            if(el.name !== "country"){
                final[el.name] = parseInt(el.value);
                total.push(parseInt(el.value));
            }else{
                final[el.name] = el.value
            }
        }); final["idd"] = param; 
        let result = total.reduce((a, b) => a + b);
        final["total"] = result;
        final["code"] = activityData.length + 1;
        final["target"] = false;

        setClose('contentParent2');
        setTimeout(() => {setActivityData(prev=> [ ...prev, final ]); setAddModal(false); setClose('') }, 300);
    }

    console.log(`activityData`, activityData.length);

    return (
        <CustomModal>
            <div className={`contentParent ${close}`} style={{width:"30rem", padding:"1rem 1.5rem"}}>
                <div className="head">
                    <div className="title">Зорилтот зах зээл</div>
                    <div onClick={closeHandle} className="close">✖</div>
                </div>
                <form onSubmit={SubmitHandle}>
                    <div className="content">
                        <InputStyle >
                            <div className="label">Харьцуулах улс, орнууд</div>
                            <input type="text" name="country" className="gettInp" required />
                        </InputStyle>
                        <InputStyle >
                            <div className="label">Худалдах үнэ</div>
                            <NumberFormat className="cash gettInp" name={`price`} isNumericString={true} placeholder="0" required />
                        </InputStyle>

                        <InputStyle >
                            <div className="label">Стандарт шаардлага багатай</div>
                            <NumberFormat className="cash gettInp" name={`standart`} isNumericString={true} placeholder="0" required />
                        </InputStyle>

                        <InputStyle >
                            <div className="label">Тариф</div>
                            <NumberFormat className="cash gettInp" name={`tarif`} isNumericString={true} placeholder="0" required />
                        </InputStyle>

                        <InputStyle >
                            <div className="label">Тээвэрлэлтийн хувьд ойр байдал</div>
                            <NumberFormat className="cash gettInp" name={`traffic_range`} isNumericString={true} placeholder="0" required />
                        </InputStyle>

                        

                        {getHeader?
                            <>
                                {Headers.head1?<InputStyle >
                                    <div className="label">{Headers.head1}</div>
                                    <NumberFormat className="cash gettInp" name={`add1`} isNumericString={true} placeholder="0" required />
                                </InputStyle>:null}

                                {Headers.head2?<InputStyle >
                                    <div className="label">{Headers.head2}</div>
                                    <NumberFormat className="cash gettInp" name={`add2`} isNumericString={true} placeholder="0" required />
                                </InputStyle>:null}

                                {Headers.head3?<InputStyle >
                                    <div className="label">{Headers.head3}</div>
                                    <NumberFormat className="cash gettInp" name={`add3`} isNumericString={true} placeholder="0" required />
                                </InputStyle>:null}

                                {Headers.head4?<InputStyle >
                                    <div className="label">{Headers.head4}</div>
                                    <NumberFormat className="cash gettInp" name={`add4`} isNumericString={true} placeholder="0" required />
                                </InputStyle>:null}
                               
                            </>
                        : addTable.length? addTable.map(el=>{
                            return (
                                <InputStyle >
                                    <div className="label">{el.head}</div>
                                    <NumberFormat className="cash gettInp" name={el.name} isNumericString={true} placeholder="0" required />
                                </InputStyle>
                            )
                        }):null}


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
                }})]);
            setEditModal(false); setClose('');
        }, 300);
    }

    return (
        <CustomModal>
            <div className={`contentParent ${close}`} style={{width:"30rem", padding:"1rem 2rem"}}>
                <div className="head">
                    <div className="title">Зорилтот зах зээл</div>
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
                            <input defaultValue={selected.tarif} className="gettInp" name={`tarif`} thousandSeparator={true} required />
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
        arr.forEach(el=>{ final[el.name] = el.value; }); final["idd"] = param;
        axios.delete(`analysistwos/${selected?.id}`).then(res=>{
            setClose('contentParent2');ctx.alertFunc('green','Устгагдлаа',true );
            setTimeout(() => {  setActivityData(prev=>prev.filter(item=>item.id!==res.data.id)); setDeleteModal(false); setClose('') }, 300);
        }).catch(err=>ctx.alertFunc('orange','Алдаа гарлаа',true ));
    }

    return (
        <CustomModal>
            <div className={`contentParent ${close}`} style={{width:"35rem"}}>
                <div className="head">
                    <div className="title">Зорилтот зах зээл</div>
                    <div onClick={closeHandle} className="close">✖</div>
                </div>
                <form onSubmit={SubmitHandle}>
                    <div className="content">
                        <InputStyle >
                            <div className="label">Харьцуулах улс, орнууд</div>
                            <input type="text" defaultValue={selected.country} name="country" className="gettInp" required />
                        </InputStyle>
                        <InputStyle >
                            <div className="label">Худалдах үнэ</div>
                            <NumberFormat defaultValue={selected.price}  className="cash gettInp" name={`price`} isNumericString={true} placeholder="0" required />
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

