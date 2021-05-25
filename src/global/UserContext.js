import React, { useEffect, useState } from 'react'
import axios from "global/axiosbase"
const UserContext = React.createContext();

export const UserStore = (props) => {
    const [ cond, setCond ] = useState(false);
    const [ userId, setUserID ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const [ alert, setAlert ] = useState({ color: 'white', text: '', cond: false });
    const [ total, setTotal ] = useState({});
    const [ approve, setApprove ] = useState({});
    const [ productId, setProductId ] = useState(null);

    useEffect(()=>{
        if(userId){
            FetchTotal();
        }
    },[userId, alert]);

    useEffect(()=>{
        if(userId){
            FetchApprove();
        }
    },[userId]);

    useEffect(()=>{
        fetchProductId();
    },[cond]);

    const fetchProductId = () =>{
        axios.post(`graphql`, { query: `query{
            exportProducts(where: { selected :true }){
              name id
            }
          }` }).then(res=>{
              if(res.data.data.exportProducts.length){
                setProductId(res.data.data.exportProducts[0].id);
              }
          })
    }

    const FetchApprove = async () =>{
       await axios.get(`approves?idd=${userId}`).then(res=>{
            setApprove(res?.data[0]);
        });
    }

    const FetchTotal = async () =>{
       await axios.get(`totals?idd=${userId}`).then(res=>{
            setTotal(res?.data[0]);
        });
    }
    const UserIdProvider = (id) =>{
        setUserID(id);
    }

    const loadFunc = (cond) =>{
        setLoading(cond);
        setTimeout(() => {
            setLoading(false);
        }, 3000)
    }
    const alertFunc = (color, text, cond)=>{
        setAlert({ color: color, text: text, cond: cond });
        setTimeout(() => { setAlert({ color: 'white', text: '', cond: false }); }, 4000);
    }

    console.log(`totalss`, total);

    return (
        <UserContext.Provider value={{ UserIdProvider, userId, loading, loadFunc, alert, alertFunc, total, approve, productId, setCond }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContext;
