import React, { useEffect, useState, useContext } from 'react'
import CkEditor from "components/misc/CkEditor"
import{ Container, ButtonStyle2 } from "components/misc/CustomTheme";
import { useHistory } from "react-router-dom"
import UserContext from "global/UserContext"
import { useParams } from "react-router-dom"
import axios from "global/axiosbase"
import edpAxios from "global/edpAxios"
import ContentParser from "components/misc/ContentParser"

const InfoOne = ({ modal }) => {
    const history = useHistory();
    const ctx = useContext(UserContext);
    const param = useParams().id;
    const [ errTxt, setErrTxt ] = useState(false);
    const [ fetchID, setFetchID ] = useState(null);
    const [ data, setData ] = useState('');
    const [ SelectedFile, setSelectedFile ] = useState({});
    const [ attachment ,setAttachment ] = useState();

    useEffect(()=>{
        fetchData();
    },[]);

    const fetchData = () =>{
        axios.get(`infoones?idd=${param}`, ).then(res=>{
            if(res.data.length){
                setData(res.data[0]);
                setFetchID(res.data[0]?.id);
            }
        })
    }

    const clickHandle = () =>{
        if(data.length){
            ctx.loadFunc(true);
            if(fetchID){
                axios.put(`infoones/${fetchID}`, { body: data, idd: param }).then(res=>{
                    ctx.alertFunc('green','Амжилттай',true );
                    ctx.loadFunc(false);
                    history.push(`/${param}/intro/3`);
                }).catch(err=>ctx.alertFunc('orange','Алдаа гарлаа',true ));
            }else{
                axios.post(`infoones`, { body: data, idd: param }).then(res=>{
                    axios.put(`totals/${ctx.total?.id}`, { infoone: true, idd: param }).then(res=>{
                        ctx.alertFunc('green','Амжилттай',true );
                        ctx.loadFunc(false);
                        history.push(`/${param}/intro/3`);
                    }).catch(err=>ctx.alertFunc('orange','Алдаа гарлаа',true ));
                }).catch(err=>ctx.alertFunc('orange','Алдаа гарлаа',true ));
            }
        }else{
            setErrTxt(true);
        }
    }

    const onClickHandler = (e) => {
        console.log(`eeeeeee`, e);
        const data = new FormData();
        let file = e.target.files[0];
        setSelectedFile(e.target.files[0]);
        data.append("file", file);
        console.log(`data`, data);
        edpAxios.post(`attach-files`, data, {headers: { 
            // 'Authorization': props.token, 
            'Content-Type': 'multipart/form-data', }}).then(res=>{
                console.log(`res`, res);
        }).catch(err=>{
            console.log(`err`, err.response);
        })


        // const options = {
        //   method: "POST",
        //   headers: {
        //     "Content-Type":
        //       "multipart/form-data; boundary=----WebKitFormBoundaryBN6Xse2vFYp1yAKt",
        //   },
        //   data,
        // //   url: ${apiUrl.dj}/fi-file-upload/,
        // };
        // axios(options).then((response) => {
        //   if (response.status == 200) {
        //     alert("Файл хуулагдлаа");
        //   }
        //   setAttachment(response.data.file_path);
        // //   checkSaveButton();
        // });
      };

    return (
        <>
            {modal?<ContentParser data={data?.body} titleSm={``} titleBig={`I. Бүтэц, зохион байгуулалт`} />
            :<Container>
                <CkEditor title={`Бүтэц, зохион байгуулалт`} height={"35rem"} data={data?.body} setData={setData} />

                {/* <form >
                    <div style={{marginTop:12}} className="form-group">
                        <label>Хавсаргах</label>
                            <div style={{zIndex:"0"}} className="input-group">
                                <div className="custom-file">
                                    <input
                                    className="custom-file-input"
                                    type="file"
                                    name="file"
                                    onChange={onClickHandler}
                                    required
                                    />
                                    <label className="custom-file-label">
                                        {SelectedFile.name? SelectedFile.name : " Файлаа оруулна уу?"}
                                    </label>
                                </div>
                            </div>
                    </div>
                </form> */}

                <ButtonStyle2 >
                    <div className="errTxt">{errTxt&&`Утга оруулна уу`}</div>
                    <button onClick={clickHandle} type="submit" className="myBtn">Хадгалах</button>
                </ButtonStyle2>
            </Container>}
        </>
    )
}

export default InfoOne
