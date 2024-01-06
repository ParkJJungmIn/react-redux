import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {history} from "../_helpers/index.js";

// import { history } from '_helpers';
// history
export { PrivateRoute };

function PrivateRoute() {
    const auth = useSelector(x => x.auth.value);
    console.log(auth)

    if (!auth) {
        // not logged in so redirect to login page with the return url
        return <Navigate to="/account/login" state={{ from: history.location }} />
    }

    // authorized so return outlet for child routes
    return <Outlet />;
}


