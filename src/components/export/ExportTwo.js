import React, { useState, useContext, useEffect } from 'react'
import{ Container, ButtonStyle2, InputStyle} from "components/misc/CustomTheme";
import { RiAddLine,RiEdit2Line } from "react-icons/ri"
import { VscError } from "react-icons/vsc"
import { IoMdCheckmark } from "react-icons/io"
import { AddModal, EditModal, DeleteModal } from "components/export/modals/ExportTwoModal"
import { useHistory } from "react-router-dom"
import UserContext from "global/UserContext"
import { useParams } from "react-router-dom"
import axios from "global/axiosbase";
import { NumberComma2 } from "components/misc/NumberComma"
import { default as NumberFormat } from 'react-number-format';

const InfoThree = ({modal}) => {
    const history = useHistory();
    const param = useParams().id;
    const slug = useParams().slug;
    const ctx = useContext(UserContext);
    const [ errText, setErrText ] = useState(false);
    const [ addModal, setAddModal ] = useState(false);
    const [ editModal, setEditModal ] = useState(false);
    const [ deleteModal, setDeleteModal ] = useState(false);
    const [ activityData, setActivityData ] = useState([]);
    const [ selected, setSelected ] = useState({});
    const [ selectedData, setSelectedData ] = useState({});
    const [ totalCost, setTotalCost ] = useState({ usd:0, mnt:0 });
    const [ HeadEdit, setHeadEdit ] = useState(false);
    
    useEffect(()=>{
        fetchDataActivity();
        FetchProductsOne();
    },[]);

    useEffect(()=>{
        setTotalCost({ usd:NumberComma2(activityData.map(el=>el.usd).reduce(Add1, 0)),  mnt: NumberComma2(activityData.map(el=>el.mnt).reduce(Add1, 0)) });
    },[activityData]);

    const Add1 = (add, a) =>{
        return add + a
    }

    const fetchDataActivity = async () =>{
      await axios.get(`exportones?parent=${modal?ctx.targetProduct?.id:slug}&idd=${param}`).then(res=>{
          if(res.data.length){
            setActivityData(res.data);
          }
      });
    }

    const FetchProductsOne = async () =>{
        await axios.get(`export-products?id=${modal?ctx.targetProduct?.id:slug}&idd=${param}`).then(res=>{
            if(res.data.length){
                setSelectedData(res.data[0]);
            }
        })
    }

    console.log(`totalCost`, totalCost);

    const onSubmit = (e) =>{
        e.preventDefault();
        if(activityData.length > 0){
            ctx.loadFunc(true);
            setErrText(false);
                activityData.forEach(el=>{
                    if(el.id){
                        axios.put(`exportones/${el.id}`,{ ...el, parent: slug, export_product: slug}).then(res=>{
                                // ctx.alertFunc('green','Амжилттай',true );
                                // ctx.loadFunc(false);
                                // history.push(`/${param}/export/3/${slug}`);
                                axios.put(`totals/${ctx.total?.id}`, { exportthree: true, idd: param }).then(res=>{
                                    console.log(`res-total`, res);
                                    ctx.alertFunc('green','Амжилттай',true );
                                    ctx.loadFunc(false);
                                    history.push(`/${param}/export/3/${slug}`);
                                }).catch(err=>ctx.alertFunc('orange','Алдаа гарлаа',true ));
                        }).catch(err=>ctx.alertFunc('orange','Алдаа гарлаа',true ));
                    }else{
                        axios.post(`exportones`,{ ...el, parent: slug, export_product: slug}).then(res=>{
                            // ctx.alertFunc('green','Амжилттай',true );
                            // ctx.loadFunc(false);
                            // history.push(`/${param}/export/3/${slug}`);
                                axios.put(`totals/${ctx.total?.id}`, { exportthree: true, idd: param }).then(res=>{
                                    console.log(`res-total`, res);
                                    ctx.alertFunc('green','Амжилттай',true );
                                    ctx.loadFunc(false);
                                    history.push(`/${param}/export/3/${slug}`);
                                }).catch(err=>ctx.alertFunc('orange','Алдаа гарлаа',true ));
                        }).catch(err=>ctx.alertFunc('orange','Алдаа гарлаа',true ));
                    }
                })
        }else{
            setErrText(true); setTimeout(() => {
                setErrText(false);
            }, 3000)
        }
    }

    const shitchInp2 = (cond) =>{
        setHeadEdit(cond);
    }

    const HeadHandle = (e) =>{
        let inp = document.querySelectorAll(".totalInp"); let arr = Array.from(inp); let child = {};
        arr.forEach(el=>{
            if(el.value) { child[el.name] = parseFloat(el.value.replaceAll(',','')) }
        });
        axios.put(`export-products/${selectedData.id}`, child).then(res=>{
            setHeadEdit(false);
            FetchProductsOne();
        });
    }

    return (
        <Container style={modal&&{padding:"0px 0px"}} className="contianer-fluid">
            <form onSubmit={onSubmit}>
                <div className={modal?`customTable pageRender`:`customTable`}>
                    <div className="headPar">
                        <div className="title">{modal?`Өртгийн тооцоолол`:`1 кг ${selectedData?.name} хийх өртөг`}</div>
                        <div onClick={()=>setAddModal(true)} className="addBtn"><RiAddLine /><span>Нэмэх</span></div>
                    </div>
                    <table >
                        <tbody>
                            <tr className="center">
                                <th>дд</th>
                                <th>1 кг {selectedData?.name} хийх орц</th>
                                <th>Хэмжээ</th>
                                <th>Өртөг, ам. доллар /АНУ/</th>
                                <th>Өртөг, ам. доллар /Монголд/</th>
                                <th></th>
                            </tr>
                            {activityData.map((el,i)=>{
                                return(
                                    <tr key={i}>
                                        <td>{i+1}</td>
                                        <td>{el.desc}</td>
                                        <td className="center">{el.size}</td>
                                        <td className="right">{el.usd}</td>
                                        <td className="right">{el.mnt}</td>
                                        {/* <td>{el.name}</td> */}
                                        <td className="editDelete">
                                            <div className="editDeletePar">
                                                <div onClick={()=> { setSelected(el); setEditModal(true); }} className="smBtn"><RiEdit2Line /></div>
                                                <div onClick={()=> { if(el.id){ setSelected(el); setDeleteModal(true) }else{ setActivityData(prev=>prev.filter(items=>items.code!==el.code  ))}}} className="smBtn"><VscError /></div>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                            {activityData.length===0&&<tr className="ghost">
                                    <td>1</td>
                                    <td>1 кг {selectedData?.name} хийх орц</td>
                                    <td className="center">2,5</td>
                                    <td className="right">32</td>
                                    <td className="right">18</td>
                                    <td></td>
                            </tr>}

                            <tr>
                                <th></th>
                                <th>НИЙТ ӨРТӨГ</th>
                                <th></th>
                                <th className="right">{totalCost.usd}</th>
                                <th className="right">{totalCost.mnt}</th>
                                <th></th>
                            </tr>

                            <tr>
                                <th></th>
                                <th>ҮНЭ</th>
                                <th></th>
                                {HeadEdit?
                                        <>
                                            <th style={{textAlign:'center'}} >
                                                <InputStyle  style={{marginBottom:0}} className="inputt">
                                                    <NumberFormat defaultValue={selectedData?.price_usd} className="cash totalInp" name={`price_usd`} isNumericString={true} thousandSeparator={true} placeholder="0" required />
                                                </InputStyle>
                                            </th>
                                            <th style={{textAlign:'center'}} >
                                                <InputStyle  style={{marginBottom:0}} className="inputt">
                                                    <NumberFormat defaultValue={selectedData?.price_mnt} className="cash totalInp" name={`price_mnt`} isNumericString={true} thousandSeparator={true} placeholder="0" required />
                                                </InputStyle>
                                            </th>
                                        
                                        </>
                                        :<>
                                            <th  className="right">{selectedData?.price_usd}</th>
                                            <th  className="right">{selectedData?.price_mnt}</th>
                                        </>
                                        }

                                <th style={{width:"6rem"}} className="editDelete">
                                    <div className="editDeletePar">
                                        {HeadEdit?<>
                                            <div onClick={HeadHandle} type="submit" className="smBtn"><IoMdCheckmark /></div>
                                            <div onClick={()=>shitchInp2(false)} className="smBtn"><VscError /></div></>
                                        :<div onClick={()=>shitchInp2(true)} className="smBtn"><RiEdit2Line /></div>}
                                        {/* {!el.id&&<div onClick={()=>setAddModal(true)} className="smBtn"><RiAddLine /></div>} */}
                                    </div>
                                </th>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {!modal&&<ButtonStyle2>
                    <div className="errTxt">{errText&&`Мэдээлэлээ оруулна уу...`}</div>
                    <button type="submit" className="myBtn">Хадгалах</button>
                </ButtonStyle2>}
            </form>
            
            {addModal&&<AddModal SelectedName={ `1 кг ${selectedData?.name} хийх орц` } titles={{one:`Хэмжээ`, two:`Өртөг, ам. доллар /АНУ/`, three:`Өртөг, ам. доллар /Монголд/`}} setActivityData={setActivityData} setAddModal={setAddModal} />}
            {editModal&&<EditModal selected={selected} titles={{one:`Хэмжээ`, two:`Өртөг, ам. доллар /АНУ/`, three:`Өртөг, ам. доллар /Монголд/`}} SelectedName={ `1 кг ${selectedData?.name} хийх орц` } setActivityData={setActivityData} setEditModal={setEditModal} />}
            {deleteModal&&<DeleteModal  url={`exportones`} selected={selected} titles={{one:`Хэмжээ`, two:`Өртөг, ам. доллар /АНУ/`, three:`Өртөг, ам. доллар /Монголд/`}} SelectedName={ `1 кг ${selectedData?.name} хийх орц` } setActivityData={setActivityData} setDeleteModal={setDeleteModal} />}
            
        </Container>
    )
}

export default InfoThree
