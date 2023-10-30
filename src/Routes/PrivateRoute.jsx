import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({children}) => {
    const {user,loading} = useContext(AuthContext);
    const location = useLocation();
    console.log('Private route location',location.pathname);

    if (loading){
        return <span className="loading loading-spinner loading-lg"></span>
    }
    if(user?.email){
        return children;
    }
    return <Navigate state={location.pathname} to="/login" replace></Navigate>;
    // or return <Navigate state={{from: location}} to="/login" replace></Navigate>;
};

export default PrivateRoute;