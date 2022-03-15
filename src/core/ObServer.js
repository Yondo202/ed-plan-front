import React, { useEffect, useContext } from 'react'
import UserContext from "global/UserContext"
import { useParams } from "react-router-dom";
import LoginMsg from "components/misc/LoginMsg"
import styled from 'styled-components';
import ModalMain from 'components/pdf/ModalMain';

const ObServer = () => {
    const { UserIdProvider, approve } =  useContext(UserContext);
    const param = useParams().id;
    const admin = useParams().admin;

    useEffect(()=>{
        if(admin==="edp-admin"){
            if(parseInt(param)){
                UserIdProvider(param);
            }
        }
    },[param]);

    return (
        <Container>
            {admin==="edp-admin"?approve?.idd?
            <ModalMain admin={true} />
            :<LoginMsg admin={true} text="Байгууллага олдсонгүй." />:<LoginMsg admin={true} text="Хуудас олдсонгүй :(" />}
        </Container>
    )
}

export default ObServer

const Container = styled.div`
    position:fixed;
    z-index:10000;
    top:0;
    left:0;
    background-color:#494e65;
    width:100%;
    height:100%;
`
