import React, { useState, useContext } from 'react'
import { CustomModal, InputStyle } from "components/misc/CustomTheme"
import { useParams } from "react-router-dom"
import { MaxDate } from "components/misc/BeforeYears"
import { default as NumberFormat } from 'react-number-format';
import axios from "global/axiosbase";
import UserContext from "global/UserContext"

export const AddModal = ({ setAddModal, setCond, setCond2 }) => {
    const param = useParams().id;
    const initial = { idd: param }
    const ctx = useContext(UserContext);
    const [ close,setClose ] = useState('');
    const [ details, setDetails ] = useState([{ idd: param }, { idd: param }]);
    const closeHandle = () =>{
        setClose('contentParent2');
        setTimeout(() => { setAddModal(false); setClose('') }, 300);
    }
    const SubmitHandle = (e) =>{
        e.preventDefault();
        let inp = document.querySelectorAll(".gettInppe"); let arr = Array.from(inp); let final = {};
        arr.forEach(el=>{ final[el.name] = parseInt(el.value.replaceAll(',','')); }); final["idd"] = param;

        let detailInp = document.querySelectorAll(".getTable"); let arr2 = Array.from(detailInp); let finalDetail = []; 
        arr2.forEach((el, i)=>{
            let obj = {};
            let detailInp = document.querySelectorAll(`.gettInppDetail${i + 1}`); let arr2 = Array.from(detailInp);
            arr2.forEach(el=>{
                if(el.name !== "desc"){
                    obj[el.name] = parseInt(el.value.replaceAll(',',''));
                }else{
                    obj[el.name] = el.value;
                }
            });
            obj["idd"] = param
            finalDetail.push(obj);
        });


        // if(finalDetail.length > 1){
            ctx.loadFunc(true);
            axios.post(`busones`, final).then(res=>{
                if(res.data.id){
                    let myLeng = finalDetail.length
                    finalDetail.forEach((el, ind)=>{
                        el["busone"] = res.data.id;
                        axios.post(`busonedetails`, el).then(res=>{
                            if(myLeng - 1 === ind){
                                ctx.alertFunc('green','??????????????????',true );
                                ctx.loadFunc(false);
                                setClose('contentParent2');
                                setCond2(prev=>!prev);
                                setTimeout(() => { setAddModal(false); setClose(''); setCond(prev=>!prev); }, 300);
                            }
                        }).catch(err=>ctx.alertFunc('orange','?????????? ????????????',true ));
                    });
                    // setCond(prev=>!prev);
                }
            }).catch(err=>ctx.alertFunc('orange','?????????? ????????????',true ));
        // }else{
        //     setDetails(prev=> [...prev, initial ])
        // }
        

    }
    return (
        <CustomModal>
            <div className={`contentParent ${close}`} style={{width:"60rem"}}>
                <div className="head">
                    <div className="title">?????????????? ?????????? ???????????????? ???????????????????? ( $ )</div>
                    <div onClick={closeHandle} className="close">???</div>
                </div>
                <form onSubmit={SubmitHandle}>
                    <div className="content contentFlex">
                        <div className="TableHead">
                            <div className="title">???????????????????? (????.??????)</div>
                            <InputStyle className="inputt">
                                <div className="label">{MaxDate.three} </div>
                                {/* <input type="number" name="code" className="gettInp" required /> */}
                                <NumberFormat className="cash gettInppe" name={`year_three`} isNumericString={true} thousandSeparator={true} placeholder="0" required />
                            </InputStyle>
                            <InputStyle className="inputt">
                                <div className="label">{MaxDate.two}</div>
                                <NumberFormat className="cash gettInppe" name={`year_two`} isNumericString={true} thousandSeparator={true} placeholder="0" required />
                            </InputStyle>
                            <InputStyle className="inputt">
                                <div className="label">{MaxDate.one}</div>
                                <NumberFormat className="cash gettInppe" name={`year_one`} isNumericString={true} thousandSeparator={true} placeholder="0" required />
                            </InputStyle>
                        </div>

                        {/* <div className="modalbtnPar">
                            <button onClick={()=>setDetails(prev=> [...prev, initial ])} type="button" className="modalbtn">+ ???????????????? ??????????</button>
                        </div> */}

                        {details.map((el,i)=>{
                            return(
                                <div key={i} className="TableHead getTable">
                                    <InputStyle className="inputt">
                                        <div className="label">{i===0?`???????????? ???????????????? ????????????????????`:`???????????? ?????????????????? ????????????????????`}</div>
                                        <input name="desc" value={i===0?`???????????? ???????????????? ????????????????????`:`???????????? ?????????????????? ????????????????????`} className={`gettInppDetail${i + 1}`} type="text" style={{opacity:`0`}} />
                                    </InputStyle>
                                    <InputStyle className="inputt">
                                        <div className="label">{MaxDate.three} </div>
                                        <NumberFormat className={`cash gettInppDetail${i + 1}`} name={`year_three`} isNumericString={true} thousandSeparator={true} placeholder="0" required />
                                    </InputStyle>
                                    <InputStyle className="inputt">
                                        <div className="label">{MaxDate.two}</div>
                                        <NumberFormat className={`cash gettInppDetail${i + 1}`} name={`year_two`} isNumericString={true} thousandSeparator={true} placeholder="0" required />
                                    </InputStyle>
                                    <InputStyle className="inputt">
                                        <div className="label">{MaxDate.one}</div>
                                        <NumberFormat className={`cash gettInppDetail${i + 1}`} name={`year_one`} isNumericString={true} thousandSeparator={true} placeholder="0" required />
                                    </InputStyle>
                                </div>
                            )
                        })}
                        
                        <div className="modalbtnPar">
                            <button type="submit" className="modalbtn">????????????????</button>
                        </div>
                    </div>
                </form>
            </div>
        </CustomModal>
    )
}


