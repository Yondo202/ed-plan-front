import React, { useContext, useEffect, useState } from 'react';
import {Container, ButtonStyle2, InputStyle} from "components/misc/CustomTheme";
import { RiEdit2Line } from "react-icons/ri"
import { IoMdCheckmark } from "react-icons/io"
import { VscError } from "react-icons/vsc";
import { default as NumberFormat } from 'react-number-format';
import axios from "global/axiosbase"
import { useParams, useHistory } from 'react-router-dom';
import UserContext from "global/UserContext"
import { NumberComma, NumberComma2 } from "components/misc/NumberComma"

// code gesen talbar oorchlogdoj bolohgui

const BusTwoMain = ({ modal }) => {
    const param = useParams().id;
    const ctx = useContext(UserContext);
    const history = useHistory();
    const [ staticData, setStaticData ] = useState(Data);
    const [ dataLength, setDatalength ] = useState(null);
    const [ resultData, setResultData ] = useState(ResultData);
    const [ customDate, setCustomDate ] = useState(ctx?.approve);
    const [ HeadEdit, setHeadEdit ] = useState(false);
    
    useEffect(()=>{
        FetchData();
        fetchResult();
    },[]);
    

    const fetchResult = async () => {
        await axios.get(`businessresults?idd=${param}`).then(res=>{
            setResultData(prev=>[...prev.filter(item=>{
                res.data.forEach(el=>{
                    if(item.code === parseInt(el.code) ){
                       item.desc = el.desc
                       item.year_one = el.year_one
                       item.year_two = el.year_two
                       item.year_three = el.year_three
                       item.id = el.id
                    }
                })
            }), ...prev]);
        })
    }

    const FetchData = async () =>{
       await axios.get(`businessinfothrees?idd=${param}`).then(res=>{
            setStaticData(prev=>[...prev.filter(item=>{
                res.data.forEach(el=>{
                    if(item.code === parseInt(el.code) ){
                       item.desc = el.desc
                       item.year_one = el.year_one
                       item.year_two = el.year_two
                       item.year_three = el.year_three
                       item.id = el.id
                    }
                })
            }), ...prev]);
        })
    }

    useEffect(()=>{
        resultData.forEach(el=>{
            if(el.code !== 14){
                AllResult(el.code, el.val1, el.val2);
            }else{
                AllResult(el.code, el.val1, el.val2, el.val3);
            }
        })
    },[staticData]);

    const AllResult = ( code, val1, val2, val3 ) =>{
        let obj1 = {}; let obj2 = {};
        if(!val3){
            staticData.forEach((el)=>{
                if(el.code === val1){ obj1 = el }
                if(el.code === val2){ obj2 = el }
            });
            setResultData(prev=>[ ...prev.filter(item=>{
                if(item.code === code){
                    item.year_three = obj1.year_three / obj2.year_three
                    item.year_two = obj1.year_two / obj2.year_two
                    item.year_one = obj1.year_one / obj2.year_one
                }
            }), ...prev ]);
        }else{
            let obj3 = {};
            staticData.forEach((el)=>{
                if(el.code === val1){ obj1 = el }
                if(el.code === val2){ obj2 = el } 
                if(el.code === val3){ obj3 = el }
            });
            setResultData(prev=>[ ...prev.filter(item=>{
                if(item.code === code){
                    item.year_three = obj1.year_three / (obj2.year_three + obj3.year_three) / obj3.year_three
                    item.year_two = obj1.year_two / (obj2.year_two + obj3.year_two) / obj3.year_two
                    item.year_one = obj1.year_one / (obj2.year_one + obj3.year_one) / obj3.year_one
                }
            }), ...prev ]);
        }
    }

    useEffect(()=>{
        FetchCount();
    },[resultData]);
    
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

    const shitchInp2 = (cond) =>{
        setHeadEdit(cond);
    }

    const SelectItem = ( el ) =>{
        let inp = document.querySelectorAll(".inpGet"); let arr = Array.from(inp); let child = {}; let final = el
        arr.forEach(el=>{
            if(el.value){child[el.name] = parseFloat(el.value.replaceAll(',','')); }
        });
        let keys = Object.keys(child).length;
        if(keys > 2 ){
            final["idd"] = param; final.year_one = child.year_one; final.year_three = child.year_three; final.year_two = child.year_two;
            if(final.id){
                axios.put(`businessinfothrees/${final.id}`, final).then(res=>{
                    ctx.alertFunc('green','',true );
                    setStaticData(prev=> [...prev.filter(item=>{ item.inp = false; }), ...prev]);
                    resultData.forEach((el)=>{ el.idd = param;  if(el.id){ axios.put(`businessresults/${el.id}`, el) }else{ axios.post(`businessresults`, el ) } });
                }).catch(err=>ctx.alertFunc('orange','Алдаа гарлаа',true ));
            }else{
                axios.post(`businessinfothrees`, final).then(res=>{
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
        if(dataLength === 9){
            ctx.loadFunc(true);
            axios.put(`totals/${ctx.total?.id}`, { bustwo: true, idd: param }).then(res=>{
                ctx.alertFunc('green','Амжилттай',true );
                ctx.loadFunc(false);
                if(ctx.productId){
                    history.push(`/${param}/export/1/${ctx.productId}`);
                }else{
                    history.push(`/${param}/export`);
                }
            });
            resultData.forEach((el)=>{
                el.idd = param;
                if(el.id){
                    axios.put(`businessresults/${el.id}`, el)
                }else{
                    axios.post(`businessresults`, el )
                }
            });
        }else{
            ctx.alertFunc('orange','Мэдээллийг гүйцэд оруулна уу', true );
        }
    }

    const HeadHandle = (e) =>{
        let inp = document.querySelectorAll(".inpGettt"); let arr = Array.from(inp); let child = {};
        arr.forEach(el=>{
            if(el.value) {child[el.name] = el.value; }
        });
        setCustomDate({
            id: customDate.id,
            year_one: child.year_one,
            year_two: child.year_two,
            year_three: child.year_three,
        });
        axios.put(`approves/${customDate.id}`, child).then(res=>{
            setHeadEdit(false);
        });
    }

    return (
        <Container style={modal&&{padding:"0px 0px"}}>
            <div className={modal?`customTable T3 pageRender`:`customTable T3`}>
                    <div className="headPar">
                        <div className="title">Экспорт болон дотоодын борлуулалт</div>
                        {/* <div onClick={()=>setAddModal(true)} className="addBtn"><RiAddLine /><span>Нэмэх</span></div> */}
                    </div>
                    <form onSubmit={submitHandle}>
                        <table >
                            <tbody>
                            <tr>
                                    <th >дд</th>
                                    <th >Санхүүгийн үзүүлэлтүүд</th>
                                    {HeadEdit?
                                    <>
                                        <th style={{textAlign:'center'}} >
                                            <InputStyle  style={{marginBottom:0}} className="inputt">
                                                <input type="text" defaultValue={customDate?.year_three} className="cash inpGettt" autoFocus name={`year_three`} placeholder="0" required />
                                            </InputStyle>
                                        </th>
                                        <th style={{textAlign:'center'}} >
                                            <InputStyle  style={{marginBottom:0}} className="inputt">
                                                <input type="text" defaultValue={customDate?.year_two} className="cash inpGettt" name={`year_two`} placeholder="0" required />
                                            </InputStyle>
                                        </th>
                                        <th style={{textAlign:'center'}} >
                                            <InputStyle  style={{marginBottom:0}} className="inputt">
                                                <input type="text" defaultValue={customDate?.year_one} className="cash inpGettt" name={`year_one`} placeholder="0" required />
                                            </InputStyle>
                                        </th>
                                    </>
                                    :<>
                                        <th style={{textAlign:'center'}} >{customDate?.year_three}</th>
                                        <th style={{textAlign:'center'}} >{customDate?.year_two}</th>
                                        <th style={{textAlign:'center'}} >{customDate?.year_one}</th>
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
                                {staticData.map((el, ind)=>{
                                    return(
                                            <tr key={ind} className="parent">
                                                <td style={{width:"2rem"}}>{el.code}</td>
                                                <td style={{width:"22rem"}}>{el.desc}</td>
                                                {el.inp?<>
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
                                                    <td style={{textAlign:'right'}}>{NumberComma(el.year_three)}</td>
                                                    <td style={{textAlign:'right'}}>{NumberComma(el.year_two)}</td>
                                                    <td style={{textAlign:'right'}}>{NumberComma(el.year_one)}</td>
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
                                <tr>
                                    <th ></th>
                                    <th >Санхүүгийн үзүүлэлтүүд</th>
                                    <th  style={{textAlign:'center'}}>{customDate?.year_three}</th>
                                    <th style={{textAlign:'center'}} >{customDate?.year_two}</th>
                                    <th style={{textAlign:'center'}} >{customDate?.year_one}</th>
                                    <th ></th>
                                </tr>
                                {resultData.map((el, ind)=>{
                                    return(
                                        <tr key={ind} className="parent">
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
                                                <td style={{textAlign:'right'}}>{NumberComma2(el.year_three)} {el.code===12||el.code===13?`%`:``}</td>
                                                <td style={{textAlign:'right'}}>{NumberComma2(el.year_two)} {el.code===12||el.code===13?`%`:``}</td>
                                                <td style={{textAlign:'right'}}>{NumberComma2(el.year_one)} {el.code===12||el.code===13?`%`:``}</td>
                                            </>}

                                            <td style={{width:"6rem"}} className="editDelete"></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </form>
            </div>

            {!modal&&<ButtonStyle2 >
                <div className="errTxt"></div>
                <button onClick={clickHandle}  className="myBtn">Цааш үргэлжлүүлэх</button>
            </ButtonStyle2>}
        </Container>
    )
}

export default BusTwoMain

const Data = [
    { code : 1, desc: "Нийт хөрөнгө C1", year_one: null, year_two: null,  year_three: null, finance: true, idd: null, inp:false },
    { code : 2, desc: "Нийт хөрөнгө С2", year_one: null, year_two: null,  year_three: null, finance: true, idd: null, inp:false  },
    { code : 3, desc: "Эргэлтийн хөрөнгө", year_one: null, year_two: null,  year_three: null, finance: true, idd: null, inp:false  },
    { code : 4, desc: "Нийт өр төлбөр", year_one: null, year_two: null,  year_three: null, finance: true, idd: null, inp:false  },
    { code : 5, desc: "Богино хугацаат өр төлбөр", year_one: null, year_two: null,  year_three: null, finance: true, idd: null, inp:false  },
    { code : 6, desc: "Нийт эзэмшигчдийн өмч", year_one: null, year_two: null,  year_three: null, finance: true, idd: null, inp:false  },
    { code : 7, desc: "Нийт борлуулалт", year_one: null, year_two: null,  year_three: null, finance: true, idd: null, inp:false  },
    { code : 8, desc: "Нийт ашиг", year_one: null, year_two: null,  year_three: null, finance: true, idd: null, inp:false  },
    { code : 9, desc: "Цэвэр ашиг", year_one: null, year_two: null,  year_three: null, finance: true, idd: null, inp:false  },
]

const ResultData = [
    { code : 10, desc: "Debt to equity (4/6)", val1:4, val2:6, year_one: null, year_two: null,  year_three: null, finance: false, idd: null, inp:false  },
    { code : 11, desc: "Current ratio (3/5)", val1:3, val2:5, year_one: null, year_two: null,  year_three: null, finance: false, idd: null, inp:false  },
    { code : 12, desc: "ROE (9/6)", val1:9, val2:6, year_one: null, year_two: null,  year_three: null, finance: false, idd: null, inp:false  },
    { code : 13, desc: "Gross margin (8/7)", val1:8, val2:7, year_one: null, year_two: null,  year_three: null, finance: false, idd: null, inp:false  },
    { code : 14, desc: "Asset turnover (7/(1+2)/2)", val1:7, val2:1, val3:2, year_one: null, year_two: null,  year_three: null, finance: false, idd: null, inp:false  },
]


