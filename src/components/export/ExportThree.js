import React, { useState, useContext, useEffect } from 'react'
import{ Container, ButtonStyle2} from "components/misc/CustomTheme";
import { RiAddLine,RiEdit2Line } from "react-icons/ri"
import { VscError } from "react-icons/vsc"
import { AddModal, EditModal, DeleteModal } from "components/export/modals/ExportTwoModal"
import { useHistory } from "react-router-dom"
import UserContext from "global/UserContext"
import { useParams } from "react-router-dom"
import axios from "global/axiosbase";
import { NumberComma2 } from "components/misc/NumberComma"

const InfoThree = ({modal}) => {
    const history = useHistory();
    const param = useParams().id;
    const slug = useParams().slug;
    const ctx = useContext(UserContext);
    const [ errText, setErrText ] = useState(false);
    const [ errText2, setErrText2 ] = useState('');
    const [ addModal, setAddModal ] = useState(false);
    const [ editModal, setEditModal ] = useState(false);
    const [ deleteModal, setDeleteModal ] = useState(false);
    const [ activityData, setActivityData ] = useState([]);
    const [ selected, setSelected ] = useState({});
    const [ selectedData, setSelectedData ] = useState({});
    const [ totalCost, setTotalCost ] = useState({size:0, usd:0, mnt:0 });
    
    useEffect(()=>{
        fetchDataActivity();
        FetchProductsOne();
    },[]);

    useEffect(()=>{
        setTotalCost({size:NumberComma2(activityData.map(el=>el.size).reduce(Add1, 0)), usd:NumberComma2(activityData.map(el=>el.usd).reduce(Add1, 0)),  mnt: NumberComma2(activityData.map(el=>el.mnt).reduce(Add1, 0)) });
    },[activityData]);

    const Add1 = (add, a) =>{
        return add + a
    }

    const fetchDataActivity = async () =>{
      await axios.get(`exportthrees?parent=${modal?ctx.targetProduct?.id:slug}&idd=${param}`).then(res=>{
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
        });
    }

    const onSubmit = (e) =>{
        e.preventDefault();
        if(activityData.length !== 0){
            if(totalCost.size === 100){
                let myLength = activityData.length
                ctx.loadFunc(true);
                setErrText(false);
                    activityData.forEach((el, ind)=>{
                        if(el.id){
                            axios.put(`exportthrees/${el.id}`, { ...el, parent: slug, export_product: slug}).then(res=>{
                                axios.put(`totals/${ctx.total?.id}`, { exporttwo: true, idd: param }).then(res=>{
                                    ctx.alertFunc('green','??????????????????',true );
                                    ctx.loadFunc(false);
                                    history.push(`/${param}/analysis/1/${slug}`);
                                }).catch(err=>ctx.alertFunc('orange','?????????? ????????????',true ));
                            }).catch(err=>ctx.alertFunc('orange','?????????? ????????????',true ));
                        }else{
                            axios.post(`exportthrees`, { ...el, parent: slug, export_product: slug}).then(res=>{
                                axios.put(`totals/${ctx.total?.id}`, { exporttwo: true, idd: param }).then(res=>{
                                    ctx.alertFunc('green','??????????????????',true );
                                    ctx.loadFunc(false);
                                    history.push(`/${param}/analysis/1/${slug}`);
                                }).catch(err=>ctx.alertFunc('orange','?????????? ????????????',true ));

                                if(myLength -1 === ind){
                                    axios.put(`export-products/${slug}`, { selected: true }).then(res=>{
                                        ctx.setCond(true);
                                    })
                                }

                            }).catch(err=>ctx.alertFunc('orange','?????????? ????????????',true ));
                        }
                    })
            }else{
                setErrText(true);
                setErrText2(`???????? ???????? 100% ?????? ?????????? (???????????????? ${totalCost.size}% ??????????)`)
                setTimeout(() => {
                    setErrText(false);
                }, 6000);
            }
        }else{
            setErrText(true);
            setErrText2(`?????????????????? ???????????? ?????????????? ????...`);
            setTimeout(() => {
                setErrText(false);
            }, 4000);
        }
    }

    return (
        <Container style={modal&&{padding:"0px 0px"}} className="contianer-fluid">
            <form onSubmit={onSubmit}>
                <div className={modal?`customTable pageRender`:`customTable`}>
                    <div className="headPar">
                        <div className="title">{modal?`?????????????? ????????????????`:`?????????????? ?????????? - ${selectedData?.name}`}</div>
                        <div onClick={()=>setAddModal(true)} className="addBtn"><RiAddLine /><span>??????????</span></div>
                    </div>
                    <table >
                        <tbody>
                            <tr className="center">
                                <th>????</th>
                                <th>?????????????? ????????????????</th>
                                <th>????????</th>
                                <th>???? ????.?????? /??????/</th>
                                <th>???? ????.?????? /????????????/</th>
                                <th></th>
                            </tr>
                            {activityData.map((el,i)=>{
                                return(
                                    <tr key={i}>
                                        <td>{i+1}</td>
                                        <td>{el.desc}</td>
                                        <td className="center">{el.size?`${el.size}%`:null}</td>
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
                                    <td>??????: ??????, ??????????????, ????????????????</td>
                                    <td className="center">68.8%</td>
                                    <td className="right">32</td>
                                    <td className="right">18</td>
                                    <td></td>
                            </tr>}

                            <tr>
                                <th></th>
                                <th>????????</th>
                                <th className="center">{totalCost.size}%</th>
                                <th className="right">{totalCost.usd}</th>
                                <th className="right">{totalCost.mnt}</th>
                                <th></th>
                            </tr>
                        </tbody>
                    </table>
                </div>

               {!modal&&<ButtonStyle2>
                    <div className="errTxt">{errText&&`${errText2}`}</div>
                    <button type="submit" className="myBtn">????????????????</button>
                </ButtonStyle2>}
            </form>
            
            {addModal&&<AddModal titles={{one:`????????`, two:`???? ????.?????? /??????/`, three:`???? ????.?????? /????????????/`}} SelectedName={"?????????????? ????????????????"} setActivityData={setActivityData} setAddModal={setAddModal} />}
            {editModal&&<EditModal titles={{one:`????????`, two:`???? ????.?????? /??????/`, three:`???? ????.?????? /????????????/`}} SelectedName={"?????????????? ????????????????"} selected={selected} setActivityData={setActivityData} setEditModal={setEditModal} />}
            {deleteModal&&<DeleteModal titles={{one:`????????`, two:`???? ????.?????? /??????/`, three:`???? ????.?????? /????????????/`}} url={`exportthrees`} SelectedName={"?????????????? ????????????????"} selected={selected} setActivityData={setActivityData} setDeleteModal={setDeleteModal} />}
            
        </Container>
    )
}

export default InfoThree
