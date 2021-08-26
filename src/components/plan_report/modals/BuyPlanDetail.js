import React, { useState } from 'react'
import { CustomModal } from "components/misc/CustomTheme"
import CkEditor from "components/misc/CkEditor";
import { VscSave } from "react-icons/vsc"

export const Indicator = ({ setShow, IndicatorData, setIndicatorData }) => {
    const [ close, setClose ] = useState('');

    const closeHandle = () =>{
        setClose('contentParent2');
        setTimeout(() => { setShow(false); setClose('') }, 300);
    }

    return (
        <CustomModal>
            <div className={`contentParent ${close}`} style={{width:"62rem"}}>
                <div className="head">
                    <div className="title">Худалдан авах ажиллагааны төлөвлөгөө</div>
                    <div onClick={closeHandle} className="close">✖</div>
                </div>
                <div className="content">
                    <CkEditor height={true} title="Худалдан авах бараа, ажил, үйлчилгээний нэр, төрөл, тоо хэмжээ, хүчин чадал" data={IndicatorData} setData={setIndicatorData} />

                    <div className="modalbtnPar">
                        <button  onClick={closeHandle} disabled={IndicatorData.length > 2?false:true} className="modalbtn"><VscSave /> Хадгалах</button>
                    </div>
                </div>
            </div>
        </CustomModal>
    )
}



export const Description = ({ setShow, IndicatorData, setIndicatorData }) => {
    const [ close, setClose ] = useState('');

    const closeHandle = () =>{
        setClose('contentParent2');
        setTimeout(() => { setShow(false); setClose('') }, 300);
    }

    return (
        <CustomModal>
            <div className={`contentParent ${close}`} style={{width:"62rem"}}>
                <div className="head">
                    <div className="title">Худалдан авах ажиллагааны төлөвлөгөө</div>
                    <div onClick={closeHandle} className="close">✖</div>
                </div>
                <div className="content">
                    <CkEditor height={true} title="Тайлбар, тодруулга" data={IndicatorData} setData={setIndicatorData} />

                    <div className="modalbtnPar">
                        <button onClick={closeHandle} disabled={IndicatorData.length > 2?false:true} className="modalbtn"><VscSave /> Хадгалах</button>
                    </div>
                </div>
            </div>
        </CustomModal>
    )
}