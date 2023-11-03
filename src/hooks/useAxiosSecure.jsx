import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";


const axiosSecure = axios.create({
    baseURl: `http://localhost:5000`,
    withCredentials: true
})
const useAxiosSecure = () => {

const {logout} = useContext(AuthContext)
const navigate = useNavigate();
    useEffect(()=>{
        axiosSecure.interceptors.response.use(res=>{
            return res;
        },error=>{
            console.log('error in interceptor',error.response);
            if(error.response.status===401|| error.response.status===403){
                console.log('log out user')
                logout()
                .then(()=>{
                    navigate('/login');
                })
                .catch(error=>console.log(error.message))
            }
        })
    },[])
    return axiosSecure;
    
};

export default useAxiosSecure;