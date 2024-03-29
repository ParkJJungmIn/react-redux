import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import * as Yup from 'yup';
// import { userActions, alertActions } from '_store';
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";
import {alertActions, userActions} from "../_store/index.js";
import {history} from "../_helpers/index.js";

export {AddEdit}

function AddEdit() {

    const {id} = useParams();
    const [title, setTitle] = useState();
    const dispatch = useDispatch();
    const user = useSelector(x => x.users?.item);

    // form validation rules
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required('이메일을 입력하세요.'),
        name: Yup.string()
            .required('이름을 입력하세요'),
        password: Yup.string()
            .transform(x => x === '' ? undefined : x)
            // password optional in edit mode
            .concat(id ? null : Yup.string().required('Password is required'))
            .min(6, 'Password must be at least 6 characters')
    });

    const formOptions = {resolver: yupResolver(validationSchema)}

    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    useEffect(() => {
        if (id) {
            setTitle('Edit User');
            // fetch user details into redux state and
            // populate form fields with reset()
            dispatch(userActions.getById(id)).unwrap()
                .then(user => reset(user));
        } else {
            setTitle('Add User');
        }
    }, []);

    async function onSubmit(data) {
        dispatch(alertActions.clear());
        try {
            // create or update user based on id param
            let message;
            if (id) {
                await dispatch(userActions.update({ id, data })).unwrap();
                message = 'User updated';
            } else {
                await dispatch(userActions.register(data)).unwrap();
                message = 'User added';
            }

            // redirect to user list with success message
            history.navigate('/users');
            dispatch(alertActions.success({ message, showAfterRedirect: true }));
        } catch (error) {
            dispatch(alertActions.error(error));
        }
    }


    return (
        <>
            <h1>{title}</h1>
            {!(user?.loading || user?.error) &&
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        <div className="mb-3 col">
                            <label className="form-label">Email</label>
                            <input name="email" type="text" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.email?.message}</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="mb-3 col">
                            <label className="form-label">Name</label>
                            <input name="name" type="text" {...register('name')} className={`form-control ${errors.name ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.name?.message}</div>
                        </div>
                        <div className="mb-3 col">
                            <label className="form-label">
                                Password
                                {id && <em className="ml-1">(Leave blank to keep the same password)</em>}
                            </label>
                            <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.password?.message}</div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <button type="submit" disabled={isSubmitting} className="btn btn-primary me-2">
                            {isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                            Save
                        </button>
                        <button onClick={() => reset()} type="button" disabled={isSubmitting} className="btn btn-secondary">Reset</button>
                        <Link to="/users" className="btn btn-link">Cancel</Link>
                    </div>
                </form>
            }
            {user?.loading &&
                <div className="text-center m-5">
                    <span className="spinner-border spinner-border-lg align-center"></span>
                </div>
            }
            {user?.error &&
                <div className="text-center m-5">
                    <div className="text-danger">Error loading user: {user.error}</div>
                </div>
            }
        </>
    );

}
