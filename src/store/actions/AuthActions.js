import firebase from '../../configs/db';
import { Actions } from 'react-native-router-flux';
import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    RETRY_PASSWORD,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    SIGNUP_USER_SUCCESS,
    SIGNUP_USER,
    SIGNUP_USER_FAIL
} from './types';

export class AuthActions {
    static emailChanged = (text) => {
        console.log("emailChanged", text);
        return {
            type: EMAIL_CHANGED,
            payload: text
        };
    };

    static passwordChanged = (text) => {
        console.log("passwordChanged", text);

        return {
            type: PASSWORD_CHANGED,
            payload: text
        };
    };
    static retryPassword = (text) => {
        console.log("retryPassword", text);

        return {
            type: RETRY_PASSWORD,
            payload: text
        };
    };

    static loginUser = ({ email, password }) => {
        return (dispatch) => {
            dispatch({ type: LOGIN_USER });
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(user => AuthActions.loginUserSuccess(dispatch, user))
                .catch(() => AuthActions.loginUserFail(dispatch))
                
        };
    };

    static loginUserSuccess = (dispatch, user) => {
        dispatch({
            type: LOGIN_USER_SUCCESS,
            payload: user
        });
        Actions.main();
    };

    static loginUserFail = (dispatch) => {
        dispatch({ type: LOGIN_USER_FAIL });
    };


    static signupUser = ({ email, password }) => {
        return (dispatch) => {
            dispatch({ type: SIGNUP_USER });
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(user => AuthActions.signupUserSuccess(dispatch, user))
                .catch(() => AuthActions.signupUserFail(dispatch))
               
        };
    };

    static signupUserSuccess = (dispatch, user) => {
        dispatch({
            type: SIGNUP_USER_SUCCESS,
            payload: user
        });
        Actions.main();
    };

    static signupUserFail = (dispatch) => {
        dispatch({ type: SIGNUP_USER_FAIL });
    };
}