import React, { useEffect } from 'react'
import axiosInstance from '../apiBackend';
import { useSelector } from 'react-redux';

const useFetchHook = ({url}) => {


    const [data, setData] = React.useState(null);
    const [loading, setLoading] = React.useState(null);
    const [error, setError] = React.useState(null);
const {allUsers} = useSelector((state)=> state.users)
    
    const fetch = async ()=> {
        try{
            setLoading(true);
            const response = await axiosInstance.post(url);
            if(response.data[0].message){
                return []
            }
            setData(response?.data);
        } catch(err){
            setError(err.message);
        } finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        console.log(url,"esta url me llega")
        fetch()
    },[url,allUsers ])


    return {data , error ,loading}
}

export default useFetchHook