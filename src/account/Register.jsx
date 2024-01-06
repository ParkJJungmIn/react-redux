import {useDispatch} from "react-redux";
import * as Yup from 'yup';
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";
import {Link} from "react-router-dom";
// import { userActions, alertActions } from '_store';
// import { history } from '_helpers';
import {userActions , alertActions} from "../_store/index.js";
import {history} from "../_helpers/index.js";

export { Register }
function Register() {
    const dispatch = useDispatch();

    // form validation rules
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required('email is required'),
        name: Yup.string()
            .required('name is required'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    async function onSubmit(data) {
        dispatch(alertActions.clear());
        try {
            await dispatch(userActions.register(data)).unwrap();

            // redirect to login page and display success alert
            history.navigate('/account/login');
            dispatch(alertActions.success({ message: 'Registration successful', showAfterRedirect: true }));
        } catch (error) {
            dispatch(alertActions.error(error));
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen"
             style={{
                 backgroundImage: "url(/login2.png)",
                 backgroundPosition: 'center',
                 backgroundSize: 'cover',
                 backgroundRepeat: 'no-repeat'
             }}>
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg overflow-hidden p-6">
                <h4 className="mb-6 text-center text-2xl font-bold text-gray-800">회원등록</h4>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* 이메일 필드 */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input name="email" type="text" {...register('email')}
                               className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.email ? 'border-red-500' : ''}`}/>
                        <p className="text-red-500 text-xs italic">{errors.email?.message}</p>
                    </div>
                    {/* 사용자 이름 필드 */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Username
                        </label>
                        <input name="name" type="text" {...register('name')}
                               className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.name ? 'border-red-500' : ''}`}/>
                        <p className="text-red-500 text-xs italic">{errors.name?.message}</p>
                    </div>
                    {/* 패스워드 필드 */}
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input name="password" type="password" {...register('password')}
                               className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.password ? 'border-red-500' : ''}`}/>
                        <p className="text-red-500 text-xs italic">{errors.password?.message}</p>
                    </div>
                    {/* 등록 버튼 */}
                    <div className="flex items-center justify-between">
                        <button disabled={isSubmitting}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                type="submit">
                            {isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                            Register
                        </button>
                        <Link to="../login"
                              className="inline-block align-baseline font-bold text-sm text-blue-600 hover:text-blue-800">
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}