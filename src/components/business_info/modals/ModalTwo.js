import React, { useState, useContext } from 'react'
import { CustomModal, InputStyle } from "components/misc/CustomTheme"
import { useHistory, useParams } from "react-router-dom"
import { MaxDate } from "components/misc/BeforeYears"
import { default as NumberFormat } from 'react-number-format';
import axios from "global/axiosbase";
import UserContext from "global/UserContext"

export const AddModal = ({ setAddModal, setCond, urlDetail, url, title, customTitle, helpField, length, dataOne, setCond2 }) => {
    // const history = useHistory();
    const param = useParams().id;
    const initial = { idd: param }
    const ctx = useContext(UserContext);
    const [ close,setClose ] = useState('');
    const [ details, setDetails ] = useState([]);

    const closeHandle = () =>{
        setClose('contentParent2');
        setTimeout(() => { setAddModal(false); setClose('') }, 300);
    }

    const SubmitHandle = (e) =>{
        e.preventDefault();
        let inp = document.querySelectorAll(".gettInppe"); let arr = Array.from(inp); let final = {};
        arr.forEach(el=>{ final[el.name] = parseInt(el.value.replaceAll(',','')); }); final["desc"] = customTitle; final["idd"] = param;

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
        if(finalDetail.length > 1){
            ctx.loadFunc(true);
            axios.post(url, final).then(res=>{
                if(res.data.id){
                    const datalength = finalDetail.length
                    finalDetail.forEach((el, ind)=>{
                        el[helpField] = res.data.id;
                        console.log(`helpField`, helpField);
                        if(url === "busthrees" && length === 0){
                            axios.post(`export-products`, { idd: param, name: el.desc })
                        }
                        axios.post(urlDetail, el).then(res=>{
                            if(datalength - 1 === ind){
                                ctx.alertFunc('green','Амжилттай',true );
                                ctx.loadFunc(false);
                                setClose('contentParent2');
                                setTimeout(() => { setAddModal(false); setClose(''); setCond(prev=>!prev) }, 300);
                                if(helpField === "busthree" && length > 0){
                                    axios.put(`totals/${ctx.total?.id}`, { busone: true, idd: param }).then(res=>{
                                        ctx.alertFunc('green','Амжилттай',true );
                                        ctx.loadFunc(false);
                                        setCond2(prev=>!prev);
                                        // history.push(`/${param}/businessinfo/3`);
                                    })
                                }
                            }
                        }).catch(err=>ctx.alertFunc('orange','Алдаа гарлаа',true ));
                    });
                }
            }).catch(err=>ctx.alertFunc('orange','Алдаа гарлаа',true ));
        }else{
            setDetails(prev=> [...prev, initial ])
        }
    }


    return (
        <CustomModal>
            <div className={`contentParent ${close}`} style={{width:"60rem"}}>
                <div className="head">
                    <div className="title">{title}</div>
                    <div onClick={closeHandle} className="close">✖</div>
                </div>
                <form onSubmit={SubmitHandle}>
                    <div className="content contentFlex">

                        <div className="TableHead">
                            <div className="title">{customTitle}</div>
                            <InputStyle className="inputt">
                                <div className="label">{MaxDate.three} </div>
                                {dataOne.length===1?<NumberFormat className="cash gettInppe" disabled={true} value={dataOne[0].year_three} name={`year_three`} isNumericString={true} thousandSeparator={true} placeholder="0" required /> 
                                :<NumberFormat className="cash gettInppe" name={`year_three`} isNumericString={true} thousandSeparator={true} placeholder="0" required />  }
                            </InputStyle>
                            <InputStyle className="inputt">
                                <div className="label">{MaxDate.two}</div>
                                {dataOne.length===1?<NumberFormat className="cash gettInppe" disabled={true} value={dataOne[0].year_two} name={`year_two`} isNumericString={true} thousandSeparator={true} placeholder="0" required /> 
                                :<NumberFormat className="cash gettInppe" name={`year_two`} isNumericString={true} thousandSeparator={true} placeholder="0" required />  }
                            </InputStyle>
                            <InputStyle className="inputt">
                                <div className="label">{MaxDate.one}</div>

                                {dataOne.length===1?<NumberFormat className="cash gettInppe" disabled={true} value={dataOne[0].year_one} name={`year_one`} isNumericString={true} thousandSeparator={true} placeholder="0" required /> 
                                :<NumberFormat className="cash gettInppe" name={`year_one`} isNumericString={true} thousandSeparator={true} placeholder="0" required />  }
                            </InputStyle>
                        </div>

                        <div className="modalbtnPar">
                            <button onClick={()=>setDetails(prev=> [...prev, initial ])} type="button" className="modalbtn">+ задаргаа нэмэх</button>
                        </div>

                        {details.map((el,i)=>{
                            return(
                                <div key={i} className="TableHead getTable">
                                    <InputStyle className="inputt">
                                        <div className="label">Задаргааны тодорхойлолт {customTitle==="Экспорт (улсаар)"?"Улсын нэр":`Бүтээгдэхүүний нэр*`}</div>
                                        <input name="desc" className={`gettInppDetail${i + 1}`} type="text" required />
                                    </InputStyle>
                                    <InputStyle className="inputt">
                                        <div className="label">{MaxDate.three} - задаргаа</div>
                                        <NumberFormat className={`cash gettInppDetail${i + 1}`} name={`year_three`} isNumericString={true} thousandSeparator={true} placeholder="0" required />
                                    </InputStyle>
                                    <InputStyle className="inputt">
                                        <div className="label">{MaxDate.two} - задаргаа</div>
                                        <NumberFormat className={`cash gettInppDetail${i + 1}`} name={`year_two`} isNumericString={true} thousandSeparator={true} placeholder="0" required />
                                    </InputStyle>
                                    <InputStyle className="inputt">
                                        <div className="label">{MaxDate.one} - задаргаа</div>
                                        <NumberFormat className={`cash gettInppDetail${i + 1}`} name={`year_one`} isNumericString={true} thousandSeparator={true} placeholder="0" required />
                                    </InputStyle>
                                </div>
                            )
                        })}
                        
                        <div className="modalbtnPar">
                            <button type="submit" className="modalbtn">Хадгалах</button>
                        </div>
                    </div>
                </form>
            </div>
        </CustomModal>
    )
}


