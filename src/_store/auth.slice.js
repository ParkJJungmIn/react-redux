import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {alertActions} from "./alert.slice.js";
import {fetchWrapper, history} from "../_helpers/index.js";

// import { alertActions } from '';
// import { history, fetchWrapper } from '_helpers';


// create slice

const name = 'auth';
const initialState = createInitialState();
const reducers = createReducers();
const extraActions = createExtraActions();
const slice = createSlice({ name, initialState, reducers });

// exports

export const authActions = { ...slice.actions, ...extraActions };
export const authReducer = slice.reducer;

// implementation

function createInitialState() {
    return {
        // initialize state from local storage to enable user to stay logged in
        value: JSON.parse(localStorage.getItem('auth'))
    }
}

function createReducers() {
    return {
        setAuth
    };

    function setAuth(state, action) {
        state.value = action.payload;
    }
}

function createExtraActions() {
    const baseUrl = `${import.meta.env.VITE_APP_API_URL}/api`;
    console.log(baseUrl)

    return {
        login: login(),
        logout: logout()
    };

    function login() {
        return createAsyncThunk(
            `${name}/login`,
            async function ({ email, password }, { dispatch }) {
                dispatch(alertActions.clear());
                try {
                    const user = await fetchWrapper.post(`${baseUrl}/app/auth/login`, { email, password });
                    console.log(user)
                    // set auth user in redux state
                    dispatch(authActions.setAuth(user));

                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('auth', JSON.stringify(user));

                    // get return url from location state or default to home page
                    const { from } = history.location.state || { from: { pathname: '/' } };
                    history.navigate(from);
                } catch (error) {
                    dispatch(alertActions.error(error));
                }
            }
        );
    }

    function logout() {
        return createAsyncThunk(
            `${name}/logout`,
            function (arg, { dispatch }) {
                dispatch(authActions.setAuth(null));
                localStorage.removeItem('auth');
                history.navigate('/account/login');
            }
        );
    }
}