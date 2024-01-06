import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';

// import { history } from '_helpers';
// import { Nav, Alert, PrivateRoute } from '_components';
// import { Home } from 'home';
import { AccountLayout } from './account/index.js';
import { UsersLayout } from './users/index.js';
import {history} from "./_helpers/index.js";
import {Nav,Alert, PrivateRoute} from "./_components/index.js";
import {Home} from "./home/index.js";
import {MyEditor} from "./board/index.js";


export { App };
// Nav
// Home
function App() {
    // init custom history object to allow navigation from
    // anywhere in the react app (inside or outside components)
    history.navigate = useNavigate();
    history.location = useLocation();

    return (
        <div className="min-h-screen bg-gray-100">
            <Nav />
            <Alert />
            <div className="container mx-auto">
                <Routes>
                    {/* private */}
                    <Route element={<PrivateRoute />}>
                        <Route path="/" element={<Home />} />
                        <Route path="users/*" element={<UsersLayout />} />
                    </Route>
                    {/* public */}
                    <Route path="editor" element={<MyEditor/>}> </Route>
                    <Route path="account/*" element={<AccountLayout />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
        </div>
    );

}