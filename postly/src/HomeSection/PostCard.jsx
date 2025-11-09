import RepeatIcon from "@mui/icons-material/Repeat"
import { useNavigate } from "react-router-dom"
import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import { useState } from "react";
import  ChatBubbleOutlineIcon  from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import  FileUploadIcon from "@mui/icons-material/FileUpload";
import  BarChartIcon  from "@mui/icons-material/BarChart";
import  FavoriteIcon  from "@mui/icons-material/Favorite";
import { FavoriteOutlined } from "@mui/icons-material";
import ReplyModal from "../models/ReplyModal";


export default function PostCard() {

    const navigate = useNavigate()
    
        const [anchorEl, setAnchorEl] = useState(null);

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
            console.log("handle crete retweet")
        }

        const handleLiketweet=()=>{
            console.log("hanlde like twit")
        }

    return (
        <div className="border-b border-gray-300 py-4">
            {/* <div className="flex items-center font-semibold text-gray-700 py-2">
                <RepeatIcon />
                <p>You retweet</p>
            </div> */}

            <div className="flex space-x-5">
                <Avatar onClick={() => navigate(`/profile/${6}`)} className="cursor-pointer" alt="username" src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_960_720.png" />

                <div className="w-full">
                    <div className="flex justify-between items-center">
                        <div className="flex cursor-pointer items-center space-x-2">
                            <span className="font-semibold">Musthakhdhim</span>
                            <span className="text-gray-600 text-sm">@musthak .2m</span>
                            <img alt="verifed"
                                className="ml-2 w-5 h-5"
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/2048px-Twitter_Verified_Badge.svg.png" />
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
                        <div onClick={()=>navigate(`/post/${3}`)} className="cursor-pointer">
                            <p className="mb-2 text-left"> look amazing</p>
                            {/* <img className="w-[28rem] border border-gray-300 p-5 rounded-md" */}
                            <img className="w-[28rem] border border-gray-300 rounded-md"
                            src="https://th.bing.com/th/id/OIP.A2_1JTIiA6lXhcsM9cjoWwHaHa?o=7&cb=ucfimgc2rm=3&rs=1&pid=ImgDetMain&o=7&rm=3"/>
                        </div>
                        <div className="py-4 flex flex-wrap justify-between items-center">
                            <div className="space-x-2 flex items-center text-gray-600">
                                <ChatBubbleOutlineIcon className="cursor-pointer" onClick={handleOpenReplyModel}/>
                                <p>56</p>
                            </div>

                            <div className={`${true?"text-pink-600":"text-gray-600"} space-x-3 flex items-center`}>
                                <RepeatIcon className="cursor-pointer" onClick={handleCreateRetweet}/>
                                <p>78</p>
                            </div>

                            <div className={`${true?"text-pink-600":"text-gray-600"} space-x-3 flex items-center`}>
                                {true?<FavoriteIcon className="cursor-pointer" onClick={handleLiketweet}/>
                                :<FavoriteOutlined className="cursor-pointer" onClick={handleLiketweet}/>}
                                <p>78</p>
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
                <ReplyModal open={openReplyModal} handleClose={handleCloseReplyModal}/>
            </section>
        </div>
    )
}