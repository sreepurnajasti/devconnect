import axios from "axios";
import { GET_ERRORS } from "./types";

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
