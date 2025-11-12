import axios from "axios"
import { api, API_BASED_URL } from "../../config/api"
import { FIND_USER_BY_ID_FAILURE, FIND_USER_BY_ID_SUCCESS, FOLLOW_USER_FAILURE, FOLLOW_USER_SUCCESS, GET_USER_PROFILE_FAILURE, GET_USER_PROFILE_REQUEST, GET_USER_PROFILE_SUCCESS, LOGIN_USER_FAILURE, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGOUT, REGISTER_USER_FAILURE, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, UPDATE_USER_FAILURE, UPDATE_USER_SUCCESS } from "./ActionType"


export const registerUser = (registerData) => async (dispatch) => {
  dispatch({ type: REGISTER_USER_REQUEST });
  try {
    const { data } = await axios.post(`${API_BASED_URL}/auth/signup`, registerData);
    dispatch({ type: REGISTER_USER_SUCCESS, payload: data });
    return data; // ✅ Return so `await` works in SignupForm
  } catch (error) {
    dispatch({ type: REGISTER_USER_FAILURE, payload: error.message });
    throw error; // ✅ Throw so catch works
  }
};


export const loginUser = (loginData) => async (dispatch) => {
  dispatch({ type: LOGIN_USER_REQUEST });
  try {
    const { data } = await axios.post(`${API_BASED_URL}/auth/login`, loginData);
    console.log("Login response:", data);

    // ✅ Check token in correct location
    // const token = data.response?.token || data.token;
        const token = data.token;

    if (token) {
      localStorage.setItem("jwt", token);
      console.log("Token stored in localStorage:", token);
    } else {
      console.warn("No token found in response");
    }

    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: {
        user: {
          id: data.id,
          username: data.username,
          roles: data.roles
        },
        token: token
      }
    });

    return data; // ✅ Important for await in SigninForm
  } catch (error) {
    dispatch({ type: LOGIN_USER_FAILURE, payload: error.message });
    throw error; // ✅ So catch works
  }
};


export const getUserProfile = () => async (dispatch) => {
  dispatch({ type: GET_USER_PROFILE_REQUEST });
  try {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) throw new Error("JWT not found in localStorage");

    const { data } = await axios.get(`${API_BASED_URL}/users/profile`, {
      headers: { Authorization: `Bearer ${jwt}` }
    });

    dispatch({ type: GET_USER_PROFILE_SUCCESS, payload: data });
    return data;
  } catch (error) {
    dispatch({ type: GET_USER_PROFILE_FAILURE, payload: error.message });
    throw error;
  }
};


export const logout = () => async (dispatch) => {
  localStorage.removeItem("jwt");
  dispatch({ type: LOGOUT });
};


export const findUserById = (userId) => async (dispatch) => {
  try {
    
    const { data } = await api.get(`/users/${userId}`);
    console.log("find user by id", data);
    dispatch({ type: FIND_USER_BY_ID_SUCCESS, payload: data });
    return data;
  } catch (error) {
    dispatch({ type: FIND_USER_BY_ID_FAILURE, payload: error.message });
    console.log("find user by id" ,error)
  }
};


// export const updateUserProfile = (reqData) => async (dispatch) => {
//   try {
    
//     const { data } = await api.put(`/users/update`, reqData);
//     console.log("update user", data);
//     dispatch({ type: UPDATE_USER_SUCCESS, payload: data });
//     return data;
//   } catch (error) {
//     dispatch({ type: UPDATE_USER_FAILURE, payload: error.message });
//     console.log("update user" ,error)
//   }
// };

