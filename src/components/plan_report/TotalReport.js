import React, { useState, useContext, useEffect } from 'react'
import{ Container, ButtonStyle2} from "components/misc/CustomTheme";
import { RiAddLine,RiEdit2Line } from "react-icons/ri"
import { VscError } from "react-icons/vsc"
import { AddModal, EditModal, DeleteModal } from "components/plan_report/modals/FinanceModal"
import { useHistory } from "react-router-dom"
import UserContext from "global/UserContext"
import { useParams } from "react-router-dom"
import axios from "global/axiosbase";
import { NumberComma } from "components/misc/NumberComma"

const TotalFinance = () => {
    const [ errText, setErrText ] = useState(false);

    return (
        <Container>
            <div className="customTable T2 T3">
                    <div className="headPar">
                        <div className="title">Удирдлагын багийн уулзалт, тайлан</div>
                        <div className="addBtn"><RiAddLine /><span>Нэмэх</span></div>
                    </div>
                    <table >
                        <tr>
                            <th>#</th>
                            <th>Төслөөс санхүүжилт хүсч буй үйл ажиллагаа</th>
                            <th >Эхлэх хугацаа</th>
                            <th>Дуусах хугацаа</th>
                            <th>Төсөвт зардал ам.дол</th>
                            <th>Төслөөс хүсч буй дүн ам.дол</th>
                            <th>Төслөөс хүсч буй санхүүжилтийн хувь</th>
                            <th>Хариуцах хүн</th>
                            <th>Тухайн ажлын талаар тайлагнах хугацаа</th>
                            <th>Гүйцэтгэл</th>

                        </tr>
                        <tr>
                            <td>
                               <table>
                                   <tr>
                                        bla2
                                   </tr>
                                   <tr>
                                         bla2
                                   </tr>
                                   <tr>
                                         bla2
                                   </tr>
                               </table>
                            </td>
                            
                            <td>Тухайн ажлын талаар тайлагнах хугацаа</td>
                            
                        </tr>
                       
                    </table>
                </div>


            <ButtonStyle2>
                    <div className="errTxt">{errText&&`Мэдээлэлээ оруулна уу...`}</div>
                    <button type="submit" className="myBtn">Хадгалах</button>
                </ButtonStyle2>
        </Container>
    )
}

export default TotalFinance
