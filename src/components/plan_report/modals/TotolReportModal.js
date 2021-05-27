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
        arr.map(el=>{
            if( el.name === 'budget_cost' || el.name === 'want_amount' || el.name === 'want_finance' ){
                final[el.name] = parseInt(el.value.replaceAll(',',''));
            }else{ final[el.name] = el.value }
        }); final["idd"] = param
        

        setClose('contentParent2');
        setTimeout(() => { setParentData(prev=> [ ...prev, ...prev.filter(item=>{
            if(item.code === selected.code){
                console.log('--------------', item.managementdetails)
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
                            <input type="text" onFocus={(e) => e.target.type = 'date'} className="gettInp" name="time" required />
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