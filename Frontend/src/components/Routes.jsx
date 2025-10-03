import React from "react";
import {BrowserRouter as Router,Routes,Route,Navigate} from "react-router-dom";
import Register from "./Register";
import Login from "./Login";

const AppRoutes=()=>{
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path ="/register" element={<Register/>}/>
                <Route path ="/login" element={<Login/>}/>

            </Routes>
        </Router>
    );
};
export default AppRoutes;
