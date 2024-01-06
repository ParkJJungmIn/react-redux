import {useDispatch} from "react-redux";

import * as Yup from 'yup';
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";

// import {authActions } from '_store';
import {Link} from "react-router-dom";
import {authActions} from "../_store/index.js";
// authActions





export {Login};

function Login(){
    const dispatch = useDispatch();

    const validationSchema = Yup.object().shape({
        email: Yup.string().required('사용자 이름 입력'),
        password : Yup.string().required('패스워드 입력 필요')
    })

    const formOptions = { resolve: yupResolver(validationSchema) };

    const { register , handleSubmit, formState} = useForm(formOptions);

    const { errors, isSubmitting} = formState;


    function onSubmit({ email, password }){
        return dispatch(authActions.login({email, password}))
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
                <h4 className="mb-6 text-center text-2xl font-bold text-gray-800">로그인</h4>
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
                    {/* 패스워드 필드 */}
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input name="password" type="password" {...register('password')}
                               className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.password ? 'border-red-500' : ''}`}/>
                        <p className="text-red-500 text-xs italic">{errors.password?.message}</p>
                    </div>
                    {/* 로그인 버튼 */}
                    <div className="flex flex-col sm:flex-row items-center justify-between">
                        <button disabled={isSubmitting}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-full mb-2 sm:mb-0"
                                type="submit">
                            {isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                            Login
                        </button>
                    </div>
                    <Link to="../register"
                          className="inline-block align-baseline font-bold text-sm text-blue-600 hover:text-blue-800 text-right w-full sm:w-auto mt-3">
                        Register
                    </Link>
                </form>
            </div>
        </div>
    );


}