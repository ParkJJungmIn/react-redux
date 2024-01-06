import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {alertActions} from "../_store/index.js";

// import { alertActions } from '_store';

// alertActions
export { Alert };

function Alert() {
    const dispatch = useDispatch();
    const location = useLocation();
    const alert = useSelector(x => x.alert.value);

    useEffect(() => {
        // clear alert on location change
        dispatch(alertActions.clear());
    }, [location]);

    if (!alert) return null;

    return (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2">
            <div className={`flex items-center justify-between rounded-lg p-4 shadow-lg ${alert.type === 'alert-success' ? 'bg-teal-100 border border-teal-400 text-teal-800' : ''} ${alert.type === 'alert-danger' ? 'bg-rose-100 border border-rose-400 text-rose-800' : ''}`}>
                <span className="font-semibold">{alert.message}</span>
                <button type="button" className="close text-red-500 hover:text-red-700"
                        onClick={() => dispatch(alertActions.clear())}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </div>
    );
}