import React, { useState, useContext, useEffect } from 'react'
import { CustomModal, InputStyle } from "components/misc/CustomTheme"
import UserContext from "global/UserContext"
import { useParams } from "react-router-dom"
import { RiArrowRightSFill, RiEdit2Line } from "react-icons/ri"
import { VscError } from "react-icons/vsc"
import { MdOpenWith } from "react-icons/md"
import { Indicator, Description } from "./BuyPlanDetail"
import axios from "global/axiosbase";
import { default as NumberFormat } from 'react-number-format';
import styled from 'styled-components';
import { VscSave } from "react-icons/vsc"


export const AddModal = ({ setAddModal, setActivityData, setCond }) => {
    const ctx = useContext(UserContext);
    const param = useParams().id;
    const [ close,setClose ] = useState('');
    const [ showIndicator, setShowIndicator ] = useState(false);
    const [ showDescription, setShowDescription ] = useState(false);

    const [ IndicatorData, setIndicatorData ] = useState('');
    const [ DescriptionData, setDescriptionData ] = useState('');

    const closeHandle = () =>{
        setClose('contentParent2');
        setTimeout(() => { setAddModal(false); setClose('') }, 300);
    }

    const SubmitHandle = (e) =>{
        e.preventDefault();
        let inp = document.querySelectorAll(".gettInp"); let arr = Array.from(inp); let final = {};

        arr.forEach(el=>{
            if(el.name === "rule"){
                if(el.value==="Гэрээ шууд байгуулах"){
                    final["team_check"] = true;
                }
            }
            if( el.name === 'plan_cost'){
                final[el.name] = parseInt(el.value.slice(0,-1).replaceAll(',',''));
            }else{ final[el.name] = el.value }
        });
        final["idd"] = param;
        final["description"] = DescriptionData;
        final["some_indicator"] = IndicatorData;

        if(IndicatorData===''){
            setShowIndicator(true);
        }else if(DescriptionData===''){
            setShowDescription(true);
        }else{
            ctx.loadFunc(true);
            axios.post(`buy-plans`, final).then(_=>{
                axios.put(`totals/${ctx.total?.id}`, { buy_plan: true, idd: param }).then(_=>{
                    setCond(prev=>!prev);
                    ctx.loadFunc(false);
                    setClose('contentParent2');
                    setTimeout(() => {
                        // setActivityData(prev=> [ ...prev, final ]);
                    setAddModal(false); setClose('') }, 300);
                    ctx.alertFunc('green','Амжилттай',true );
                })
            }).catch(_=>ctx.alertFunc('orange','Алдаа гарлаа',true ));
        }
    }

    // ctx.loadFunc(true);
    // ctx.alertFunc('green','Амжилттай',true );

    return (
        <CustomModal>
            <div className={`contentParent ${close}`} style={{width:"50rem"}}>
                <div className="head">
                    <div className="title">Худалдан авах ажиллагааны төлөвлөгөө</div>
                    <div onClick={closeHandle} className="close">✖</div>
                </div>
                <form onSubmit={SubmitHandle}>
                    <div className="content">
                        <Layout >
                            <InputStyle >
                                <div className="label">Төсөвт өртөг (төгрөг)</div>
                                <NumberFormat className="cash gettInp" name='plan_cost' isNumericString={true} thousandSeparator={true} suffix={` ₮`} placeholder="0 ₮" required />
                            </InputStyle>

                            <InputStyle >
                                <div className="label">Худалдан авах ажиллагаанд мөрдөх журам</div>
                                <select name="rule" className="gettInp" required>
                                    <option selected disabled></option>
                                    <option value="Нээлттэй шалгаруулалт">1. Нээлттэй шалгаруулалт</option>
                                    <option value="Харьцуулалт">2. Харьцуулалт</option>
                                    <option value="Гэрээ шууд байгуулах">3. Гэрээ шууд байгуулах</option>
                                </select >
                                <div className="SelectArr"><RiArrowRightSFill /></div>
                                {/* <input type="text" name="titile"  required /> */}
                            </InputStyle>
                        </Layout>

                        <Layout >
                            <InputStyle >
                                <div className="label">Үнэлгээний хороо байгуулах огноо</div>
                                <input type="date" className="gettInp" name="foundation_date" type="text" onBlur={(e) => e.target.type = 'text'} onFocus={(e) => e.target.type = 'date'} required />
                            </InputStyle>

                            <InputStyle >
                                <div className="label">Тендер зарлах огноо</div>
                                <input type="date" className="gettInp" name="tender_date" type="text" onBlur={(e) => e.target.type = 'text'} type="text" onFocus={(e) => e.target.type = 'date'} required />
                            </InputStyle>
                        </Layout>

                        <Layout >
                            <InputStyle >
                                <div className="label">Гэрээ байгуулах огноо</div>
                                <input type="date" className="gettInp" name="contract_startdate" type="text" onBlur={(e) => e.target.type = 'text'} type="text" onFocus={(e) => e.target.type = 'date'} required />
                            </InputStyle>
                            <InputStyle >
                                <div className="label">Гэрээ дуусгавар болох, дүгнэх огноо</div>
                                <input type="date" className="gettInp" name="contract_enddate" type="text" onBlur={(e) => e.target.type = 'text'} type="text" onFocus={(e) => e.target.type = 'date'} required />
                            </InputStyle>
                        </Layout>


                        <Layout >
                            <InputStyle >
                                <div className="label">Худалдан авах бараа, ажил, үйлчилгээний нэр, төрөл, тоо хэмжээ, хүчин чадал</div>
                                {/* <input type="date" className="gettInp" name="time" type="text" onBlur={(e) => e.target.type = 'text'} type="text" onFocus={(e) => e.target.type = 'date'} required /> */}
                                <div  className={`modalbtnPar ${IndicatorData!==''?`modalbtnParActive`:``} `}>
                                    <button style={{width:`100%`}} onClick={()=>setShowIndicator(true)} type="button" className="modalbtn"><MdOpenWith /> Мэдээллээ оруулах</button>
                                </div>
                            </InputStyle>
                            <InputStyle >
                                <div className="label">Тайлбар, тодруулга</div> <br />
                                <div className={`modalbtnPar ${DescriptionData!==''?`modalbtnParActive`:``} `}>
                                    <button onClick={()=>setShowDescription(true)} style={{width:`100%`}} type="button" className="modalbtn"><MdOpenWith /> Мэдээллээ оруулах</button>
                                </div>
                            </InputStyle>
                        </Layout>

                        <div className="modalbtnPar">
                            <button type="submit" className="modalbtn"><VscSave /> Хадгалах</button>
                        </div>
                    </div>
                </form>
            </div>
            {showIndicator?<Indicator setIndicatorData={setIndicatorData} IndicatorData={IndicatorData} setShow={setShowIndicator} />:null}
            {showDescription?<Description setIndicatorData={setDescriptionData} IndicatorData={DescriptionData} setShow={setShowDescription} />:null}
        </CustomModal>
    )
}

