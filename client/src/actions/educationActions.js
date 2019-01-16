import axios from "axios";
import { GET_ERRORS, GET_PROFILE } from "./types";

export const addEducation = (userEdu, history) => dispatch => {
  axios
    .post("/api/profile/education", userEdu, {
      proxy: {
        host: "192.168.1.1",
        port: 3128
      }
    })
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
export const deleteEducation = id => dispatch => {
  axios
    .delete(`/api/profile/education/${id}`, {
      proxy: {
        host: "192.168.1.1",
        port: 3128
      }
    })
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