export const EditModal = ({ setAddModal, setCond, setDataOne, setCond2 }) => {
    const param = useParams().id;
    // const initial = { idd: param }
    const ctx = useContext(UserContext);
    const [ close,setClose ] = useState('');
    // const [ details, setDetails ] = useState([]);
    const closeHandle = () =>{
        setClose('contentParent2');
        setTimeout(() => { setAddModal(false); setClose('') }, 300);
    }

    const SubmitHandle = (e) =>{
        e.preventDefault();
        let inp = document.querySelectorAll(".gettInppe"); let arr = Array.from(inp); let final = {};
        arr.forEach(el=>{ final[el.name] = parseInt(el.value.replaceAll(',','')); }); final["idd"] = param;

        let detailInp = document.querySelectorAll(".getTable2"); let arr2 = Array.from(detailInp); let finalDetail = []; 
        
        arr2.forEach((el, i)=>{
            let obj = {};
            let detailInp = document.querySelectorAll(`.gettInppDetail2${i + 1}`); let arr2 = Array.from(detailInp);
            arr2.forEach(elem=>{
                if(elem.name !== "desc"){
                    obj[elem.name] = parseInt(elem.value.replaceAll(',',''));; 
                }else{
                    obj[elem.name] = elem.value;
                }
            });
            obj["id"] = el.id;
            obj["idd"] = param;
            finalDetail.push(obj);
        });

        ctx.loadFunc(true);
        axios.put(`busones/${setDataOne[0]?.id}`, final).then(res=>{
            if(res.data.id){
                let myLeng = finalDetail.length
                finalDetail.forEach((el, ind)=>{
                    el["busone"] = res.data.id;
                    axios.put(`busonedetails/${el.id}`, el).then(res=>{
                        if(myLeng - 1 === ind){
                            ctx.alertFunc('green','??????????????????',true );
                            ctx.loadFunc(false);
                            setClose('contentParent2');
                            setCond2(prev=>!prev);
                            setTimeout(() => { setAddModal(false); setClose(''); setCond(prev=>!prev); }, 300);
                        }
                    }).catch(err=>ctx.alertFunc('orange','?????????? ????????????',true ));
                });
                // setCond(prev=>!prev);
            }
        }).catch(err=>ctx.alertFunc('orange','?????????? ????????????',true ));
    }

    console.log(`setDataOne`, setDataOne)
    return (
        <CustomModal>
            <div className={`contentParent ${close}`} style={{width:"60rem"}}>
                <div className="head">
                    <div className="title">?????????????? ?????????? ???????????????? ???????????????????? ( $ )</div>
                    <div onClick={closeHandle} className="close">???</div>
                </div>
                <form onSubmit={SubmitHandle}>
                    <div className="content contentFlex">
                        {setDataOne.map((el,i)=>{
                            return(
                                <>
                                    <div key={el.id} className="TableHead">
                                        <div className="title">???????????????????? (????.??????)</div>
                                        <InputStyle className="inputt">
                                            <div className="label">{MaxDate.three} </div>
                                            {/* <input type="number" name="code" className="gettInp" required /> */}
                                            <NumberFormat className="cash gettInppe" defaultValue={el.year_three} name={`year_three`} isNumericString={true} thousandSeparator={true} placeholder="0" required />
                                        </InputStyle>
                                        <InputStyle className="inputt">
                                            <div className="label">{MaxDate.two}</div>
                                            <NumberFormat className="cash gettInppe" defaultValue={el.year_two} name={`year_two`} isNumericString={true} thousandSeparator={true} placeholder="0" required />
                                        </InputStyle>
                                        <InputStyle className="inputt">
                                            <div className="label">{MaxDate.one}</div>
                                            <NumberFormat className="cash gettInppe" defaultValue={el.year_one} name={`year_one`} isNumericString={true} thousandSeparator={true} placeholder="0" required />
                                        </InputStyle>
                                    </div>
                                    {/* <div className="modalbtnPar">
                                        <button type="button" onClick={()=>setDetails(prev=> [...prev, initial ])} className="modalbtn">+ ???????????????? ??????????</button>
                                    </div> */}
                                    {el.busonedetails.map((elem, ind)=>{
                                        return(
                                            <div key={elem.id} id={elem.id} className="TableHead getTable2">
                                                <InputStyle className="inputt">
                                                    <div className="label"> { ind===0?`???????????? ???????????????? ????????????????????`:`???????????? ?????????????????? ????????????????????` }</div>
                                                    <input name="desc" value={i===0?`???????????? ???????????????? ????????????????????`:`???????????? ?????????????????? ????????????????????`} className={`gettInppDetail${i + 1}`} type="text" style={{opacity:`0`}} />
                                                </InputStyle>
                                                <InputStyle className="inputt">
                                                    <div className="label">{MaxDate.three} </div>
                                                    <NumberFormat className={`cash gettInppDetail2${ind + 1}`} defaultValue={elem.year_three} name={`year_three`} isNumericString={true} thousandSeparator={true} placeholder="0" required />
                                                </InputStyle>
                                                <InputStyle className="inputt">
                                                    <div className="label">{MaxDate.two}</div>
                                                    <NumberFormat className={`cash gettInppDetail2${ind + 1}`} defaultValue={elem.year_two} name={`year_two`} isNumericString={true} thousandSeparator={true} placeholder="0" required />
                                                </InputStyle>
                                                <InputStyle className="inputt">
                                                    <div className="label">{MaxDate.one}</div>
                                                    <NumberFormat className={`cash gettInppDetail2${ind + 1}`} defaultValue={elem.year_one} name={`year_one`} isNumericString={true} thousandSeparator={true} placeholder="0" required />
                                                </InputStyle>
                                            </div>
                                        )
                                    })}

                                </>
                            )
                        })}
                        <div className="modalbtnPar">
                            <button type="submit" className="modalbtn">????????????????</button>
                        </div>
                    </div>
                </form>
            </div>
        </CustomModal>
    )
}