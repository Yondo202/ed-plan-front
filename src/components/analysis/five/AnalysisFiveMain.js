import React, { useContext, useEffect, useState } from 'react';
import {Container, ButtonStyle2, InputStyle, CustomModal} from "components/misc/CustomTheme";
import { RiEdit2Line } from "react-icons/ri"
import { IoMdCheckmark } from "react-icons/io"
import { VscError } from "react-icons/vsc";
import { default as NumberFormat } from 'react-number-format';
import axios from "global/axiosbase"
import { useParams, useHistory } from 'react-router-dom';
import UserContext from "global/UserContext"
import { NumberComma } from "components/misc/NumberComma"
import styled from 'styled-components';

// code gesen talbar oorchlogdoj bolohgui

const AnalysisFiveMain = ({modal}) => {
    const param = useParams().id;
    const slug = useParams().slug;
    const ctx = useContext(UserContext);
    const history = useHistory();
    const [ cond, setCond ] = useState(false);
    const [ staticData, setStaticData ] = useState(Data);
    const [ dataLength, setDatalength ] = useState(null);
    const [ customDate, setCustomDate ] = useState({});
    const [ HeadEdit, setHeadEdit ] = useState(false);

    const [ addModal, setAddModal ] = useState(false);
    
    useEffect(()=>{
        setStaticData(prev=>[...prev.filter(item=> {
            if(item.code === 3){ item.desc = `${ctx.targetProduct?.name} - ${ctx.targetCountry?.country} ` }
            if(item.code === 4){ item.desc = `${ctx.targetCountry?.country} - ЗЗЭХ`}
        }), ...prev]);
        FetchData();
        FetchCount();
        FetchDate();
    },[cond]);



    const FetchData = async () =>{
       await axios.get(`analysisfives?idd=${param}`).then(res=>{
           console.log(`res+++`, res)
           setStaticData(res.data);
            // setStaticData(prev=>[...prev.filter(item=>{
            //     res.data.forEach(el=>{
            //         if(item.code === parseInt(el.code) ){
            //            item.desc = el.desc
            //            item.year_one = el.year_one
            //            item.year_two = el.year_two
            //            item.year_three = el.year_three
            //            item.id = el.id
            //         }
            //     })
            // }), ...prev]);
        })
    }

    const FetchDate = async () =>{
        await axios.get(`analysisfiveyears?idd=${param}&parent=${modal?ctx.targetProduct?.id:slug}`).then(res=>{
            if(res.data.length){
                setCustomDate(res.data[0]);
            }
        })
    }

    const FetchCount = async () =>{
        await axios.get(`analysisfives/count?idd=${param}`).then(res=>{
            setDatalength(res.data);
        });
    }

    const shitchInp = (el,cond) =>{
        if(customDate.id){
            setStaticData(prev=> [...prev.filter(item=>{
                if(item.code === el.code){
                    if(cond){
                        item.inp = true;
                    }else{
                        item.inp = false;
                    }
                }else{
                    item.inp = false;
                }
            }), ...prev]);
        }else{
            setHeadEdit(cond);
        }
    }

    const shitchInp2 = (cond) =>{
        setHeadEdit(cond);
    }

    const SelectItem = ( el ) =>{
        
            let inp = document.querySelectorAll(".inpGet"); let arr = Array.from(inp); let child = {}; let final = el
            arr.forEach(el=>{
                if(el.value){ child[el.name] = parseFloat(el.value.replaceAll(',','')); }
            });
            let keys = Object.keys(child).length;
            if(keys > 2 ){
                final["idd"] = param; final["parent"] = slug; final.year_one = child.year_one; final.year_three = child.year_three; final.year_two = child.year_two;
                if(final.id){
                    axios.put(`analysisfives/${final.id}`, final).then(res=>{
                        ctx.alertFunc('green','',true );
                        setCond(prev=>!prev);
                        setStaticData(prev=> [...prev.filter(item=>{ item.inp = false; }), ...prev]);
                    }).catch(err=>ctx.alertFunc('orange','Алдаа гарлаа',true ));
                }else{
                    axios.post(`analysisfives`, final).then(res=>{
                        setCond(prev=>!prev);
                        ctx.alertFunc('green','',true );
                        setStaticData(prev=> [...prev.filter(item=>{ item.inp = false; }, ), ...prev]);
                    }).catch(err=>ctx.alertFunc('orange','Алдаа гарлаа',true ));
                }
            }
    }

    const submitHandle = (e) =>{
        e.preventDefault();
    }
    
    const clickHandle = () =>{
        if(dataLength > 3){
            ctx.loadFunc(true);
            axios.put(`totals/${ctx.total?.id}`, { analysisfive: true, idd: param }).then(res=>{
                ctx.alertFunc('green','Амжилттай',true );
                ctx.loadFunc(false);
                history.push(`/${param}/marketing/1`);
            });
        }else{
            ctx.alertFunc('orange','Мэдээллийг гүйцэд оруулна уу', true );
        }
    }

    const HeadHandle = () =>{
        let inp = document.querySelectorAll(".inpGettt"); let arr = Array.from(inp); let child = {};
        arr.forEach(el=>{
            if(el.value) {child[el.name] = el.value; }
        });

        setCustomDate({
            // id: customDate.id,
            year_one: child.year_one,
            year_two: child.year_two,
            year_three: child.year_three,
        });
        child["idd"] = param;
        child["parent"] = slug;

        if(customDate.id){
            axios.put(`analysisfiveyears/${customDate.id}`, child).then(res=>{
                setCond(prev=>!prev);
                setHeadEdit(false);
            });
        }else{
            axios.post(`analysisfiveyears`, child).then(res=>{
                setCond(prev=>!prev);
                setHeadEdit(false);
            });
        }
    }

    return (
        <Container style={modal&&{padding:"0px 0px"}}>
            <div className={modal?`customTable T3 pageRender`:`customTable T3`}>
                    <div className="headPar">
                        <div className="title">Экспортын борлуулалтын төлөвлөгөө ( ам.доллар )</div>
                        {/* <div onClick={()=>setAddModal(true)} className="addBtn"><RiAddLine /><span>Нэмэх</span></div> */}
                    </div>
                    <form onSubmit={submitHandle}>
                        <table >
                            <tbody>
                                <tr>
                                    <th >дд</th>
                                    <th >Утга</th>
                                    {HeadEdit?
                                    <>
                                        <th style={{textAlign:'center'}} >
                                            <InputStyle  style={{marginBottom:0}} className="inputt">
                                                <input type="text" defaultValue={customDate?.year_three} className="cash inpGettt" autoFocus name={`year_three`} placeholder="Жил" required />
                                            </InputStyle>
                                        </th>
                                        <th style={{textAlign:'center'}} >
                                            <InputStyle  style={{marginBottom:0}} className="inputt">
                                                <input type="text" defaultValue={customDate?.year_two} className="cash inpGettt" name={`year_two`} placeholder="Жил" required />
                                            </InputStyle>
                                        </th>
                                        <th style={{textAlign:'center'}} >
                                            <InputStyle  style={{marginBottom:0}} className="inputt">
                                                <input type="text" defaultValue={customDate?.year_one} className="cash inpGettt" name={`year_one`} placeholder="Жил" required />
                                            </InputStyle>
                                        </th>
                                    </>
                                    :<>
                                        <th style={{textAlign:'center'}} >{customDate.year_three?customDate.year_three:"Жил 1"}</th>
                                        <th style={{textAlign:'center'}} >{customDate?.year_two?customDate.year_two:"Жил 2"}</th>
                                        <th style={{textAlign:'center'}} >{customDate?.year_one?customDate.year_one:"Жил 3"}</th>
                                     </>
                                    }

                                    <th style={{width:"6rem"}} className="editDelete">
                                            <div className="editDeletePar">
                                                {HeadEdit?<>
                                                    <button onClick={HeadHandle} type="submit" className="smBtn"><IoMdCheckmark /></button>
                                                    <div onClick={()=>shitchInp2(false)} className="smBtn"><VscError /></div></>
                                                :<div onClick={()=>shitchInp2(true)} className="smBtn"><RiEdit2Line /></div>}
                                                {/* {!el.id&&<div onClick={()=>setAddModal(true)} className="smBtn"><RiAddLine /></div>} */}
                                            </div>
                                    </th>
                                </tr>
                                {staticData.map((el,ind)=>{
                                    return(
                                        <tr key={ind} className="parent">
                                            <td style={{width:"2rem"}}>{el.code}</td>
                                            <td style={{width:"22rem"}}>{el.desc}</td>
                                            
                                            {el.inp?el.procent?
                                            <>
                                            <td style={{textAlign:'right', width:"13rem"}}>
                                                    <InputStyle  style={{marginBottom:0}} className="inputt">
                                                        <input type="number" max={100} defaultValue={el.year_three} className="cash inpGet" autoFocus name={`year_three`} placeholder="0" required />
                                                    </InputStyle>
                                                </td>
                                                <td style={{textAlign:'right', width:"13rem"}}>
                                                    <InputStyle style={{marginBottom:0}} className="inputt">
                                                        <input type="number" max={100} defaultValue={el.year_two} className="cash inpGet" name={`year_two`} placeholder="0" required />
                                                    </InputStyle>
                                                </td>
                                                <td style={{textAlign:'right', width:"13rem"}}>
                                                    <InputStyle style={{marginBottom:0}} className="inputt">
                                                        <input type="number" max={100} defaultValue={el.year_one} className="cash inpGet" name={`year_one`} placeholder="0" required />
                                                    </InputStyle>
                                                </td>
                                            </>
                                            :<>
                                                <td style={{textAlign:'right', width:"13rem"}}>
                                                    <InputStyle  style={{marginBottom:0}} className="inputt">
                                                        <NumberFormat defaultValue={el.year_three} className="cash inpGet" autoFocus name={`year_three`} thousandSeparator={true} placeholder="0" required />
                                                    </InputStyle>
                                                </td>
                                                <td style={{textAlign:'right', width:"13rem"}}>
                                                    <InputStyle style={{marginBottom:0}} className="inputt">
                                                        <NumberFormat defaultValue={el.year_two} className="cash inpGet" name={`year_two`} thousandSeparator={true} placeholder="0" required />
                                                    </InputStyle>
                                                </td>
                                                <td style={{textAlign:'right', width:"13rem"}}>
                                                    <InputStyle style={{marginBottom:0}} className="inputt">
                                                        <NumberFormat defaultValue={el.year_one} className="cash inpGet" name={`year_one`} thousandSeparator={true} placeholder="0" required />
                                                    </InputStyle>
                                                </td>
                                            </>
                                            :<>
                                                <td style={{textAlign:'right'}}>{el.code===4?`${el.year_three?el.year_three:``}%`:NumberComma(el.year_three)}</td>
                                                <td style={{textAlign:'right'}}>{el.code===4?`${el.year_two?el.year_two:``}%`:NumberComma(el.year_two)}</td>
                                                <td style={{textAlign:'right'}}>{el.code===4?`${el.year_one?el.year_one:``}%`:NumberComma(el.year_one)}</td>
                                            </>}

                                            <td style={{width:"6rem"}} className="editDelete">
                                                <div className="editDeletePar">
                                                    {el.inp?<>
                                                    <button type="submit" onClick={()=>SelectItem(el)} className="smBtn"><IoMdCheckmark /></button>
                                                    <div onClick={()=>shitchInp(el, false)} className="smBtn"><VscError /></div></>
                                                    :<div onClick={()=>shitchInp(el, true)} className="smBtn"><RiEdit2Line /></div>}
                                                    {/* {!el.id&&<div onClick={()=>setAddModal(true)} className="smBtn"><RiAddLine /></div>} */}
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </table>

                        <AddBtn onClick={()=>setAddModal(true)} >+</AddBtn>

                    </form>
                {customDate.id?addModal?<AddRowModal setEditModal={setAddModal} setStaticData={setStaticData} staticData={staticData} />:null:null}
            </div>

            {!modal&&<ButtonStyle2 >
                <div className="errTxt"></div>
                <button onClick={clickHandle}  className="myBtn">Цааш үргэлжлүүлэх</button>
            </ButtonStyle2>}
            
        </Container>
    )
}

export default AnalysisFiveMain

const Data = [
    { code : 1, desc: "Нийт борлуулалт", year_one: null, year_two: null,  year_three: null, idd: null, inp:false, procent:false  },
    { code : 2, desc: "Экспорт", year_one: null, year_two: null,  year_three: null, idd: null, inp:false, procent:false   },
    { code : 3, desc: "Жерки-Хонг Конг", year_one: null, year_two: null,  year_three: null, idd: null, inp:false, procent:false   },
    { code : 4, desc: "Хонг Конг ЗЗЭХ", year_one: null, year_two: null,  year_three: null, idd: null, inp:false, procent:true  },
]

const AddBtn = styled.div`
    background-color:#E7E9EB;
    border:1px solid rgba(0,0,0,0.3);
    border-top:none;
    text-align:center;
    font-size:24px;
    cursor:pointer;
    &:hover{
        background-color:#ccd7e3;
    }
`

const AddRowModal = ({  setEditModal, setStaticData, staticData }) =>{
    const [ close,setClose ] = useState('');

    const [ desc, setDesc ] = useState('');
    
    const closeHandle = () =>{
        setClose('contentParent2');
        setTimeout(() => { setEditModal(false); setClose('') }, 300);
    }

    const SubmitHandle = (e) =>{
        e.preventDefault();
        setStaticData(prev=>[ ...prev, { code:staticData.length+1, desc:desc, year_one: null, year_two: null,  year_three: null, idd: null, inp:false, procent:false } ]);
        setClose('contentParent2');
        setTimeout(() => { setEditModal(false); setClose('') }, 300);
    }

    return(
        <CustomModal>
            <div className={`contentParent ${close}`} style={{width:"34rem", padding:"1rem 1rem"}}>
                <div className="head">
                    <div className="title">Борлуулалтын төлөвлөгөө ( ам.доллар )</div>
                    <div onClick={closeHandle} className="close">✖</div>
                </div>
                <form onSubmit={SubmitHandle}>
                    <div className="content">
                        <InputStyle >
                            <div className="label">Ямар нэртэй төлөвлөгөө нэмэхээ оруулна уу</div>
                            <input type="text" name="country" onChange={e=>setDesc(e.target.value)} value={desc} required />
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