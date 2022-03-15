import React, { useState, useContext, useEffect } from 'react'
import{ Container, ButtonStyle2, InputStyle, MaxDate} from "components/misc/CustomTheme";
import { RiAddLine,RiEdit2Line } from "react-icons/ri"
import { VscError } from "react-icons/vsc"
import { AddModal, EditModal, DeleteModal } from "components/intro/modals/infoTwoModal"
import { useHistory } from "react-router-dom"
import UserContext from "global/UserContext"
import { useParams } from "react-router-dom"
import axios from "global/axiosbase";
import { edpurl } from "global/edpAxios"
import FileUpload from "components/misc/FileUpload"

const InfoTwo = ({ modal }) => {
    const history = useHistory();
    const param = useParams().id;
    const ctx = useContext(UserContext);
    const [ errTxt, setErrTxt ] = useState({cond: false, text:''});
    const [ mainData, setMainData ] = useState(null);
    const [ addModal, setAddModal ] = useState(false);
    const [ editModal, setEditModal ] = useState(false);
    const [ deleteModal, setDeleteModal ] = useState(false);
    const [ activityData, setActivityData ] = useState([]);
    const [ selected, setSelected ] = useState({});
    const [ SelectedFile, setSelectedFile ] = useState([]);

    const [reg, setReg] = useState('');
    
    useEffect(()=>{
        fetchData();
        fetchDataActivity();
    },[]);

    const fetchData = async () =>{
      await axios.get(`infotwos?idd=${param}`).then(res=>{
          if(res.data.length){
            // setSelectedFile(res.data[0]?.edpuploads);
            setMainData(res.data[0]);
            setReg(res.data[0]?.register);
          }
      });
    }

    const fetchDataActivity = async () =>{
      await axios.get(`infotwodetails?idd=${param}`).then(res=>{
          setActivityData(res.data);
      });
    }

    const onSubmit = (e) =>{
        e.preventDefault();
        let inp = document.querySelectorAll(".getInpp"); let arr = Array.from(inp); let final = {};
        arr.forEach(el=>{
            final[el.name] = el.value;
        });

        final["idd"] = param

        if(activityData.length !== 0){
            
            // if(SelectedFile.length){
                if(reg.length === 7){
                    ctx.loadFunc(true);
                    if(mainData?.id){
                        axios.put(`infotwos/${mainData.id}`, final).then(res=>{
                            ctx.alertFunc('green','Амжилттай',true );
                            ctx.loadFunc(false);
                            history.push(`/${param}/intro/5`);
                            SelectedFile.forEach(el=>{
                                if(el.idd){
                                    axios.put(`edpuploads/${el.id}`, { url: el.url, file_id: el.file_id, file_id: el.id, name:el.name, infotwo: res.data.id,  idd: param, })
                                }else{
                                    axios.post(`edpuploads`, { url: edpurl + el.fileUrl.replace("public", ""), file_id: el.id, name:el.name, infotwo: res.data.id,  idd: param,  })
                                }
                            });
                        }).catch(err=>ctx.alertFunc('orange','Алдаа гарлаа',true ));
                        activityData.forEach((el)=>{
                            if(el.id){
                                axios.put(`infotwodetails/${el.id}`, el);   
                            }else{
                                axios.post(`infotwodetails`, el);
                            }
                        });
                    }else{
                        axios.post(`infotwos`, final).then(res=>{
                            axios.put(`totals/${ctx.total?.id}`, { infotwo: true, idd: param }).then(res=>{
                                ctx.alertFunc('green','Амжилттай',true );
                                ctx.loadFunc(false);
                                history.push(`/${param}/intro/5`);
                            }).catch(err=>ctx.alertFunc('orange','Алдаа гарлаа',true ));
                            SelectedFile.forEach(el=>{
                                if(el.idd){
                                    axios.put(`edpuploads/${el.id}`, { url: el.url, file_id: el.file_id, file_id: el.id, name:el.name, infotwo: res.data.id,  idd: param, })
                                }else{
                                    axios.post(`edpuploads`, { url: edpurl + el.fileUrl.replace("public", ""), file_id: el.id, name:el.name, infotwo: res.data.id,  idd: param,  })
                                }
                            });
                        }).catch(err=>ctx.alertFunc('orange','Алдаа гарлаа',true ));
                        activityData.forEach((el)=>{
                            axios.post(`infotwodetails`, el);
                        })
                    }
                }else{
                    setErrTxt({cond:true, text: "Регистерийн дугаараа шалгана уу.." });
                    setTimeout(() => { setErrTxt({cond:false, text: "" }); }, 4000);
                }
            // }else{
            //     setErrTxt({cond:true, text: "Улсын бүртгэлийн гэрчилгээгээ хавсрагана уу.." });
            //     setTimeout(() => { setErrTxt({cond:false, text: "" }); }, 4000);
            // }
            
        }else{
            setErrTxt({cond:true, text: "Мэдээллээ гүйцэд оруулна уу.." });
            setTimeout(() => { setErrTxt({cond:false, text: "" }); }, 4000);
        }
    }

    const registerHandle = (e) =>{
        if(e.target.value.length < 8){
          setReg(e.target.value);
        }
    }


    return (
        <Container style={modal&&{padding:"0px 0px",boxShadow:"none"}} className="contianer-fluid">
            <form onSubmit={onSubmit}>
                {!modal&&<>
                    <div className="row">
                    <div className="col-md-5 col-sm-5 col-12">
                        <InputStyle>
                            <div className="label">Регистерийн дугаар</div>
                            <input value={reg} onChange={registerHandle} defaultValue={mainData?.register} className="getInpp" name="register" type="number" required />
                        </InputStyle>
                    </div>
                    <div className="col-md-1 col-sm-1 col-12"></div>
                    <div className="col-md-5 col-sm-5 col-12">
                        <InputStyle>
                            <div className="label">Оноосон нэр</div>
                            <input defaultValue={mainData?.comp_name} className="getInpp" name="comp_name" type="text" required />
                        </InputStyle>
                    </div>
                    </div>

                    <div className="row">
                        <div className="col-md-5 col-sm-5 col-12">
                            <InputStyle>
                                <div className="label">Бүртгэсэн огноо</div>
                                <input className="getInpp" defaultValue={mainData?.approve_date} name="approve_date" max={MaxDate} type="text" onFocus={(e) => e.target.type = 'date'}
                                //  placeholder="өдөр-сар-жил"
                                required />
                            </InputStyle>
                        </div>
                        <div className="col-md-1 col-sm-1 col-12"></div>
                        <div className="col-md-5 col-sm-5 col-12">
                            <InputStyle>
                                <div className="label">Хариуцлагын хэлбэр</div>
                                <input className="getInpp" defaultValue={mainData?.sort} name="sort" type="text" required />
                            </InputStyle>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-5 col-sm-5 col-12">
                            <InputStyle>
                                <div className="label">Хуулийн этгээдийн хаяг</div>
                                <input className="getInpp" defaultValue={mainData?.address} name="address" type="text" required />
                            </InputStyle>

                            {/* <InputStyle>
                                <div className="label">Төрөл</div>
                                <input className="getInpp" defaultValue={mainData?.type} name="type" type="text" required />
                            </InputStyle> */}

                        </div>
                        <div className="col-md-1 col-sm-1 col-12"></div>
                        <div className="col-md-5 col-sm-5 col-12">
                            <InputStyle>
                                <div className="label">Хувьцаа эзэмшигчдийн тоо</div>
                                <input className="getInpp" defaultValue={mainData?.count} name="count" type="number" required />
                            </InputStyle>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-5 col-sm-5 col-12">
                            <InputStyle>
                                <div className="label">Байгуулагдсан огноо</div>
                                <input className="getInpp" defaultValue={mainData?.established_date} name="established_date" max={MaxDate} type="text" onFocus={(e) => e.target.type = 'date'} required />
                            </InputStyle>
                        </div>
                        <div className="col-md-1 col-sm-1 col-12"></div>
                    </div>
                </>}

                <div className={modal?`customTable pageRender`:`customTable`}>
                    <div className="headPar">
                        <div className="title">Үйл ажиллагааны мэдээлэл</div>
                        <div onClick={()=>setAddModal(true)} className="addBtn"><RiAddLine /><span>Нэмэх</span></div>
                    </div>

                    {modal&&<table style={{marginBottom:20}}>
                        <tbody>
                            <tr>
                                <th>Регистерийн дугаар</th>
                                <th>Оноосон нэр</th>
                                <th>Бүртгэсэн огноо</th>
                                <th>Хэлбэр</th>
                                <th>Төрөл</th>
                                <th>Хувьцаа эзэмшигчдийн тоо</th>
                                <th>Хуулийн этгээдийн хаяг</th>
                                <th></th>
                            </tr>
                            <tr >
                                <td>{mainData?.register}</td>
                                <td>{mainData?.comp_name}</td>
                                <td>{mainData?.approve_date}</td>
                                <td>{mainData?.sort}</td>
                                <td>{mainData?.type}</td>
                                <td className="center">{mainData?.count}</td>
                                <td>{mainData?.address}</td>
                                <td className="editDelete"></td>
                            </tr>
                        </tbody>
                    </table>}
                    
                    <table >
                        <tbody>
                            <tr>
                                <th>дд</th>
                                <th>Үйл ажиллагааны код</th>
                                <th>Үйл ажиллагааны чиглэл</th>
                                <th></th>
                            </tr>
                            {activityData.map((el,i)=>{
                                return(
                                    <tr key={i}>
                                        <td>{i+1}</td>
                                        <td>{el.code}</td>
                                        <td>{el.direct}</td>
                                        <td className="editDelete">
                                            <div className="editDeletePar">
                                                <div onClick={()=> { setSelected(el); setEditModal(true); }} className="smBtn"><RiEdit2Line /></div>
                                                <div onClick={()=> { if(el.id){ setSelected(el); setDeleteModal(true) }else{ setActivityData(prev=>prev.filter(items=>items.code!==el.code))}}} className="smBtn"><VscError /></div>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                            {activityData.length===0&&<tr className="ghost">
                                    <td>1</td>
                                    <td>1010</td>
                                    <td>Мах, махан бүтээгдэхүүний үйлдвэрлэл</td>
                                    <td></td>
                                </tr>}
                        </tbody>
                    </table>
                </div>

                {/* <FileUpload SelectedFile={SelectedFile} setSelectedFile={setSelectedFile} title={`Хавсралт. Улсын бүртгэлийн гэрчилгээ`} modal={modal} /> */}

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

export default InfoTwo
