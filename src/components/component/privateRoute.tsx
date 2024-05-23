import { reshapeUser } from "@/lib/utils";
import { ROLE } from "@/types";
import jwtDecode from "jwt-decode";
import { ReactElement } from "react";
import { Navigate } from "react-router-dom";

export function PrivateRoute({children}:{children: ReactElement}){
   
  
    const token = localStorage.getItem("token") || ""
    const decodedToken = jwtDecode(token)
    const decodedUser = reshapeUser(decodedToken)
  
  
return decodedUser.role ===ROLE.Customer ? <Navigate to="/"/> : children
}