import React, { useContext, useEffect, useState } from 'react';
import {Container, ButtonStyle2, InputStyle} from "components/misc/CustomTheme";
import { RiEdit2Line } from "react-icons/ri"
import { IoMdCheckmark } from "react-icons/io"
import { VscError } from "react-icons/vsc";
import { default as NumberFormat } from 'react-number-format';
import axios from "global/axiosbase"
import { useParams, useHistory } from 'react-router-dom';
import UserContext from "global/UserContext"
import { MaxDate } from "components/misc/BeforeYears"
import { NumberComma, NumberComma2 } from "components/misc/NumberComma"

const ExportTwo = () => {
    const [ staticData, setStaticData ] = useState(Data);
    const [ dataLength, setDatalength ] = useState(null);
    const param = useParams().id;
    const ctx = useContext(UserContext);
    const history = useHistory();

    useEffect(()=>{
        FetchData();
        FetchCount();
    },[]);

    const FetchData = async () =>{
       await axios.get(`businessinfothrees?idd=${param}`).then(res=>{
            setStaticData(prev=>[...prev.filter(item=>{
                res.data.map(el=>{
                    if(item.code === parseInt(el.code) ){
                       item.year_one = el.year_one
                       item.year_two = el.year_two
                       item.year_three = el.year_three
                       item.id = el.id
                    }
                })
            }), ...prev]);
        })
    }
    const FetchCount = async () =>{
        await axios.get(`businessinfothrees/count?idd=${param}`).then(res=>{
            setDatalength(res.data);
        });
    }

    const shitchInp = (el,cond) =>{
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
    }

    const SelectItem = ( el ) =>{
        let inp = document.querySelectorAll(".inpGet"); let arr = Array.from(inp); let child = {}; let final = el
        arr.map(el=>{
            if(el.value){child[el.name] = parseFloat(el.value.replaceAll(',','')); 
                // +el.value
            }
        });
        let keys = Object.keys(child).length;

        console.log(`child`, child);
        console.log(`final`, final);
        if(keys > 2 ){
            final["idd"] = param; final.year_one = child.year_one; final.year_three = child.year_three; final.year_two = child.year_two;
            if(final.id){
                axios.put(`businessinfothrees/${final.id}`, final).then(res=>{
                    ctx.alertFunc('green','',true );
                    setStaticData(prev=> [...prev.filter(item=>{ item.inp = false; }), ...prev]);
                }).catch(err=>ctx.alertFunc('orange','Алдаа гарлаа',true ));
            }else{
                console.log(`------------`, )
                console.log(`final`, final);
                axios.post(`businessinfothrees`, final).then(res=>{
                    console.log(`res`, res);
                    ctx.alertFunc('green','',true );
                    setStaticData(prev=> [...prev.filter(item=>{ item.inp = false; }), ...prev]);
                }).catch(err=>ctx.alertFunc('orange','Алдаа гарлаа',true ));
            }
        }
    } 

    const submitHandle = (e) =>{
        e.preventDefault();
    }

    const clickHandle = () =>{
        if(dataLength > 13){
            ctx.loadFunc(true);
            axios.put(`totals/${ctx.total?.id}`, { bustwo: true, idd: param }).then(res=>{
                ctx.alertFunc('green','Амжилттай',true );
                ctx.loadFunc(false);
                history.push(`/${param}/businessinfo/3`);
            })
        }else{
            ctx.alertFunc('orange','Мэдээллийг гүйцэд оруулна уу', true );
        }
    }
    
    return (
        <Container>
            <div className="customTable T3">
                    <div className="headPar">
                        <div className="title">1 кг жерки хийх өртөг</div>
                        {/* <div onClick={()=>setAddModal(true)} className="addBtn"><RiAddLine /><span>Нэмэх</span></div> */}
                    </div>
                    <form onSubmit={submitHandle}>
                        <table >
                                <tr>
                                    <th >дд</th>
                                    <th >1 кг жерки хийх орц</th>
                                    <th  style={{textAlign:'center'}}>Хэмжээ</th>
                                    <th style={{textAlign:'center'}} >Өртөг, ам. доллар /АНУ/</th>
                                    <th style={{textAlign:'center'}} >Өртөг, ам. доллар /Монголд/</th>
                                    <th ></th>
                                </tr>
                                {staticData.map((el,i)=>{
                                    return(
                                        <>
                                        <tr className="parent">
                                            <td style={{width:"2rem"}}>{el.code}</td>
                                            <td style={{width:"22rem"}}>{el.desc}</td>
                                            {el.inp?<>
                                                <td style={{textAlign:'right', width:"13rem"}}>
                                                    <InputStyle  style={{marginBottom:0}} className="inputt">
                                                        <NumberFormat defaultValue={el.year_three} className="cash inpGet" autoFocus name={`year_three`}  thousandSeparator={true} placeholder="0" required />
                                                    </InputStyle>
                                                </td>
                                                <td style={{textAlign:'right', width:"13rem"}}>
                                                    <InputStyle style={{marginBottom:0}} className="inputt">
                                                        <NumberFormat defaultValue={el.year_two} className="cash inpGet" name={`year_two`}  thousandSeparator={true} placeholder="0" required />
                                                    </InputStyle>
                                                </td>
                                                <td style={{textAlign:'right', width:"13rem"}}>
                                                    <InputStyle style={{marginBottom:0}} className="inputt">
                                                        <NumberFormat defaultValue={el.year_one} className="cash inpGet" name={`year_one`}  thousandSeparator={true} placeholder="0" required />
                                                    </InputStyle>
                                                </td>
                                            </>
                                            :<>
                                                <td style={{textAlign:'right'}}>{el.finance?NumberComma(el.year_three):NumberComma2(el.year_three)} {el.code==12||el.code==13?`%` :``}</td>
                                                <td style={{textAlign:'right'}}>{el.finance?NumberComma(el.year_two):NumberComma2(el.year_three)} {el.code==12||el.code==13?`%` :``}</td>
                                                <td style={{textAlign:'right'}}>{el.finance?NumberComma(el.year_one):NumberComma2(el.year_three)} {el.code==12||el.code==13?`%` :``}</td>
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
                                        </>
                                    )
                                })}
                                
                        </table>
                    </form>
            </div>
            <ButtonStyle2 >
                <div className="errTxt"></div>
                <button onClick={clickHandle}  className="myBtn">Цааш үргэлжлүүлэх</button>
            </ButtonStyle2>
        </Container>
    )
}

export default ExportTwo

const Data = [
    { code : 1, desc: "Үхрийн гуя, кг", size: null, usd: null,  mnt: null, idd: null, inp:false },
    { code : 2, desc: "Хар перц, гр", size: null, usd: null,  mnt: null, idd: null, inp:false },
]


