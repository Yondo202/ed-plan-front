import React, { useState, useContext, useEffect } from 'react'
import{ Container, ButtonStyle2} from "components/misc/CustomTheme";
import { RiAddLine,RiEdit2Line } from "react-icons/ri"
import { VscError } from "react-icons/vsc"
import { AddModal, EditModal, DeleteModal } from "components/intro/modals/InfoThreeModal"
import { useHistory } from "react-router-dom"
import UserContext from "global/UserContext"
import { useParams } from "react-router-dom"
import axios from "global/axiosbase";
import FileUpload from "components/misc/FileUpload"
import { edpurl } from "global/edpAxios"

const InfoThree = ({ modal }) => {
    const history = useHistory();
    const param = useParams().id;
    const ctx = useContext(UserContext);
    const [ errTxt, setErrTxt ] = useState({cond: false, text:''});
    const [ errText, setErrText ] = useState(false);
    const [ addModal, setAddModal ] = useState(false);
    const [ editModal, setEditModal ] = useState(false);
    const [ deleteModal, setDeleteModal ] = useState(false);
    const [ activityData, setActivityData ] = useState([]);
    const [ selected, setSelected ] = useState({});
    const [ SelectedFile, setSelectedFile ] = useState([]);
    const [ parentId, setParentId ] = useState(null);
    
    useEffect(()=>{
        fetchDataActivity();
    },[]);

    const fetchDataActivity = async () =>{
      await axios.get(`infothrees?idd=${param}`).then(res=>{
          setActivityData(res.data);
      });

      await axios.get(`infothreefiles?idd=${param}`).then(res=>{
          if(res.data.length){
            setSelectedFile(res.data[0]?.edpuploads);
            setParentId(res.data[0].id);
          }
      });
    }

    const onSubmit = (e) =>{
        e.preventDefault();
        if(activityData.length !== 0){
            if(SelectedFile.length){
            ctx.loadFunc(true);
            setErrText(false);
            if(parentId){
                axios.put(`infothreefiles/${parentId}`, { idd: param }).then(res=>{
                    SelectedFile.forEach(el=>{
                        if(el.idd){
                            axios.put(`edpuploads/${el.id}`, { url: el.url, file_id: el.file_id, file_id: el.id, name:el.name, infothreefile: res.data.id,  idd: param, })
                        }else{
                            axios.post(`edpuploads`, { url: edpurl + el.fileUrl.replace("public", ""), file_id: el.id, name:el.name, infothreefile: res.data.id,  idd: param,  })
                        }
                    });
            });
            }else{
                axios.post(`infothreefiles`, { idd: param }).then(res=>{
                    SelectedFile.forEach(el=>{
                        if(el.idd){
                            axios.put(`edpuploads/${el.id}`, { url: el.url, file_id: el.file_id, file_id: el.id, name:el.name, infothreefile: res.data.id,  idd: param, })
                        }else{
                            axios.post(`edpuploads`, { url: edpurl + el.fileUrl.replace("public", ""), file_id: el.id, name:el.name, infothreefile: res.data.id,  idd: param,  })
                        }
                    });
                });
            }
            
            activityData.forEach(el=>{
                if(el.id){
                    axios.put(`infothrees/${el.id}`, el).then(res=>{
                            axios.put(`totals/${ctx.total?.id}`, { infothree: true, idd: param }).then(res=>{
                                ctx.alertFunc('green','Амжилттай',true );
                                ctx.loadFunc(false);
                                history.push(`/${param}/businessinfo/1`);
                            }).catch(err=>ctx.alertFunc('orange','Алдаа гарлаа',true ));
                    }).catch(err=>ctx.alertFunc('orange','Алдаа гарлаа',true ));
                }else{
                    axios.post(`infothrees`, el).then(res=>{
                            axios.put(`totals/${ctx.total?.id}`, { infothree: true, idd: param }).then(res=>{
                                ctx.alertFunc('green','Амжилттай',true );
                                ctx.loadFunc(false);
                                history.push(`/${param}/businessinfo/1`);
                            }).catch(err=>ctx.alertFunc('orange','Алдаа гарлаа',true ));
                    }).catch(err=>ctx.alertFunc('orange','Алдаа гарлаа',true ));
                }
            })
            }else{
                setErrTxt({cond:true, text: "Иргэний үнэмлэхний зурагийг хавсаргана уу .." });
                setTimeout(() => { setErrTxt({cond:false, text: "" }); }, 4000);
            }
        }else{
            setErrTxt({cond:true, text: "Мэдээллээ гүйцэд оруулна уу.." });
            setTimeout(() => { setErrTxt({cond:false, text: "" }); }, 4000);
        }
    }

    return (
        <Container style={modal&&{padding:"0px 0px"}} className="contianer-fluid">
            <form onSubmit={onSubmit}>
                <div className={modal?`customTable pageRender`:`customTable`}>
                    <div className="headPar">
                        <div className="title">Эцсийн өмчлөгчдийн мэдээлэл</div>
                        <div onClick={()=>setAddModal(true)} className="addBtn"><RiAddLine /><span>Нэмэх</span></div>
                    </div>
                    <table >
                        <tbody>
                            <tr>
                                <th>дд</th>
                                <th>Ангилал</th>
                                <th>Улсын нэр</th>
                                <th>Эцэг /эх/-ийн нэр</th>
                                <th>Нэр</th>
                                <th>Бүртгэсэн огноо</th>
                                <th>Эзэмшлийн хувь </th>
                                <th></th>
                            </tr>
                            {activityData.map((el,i)=>{
                                return(
                                    <tr key={i}>
                                        <td>{i+1}</td>
                                        <td>{el.category}</td>
                                        <td>{el.country}</td>
                                        <td>{el.parent_name}</td>
                                        <td>{el.name}</td>
                                        <td>{el.approve_date}</td>
                                        <td>{el.possess_percent}%</td>
                                        <td className="editDelete">
                                            <div className="editDeletePar">
                                                <div onClick={()=> { setSelected(el); setEditModal(true); }} className="smBtn"><RiEdit2Line /></div>
                                                <div onClick={()=> { if(el.id){ setSelected(el); setDeleteModal(true) }else{ setActivityData(prev=>prev.filter(items=>items.name!==el.name && items.parent_name!==el.parent_name ))}}} className="smBtn"><VscError /></div>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                            {activityData.length===0&&<tr className="ghost">
                                    <td>1</td>
                                    <td>Иргэн</td>
                                    <td>Монгол</td>
                                    <td>Бат-Эрдэнэ</td>
                                    <td>Тэмүүлэн</td>
                                    <td>2018.01.01</td>
                                    <td>51%</td>
                                    <td></td>
                                </tr>}
                        </tbody>
                    </table>
                </div>

                <FileUpload SelectedFile={SelectedFile} setSelectedFile={setSelectedFile} title={`Хавсралт. Иргэний үнэмлэх.`} modal={modal} />

                {!modal&&<ButtonStyle2>
                    <div className="errTxt">{errTxt.cond&&`${errTxt.text}`}</div>
                    <button type="submit" className="myBtn">Хадгалах</button>
                </ButtonStyle2>}
            </form>
            
            {addModal&&<AddModal setActivityData={setActivityData} setAddModal={setAddModal} />}
            {editModal&&<EditModal selected={selected} setActivityData={setActivityData} setEditModal={setEditModal} />}
            {deleteModal&&<DeleteModal selected={selected} setActivityData={setActivityData} setDeleteModal={setDeleteModal} />}
            
        </Container>
    )
}

export default InfoThree
