import React from 'react'

const LoginMsg = ({ text, admin }) => {
    return (
        <div style={{display:"grid", placeItems:"center", height:"70vh"}}>
            <h1 style={admin===true?{color:`#fff`}:{color:`#000`}}>{text}</h1>
        </div>
    )
}

export default LoginMsg





