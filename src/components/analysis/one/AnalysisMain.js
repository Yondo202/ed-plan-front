import React, { useState, useContext, useEffect } from 'react'
import { IoMdCheckmark } from "react-icons/io"
import{ Container, ButtonStyle2, InputStyle} from "components/misc/CustomTheme";
import { RiAddLine,RiEdit2Line } from "react-icons/ri"
import { VscError } from "react-icons/vsc"
import { AddModal, EditModal, DeleteModal } from "components/analysis/one/AnalysisModal"
import { useHistory } from "react-router-dom"
import UserContext from "global/UserContext"
import { useParams } from "react-router-dom"
import axios from "global/axiosbase";
import CkEditor from 'components/misc/CkEditor';
import ContentParser from "components/misc/ContentParser"

const AnalysisMain = ({modal}) => {
    const history = useHistory();
    const param = useParams().id;
    const slug = useParams().slug;
    const ctx = useContext(UserContext);
    const [ ParentId, setParentId ] = useState(null);
    const [ cond, setCond ] = useState(false);
    const [ Header, setHeader ] = useState({ title:null, measure:null });
    const [ HeadEdit, setHeadEdit ] = useState(false);
    const [ errText, setErrText ] = useState(false);
    const [ addModal, setAddModal ] = useState(false);
    const [ editModal, setEditModal ] = useState(false);
    const [ deleteModal, setDeleteModal ] = useState(false);
    const [ activityData, setActivityData ] = useState([]);
    const [ selected, setSelected ] = useState({});
    const [ data, setData ] = useState('');
    const [ source, setSource ] = useState('');
    const [ fetchID, setFetchID ] = useState(null);
    
    useEffect(()=>{
        const fetchDataActivity = async () =>{
            await axios.get(`analysisones?parent=${modal?ctx.targetProduct?.id:slug}&idd=${param}`).then(res=>{
              if(res.data.length){
                  setHeader({ title: res.data[0]?.head_title, measure: res.data[0]?.head_measure });
                  setParentId(res.data[0].id);
                  if(res.data[0].analysisonedetails.length){
                      setActivityData(res.data[0].analysisonedetails);
                  }
                  if(res.data[0].analysisonebody){
                      setSource(res.data[0].analysisonebody.source);
                      setFetchID(res.data[0].analysisonebody?.id);
                      setData(res.data[0].analysisonebody.body);
                  }
              }
            });
        }
        fetchDataActivity();
    },[cond]);

    const onSubmit = (e) =>{
        e.preventDefault();
        if(activityData.length !== 0){
            ctx.loadFunc(true);
            setErrText(false);
                activityData.forEach(el=>{
                    if(el.id){
                        axios.put(`analysisonedetails/${el.id}`,{ ...el, analysisone: ParentId, parent: slug}).then(()=>{
                                axios.put(`totals/${ctx.total?.id}`, { analysisone: true, idd: param }).then(()=>{
                                    ctx.alertFunc('green','??????????????????',true );
                                    ctx.loadFunc(false);
                                    history.push(`/${param}/analysis/2/${slug}`);
                                }).catch(_=>ctx.alertFunc('orange','?????????? ????????????',true ));
                        }).catch(_=>ctx.alertFunc('orange','?????????? ????????????',true ));
                    }else{
                        axios.post(`analysisonedetails`, { ...el, analysisone: ParentId, parent: slug}).then(()=>{
                                axios.put(`totals/${ctx.total?.id}`, { analysisone: true, idd: param }).then(()=>{
                                    ctx.alertFunc('green','??????????????????',true );
                                    ctx.loadFunc(false);
                                    history.push(`/${param}/analysis/2/${slug}`);
                                }).catch(_=>ctx.alertFunc('orange','?????????? ????????????',true ));
                        }).catch(_=>ctx.alertFunc('orange','?????????? ????????????',true ));
                    }
                });
                if(fetchID){
                    axios.put(`analysisonebodies/${fetchID}`, { body: data, analysisone: ParentId, parent: slug, idd: param, source: source  })
                }else{
                    axios.post(`analysisonebodies`, { body: data, analysisone: ParentId, parent: slug, idd: param, source: source  })
                }
                
        }else{
            setErrText(true);
            setTimeout(() => {
                setErrText(false);
            }, 5000);
        }
    }

    const shitchInp2 = (cond) =>{
        setHeadEdit(cond);
    }

    const HeadHandle = (e) =>{
        let inp = document.querySelectorAll(".inpHead"); let arr = Array.from(inp); let child = {};
        arr.forEach(el=>{
            if(el.value) {child[el.name] = el.value; el.classList =- " red"; el.classList += " inpHead"; }else{ el.classList += " red" }
        });

        if(Object.keys(child).length > 1){
            child["idd"] = param;
            child["parent"] = slug;
            axios.post(`analysisones`, child).then(res=>{
                ctx.alertFunc('green','????????????????????????', true );
                shitchInp2(false);
                setCond(prev=>!prev);
            });

        }else{
            setErrText(true);
            setTimeout(() => {
                setErrText(false);
            }, 5000);
        }
    }

    const AddHandle = () =>{
        if(Header.title && Header.measure){
            setAddModal(true);
        }else{
            shitchInp2(true);
        };
    }

    return (
        <Container style={modal&&{padding:"0px 0px"}} className="contianer-fluid">
                <div style={{marginBottom:14}} className={modal?`customTable T3 pageRender`:`customTable T3`}>
                    {modal&&<div className="bigTitle">V. ?????????????????? ?????? ?????????????? ????????????????</div>}
                    <div className="headPar">
                        <div className="title">???????????????? ?????? ?????????????? {ctx.targetProduct?.name} -????????????</div>
                        <div onClick={()=>AddHandle()} className="addBtn"><RiAddLine /><span>??????????</span></div>
                    </div>
                    <table >
                        <tbody>
                        <tr>
                            <th>????</th>
                            {HeadEdit?<th style={{textAlign:'center'}} >
                                <InputStyle  style={{marginBottom:0}} className="inputt">
                                    <input type="text" className="inpHead" autoFocus name={`head_title`} placeholder="???????????????? ??????" required />
                                </InputStyle>
                            </th>:<th>{Header.title?Header.title:`........... . . . .`}  </th>}
                            <th>?????? ????.??????</th>
                            {HeadEdit?<th style={{textAlign:'center'}} >
                                <InputStyle  style={{marginBottom:0}} className="inputt">
                                    <input type="text" className="inpHead" name={`head_measure`} placeholder="????????" required />
                                </InputStyle>
                            </th>:<th>{Header.measure?Header.measure:`........... . . . .`}</th>}
                            <th>{Header.measure?Header.measure:`...`} ?????? ????.??????</th>
                            <th>???????????????????? ??????</th>
                            <th>???????????????????? ???????????? ?????????????? ??????</th>
                            <th>??????????</th>
                            <th style={{width:"5rem"}} className="editDelete">
                                <div className="editDeletePar">
                                    {!Header.measure && !Header.title ? HeadEdit?<>
                                        <button onClick={HeadHandle} type="button" className="smBtn"><IoMdCheckmark /></button>
                                        <div onClick={()=>shitchInp2(false)} className="smBtn"><VscError /></div></>
                                    :<div onClick={()=>shitchInp2(true)} className="smBtn"><RiEdit2Line /></div>:null}
                                    {/* {!el.id&&<div onClick={()=>setAddModal(true)} className="smBtn"><RiAddLine /></div>} */}
                                </div>
                            </th>
                        </tr>
                        {activityData.map((el,i)=>{
                            return(
                                <tr key={i}>
                                    <td>{i+1}</td>
                                    <td>{el.desc}</td>
                                    <td>{el.price}</td>
                                    <td>{el.measure}</td>
                                    <td>{el.measure_price}</td>
                                    <td>{el.country}</td>
                                    <td>{el.standart}</td>
                                    <td>{el.tarif}%</td>
                                    <td className="editDelete">
                                        <div className="editDeletePar">
                                            <div onClick={()=> { setSelected(el); setEditModal(true); }} className="smBtn"><RiEdit2Line /></div>
                                            <div onClick={()=> { if(el.id){ setSelected(el); setDeleteModal(true) }else{ setActivityData(prev=>prev.filter(items=>items.desc!==el.desc))}}} className="smBtn"><VscError /></div>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                        
                        {activityData.length===0&&<tr className="ghost">
                                <td>1</td>
                                <td>????????</td>
                                <td>43,829</td>
                                <td>9167</td>
                                <td>4781</td>
                                <td>????????????????, ??????, ???????? ????????????, ??????????</td>
                                <td>11</td>
                                <td>0%</td>
                                <td></td>
                            </tr>}
                        </tbody>
                    </table>
                </div>
                
                {modal? <div className="source">???? ????????????: {source}</div>
                :<InputStyle  style={{marginBottom:25}} className="inputt">
                    <div className="label">???? ????????????</div >
                    <input value={source} type="text" className="inpHead2" onChange={(e)=> { setSource(e.target.value) }} placeholder="https://example.com" />
                 </InputStyle>}
                

                {!modal&&<div style={{marginBottom:10}} className="label">???????????? ?????????????? ??????????????:</div >}

                {modal? <ContentParser data={data} titleSm={`???????????? ??????????????`} titleBig={``} />
                :<CkEditor data={data} setData={setData} />}
                

                {!modal&&<ButtonStyle2>
                    <div className="errTxt">{errText&&`???????????????????? ?????????????? ????...`}</div>
                    <button onClick={onSubmit} type="submit" className="myBtn">????????????????</button>
                </ButtonStyle2>}
            
            {addModal&&<AddModal Header={Header} setActivityData={setActivityData} setAddModal={setAddModal} />}
            {editModal&&<EditModal  Header={Header} selected={selected} setActivityData={setActivityData} setEditModal={setEditModal} />}
            {deleteModal&&<DeleteModal Header={Header} selected={selected} setActivityData={setActivityData} setDeleteModal={setDeleteModal} />}
            
        </Container>
    )
}

export default AnalysisMain
