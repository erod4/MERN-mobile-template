import { createContext, useEffect, useReducer } from "react";
import {
  DELETE_PROFILE_FAIL,
  DELETE_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILED,
  FETCH_PROFILE_SUCCESS,
  LOADING,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILED,
  REGISTER_SUCCESS,
  RESET_ERROR,
  SEND_RESET_CODE_FAILED,
  UPDATE_PROFILE_SUCCESS,
  VERIFY_RESET_CODE_FAILED,
} from "./AuthContextTypes";

import axios from "react-native-axios";
import { useNavigation } from "@react-navigation/native";

export const authContext = createContext();
const url = process.env.API_URL;
const INITIAL_STATE = {
  userAuth: null,
  error: null,
  loading: false,
  profile: null,
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOADING:
      return {
        ...state,
        loading: payload,
      };
    case LOGIN_SUCCESS:
      //   storeData("userAuth", payload);
      return {
        ...state,
        userAuth: payload,
        error: null,
      };

    case LOGIN_FAILED:
      return { ...state, error: payload, loading: false };
    case REGISTER_SUCCESS:
      return { ...state, userAuth: payload };
    case FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        profile: payload,
      };
    case FETCH_PROFILE_FAILED:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case DELETE_PROFILE_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        profile: null,
        userAuth: null,
      };
    case DELETE_PROFILE_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case RESET_ERROR:
      return {
        ...state,
        error: payload,
      };
    case LOGOUT:
      //clear from storage
      return { ...state, profile: null };
    default:
      return state;
  }
};
const AuthContextProvider = ({ children }) => {
  const navigator = useNavigation();

  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const loginUserAction = async (formData) => {
    const config = { headers: { "Content-Type": "application/json" } };
    try {
      dispatch({ type: LOADING, payload: true });
      const res = await axios.post(`${url}users/login`, formData, config);
      if (res?.data?.status == "Success") {
        dispatch({ type: LOGIN_SUCCESS, payload: res.data });
        navigator.navigate("main");
      }

      dispatch({ type: LOADING, payload: false });
    } catch (error) {
      console.log(error?.response?.data?.message);
      dispatch({ type: LOGIN_FAILED, payload: error?.response?.data?.message });
    }
  };
  const registerUserAction = async (formData) => {
    const config = { headers: { "Content-Type": "application/json" } };
    try {
      dispatch({ type: LOADING, payload: true });
      const res = await axios.post(`${url}users/register`, formData, config);

      if (res?.data?.status == "Success") {
        dispatch({ type: REGISTER_SUCCESS, payload: res.data });

        navigator.navigate("main");
      }

      dispatch({ type: LOADING, payload: false });
    } catch (error) {
      dispatch({ type: LOADING, payload: false });

      dispatch({
        type: REGISTER_FAILED,
        payload: error?.response?.data?.message,
      });
    }
  };
  const sendResetCode = async (email) => {
    const config = { headers: { "Content-Type": "application/json" } };
    console.log("email from reset code: ", email);

    try {
      dispatch({ type: LOADING, payload: true });
      //   console.log(url);
      //   const res = await axios.post(`${url}/users/login`, formData, config);
      //   if (res?.data?.status == "Success") {
      //     dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      //   }

      dispatch({ type: LOADING, payload: false });
    } catch (error) {
      dispatch({
        type: SEND_RESET_CODE_FAILED,
        payload: error?.response?.data?.message,
      });
    }
  };
  const verifyResetCode = async (resetCode) => {
    const config = { headers: { "Content-Type": "application/json" } };
    console.log("Verify reset code: ", resetCode);

    try {
      dispatch({ type: LOADING, payload: true });
      //   console.log(url);
      //   const res = await axios.post(`${url}/users/login`, formData, config);
      //   if (res?.data?.status == "Success") {
      //     dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      //   }

      dispatch({ type: LOADING, payload: false });
    } catch (error) {
      console.log(error);
      console.log(error?.response?.data?.message);
      dispatch({
        type: VERIFY_RESET_CODE_FAILED,
        payload: error?.response?.data?.message,
      });
    }
  };
  const getUserAction = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state?.userAuth?.token}`,
      },
    };
    try {
      dispatch({ type: LOADING, payload: true });

      const res = await axios.get(`${url}users/`, config);
      console.log(res.data);

      if (res?.data) {
        dispatch({
          type: FETCH_PROFILE_SUCCESS,
          payload: res.data,
        });
      }
      dispatch({ type: LOADING, payload: false });
    } catch (error) {
      dispatch({
        type: FETCH_PROFILE_FAILED,
        payload: error?.response?.data?.message,
      });
      dispatch({ type: LOADING, payload: false });
    }
  };
  const updateUserAction = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state?.userAuth?.token}`,
      },
    };
    try {
      dispatch({ type: LOADING, payload: true });

      const res = await axios.put(`${url}users/`, formData, config);

      if (res?.data?.status == "Success") {
        dispatch({
          type: UPDATE_PROFILE_SUCCESS,
          payload: null,
        });
        await getUserAction();
        navigator.navigate("Settings");
      }
      dispatch({ type: LOADING, payload: false });
    } catch (error) {
      dispatch({
        type: UPDATE_PROFILE_SUCCESS,
        payload: error?.response?.data?.message,
      });
      dispatch({ type: LOADING, payload: false });
    }
  };
  //clear error message after 3 seconds
  useEffect(() => {
    if (state?.error) {
      const timer = setTimeout(() => {
        dispatch({ type: RESET_ERROR, payload: null });
      }, 3000); // Clear error after 3 seconds

      return () => clearTimeout(timer); // Cleanup timer if component unmounts
    }
  }, [state?.error]);
  const logoutUserAction = async () => {
    dispatch({ type: LOGOUT, payload: null });
    navigator.navigate("login");
  };
  const deleteUserAction = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state?.userAuth?.token}`,
      },
    };
    try {
      dispatch({ type: LOADING, payload: true });

      const res = await axios.delete(`${url}users/`, config);

      if (res?.data?.status == "Success") {
        dispatch({
          type: DELETE_PROFILE_SUCCESS,
        });
        navigator.navigate("login");
      }
      dispatch({ type: LOADING, payload: false });
    } catch (error) {
      dispatch({
        type: FETCH_PROFILE_FAILED,
        payload: error?.response?.data?.message,
      });
      dispatch({ type: LOADING, payload: false });
    }
  };
  return (
    <authContext.Provider
      value={{
        loginUserAction,
        deleteUserAction,
        logoutUserAction,
        updateUserAction,
        getUserAction,
        registerUserAction,
        sendResetCode,
        verifyResetCode,
        userAuth: state?.userAuth,
        error: state?.error,
        loading: state?.loading,
        profile: state?.profile,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
export default AuthContextProvider;
