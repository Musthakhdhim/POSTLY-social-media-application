import store from "../Store";
import { FIND_USER_BY_ID_SUCCESS, FOLLOW_USER_SUCCESS, GET_USER_PROFILE_FAILURE, GET_USER_PROFILE_REQUEST, GET_USER_PROFILE_SUCCESS, LOGIN_USER_FAILURE, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGOUT, REGISTER_USER_FAILURE, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, UPDATE_USER_SUCCESS } from "./ActionType";


const persistedUser = JSON.parse(localStorage.getItem("user"));
const persistedToken = localStorage.getItem("jwt");

const initialState = {
  user: persistedUser || null,
  selectedUser:null,
  loading: false,
  error: null,
  jwt: persistedToken || null,
  updateUser:false
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
    case REGISTER_USER_REQUEST:
    case GET_USER_PROFILE_REQUEST:
      return { ...state, loading: true, error: null };

    case LOGIN_USER_SUCCESS:
        return{...state, 
          loading:false, 
          error:null, 
          jwt:action.payload.token, 
          user:action.payload.user
        }

    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        // user: action.payload.user,
        // jwt: action.payload.token
      };

    case GET_USER_PROFILE_SUCCESS:
      localStorage.setItem("user", JSON.stringify(action.payload));
      return { ...state, 
        loading: false, 
        error: null, 
        user: action.payload 
      };

    case UPDATE_USER_SUCCESS:
      return { ...state, loading: false, error: null, user: action.payload, updateUser:true };

    case FIND_USER_BY_ID_SUCCESS:
      return { ...state, 
        loading: false, 
        error: null, 
        selectedUser: action.payload };
        // findUser: action.payload };

    case FOLLOW_USER_SUCCESS:
      return { ...state, 
        loading: false, 
        error: null, 
        selectedUser: action.payload };
        // findUser: action.payload };

    case LOGOUT:
      localStorage.removeItem("jwt");
      localStorage.removeItem("user");
      return initialState;

    case LOGIN_USER_FAILURE:
    case REGISTER_USER_FAILURE:
    case GET_USER_PROFILE_FAILURE:
      return { ...state, loading: false, 
        error: action.payload };

    default:
      return state;
  }
};































