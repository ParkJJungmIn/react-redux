import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {authActions} from "../_store/index.js";

// import { authActions } from '_store';
// authActions

export { Nav };

function Nav() {
    const auth = useSelector(x => x.auth.value);
    const dispatch = useDispatch();
    const logout = () => dispatch(authActions.logout());

    // only show nav when logged in
    if (!auth) return null;

    return (
        <nav className="bg-gray-800 px-3">
            <div className="flex items-center h-16">
                <NavLink to="/"
                         className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">Home</NavLink>
                <NavLink to="/users"
                         className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">Users</NavLink>
                <button onClick={logout}
                        className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">Logout
                </button>
            </div>
        </nav>

    );
}