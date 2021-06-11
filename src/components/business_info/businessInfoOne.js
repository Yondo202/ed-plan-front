import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AddModal, EditModal } from "components/business_info/modals/ModalOne";
import { RiAddLine,RiEdit2Line } from "react-icons/ri";
import { NumberComma } from "components/misc/NumberComma"
import axios from "global/axiosbase"


const BusinessInfoOne = ({ modal, setCond2 }) => {
    const param = useParams().id;
    const [ cond, setCond ] = useState(false);
    const [ dataOne, setDataOne ] = useState([]);
    const [ addModal, setAddModal ] = useState(false);
    const [ editModal, setEditModal ] = useState(false);

    useEffect(()=>{
        fetchData();
    },[cond])

    const fetchData = async () =>{
        await axios.get(`busones?idd=${param}`).then(res=>{
            setDataOne(res.data);
        })
    } 

    return (
            <div className={modal?`customTable T2 pageRender`:`customTable T2`}>
                    <div className="headPar">
                        <div className="title">Экспорт болон дотоодын борлуулалт</div>
                        {/* <div onClick={()=>setAddModal(true)} className="addBtn"><RiAddLine /><span>Нэмэх</span></div> */}
                    </div>
                    <table >
                        <tbody>
                                <tr>
                                    <th>дд</th>
                                    <th >Утга</th>
                                    <th style={{textAlign:'center'}}>2018</th>
                                    <th style={{textAlign:'center'}} >2019</th>
                                    <th style={{textAlign:'center'}} >2020</th>
                                    <th ></th>
                                </tr>
                                {dataOne.length?dataOne.map((el,i)=>{
                                    return(
                                        <React.Fragment key={i}>
                                            <tr className="parent">
                                                <td>{i+1}</td>
                                                <td>Борлуулалт (ам.дол)</td>
                                                <td style={{textAlign:'right'}}>{NumberComma(el.year_three)}</td>
                                                <td style={{textAlign:'right'}}>{NumberComma(el.year_two)}</td>
                                                <td style={{textAlign:'right'}}>{NumberComma(el.year_one)}</td>
                                                <td className="editDelete">
                                                    <div className="editDeletePar">
                                                        {!el.id&&<div onClick={()=>setAddModal(true)} className="smBtn"><RiAddLine /></div>}
                                                        <div onClick={()=>setEditModal(true)} className="smBtn"><RiEdit2Line /></div>
                                                    </div>
                                                </td>
                                            </tr>
                                            {el.busonedetails.map((elem, ind)=>{
                                                return(
                                                    <tr key={ind} className="child">
                                                        <td></td>
                                                        <td className="title">{elem.desc}</td>
                                                        <td style={{textAlign:'right'}}>{NumberComma(elem.year_three)}</td>
                                                        <td style={{textAlign:'right'}}>{NumberComma(elem.year_two)}</td>
                                                        <td style={{textAlign:'right'}}>{NumberComma(elem.year_one)}</td>
                                                        <td></td>
                                                    </tr>
                                                )
                                            })}
                                        </React.Fragment>
                                    )
                                }):<>
                                
                                {<tr className="parent">
                                    <td>1</td>
                                    <td className="title">Борлуулалт (ам.дол)</td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td className="editDelete">
                                        <div className="editDeletePar">
                                            <div onClick={()=>setAddModal(true)} className="smBtn"><RiAddLine /></div>
                                            {/* <div className="smBtn"><RiEdit2Line /></div> */}
                                        </div>
                                    </td>
                                </tr>}
                                {<tr className="ghost child">
                                        <td></td>
                                        <td className="title">+</td>
                                        <td>+</td>
                                        <td>+</td>
                                        <td>+</td>
                                        <td></td>
                                </tr>}
                            </>}
                        </tbody>
                    </table>
                {addModal?<AddModal setCond2={setCond2} setCond={setCond} setAddModal={setAddModal} />:``}
                {editModal?<EditModal setCond={setCond} setCond2={setCond2} setAddModal={setEditModal} setDataOne={dataOne} />:``}
            </div>
         
    )
}

export default BusinessInfoOne