export const EditModal = ({ setAddModal, setCond, setDataOne, helpField2, urlDetail, url, title, helpField, length, setCond2 }) => {
    const history = useHistory();
    const param = useParams().id;
    const initial = { idd: param }
    const ctx = useContext(UserContext);
    const [ close,setClose ] = useState('');
    const [ details, setDetails ] = useState(setDataOne??[]);
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
        axios.put(`${url}/${details[0]?.id}`, final).then(res=>{
            if(res.data.id){
                const datalength = finalDetail.length
                finalDetail.forEach((el, ind)=>{
                    el[helpField] = res.data.id;
                    if(el.id){
                        axios.put(`${urlDetail}/${el.id}`, el).then(res=>{
                            if(datalength - 1 === ind){
                                ctx.alertFunc('green','Амжилттай',true );
                                ctx.loadFunc(false);
                                setClose('contentParent2');
                                setTimeout(() => { setAddModal(false); setClose(''); setCond(prev=>!prev); }, 300);
    
                                if(helpField === "busthree" && length > 0){
                                    axios.put(`totals/${ctx.total?.id}`, { busone: true, idd: param }).then(res=>{
                                        ctx.alertFunc('green','Амжилттай',true );
                                        ctx.loadFunc(false);
                                        setCond2(prev=>!prev);
                                        // history.push(`/${param}/businessinfo/3`);
                                    })
                                }
    
                            }
                        }).catch(err=>ctx.alertFunc('orange','Алдаа гарлаа',true ));
                    }else{
                        axios.post(`${urlDetail}`, el).then(res=>{
                            if(datalength - 1 === ind){
                                ctx.alertFunc('green','Амжилттай',true );
                                ctx.loadFunc(false);
                                setClose('contentParent2');
                                setTimeout(() => { setAddModal(false); setClose(''); setCond(prev=>!prev); }, 300);
                                if(helpField === "busthree" && length > 0){
                                    axios.put(`totals/${ctx.total?.id}`, { busone: true, idd: param }).then(res=>{
                                        ctx.alertFunc('green','Амжилттай',true );
                                        ctx.loadFunc(false);
                                        setCond2(prev=>!prev);
                                        // history.push(`/${param}/businessinfo/3`);
                                    })
                                }
    
                            }
                        }).catch(err=>ctx.alertFunc('orange','Алдаа гарлаа',true ));
                    }
                    
                });
            }
        }).catch(err=>ctx.alertFunc('orange','Алдаа гарлаа',true ));
    }

    console.log(`details++`, details)

    const AddHandle = () =>{
        // const detail = details[0][helpField2].push(initial)
        // console.log(`detail`, detail);
        // console.log(`object++++`, details[0][helpField2].length)
        // let final = details[0][helpField2].push(initial);

        // console.log(`final`, final)
        // setDetails(prev=> [ ...prev[0][helpField2].push(initial) ]);
        setDetails(prev=> [ ...prev.filter(item=>{
            item[helpField2].push(initial);
            return item
        })]);

    }

    return (
        <CustomModal>
            <div className={`contentParent ${close}`} style={{width:"60rem"}}>
                <div className="head">
                    <div className="title">{title}</div>
                    <div onClick={closeHandle} className="close">✖</div>
                </div>
                <form onSubmit={SubmitHandle}>
                    <div className="content contentFlex">
                        {details.map((el,i)=>{
                            return(
                                <>
                                    <div key={el.id} className="TableHead">
                                        <div className="title">{el.desc}</div>
                                        <InputStyle className="inputt">
                                            <div className="label">{MaxDate.three} </div>
                                            {/* <input type="number" name="code" className="gettInp" required /> */}
                                            <NumberFormat className="cash gettInppe" disabled={true} defaultValue={el.year_three} name={`year_three`} isNumericString={true} thousandSeparator={true} placeholder="0" required />
                                        </InputStyle>
                                        <InputStyle className="inputt">
                                            <div className="label">{MaxDate.two}</div>
                                            <NumberFormat className="cash gettInppe" disabled={true} defaultValue={el.year_two} name={`year_two`} isNumericString={true} thousandSeparator={true} placeholder="0" required />
                                        </InputStyle>
                                        <InputStyle className="inputt">
                                            <div className="label">{MaxDate.one}</div>
                                            <NumberFormat className="cash gettInppe" disabled={true} defaultValue={el.year_one} name={`year_one`} isNumericString={true} thousandSeparator={true} placeholder="0" required />
                                        </InputStyle>
                                    </div>

                                    <div className="modalbtnPar">
                                        <button type="button" onClick={AddHandle} className="modalbtn">+ задаргаа нэмэх</button>
                                    </div>

                                    {helpField2==="bustwodetails"?el.bustwodetails.map((elem, ind)=>{
                                        return(
                                            <div key={elem.id} id={elem.id} className="TableHead getTable2">
                                                <InputStyle className="inputt">
                                                    <div className="label">{el.desc==="Дотоодын борлуулалт (голлох бүтээгдэхүүнээр)"?`Бүтээгдэхүүний нэр`:`Задаргааны тодорхойлолт`}</div>
                                                    <input name="desc" value={elem.desc} className={`gettInppDetail2${ind + 1}`} type="text" required />
                                                </InputStyle>
                                                <InputStyle className="inputt">
                                                    <div className="label">{MaxDate.three} - задаргаа </div>
                                                    <NumberFormat className={`cash gettInppDetail2${ind + 1}`} defaultValue={elem.year_three} name={`year_three`} isNumericString={true} thousandSeparator={true} placeholder="0" required />
                                                </InputStyle>
                                                <InputStyle className="inputt">
                                                    <div className="label">{MaxDate.two} - задаргаа</div>
                                                    <NumberFormat className={`cash gettInppDetail2${ind + 1}`} defaultValue={elem.year_two} name={`year_two`} isNumericString={true} thousandSeparator={true} placeholder="0" required />
                                                </InputStyle>
                                                <InputStyle className="inputt">
                                                    <div className="label">{MaxDate.one} - задаргаа</div>
                                                    <NumberFormat className={`cash gettInppDetail2${ind + 1}`} defaultValue={elem.year_one} name={`year_one`} isNumericString={true} thousandSeparator={true} placeholder="0" required />
                                                </InputStyle>
                                            </div>
                                        )
                                    }):(el.busthreedetails.map((elem, ind)=>{
                                            return(
                                                <div key={elem.id} id={elem.id} className="TableHead getTable2">
                                                    <InputStyle className="inputt">
                                                        <div className="label">{el.desc==="Экспорт (голлох бүтээгдэхүүнээр)"?`Бүтээгдэхүүний нэр*`:el.desc==="Экспорт (улсаар)"?"Улсын нэр":`Задаргааны тодорхойлолт`}</div>
                                                        <input name="desc" value={elem.desc} className={`gettInppDetail2${ind + 1}`} type="text" required />
                                                    </InputStyle>
                                                    <InputStyle className="inputt">
                                                        <div className="label">{MaxDate.three} - задаргаа </div>
                                                        <NumberFormat className={`cash gettInppDetail2${ind + 1}`} defaultValue={elem.year_three} name={`year_three`} isNumericString={true} thousandSeparator={true} placeholder="0" required />
                                                    </InputStyle>
                                                    <InputStyle className="inputt">
                                                        <div className="label">{MaxDate.two} - задаргаа</div>
                                                        <NumberFormat className={`cash gettInppDetail2${ind + 1}`} defaultValue={elem.year_two} name={`year_two`} isNumericString={true} thousandSeparator={true} placeholder="0" required />
                                                    </InputStyle>
                                                    <InputStyle className="inputt">
                                                        <div className="label">{MaxDate.one} - задаргаа</div>
                                                        <NumberFormat className={`cash gettInppDetail2${ind + 1}`} defaultValue={elem.year_one} name={`year_one`} isNumericString={true} thousandSeparator={true} placeholder="0" required />
                                                    </InputStyle>
                                                </div>
                                            )
                                        })
                                    )}

                                </>
                            )
                        })}
                        <div className="modalbtnPar">
                            <button type="submit" className="modalbtn">Хадгалах</button>
                        </div>
                    </div>
                </form>
            </div>
        </CustomModal>
    )
}