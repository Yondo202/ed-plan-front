import React, { useState, useContext, useEffect } from 'react'
import UserContext from "global/UserContext"
import EDPaxios, { edpBackendUrl } from "global/edpAxios"
import { useParams } from 'react-router-dom';
import axios from "global/axiosbase"
import { IoAdd } from "react-icons/io5"
import { BsFolderCheck } from "react-icons/bs"
import { AiTwotoneDelete } from "react-icons/ai"
import { TitleStyle } from "components/misc/CustomTheme"
import styled, { keyframes } from 'styled-components'

const FileAttach = () => {
    const param = useParams().id;
    const ctx = useContext(UserContext);
    const [ allFiles, setAllFiles ] = useState([])

    useEffect(()=>{
        void async function Fecth(){
            let files = await axios.get(`attach-files?idd=${param}`)
            setAllFiles(files?.data)
        }()
    },[])

    const onClickHandler = (e) =>{
        const formData = new FormData()
        if (!e.target.files[0]) return
        formData.append('file', e.target.files[0])
        formData.append("desc", "edplan-upload" );
        console.log(`formData`, e.target.files[0])

        EDPaxios.post(`attach-files`, formData, { headers: {'Content-Type': 'multipart/form-data' }} ).then(res=>{
            axios.post(`attach-files`, { ...res?.data?.data, idd: param, fileId: res.data?.data?.id }).then(ress=>{
                console.log(`ress`, ress)
                setAllFiles(prev=> [ ...prev, ress?.data ])
            })

        }).catch(err=>{
            console.log(`err`, err?.response)
            ctx.alertFunc('orange','Хавсаргахад алдаа гарлаа',true )
        })
    }

    const DeleteHandle = (item) =>{
        axios.delete(`attach-files/${item?.id}`).then(res=>{
            setAllFiles(prev=>[...prev.filter(el=>el.id!==res?.data.id)])
        })
    }

    
    return (
        <Container className="container">
            <TitleStyle className="header_par"><span className="text">Нэмэлтээр файл хавсаргах</span></TitleStyle>

            <div className="attach_parent">
                {allFiles.map((el,ind)=>{
                    return(
                        <div key={ind} className="inputSector inputSectorActive">
                            <label className="inputStyle" htmlFor="file-upload">
                                <BsFolderCheck className="mysvg" />
                            </label>

                            <div onClick={_=>DeleteHandle(el)} className="delete_par">
                                <div className="text">Устгах</div>
                                <div className="svg">
                                    <AiTwotoneDelete />
                                </div>
                            </div>

                            <input id="file-upload" type="file" name="file-input" onChange={onClickHandler} />

                            <div className="uploaded_text">
                                <div className="name">{el.name}</div>
                                <div className="type">type: {el.mimetype.replace('application/', '')}</div>
                            </div>
                        
                        </div>
                    )
                })}


                <div className="inputSector">
                    <label className="inputStyle" htmlFor="file-upload">
                        <IoAdd className="mysvg" />
                    </label>
                    <input id="file-upload" type="file" name="file-input" onChange={onClickHandler} />
                </div>
            </div>


        </Container>
    )
}

export default FileAttach

const ModalAnimate = keyframes`
    0%{ opacity:0; transform:scale(0.8); }
    100%{ opacity:1; transform:scale(1); }
`

const Container = styled.div`
    padding-top:50px;
    padding-bottom:50px;

    .attach_parent{
        display:flex;
        flex-wrap:wrap;
        gap:24px;
        .inputSector{
            .uploaded_text{
                padding:10px 0px;
                font-size:13px;
                .name{
                    font-weight:500;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                    width:140px; 
                    padding-bottom:3px;
                }
                .type{
                    opacity:0.9;
                }

            }
            .inputStyle{
                transition:all 0.3s ease;
                margin-bottom:0px;
                cursor:pointer;
                padding:14px;
                height:80px;
                width:140px;
                display:flex;
                border:2px solid rgba(${props=>props.theme.textColor},0.4);
                border-style:dashed;
                .mysvg{
                    transition:all 0.3s ease;
                    height:100%;
                    width:100%;
                    color:rgba(${props=>props.theme.textColor},0.4);
                }
                &:hover{
                    border:2px solid rgba(${props=>props.theme.textColor});
                    border-style:dashed;
                    .mysvg{
                        color:rgba(${props=>props.theme.textColor});
                    }
                }
            }

            input[type="file"]{
                display:none;
            }
        }
        .inputSectorActive{
            position:relative;
            animation: ${ModalAnimate} 0.6s ease;
            .inputStyle{
                border:2px solid rgba(20, 190, 20);
                border-style:dashed;
                .mysvg{
                    color:rgba(20, 190, 20);
                }
                
            }

            .delete_par{
                display:none;
                cursor:pointer;
                animation: ${ModalAnimate} 0.2s ease;
                position:absolute;
                top:0;
                left:0;
                right:0;
                height:80px;
                background-color:#fff;
                flex-direction:column;
                align-items:center;
                justify-content:center;
                color:#fff;
                z-index:4;
                font-size:14px;
                .text{
                    color:rgb(220,20,20);
                    font-weight:500;
                    margin-bottom:4px;
                }
                .svg{
                    color:rgb(220,20,20);
                    svg{
                        font-size:20px;
                    }
                }
            }
            &:hover {
                .delete_par{
                    display:flex !important;
                }
             }
        }
    }
`