const initialState = {
  profile: null,
  profiles: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "GET_PROFILE":
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case "PROFILE_LOADING":
      return {
        ...state,
        loading: true
      };
    case "PROFILE_NOT_FOUND":
    case "CLEAR_CURRENT_PROFILE":
      return {
        ...state,
        profile: null
      };
    case "GET_PROFILES":
    default:
      return state;
  }
}