const Layout = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:start;
    gap:40px;
    .label{
        margin-bottom:10px;
    }
`




export const EditModal = ({ setAddModal, selected, setCond }) => {
    const ctx = useContext(UserContext);
    const param = useParams().id;
    const [ close,setClose ] = useState('');
    const [ showIndicator, setShowIndicator ] = useState(false);
    const [ showDescription, setShowDescription ] = useState(false);

    const [ IndicatorData, setIndicatorData ] = useState('');
    const [ DescriptionData, setDescriptionData ] = useState('');

    useEffect(()=>{
        setIndicatorData(selected.some_indicator);
        setDescriptionData(selected.description);
    },[])

    const closeHandle = () =>{
        setClose('contentParent2');
        setTimeout(() => { setAddModal(false); setClose('') }, 300);
    }

    const SubmitHandle = (e) =>{
        e.preventDefault();
        let inp = document.querySelectorAll(".gettInp"); let arr = Array.from(inp); let final = {};

        arr.forEach(el=>{
            if(el.name === "rule"){
                if(el.value==="Гэрээ шууд байгуулах"){
                    final["team_check"] = true;
                }
            }
            if( el.name === 'plan_cost'){
                final[el.name] = parseInt(el.value.slice(0,-1).replaceAll(',',''));
            }else{ final[el.name] = el.value }
        });
        final["idd"] = param;
        final["description"] = DescriptionData;
        final["some_indicator"] = IndicatorData;

        if(IndicatorData===''){
            setShowIndicator(true);
        }else if(DescriptionData===''){
            setShowDescription(true);
        }else{
            ctx.loadFunc(true);
            axios.put(`buy-plans/${selected.id}`, final).then(_=>{
                axios.put(`totals/${ctx.total?.id}`, { buy_plan: true, idd: param }).then(_=>{
                    setCond(prev=>!prev);
                    ctx.loadFunc(false);
                    setClose('contentParent2');
                    setTimeout(() => {
                        // setActivityData(prev=> [ ...prev, final ]);
                    setAddModal(false); setClose('') }, 300);
                    ctx.alertFunc('green','Амжилттай',true );
                })
            }).catch(_=>ctx.alertFunc('orange','Алдаа гарлаа',true ));
        }
    }

    // ctx.loadFunc(true);
    // ctx.alertFunc('green','Амжилттай',true );

    return (
        <CustomModal>
            <div className={`contentParent ${close}`} style={{width:"50rem"}}>
                <div className="head">
                    <div className="title">Худалдан авах ажиллагааны төлөвлөгөө ( Засах )</div>
                    <div onClick={closeHandle} className="close">✖</div>
                </div>
                <form onSubmit={SubmitHandle}>
                    <div className="content">
                        <Layout >
                            <InputStyle >
                                <div className="label">Төсөвт өртөг (төгрөг)</div>
                                <NumberFormat defaultValue={selected.plan_cost} className="cash gettInp" name='plan_cost' isNumericString={true} thousandSeparator={true} suffix={` ₮`} placeholder="0 ₮" required />
                            </InputStyle>

                            <InputStyle >
                                <div className="label">Худалдан авах ажиллагаанд мөрдөх журам</div>
                                <select name="rule" className="gettInp">
                                    {/* <option selected disabled></option> */}
                                    {ruleData.map((el,ind)=>{
                                        return(
                                            <option selected={selected.rule===el} key={ind} value={el}>{ind+1}. {el}</option>
                                        )
                                    })}
                                </select >
                                <div className="SelectArr"><RiArrowRightSFill /></div>
                                {/* <input type="text" name="titile"  required /> */}
                            </InputStyle>
                        </Layout>

                        <Layout >
                            <InputStyle >
                                <div className="label">Үнэлгээний хороо байгуулах огноо</div>
                                <input defaultValue={selected.foundation_date} type="date" className="gettInp" name="foundation_date" type="text" onBlur={(e) => e.target.type = 'text'} onFocus={(e) => e.target.type = 'date'} required />
                            </InputStyle>

                            <InputStyle >
                                <div className="label">Тендер зарлах огноо</div>
                                <input type="date" className="gettInp" defaultValue={selected.tender_date} name="tender_date" type="text" onBlur={(e) => e.target.type = 'text'} type="text" onFocus={(e) => e.target.type = 'date'} required />
                            </InputStyle>
                        </Layout>

                        <Layout >
                            <InputStyle >
                                <div className="label">Гэрээ байгуулах огноо</div>
                                <input type="date" className="gettInp" defaultValue={selected.contract_startdate} name="contract_startdate" type="text" onBlur={(e) => e.target.type = 'text'} type="text" onFocus={(e) => e.target.type = 'date'} required />
                            </InputStyle>
                            <InputStyle >
                                <div className="label">Гэрээ дуусгавар болох, дүгнэх огноо</div>
                                <input type="date" className="gettInp"  defaultValue={selected.contract_enddate} name="contract_enddate" type="text" onBlur={(e) => e.target.type = 'text'} type="text" onFocus={(e) => e.target.type = 'date'} required />
                            </InputStyle>
                        </Layout>


                        <Layout >
                            <InputStyle >
                                <div className="label">Худалдан авах бараа, ажил, үйлчилгээний нэр, төрөл, тоо хэмжээ, хүчин чадал</div>
                                {/* <input type="date" className="gettInp" name="time" type="text" onBlur={(e) => e.target.type = 'text'} type="text" onFocus={(e) => e.target.type = 'date'} required /> */}
                                <div  className={`modalbtnPar ${IndicatorData!==''?`modalbtnParActive`:``} `}>
                                    <button style={{width:`100%`}} onClick={()=>setShowIndicator(true)} type="button" className="modalbtn"><MdOpenWith /> Мэдээллээ оруулах</button>
                                </div>
                            </InputStyle>
                            <InputStyle >
                                <div className="label">Тайлбар, тодруулга</div> <br />
                                <div className={`modalbtnPar ${DescriptionData!==''?`modalbtnParActive`:``} `}>
                                    <button onClick={()=>setShowDescription(true)} style={{width:`100%`}} type="button" className="modalbtn"><MdOpenWith /> Мэдээллээ оруулах</button>
                                </div>
                            </InputStyle>
                        </Layout>

                        <div className="modalbtnPar">
                            <button type="submit" className="modalbtn"><RiEdit2Line /> Хадгалах</button>
                        </div>
                    </div>
                </form>
            </div>
            {showIndicator?<Indicator setIndicatorData={setIndicatorData} IndicatorData={IndicatorData} setShow={setShowIndicator} />:null}
            {showDescription?<Description setIndicatorData={setDescriptionData} IndicatorData={DescriptionData} setShow={setShowDescription} />:null}
        </CustomModal>
    )
}

const ruleData = [
    'Нээлттэй шалгаруулалт', 'Харьцуулалт', 'Гэрээ шууд байгуулах'
]


export const DeleteModal = ({ setAddModal, selected, setCond }) => {
    const ctx = useContext(UserContext);
    const [ close,setClose ] = useState('');

    const closeHandle = () =>{
        setClose('contentParent2');
        setTimeout(() => { setAddModal(false); setClose('') }, 300);
    }

    const SubmitHandle = (e) =>{
        e.preventDefault();
        ctx.loadFunc(true);
        axios.delete(`buy-plans/${selected.id}`).then(_=>{
                setCond(prev=>!prev);
                ctx.loadFunc(false);
                setClose('contentParent2');
                setTimeout(() => {
                setAddModal(false); setClose('') }, 300);
                ctx.alertFunc('green','Амжилттай',true );
        }).catch(_=>ctx.alertFunc('orange','Алдаа гарлаа',true ));
    }

    return (
        <CustomModal>
            <div className={`contentParent ${close}`} style={{width:"50rem"}}>
                <div className="head">
                    <div className="title">Худалдан авах ажиллагааны төлөвлөгөө ( Устгах )</div>
                    <div onClick={closeHandle} className="close">✖</div>
                </div>
                <form onSubmit={SubmitHandle}>
                    <div className="content">

                        <div style={{opacity:`0.7`}}>
                            <Layout >
                                <InputStyle >
                                    <div className="label">Төсөвт өртөг (төгрөг)</div>
                                    <NumberFormat defaultValue={selected.plan_cost} className="cash gettInp" name='plan_cost' isNumericString={true} thousandSeparator={true} suffix={` ₮`} placeholder="0 ₮" />
                                </InputStyle>
                                <InputStyle >
                                    <div className="label">Худалдан авах ажиллагаанд мөрдөх журам</div>
                                    <select name="rule" className="gettInp">
                                        {/* <option selected disabled></option> */}
                                        {ruleData.map((el,ind)=>{
                                            return(
                                                <option selected={selected.rule===el} key={ind} value={el}>{ind+1}. {el}</option>
                                            )
                                        })}
                                    </select >
                                    <div className="SelectArr"><RiArrowRightSFill /></div>
                                    {/* <input type="text" name="titile"  /> */}
                                </InputStyle>
                            </Layout>
                            <Layout >
                                <InputStyle >
                                    <div className="label">Үнэлгээний хороо байгуулах огноо</div>
                                    <input defaultValue={selected.foundation_date} type="date" className="gettInp" name="foundation_date" type="text" onBlur={(e) => e.target.type = 'text'} onFocus={(e) => e.target.type = 'date'} />
                                </InputStyle>

                                <InputStyle >
                                    <div className="label">Тендер зарлах огноо</div>
                                    <input type="date" className="gettInp" defaultValue={selected.tender_date} name="tender_date" type="text" onBlur={(e) => e.target.type = 'text'} type="text" onFocus={(e) => e.target.type = 'date'} />
                                </InputStyle>
                            </Layout>
                        </div>

                        <div className="modalbtnPar">
                            <button type="submit" className="modalbtn"><VscError /> Устгах</button>
                        </div>
                    </div>
                </form>
            </div>
        </CustomModal>
    )
}
