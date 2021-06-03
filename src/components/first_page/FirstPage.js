import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import{  CustomFileUpload } from "components/misc/CustomTheme";
import UserContext from "global/UserContext"
import axios from "global/axiosbase"
import edpAxios, { edpurl } from "global/edpAxios"
import { RiImageAddFill, RiSearchEyeLine } from "react-icons/ri"
import { TiDelete } from "react-icons/ti"
import ImagePreview from "components/misc/ImagePreview"

const FirstPage = () => {
    const [ selectLogo, setSelectLogo ] = useState({});

    return (
        <Container className="container">
            <div className="contentA4">
                {/* <div className="LogoPar">
                    <img src="https://idreamleaguesoccerkits.com/wp-content/uploads/2018/03/Korea-Republic-Logo-512x512-URL-300x300.png" />
                </div> */}
                <FileUpload SelectedFile={selectLogo} setSelectedFile={setSelectLogo} />
                <div className="item">Аж ахуйн нэгжийн нэр: Мах Экспорт ХХК</div>
                <div className="item">Экспортын бүтээгдэхүүн, үйлчилгээний нэр: Жерки</div>
                <div className="item">Экспортын бүтээгдэхүүн, үйлчилгээний HS код: 160250</div>
                <div className="item">Экспортын бүтээгдэхүүний зураг</div>
                <div className="item">Экспортын зорилтот орны нэр: Хонг Конг</div>

                <div className="item date">Огноо: 2021/04/20</div>
            </div>

        </Container>
    )
}

export default FirstPage

const Container = styled.div`
    width:100%;
    display:flex;
    align-items:center;
    justify-content:center;
    padding:30px 0px;
    .contentA4{
        box-shadow:1px 1px 20px -10px;
        margin-top:30px;
        padding:17mm;
        width:794px;
        height:1123px;
        text-align:center;
        background-color:#fff;
        .LogoPar{
            margin-bottom:45px;
            img{
                width:130px;
                height:auto;
            }
        }
        .item{
            margin-bottom:45px;
        }
        .date{
            margin-top:250px;
        }
    }
`




const FileUpload = ( { SelectedFile, setSelectedFile }) => {
    const ctx = useContext(UserContext);
    const [ seeImg, setSeeImg ] = useState(false);
    const [ selectImg, setSelectImg ] = useState('');

    const onClickHandler = (e) => {
        if(e.target.files.length!==0){
            let file = e.target.files[0];
            const data = new FormData();
            data.append("file", file );
            data.append("desc", "edplan-upload" );
            // console.log( "bla2323", data.get("file"));
            edpAxios.post(`attach-files`, data, { headers: { 'Authorization': ctx.approve.token, 'Content-Type': 'multipart/form-data',
            }}).then(res=>{
                // let blob = URL.createObjectURL(e.target.files[0]);
                // let obj2 = res.data.data
                // obj2["blob"] = blob;
                setSelectedFile(res.data.data);
            }).catch(err=>ctx.alertFunc('orange','Алдаа гарлаа (хавсаргах)',true ));
        }
    };
    const DeleteImage = (el) => {
        if(el.size){
            setSelectedFile({})
        }else{
            axios.delete(`edpuploads/${el.id}`).then(res=>{
                setSelectedFile({})
            })
        }
    }
    const seeParent = (url) =>{
        setSeeImg(true);
        setSelectImg(url);
    }

    return (
        <>
            <CustomFileUpload>
                    {/* <div className="title">{title}</div> */}
                    <div className="contentPar contentPar2">

                        {SelectedFile.id&&<div className="imgPar imgPar2">
                            {/* <img className="img" src={`${el.blob}`}/> */}
                            {<div className="Addition">
                                <RiSearchEyeLine onClick={()=>seeParent(SelectedFile.idd?SelectedFile.url:`${edpurl + SelectedFile.fileUrl?.replace("public", "")}`)} className="see" />
                                <TiDelete onClick={()=>DeleteImage(SelectedFile)} className="delete" />
                            </div>}
                            {SelectedFile.idd?<img className="img" src={SelectedFile.url}/>
                            :<img className="img" src={`${edpurl + SelectedFile.fileUrl?.replace("public", "")}`}/>}
                        </div>}

                        {!SelectedFile.id&&<div className="inputSector">
                            <label className="inputStyle" htmlFor="file-upload">
                                <RiImageAddFill />
                            </label>
                            <input id="file-upload" type="file" accept=".gif,.jpg,.jpeg,.png" name="file-input" onChange={onClickHandler} />
                        </div>}

                    </div>
            </CustomFileUpload>
            {seeImg&&<ImagePreview url={selectImg} setSeeImg={setSeeImg} />}
        </>
    )
}