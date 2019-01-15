import axios from "axios";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setAuthToken from "../utils/setAuthToken";

export const registerUser = (newUser, history) => dispatch => {
  axios
    .post("/api/users/register", newUser, {
      proxy: {
        host: "192.168.1.1",
        port: 3128
      }
    })
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const loginUser = user => dispatch => {
  axios
    .post("/api/users/login", user, {
      proxy: { host: "192.168.1.1", port: 3128 }
    })
    .then(res => {
      const { token } = res.data;
      console.log("came here" + res.data);
      //save token to local storage
      localStorage.setItem("jwtToken", token);
      //setting token to axios header for further communications
      setAuthToken(token);
      //dispatch the current user details to store
      //decode token to get user data
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const logoutUser = () => dispatch => {
  //remove token from local storage
  localStorage.removeItem("jwtToken");
  //remove axios header
  setAuthToken(false);
  //set isAuthenticated to false and user to {}
  dispatch(setCurrentUser({}));
};
