import React ,{useContext} from "react"
import { signoutEndpoint } from "../services/axiosInceptor";
import axios from "axios"
import{AuthContext} from "./../context/userContext"
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const { setAuthStatus, setUsers } = useContext(AuthContext);
    const navigate = useNavigate();


    const handleLogout =  () => {
        try {
            // await axios.get(signoutEndpoint);
            localStorage.removeItem('token');
            setAuthStatus(false);
        setUsers(null);
        navigate("/signin")
          } catch (err) {
            console.error(err);
          }
        
      };
      
    
    return(
        <div>
            <div className="text-right">
            <button className= "border bg-indigo-500 text-right" onClick={handleLogout}>Sign Out</button>
            </div>
        </div>
    )

}

export default Dashboard