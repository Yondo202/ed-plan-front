import React, { useState, useContext } from 'react'
import{  CustomFileUpload} from "components/misc/CustomTheme";
import UserContext from "global/UserContext"
import edpAxios, { edpurl } from "global/edpAxios"
import { RiImageAddFill } from "react-icons/ri"

const FileUploadLogo = ( { selectLogo, setSelectLogo, first }) => {
    const ctx = useContext(UserContext);

    const onClickHandler = (e) => {
        if(e.target.files.length!==0){
            let file = e.target.files[0];
            const data = new FormData();
            data.append("file", file );
            data.append("desc", "edplan-upload" );
            // console.log( "bla2323", data.get("file"));
            edpAxios.post(`attach-files`, data, { headers: { 'Authorization': ctx.approve.token, 'Content-Type': 'multipart/form-data',
            }}).then(res=>{
                setSelectLogo(res.data.data);
            }).catch(_=>ctx.alertFunc('orange','Алдаа гарлаа (хавсаргах)',true ));
        }
    };

    return (
        <>
            <CustomFileUpload>
                    {/* <div className="title">{title}</div> */}
                    <div className="contentPar contentPar2">

                        {selectLogo.id&&<div className="imgPar imgPar2 imgPar3">
                            {/* <img className="img" src={`${el.blob}`}/> */}
                            {/* {<div className="Addition">
                                <RiSearchEyeLine onClick={()=>seeParent(selectLogo.idd?selectLogo.fileUrl:`${edpurl + selectLogo.fileUrl?.replace("public", "")}`)} className="see" />
                                <TiDelete onClick={()=>DeleteImage(selectLogo)} className="delete" />
                            </div>} */}
                            {selectLogo.idd?<img className="img" src={selectLogo.fileUrl}/>
                            :<img className="img" src={`${edpurl + selectLogo.fileUrl?.replace("public", "")}`}/>}
                        </div>}

                        {!selectLogo.id&&<div className="inputSector">
                            <label className="inputStyle" htmlFor="file-upload">
                                <RiImageAddFill />
                            </label>
                            <input id="file-upload" type="file" accept=".gif,.jpg,.jpeg,.png" name="file-input" onChange={onClickHandler} />
                        </div>}
                    </div>
            </CustomFileUpload>
            {/* {seeImg&&<ImagePreview url={selectImg} setSeeImg={setSeeImg} />} */}
        </>
    )
}

export default FileUploadLogo