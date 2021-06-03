import React, { useState, useContext } from 'react'
import{  CustomFileUpload } from "components/misc/CustomTheme";
import UserContext from "global/UserContext"
import axios from "global/axiosbase"
import edpAxios, { edpurl } from "global/edpAxios"
import { RiImageAddFill, RiSearchEyeLine } from "react-icons/ri"
import { TiDelete } from "react-icons/ti"
import ImagePreview from "components/misc/ImagePreview"

const FileUpload = ( { SelectedFile, setSelectedFile, title }) => {
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
                setSelectedFile(prev=> [ ...prev, res.data.data ]);
            }).catch(err=>ctx.alertFunc('orange','Алдаа гарлаа (хавсаргах)',true ));
        }
    };
    const DeleteImage = (el) => {
        console.log(`el`, el);
        if(el.size){
            setSelectedFile(prev=>[ ...prev.filter(item=>item.id!==el.id)])
        }else{
            axios.delete(`edpuploads/${el.id}`).then(res=>{
                setSelectedFile(prev=>[ ...prev.filter(item=>item.id!==el.id)])
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
                    <div className="title">{title}</div>
                    <div className="contentPar">
                        {SelectedFile.map((el, ind)=>{
                                return(
                                    <div key={ind} className="imgPar">
                                        {/* <img className="img" src={`${el.blob}`}/> */}
                                        <div className="Addition">
                                            <RiSearchEyeLine onClick={()=>seeParent(el.idd?el.url:`${edpurl + el.fileUrl.replace("public", "")}`)} className="see" />
                                            <TiDelete onClick={()=>DeleteImage(el)} className="delete" />
                                        </div>
                                        {el.idd?<img className="img" src={el.url}/>
                                        :<img className="img" src={`${edpurl + el.fileUrl.replace("public", "")}`}/>}
                                    </div>
                                )
                        })}
                        <div className="inputSector">
                            <label className="inputStyle" htmlFor="file-upload">
                               <RiImageAddFill />
                            </label>
                            <input id="file-upload" type="file" accept=".gif,.jpg,.jpeg,.png" name="file-input" onChange={onClickHandler} />
                        </div>
                    </div>
                </CustomFileUpload>
                {seeImg&&<ImagePreview url={selectImg} setSeeImg={setSeeImg} />}
        </>
    )
}

export default FileUpload
