import React, { useEffect, useState, useContext } from 'react'
import CkEditor from "components/misc/CkEditor"
import{ Container, ButtonStyle2 } from "components/misc/CustomTheme";
import { useHistory } from "react-router-dom"
import UserContext from "global/UserContext"
import { useParams } from "react-router-dom"
import axios from "global/axiosbase"
import { edpurl } from "global/edpAxios"
import ContentParser from "components/misc/ContentParser"
import FileUpload from "components/misc/FileUpload"

const InfoOne = ({ modal }) => {
    const history = useHistory();
    const ctx = useContext(UserContext);
    const param = useParams().id;
    const [ errTxt, setErrTxt ] = useState({cond: false, text:''});
    const [ fetchID, setFetchID ] = useState(null);
    const [ data, setData ] = useState('');
    const [ SelectedFile, setSelectedFile ] = useState([]);

    useEffect(()=>{
        fetchData();
    },[]);

    const fetchData = () =>{
        axios.get(`infoones?idd=${param}`, ).then(res=>{
            if(res.data.length){
                setSelectedFile(res.data[0]?.edpuploads);
                setData(res.data[0]?.body);
                setFetchID(res.data[0]?.id);
            }
        })
    }

    const clickHandle = () =>{
        if(data.length){
            if(SelectedFile.length){
                ctx.loadFunc(true);
                if(fetchID){
                    axios.put(`infoones/${fetchID}`, { body: data, idd: param }).then(res=>{
                        SelectedFile.forEach(el=>{
                            if(el.idd){
                                axios.put(`edpuploads/${el.id}`, { url: el.url, file_id: el.file_id, name:el.name, infoone: res.data.id,  idd: param, })
                            }else{
                                axios.post(`edpuploads`, { url: edpurl + el.fileUrl.replace("public", ""), file_id: el.id, name:el.name, infoone: res.data.id,  idd: param,  })
                            }
                        });
                        ctx.alertFunc('green','Амжилттай',true );
                        ctx.loadFunc(false);
                        history.push(`/${param}/intro/3`);
                    }).catch(err=>ctx.alertFunc('orange','Алдаа гарлаа put',true ));
                }else{
                    axios.post(`infoones`, { body: data, idd: param }).then(res=>{
                        axios.put(`totals/${ctx.total?.id}`, { infoone: true, idd: param }).then(_=>{
                            ctx.alertFunc('green','Амжилттай',true );
                            ctx.loadFunc(false);
                            history.push(`/${param}/intro/3`);
                        }).catch(err=>ctx.alertFunc('orange','Алдаа гарлаа',true ));
                        SelectedFile.forEach(el=>{
                            if(el.idd){
                                axios.put(`edpuploads/${el.id}`, { url: el.url, file_id: el.file_id, file_id: el.id, name:el.name, infoone: res.data.id,  idd: param, })
                            }else{
                                axios.post(`edpuploads`, { url: edpurl + el.fileUrl.replace("public", ""), file_id: el.id, name:el.name, infoone: res.data.id,  idd: param,  })
                            }
                        });
                    }).catch(err=>ctx.alertFunc('orange','Алдаа гарлаа post',true ));
                }
            }else{
                setErrTxt({cond:true, text: "Бүтцийн зураг оруулна уу.." });
                setTimeout(() => { setErrTxt({cond:false, text: "" }); }, 4000);
            }
        }else{
            setErrTxt({cond:true, text: "Мэдээллээ гүйцэд оруулна уу.." });
            setTimeout(() => { setErrTxt({cond:false, text: "" }); }, 4000);
        }
    }

    return (
        <>
            {modal?<><ContentParser data={data} titleSm={`Бүтэц, зохион байгуулалт`} titleBig={`II. Аж ахуйн нэгжийн танилцуулга`} />
            <FileUpload SelectedFile={SelectedFile} setSelectedFile={setSelectedFile} title={`Хавсралт. Бүтцийн зураг оруулах`} modal={modal} />
            </>
            :<Container>
                <CkEditor title={`Бүтэц, зохион байгуулалт`} height={"35rem"} data={data} setData={setData} />

                <FileUpload SelectedFile={SelectedFile} setSelectedFile={setSelectedFile} title={`Хавсралт. Бүтцийн зураг оруулах`} modal={modal} />

                <ButtonStyle2 >
                    <div className="errTxt">{errTxt.cond&&`${errTxt.text}`}</div>
                    <button onClick={clickHandle} type="submit" className="myBtn">Хадгалах</button>
                </ButtonStyle2>
            </Container>}
        </>
    )
}

export default InfoOne



