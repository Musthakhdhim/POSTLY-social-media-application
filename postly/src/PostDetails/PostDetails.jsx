import { Fragment } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"
import { useNavigate, useParams } from "react-router-dom";
import PostCard from "../HomeSection/PostCard";
import { Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { findTwitsById } from "../store/Post/Action";


export default function PostDetails() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { id } = useParams()
    const { twit } = useSelector(store => store.twit)

    useEffect(() => {
        if (id) {
            dispatch(findTwitsById(id))
        }
    }, [id, dispatch])

    const handleBack = () => {
        navigate(-1)
    }


    return (
        <Fragment>
            <section className={`bg-white z-50 flex items-center sticky top-0 bg-opacity-95`}>
                <KeyboardBackspaceIcon className="cursor-pointer" onClick={handleBack} />
                <h1 className="py-5 text-xl font-bold opacity-90 ml-5">Post</h1>
            </section>

            <section>
                {/* <PostCard item={twit?.twit}/> */}
                {twit && <PostCard item={twit} />}
                <Divider sx={{ margin: "2rem 0rem" }} />
            </section>

            <section>
                {/* {twit?.twit?.replyTwits?.map((item)=><PostCard item={item}/>)} */}
                {twit?.replyTwits?.length > 0 ? (
                    twit.replyTwits.map((item) => <PostCard key={item.twitId} item={item} />)
                ) : (
                    <p className="text-center text-gray-500">No replies yet</p>
                )}
            </section>
        </Fragment>
    )
}