export const updateUserProfile = (reqData) => async (dispatch) => {
  try {
    const formData = new FormData();
    Object.keys(reqData).forEach((key) => {
      if (reqData[key]) {
        formData.append(key, reqData[key]);
      }
    });

    const { data } = await api.put(`/users/update`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    dispatch({ type: UPDATE_USER_SUCCESS, payload: data });
    return data;
  } catch (error) {
    dispatch({ type: UPDATE_USER_FAILURE, payload: error.message });
    throw error;
  }
};

export const followUserAction = (userId) => async (dispatch) => {
  try {
    
    const { data } = await api.put(`/users/${userId}/follow`);
    console.log("followed user", data);
    dispatch({ type: FOLLOW_USER_SUCCESS, payload: data });
    return data;
  } catch (error) {
    dispatch({ type: FOLLOW_USER_FAILURE, payload: error.message });
    console.log("followed user" ,error)
  }
};

























// export const registerUser = (registerData) => async (dispatch) => {
//   dispatch({ type: REGISTER_USER_REQUEST });
//   try {
//     const { data } = await axios.post(`${API_BASED_URL}/auth/signup`, registerData);
//     dispatch({ type: REGISTER_USER_SUCCESS, payload: data });
//     return data; // ✅ Return so `await` works
//   } catch (error) {
//     dispatch({ type: REGISTER_USER_FAILURE, payload: error.message });
//     throw error; // ✅ Throw so catch works
//   }
// };




// export const loginUser = (loginData) => async (dispatch) => {
//   dispatch({ type: LOGIN_USER_REQUEST });
//   try {
//     const { data } = await axios.post(`${API_BASED_URL}/auth/login`, loginData);
//     console.log("hello from login",data);
//     console.log("token is: ",data.token)


//     if (data.token) {
//       localStorage.setItem("jwt", data.token);
      
//     }

//     dispatch({
//       type: LOGIN_USER_SUCCESS,
//       payload: {
//         user: {
//           id: data.response.id,
//           username: data.response.username,
//           roles: data.response.roles
//         },
//         token: data.response.token
//       }
//     });
//     console.log(data)
//     return data
//   } catch (error) {
//     dispatch({ type: LOGIN_USER_FAILURE, payload: error.message });
//   }
// };

// export const getUserProfile = () => async (dispatch) => {
//   dispatch({ type: GET_USER_PROFILE_REQUEST });
//   try {
//     const jwt = localStorage.getItem("jwt");
//     const { data } = await axios.get(`${API_BASED_URL}/users/profile`, {
//       headers: {
//         Authorization: `Bearer ${jwt}`
//       }
//     });
//     dispatch({ type: GET_USER_PROFILE_SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({ type: GET_USER_PROFILE_FAILURE, payload: error.message });
//   }
// };





// export const logout = () => async (dispatch) => {
//   localStorage.removeItem("jwt");
//   dispatch({ type: LOGOUT });
// };



// export const logout=()=>async(dispatch)=>{
    
//         localStorage.removeItem("jwt")
//         dispatch({
//             type:LOGOUT,
//             payload:null
//         })

// }






// export const registerUser=(registerData)=>async(dispatch)=>{
//     try {
//         const {data}=await axios.post(`${API_BASED_URL}/auth/signup`,registerData)
//         console.log("registered user",registerData)

//         dispatch({
//             type:REGISTER_USER_SUCCESS,
//             payload:data
//         })
//     } catch (error) {
//         console.log("error ",error)
//         dispatch({type:REGISTER_USER_FAILURE, payload:error.message})
//     }
// }




































// export const loginUser=(loginData)=>async(dispatch)=>{
//     try {
//         const {data}=await axios.post(`${API_BASED_URL}/auth/login`,loginData)
//         console.log("logged in user",loginData)

//         if(data.jwt){
//             localStorage.setItem("jwt", data.jwt)

//         }
//         dispatch({
//             type:LOGIN_USER_SUCCESS,
//             payload:data.jwt
//         })
//     } catch (error) {
//         console.log("error ",error)
//         dispatch({type:LOGIN_USER_FAILURE, payload:error.message})
//     }
// }




// export const getUserProfile=(jwt)=>async(dispatch)=>{
//     try {
//         const {data}=await axios.get(`${API_BASED_URL}/users/profile`,{
//             headers:{
//                 "Authorization":`Bearer ${jwt}`
//             }
//         })
        
//         dispatch({
//             type:GET_USER_PROFILE_SUCCESS,
//             payload:data
//         })
//     } catch (error) {
//         console.log("error ",error)
//         dispatch({type:GET_USER_PROFILE_FAILURE, payload:error.message})
//     }
// }