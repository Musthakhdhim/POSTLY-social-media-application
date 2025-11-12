import RepeatIcon from "@mui/icons-material/Repeat"
import { useNavigate } from "react-router-dom"
import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import { useState } from "react";
import  ChatBubbleOutlineIcon  from "@mui/icons-material/ChatBubbleOutline";
import  FileUploadIcon from "@mui/icons-material/FileUpload";
import  BarChartIcon  from "@mui/icons-material/BarChart";
import  FavoriteIcon  from "@mui/icons-material/Favorite";
import { FavoriteOutlined } from "@mui/icons-material";
import ReplyModal from "../models/ReplyModal";
import { useDispatch } from "react-redux";
import { createReTweet, likeTweet } from "../store/Post/Action";


export default function PostCard({item}) {

    const navigate = useNavigate()
    
        const [anchorEl, setAnchorEl] = useState(null);
        const dispatch=useDispatch()

        const [openReplyModal, setOpenReplyModal]=useState(false)
        const handleOpenReplyModel = () => setOpenReplyModal(true);
        const handleCloseReplyModal = () => setOpenReplyModal(false);

        const open = Boolean(anchorEl);
        const handleClick = (event) => {
            setAnchorEl(event.currentTarget);
        };
        
        const handleDelete=()=>{
            console.log("delete post")
            handleClose()
        }

        const handleClose = () => {
            setAnchorEl(null);
        }

        const handleCreateRetweet=()=>{
            dispatch(createReTweet(item?.twitId))
            console.log("handle crete retweet")
        }

        const handleLiketweet=()=>{
            dispatch(likeTweet(item?.twitId))
            console.log("hanlde like twit")
        }

    return (
        <div className="border-b border-gray-300 py-4">
            {/* <div className="flex items-center font-semibold text-gray-700 py-2">
                <RepeatIcon />
                <p>You retweet</p>
            </div> */}

            <div className="flex space-x-5">
                <Avatar onClick={() => navigate(`/profile/${item?.user.userId}`)} className="cursor-pointer" alt="username" 
                // src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_960_720.png"
                src={item?.user.image} 
                />

                <div className="w-full">
                    <div className="flex justify-between items-center">
                        <div className="flex cursor-pointer items-center space-x-2">
                            <span className="font-semibold">{item?.user.username}</span>
                            <span className="text-gray-600 text-sm">@{item?.user.username.split(" ").join("_").toLowerCase()} .2m</span>
                            <img alt="verifed"
                                className="ml-2 w-5 h-5"
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/2048px-Twitter_Verified_Badge.svg.png" 
                                
                                />
                        </div>

                        <div>
                            <Button
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            >
                                <MoreHorizIcon />

                            </Button>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                slotProps={{
                                    list: {
                                        'aria-labelledby': 'basic-button',
                                    },
                                }}
                            >
                                <MenuItem onClick={handleDelete}>Delete</MenuItem>
                                <MenuItem onClick={handleDelete}>Edit</MenuItem>
                            </Menu>
                        </div>
                    </div>

                    <div className="mt-3">
                        <div onClick={()=>navigate(`/post/${item?.twitId}`)} className="cursor-pointer">
                            <p className="mb-2 text-left">{item?.content}</p>
                            {/* <img className="w-[28rem] border border-gray-300 p-5 rounded-md" */}
                            <img className="w-[28rem] border border-gray-300 rounded-md"
                            // src="https://th.bing.com/th/id/OIP.A2_1JTIiA6lXhcsM9cjoWwHaHa?o=7&cb=ucfimgc2rm=3&rs=1&pid=ImgDetMain&o=7&rm=3"
                            src={item?.image}
                            />
                        </div>
                        <div className="py-4 flex flex-wrap justify-between items-center">
                            <div className="space-x-2 flex items-center text-gray-600">
                                <ChatBubbleOutlineIcon className="cursor-pointer" onClick={handleOpenReplyModel}/>
                                <p>{item?.totalReplies}</p>
                            </div>

                            <div className={`${item?.retwit?"text-pink-600":"text-gray-600"} space-x-3 flex items-center`}>
                                <RepeatIcon className="cursor-pointer" onClick={handleCreateRetweet}/>
                                <p>{item?.totalRetweets}</p>
                            </div>

                            <div className={`${item?.liked?"text-pink-600":"text-gray-600"} space-x-3 flex items-center`}>
                                {!item?.liked?<FavoriteIcon className="cursor-pointer" onClick={handleLiketweet}/>
                                :<FavoriteOutlined className="cursor-pointer" onClick={handleLiketweet}/>}
                                <p>{item?.totalLikes}</p>
                            </div>

                            <div className="space-x-3 flex items-center text-gray-600">
                                <BarChartIcon className="cursor-pointer" onClick={handleOpenReplyModel}/>
                                <p>560</p>
                            </div>

                            <div className="space-x-3 flex items-center text-gray-600">
                                <FileUploadIcon className="cursor-pointer" onClick={handleOpenReplyModel}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section>
                <ReplyModal item={item} open={openReplyModal} handleClose={handleCloseReplyModal}/>
            </section>
        </div>
    )
}