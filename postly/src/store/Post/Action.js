import { api } from "../../config/api"
import { FIND_TWEET_BY_ID_FAILURE, FIND_TWEET_BY_ID_SUCCESS, GET_ALL_TWEETS_FAILURE, GET_ALL_TWEETS_REQUEST, GET_ALL_TWEETS_SUCCESS, GET_USERS_TWEET_FAILURE, GET_USERS_TWEET_SUCCESS, LIKE_TWEET_FAILURE, LIKE_TWEET_SUCCESS, REPLY_TWEET_FAILURE, REPLY_TWEET_SUCCESS, RETWEET_FAILURE, RETWEET_SUCCESS, TWEET_CREATE_FAILURE, TWEET_CREATE_SUCCESS, TWEET_DELETE_FAILURE, TWEET_DELETE_SUCCESS, USER_LIKE_TWEET_FAILURE, USER_LIKE_TWEET_SUCCESS } from "./ActionType"

export const getAllTweets = () => async (dispatch) => {

    try {
        const { data } = await api.get("/twits/")
        console.log("get all data", data)
        dispatch({ type: GET_ALL_TWEETS_SUCCESS, payload: data })
    } catch (error) {
        console.log("get all twits", error)
        dispatch({ type: GET_ALL_TWEETS_FAILURE, payload: error.message })
    }
}

export const getUsersTweet = (userId) => async (dispatch) => {

    try {
        const { data } = await api.get(`/twits/user/${userId}`)
        console.log("get user twits", data)
        dispatch({ type: GET_USERS_TWEET_SUCCESS, payload: data })
    } catch (error) {
        console.log("get user twits-error", error)
        dispatch({ type: GET_USERS_TWEET_FAILURE, payload: error.message })
    }
}

export const findTwitsByLikeContainUser = (userId) => async (dispatch) => {

    try {
        const { data } = await api.get(`/twits/user/${userId}/likes`)
        console.log("get user liked twits", data)
        dispatch({ type: USER_LIKE_TWEET_SUCCESS, payload: data })
    } catch (error) {
        console.log("get user liked twits-error", error)
        dispatch({ type: USER_LIKE_TWEET_FAILURE, payload: error.message })
    }
}

export const findTwitsById = (twitId) => async (dispatch) => {

    try {
        const { data } = await api.get(`/twits/${twitId}`)
        console.log("find twits by id", data)
        dispatch({ type: FIND_TWEET_BY_ID_SUCCESS, payload: data })
    } catch (error) {
        console.log("find twits by id", error)
        dispatch({ type: FIND_TWEET_BY_ID_FAILURE, payload: error.message })
    }
}

// export const createTweets=(tweetData)=>async(dispatch)=>{

//     try {
//         const {data}=await api.post(`/twits/create`, tweetData)
//         console.log("create tweet",data)
//         dispatch({type:TWEET_CREATE_SUCCESS, payload:data})
//     } catch (error) {
//         console.log("create tweet", error)
//         dispatch({type:TWEET_CREATE_FAILURE, payload:error.message})
//     }
// }
// ==========================================================

export const createTweets = (tweetData) => async (dispatch) => {
    dispatch({ type: "TWEET_CREATE_REQUEST" });

    try {
        const { data } = await api.post("/twits/create", tweetData, {
            headers: {
                // Do NOT set Content-Type manually; Axios handles it for FormData
            },
        });

        dispatch({ type: "TWEET_CREATE_SUCCESS", payload: data });
    } catch (error) {
        dispatch({ type: "TWEET_CREATE_FAILURE", payload: error.message });
    }
};

// export const createTweetReply=(tweetData)=>async(dispatch)=>{

//     try {
//         const {data}=await api.post(`/twits/reply`, tweetData)
//         console.log("reply tweet",data)
//         dispatch({type:REPLY_TWEET_SUCCESS, payload:data})
//     } catch (error) {
//         console.log("reply tweet", error)
//         dispatch({type:REPLY_TWEET_FAILURE, payload:error.message})
//     }
// }

export const createTweetReply = (tweetData) => async (dispatch) => {
    dispatch({ type: "REPLY_TWEET_REQUEST" }); // optional loading state

    try {
        const formData = new FormData();

        // Append JSON as Blob
        const jsonBlob = new Blob([JSON.stringify({
            content: tweetData.content,
            twitId: tweetData.twitId
        })], { type: "application/json" });

        formData.append("req", jsonBlob); // matches @RequestPart TwitReplyRequest req
        if (tweetData.image) {
            formData.append("image", tweetData.image); // matches @RequestPart MultipartFile image
        }

        const { data } = await api.post("/twits/reply", formData, {
            headers: {
                // Do NOT set Content-Type manually; Axios will handle it
            }
        });

        dispatch({ type: "REPLY_TWEET_SUCCESS", payload: data });
    } catch (error) {
        dispatch({ type: "REPLY_TWEET_FAILURE", payload: error.message });
    }
};


export const createReTweet = (twitId) => async (dispatch) => {

    try {
        const { data } = await api.put(`/twits/${twitId}/retweet`)
        console.log("retweet", data)
        dispatch({ type: RETWEET_SUCCESS, payload: data })
    } catch (error) {
        console.log("retweet", error)
        dispatch({ type: RETWEET_FAILURE, payload: error.message })
    }
}


export const likeTweet = (twitId) => async (dispatch) => {

    try {
        const { data } = await api.post(`/${twitId}/likes`)
        console.log("like tweet", data)
        dispatch({ type: LIKE_TWEET_SUCCESS, payload: data })
    } catch (error) {
        console.log("like tweet", error)
        dispatch({ type: LIKE_TWEET_FAILURE, payload: error.message })
    }
}


export const deleteTweet = (twitId) => async (dispatch) => {

    try {
        const { data } = await api.delete(`twits/${twitId}`)
        console.log("deleted tweet", data)
        dispatch({ type: TWEET_DELETE_SUCCESS, payload: twitId })
    } catch (error) {
        console.log("deleted tweet", error)
        dispatch({ type: TWEET_DELETE_FAILURE, payload: error.message })
    }
}

