
// import{ store, authActions } from '_store';

import {authActions, store} from "../_store/index.js";

export const fetchWrapper = {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE')
}

function request(method){
    return(url, body) =>{
        const requestOptions ={
            method,
            headers : authHeader(url)
        };
        if (body){
            requestOptions.headers['Content-Type'] = 'application/json';
            requestOptions.body = JSON.stringify(body);
        }
        return fetch(url, requestOptions).then(handleResponse);
    }
}

function authHeader(url){
    const token = authToken();
    const isLogIn = !!token;
    // const isApiUrl = url.startsWith(import.meta.env.VITE_APP_API_URL);
    const isApiUrl = url.startsWith("/api");
    console.log(isLogIn, isApiUrl, token, url);
    if( isLogIn && isApiUrl ){
        console.log('여기')
        return{ Authorization: `Bearer ${token}`}
    }else{
        return {}
    }
}

function authToken(){
    return store.getState().auth.value?.token;
}

async function handleResponse(response){
    const isJson = response.headers?.get('content-type')?.includes('application/json');
    const data = isJson ? await response.json() : null;

    if(!response.ok){
        if([401,403].includes(response.status) && authToken()  ){
            const logout = () => store.dispatch(authActions.logout());
            logout();
        }
        const error = (data && data.message) || response.status;
        return Promise.reject(error)
    }
    return data;
}