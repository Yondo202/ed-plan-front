import React, { useState, useContext } from 'react'
import { CustomModal, InputStyle, MaxDate } from "components/misc/CustomTheme"
import { useParams } from "react-router-dom"
import axios from "global/axiosbase";
import UserContext from "global/UserContext"
import { default as NumberFormat } from 'react-number-format';

export const AddModal = ({ setShowAddModal, setParentData , selected  }) => {
    const param = useParams().id;
    const [ close,setClose ] = useState('');
    const closeHandle = () =>{
        setClose('contentParent2');
        setTimeout(() => { setShowAddModal(false); setClose('') }, 300);
    }

    const SubmitHandle = (e) =>{
        e.preventDefault();
        let inp = document.querySelectorAll(".gettInp"); let arr = Array.from(inp); let final = {};
        arr.forEach(el=>{
            if( el.name === 'budget_cost' || el.name === 'want_amount' || el.name === 'want_finance' ){
                final[el.name] = parseInt(el.value.replaceAll(',',''));
            }else{ final[el.name] = el.value }
        }); final["idd"] = param
        

        setClose('contentParent2');
        setTimeout(() => { setParentData(prev=> [ ...prev, ...prev.filter(item=>{
            if(item.code === selected.code){
                let myLeng = item.managementdetails.length
                final["code"] = myLeng + 1
                item.managementdetails.push(final);
                }
        })]); setShowAddModal(false); setClose('') }, 300);
    }

    return (
        <CustomModal style={{paddingTop:"3rem"}}>
            <div className={`contentParent ${close}`} style={{width:"35rem"}}>
                <div className="head">
                    <div className="title">Удирдлагын багийн уулзалт, тайлан</div>
                    <div onClick={closeHandle} className="close">✖</div>
                </div>
                <form onSubmit={SubmitHandle}>
                    <div className="content">
                        <InputStyle >
                            <div className="label">Төслөөс санхүүжилт хүсч буй үйл ажиллагаа</div>
                            <input type="text" name="desc" autoFocus className="gettInp" required />
                        </InputStyle>

                        <InputStyle >
                            <div className="label">Үйл ажиллагааны ангилал</div>
                            <input type="text" name="activity_category" className="gettInp" required />
                        </InputStyle>

                        <InputStyle >
                            <div className="label">Эхлэх хугацаа</div>
                            <input type="text" onFocus={(e) => e.target.type = 'date'} className="gettInp" name="start_date" required />
                        </InputStyle>

                        <InputStyle >
                            <div className="label">Дуусах хугацаа</div>
                            <input type="text" onFocus={(e) => e.target.type = 'date'} className="gettInp" name="end_date" required />
                        </InputStyle>

                        <InputStyle >
                            <div className="label">Төсөвт зардал ам.дол</div>
                            <NumberFormat className="cash gettInp" name='budget_cost' isNumericString={true} thousandSeparator={true} placeholder="0" required />
                        </InputStyle>

                        <InputStyle >
                            <div className="label">Төслөөс хүсч буй дүн ам.дол</div>
                            <NumberFormat className="cash gettInp" name='want_amount' isNumericString={true} thousandSeparator={true} placeholder="0" required />
                        </InputStyle>

                        <InputStyle >
                            <div className="label">Төслөөс хүсч буй санхүүжилтийн хувь</div>
                            <NumberFormat className="cash gettInp" name='want_finance' isNumericString={true} thousandSeparator={true} placeholder="0" required />
                        </InputStyle>

                        <InputStyle >
                            <div className="label">Хариуцах хүн</div>
                            <input type="text" className="gettInp" name="responsible_person" required />
                        </InputStyle>

                        <InputStyle >
                            <div className="label">Тухайн ажлын талаар тайлагнах хугацаа</div>
                            <input type="text" onFocus={(e) => e.target.type = 'date'} className="gettInp" name="workreport_date" required />
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

export const EditModal = ({ setShowAddModal, setParentData , selected, selectedDetail }) => {
    const param = useParams().id;
    const [ close,setClose ] = useState('');
    const closeHandle = () =>{
        setClose('contentParent2');
        setTimeout(() => { setShowAddModal(false); setClose('') }, 300);
    }

    const SubmitHandle = (e) =>{
        e.preventDefault();
        let inp = document.querySelectorAll(".gettInp"); let arr = Array.from(inp); let final = {};
        arr.forEach(el=>{
            if( el.name === 'budget_cost' || el.name === 'want_amount' || el.name === 'want_finance' ){
                final[el.name] = parseInt(el.value.replaceAll(',',''));
            }else{ final[el.name] = el.value }
        }); final["idd"] = param

        setClose('contentParent2');
        setTimeout(() => { setParentData(prev=> [ ...prev, ...prev.filter(item=>{
            if(item.code === selected.code){
                item.managementdetails = [...item.managementdetails, ...item.managementdetails.filter(smItem=>{
                    if(smItem.code === selectedDetail.code){
                        smItem.desc = final.desc;
                        smItem.activity_category = final.activity_category;
                        smItem.activity_category = final.activity_category;
                        smItem.start_date = final.start_date;
                        smItem.end_date = final.end_date;
                        smItem.budget_cost = final.budget_cost;
                        smItem.want_amount = final.want_amount;
                        smItem.want_finance = final.want_finance;
                        smItem.responsible_person = final.responsible_person;
                        smItem.workreport_date = final.workreport_date;
                    }
                })]
            }
        })]); setShowAddModal(false); setClose('') }, 300);
    }

    return (
        <CustomModal style={{paddingTop:"3rem"}}>
            <div className={`contentParent ${close}`} style={{width:"35rem"}}>
                <div className="head">
                    <div className="title">Удирдлагын багийн уулзалт, тайлан</div>
                    <div onClick={closeHandle} className="close">✖</div>
                </div>
                <form onSubmit={SubmitHandle}>
                    <div className="content">
                        <InputStyle >
                            <div className="label">Төслөөс санхүүжилт хүсч буй үйл ажиллагаа</div>
                            <input defaultValue={selectedDetail.desc} type="text" name="desc" autoFocus className="gettInp" required />
                        </InputStyle>

                        <InputStyle >
                            <div className="label">Үйл ажиллагааны ангилал</div>
                            <input defaultValue={selectedDetail.activity_category} type="text" name="activity_category" className="gettInp" required />
                        </InputStyle>

                        <InputStyle >
                            <div className="label">Эхлэх хугацаа</div>
                            <input defaultValue={selectedDetail.start_date} type="text" onFocus={(e) => e.target.type = 'date'} max={MaxDate}  className="gettInp" name="start_date" required />
                        </InputStyle>

                        <InputStyle >
                            <div className="label">Дуусах хугацаа</div>
                            <input defaultValue={selectedDetail.end_date} type="text" onFocus={(e) => e.target.type = 'date'} max={MaxDate}  className="gettInp" name="end_date" required />
                        </InputStyle>

                        <InputStyle >
                            <div className="label">Төсөвт зардал ам.дол</div>
                            <NumberFormat defaultValue={selectedDetail.budget_cost} className="cash gettInp" name='budget_cost' isNumericString={true} thousandSeparator={true} placeholder="0" required />
                        </InputStyle>

                        <InputStyle >
                            <div className="label">Төслөөс хүсч буй дүн ам.дол</div>
                            <NumberFormat defaultValue={selectedDetail.want_amount} className="cash gettInp" name='want_amount' isNumericString={true} thousandSeparator={true} placeholder="0" required />
                        </InputStyle>

                        <InputStyle >
                            <div className="label">Төслөөс хүсч буй санхүүжилтийн хувь</div>
                            <NumberFormat defaultValue={selectedDetail.want_finance} className="cash gettInp" name='want_finance' isNumericString={true} thousandSeparator={true} placeholder="0" required />
                        </InputStyle>

                        <InputStyle >
                            <div className="label">Хариуцах хүн</div>
                            <input defaultValue={selectedDetail.responsible_person} type="text" className="gettInp" name="responsible_person" required />
                        </InputStyle>

                        <InputStyle >
                            <div className="label">Тухайн ажлын талаар тайлагнах хугацаа</div>
                            <input defaultValue={selectedDetail.workreport_date} type="text" onFocus={(e) => e.target.type = 'date'} max={MaxDate}  className="gettInp" name="workreport_date" required />
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


export const DeleteModal = ({ setShowAddModal, setParentData , selected, selectedDetail }) => {
    const ctx = useContext(UserContext);

    const [ close,setClose ] = useState('');
    const closeHandle = () =>{
        setClose('contentParent2');
        setTimeout(() => { setShowAddModal(false); setClose('') }, 300);
    }

    const SubmitHandle = (e) =>{
        e.preventDefault();
        ctx.loadFunc(false);
        axios.delete(`managementdetails/${selectedDetail.id}`).then(res=>{
            ctx.alertFunc('green','Амжилттай',true );
            ctx.loadFunc(false);
            setClose('contentParent2');
            setTimeout(() => { setParentData(prev=> [ ...prev, ...prev.filter(item=>{
                if(item.code === selected.code){item.managementdetails =[ ...item.managementdetails.filter(smItem=>smItem.code !== selectedDetail.code) ] }})]); setShowAddModal(false); setClose('') }, 300);
        }).catch(err=>ctx.alertFunc('orange','Алдаа гарлаа',true ));
    }

    return (
        <CustomModal style={{paddingTop:"3rem"}}>
            <div className={`contentParent ${close}`} style={{width:"35rem"}}>
                <div className="head">
                    <div className="title">Удирдлагын багийн уулзалт, тайлан</div>
                    <div onClick={closeHandle} className="close">✖</div>
                </div>
                <form onSubmit={SubmitHandle}>
                    <div className="content">
                        <InputStyle style={{opacity:"0.6"}} >
                            <div className="label">Төслөөс санхүүжилт хүсч буй үйл ажиллагаа</div>
                            <input defaultValue={selectedDetail.desc} type="text" name="desc" autoFocus className="gettInp" required />
                        </InputStyle>

                        <InputStyle style={{opacity:"0.6"}}>
                            <div className="label">Үйл ажиллагааны ангилал</div>
                            <input defaultValue={selectedDetail.activity_category} type="text" name="activity_category" className="gettInp" required />
                        </InputStyle>

                        <InputStyle style={{opacity:"0.6"}}>
                            <div className="label">Хариуцах хүн</div>
                            <input defaultValue={selectedDetail.responsible_person} type="text" className="gettInp" name="responsible_person" required />
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