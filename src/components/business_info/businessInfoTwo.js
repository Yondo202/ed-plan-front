import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AddModal, EditModal } from "components/business_info/modals/ModalTwo";
import { RiAddLine,RiEdit2Line } from "react-icons/ri";
import { NumberComma } from "components/misc/NumberComma"
import axios from "global/axiosbase"
import { MaxDate } from "components/misc/BeforeYears"

const BusinessInfoTwo = ( { title, subTitle, url, urlDetail, helpField, helpField2, setCond, cond} ) => {
    const param = useParams().id;
    // const [ cond, setCond ] = useState(false);
    const [ dataOne, setDataOne ] = useState([]);
    const [ addModal, setAddModal ] = useState(false);
    const [ editModal, setEditModal ] = useState(false);
    const [ customTitle, setCustomTitle ] = useState('');
    const [ selectedData, setSelectedData ] = useState([]);
    // const [ years, setYears ] = useState({ one });

    console.log(`dataOne`, dataOne);

    useEffect(()=>{
        fetchData();
    },[cond])

    const fetchData = async () =>{
        await axios.get(`${url}?idd=${param}`).then(res=>{
            setDataOne(res.data);
        })
    }

    const AddModalShow = (el) =>{
        setCustomTitle(el);
        setAddModal(true);
    }

    const editShow = (el) =>{
        setSelectedData([el]);
        setEditModal(true);
    }

    return (
            <div className="customTable T2">
                    <div className="headPar">
                        <div className="title">{title}</div>
                        {/* <div onClick={()=>setAddModal(true)} className="addBtn"><RiAddLine /><span>Нэмэх</span></div> */}
                    </div>
                    <table >
                            <tr>
                                <th>дд</th>
                                <th >Утга</th>
                                <th style={{textAlign:'center'}}>{MaxDate.three}</th>
                                <th style={{textAlign:'center'}} >{MaxDate.two}</th>
                                <th style={{textAlign:'center'}} >{MaxDate.one}</th>
                                <th ></th>
                            </tr>

                            {dataOne.length?dataOne.map((el,i)=>{
                                return(
                                    <>
                                        <tr key={el.id} className="parent">
                                            <td>{i+1}</td>
                                            <td>{el.desc}</td>
                                            <td style={{textAlign:'right'}}>{dataOne.length?NumberComma(dataOne[0]?.year_three):null}</td>
                                            <td style={{textAlign:'right'}}>{dataOne.length?NumberComma(dataOne[0]?.year_two):null}</td>
                                            <td style={{textAlign:'right'}}>{dataOne.length?NumberComma(dataOne[0]?.year_one):null}</td>
                                            <td className="editDelete">
                                                <div className="editDeletePar">
                                                    {!el.id&&<div onClick={()=>setAddModal(true)} className="smBtn"><RiAddLine /></div>} 
                                                    <div onClick={()=>editShow(el)} className="smBtn"><RiEdit2Line /></div>
                                                </div>
                                            </td>
                                        </tr>
                                        {helpField2==="bustwodetails"?el.bustwodetails.map((elem, ind)=>{
                                            return(
                                                <tr key={elem.id} className="child">
                                                    <td></td>
                                                    <td className="title">{elem.desc}</td>
                                                    <td style={{textAlign:'right'}}>{NumberComma(elem.year_three)}</td>
                                                    <td style={{textAlign:'right'}}>{NumberComma(elem.year_two)}</td>
                                                    <td style={{textAlign:'right'}}>{NumberComma(elem.year_one)}</td>
                                                    <td></td>
                                                </tr>
                                            )
                                        }):el.busthreedetails.map((elem, ind)=>{
                                            return(
                                                <tr key={elem.id} className="child">
                                                    <td></td>
                                                    <td className="title">{elem.desc}</td>
                                                    <td style={{textAlign:'right'}}>{NumberComma(elem.year_three)}</td>
                                                    <td style={{textAlign:'right'}}>{NumberComma(elem.year_two)}</td>
                                                    <td style={{textAlign:'right'}}>{NumberComma(elem.year_one)}</td>
                                                    <td></td>
                                                </tr>
                                            )
                                        })}
                                    </>
                                )
                            }):<></>}
                            
                            <>
                                {dataOne.length===1 || dataOne.length===2? ``:<tr className="parent">
                                    <td>1</td>
                                    <td className="title">{subTitle.one}</td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td className="editDelete">
                                        <div className="editDeletePar">
                                            <div onClick={()=>AddModalShow(subTitle.one)} className="smBtn"><RiAddLine /></div>
                                            {/* <div className="smBtn"><RiEdit2Line /></div> */}
                                        </div>
                                    </td>
                                </tr>}

                                {dataOne.length===1||dataOne.length===2? ``:<tr className="ghost child">
                                        <td></td>
                                        <td className="title">+</td>
                                        <td>+</td>
                                        <td>+</td>
                                        <td>+</td>
                                        <td></td>
                                </tr>}

                                {dataOne.length===2? ``:<tr className="parent">
                                    <td>1</td>
                                    <td className="title">{subTitle.two}</td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td className="editDelete">
                                        <div className="editDeletePar">
                                            {dataOne.length > 0 && <div onClick={()=>AddModalShow(subTitle.two)} className="smBtn"><RiAddLine /></div>} 
                                            {/* <div className="smBtn"><RiEdit2Line /></div> */}
                                        </div>
                                    </td>
                                </tr>}

                                {dataOne.length===2? ``:<tr className="ghost child">
                                        <td></td>
                                        <td className="title">+</td>
                                        <td>+</td>
                                        <td>+</td>
                                        <td>+</td>
                                        <td></td>
                                </tr>}
                            </>
                            
                    </table>
                {addModal?<AddModal dataOne={dataOne} length={dataOne.length} customTitle={customTitle} helpField={helpField}  title={title} urlDetail={urlDetail} url={url} setCond={setCond} setAddModal={setAddModal} />:``}
                {editModal?<EditModal dataOne={dataOne} length={dataOne.length} helpField={helpField}  title={title} urlDetail={urlDetail} url={url}  helpField2={helpField2} setCond={setCond} setAddModal={setEditModal} setDataOne={selectedData} />:``}
            </div>
         
    )
}

export default BusinessInfoTwo
