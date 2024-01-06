import {useSelector} from "react-redux";
import {Navigate, Route, Routes} from "react-router-dom";

import { Login , Register } from './';
export{ AccountLayout };
function AccountLayout(){
    const auth = useSelector(x => x.auth.value)

    if(auth){
        return <Navigate to={"/"} />;
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-8 offset-sm-2">
                    <Routes>
                        <Route path="login" element={<Login/>}/>
                        <Route path="register" element={<Register/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    )
}