import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {userActions} from "../_store/index.js";
import {Link} from "react-router-dom";


export {List}
function List(){
    const users = useSelector(x=> x.users.list);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.getAll());
    }, []);
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Users</h1>
            <Link to="add" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-2 inline-block">
                Add User
            </Link>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                    <tr>
                        <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Email
                        </th>
                        <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Username
                        </th>
                        <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {users?.value?.map(user =>
                        <tr key={user.id}>
                            <td className="py-2 px-4 border-b border-gray-200">{user.email}</td>
                            <td className="py-2 px-4 border-b border-gray-200">{user.name}</td>
                            <td className="py-2 px-4 border-b border-gray-200 whitespace-nowrap">
                                <Link to={`edit/${user.id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mr-1">
                                    Edit
                                </Link>
                                <button onClick={() => dispatch(userActions.delete({id : user.id, email : user.email}))}
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                                        disabled={user.isDeleting}>
                                    {user.isDeleting
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {users?.loading &&
                        <tr>
                            <td colSpan="4" className="text-center py-4">
                                <span className="spinner-border spinner-border-lg align-center"></span>
                            </td>
                        </tr>
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );

}