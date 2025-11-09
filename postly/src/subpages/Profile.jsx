import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"
import { Avatar, Box, Button, Tab } from "@mui/material"
import { useNavigate } from "react-router-dom"
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import { TabContext, TabList, TabPanel } from "@mui/lab"
import { useState } from "react"
import PostCard from "../HomeSection/PostCard"
import ProfileModel from "../models/ProfileModel"



export default function Profile() {

    const [tabValue, setTabValue]=useState("1")
    const navigate = useNavigate()

    const [openProfileModal, setOpenProfileModal]=useState(false)
    const handleOpenProfileModel = () => setOpenProfileModal(true);
    const handleClose = () => setOpenProfileModal(false);

    const handleBack = () => {
        navigate(-1)
    }

    

    const handleFollowUser = () => {
        console.log("handle follow user")
    }

    const handleTabChange=(event, newValue)=>{
        setTabValue(newValue)

        if(newValue===4){
            console.log("likes twits")
        }
        else if(newValue===1){
            console.log("user twits")
        }
    }

    return (
        <div>
            <section className={`bg-white z-50 flex items-center sticky top-0 bg-opacity-95`}>
                <KeyboardBackspaceIcon className="cursor-pointer" onClick={handleBack} />
                <h1 className="py-5 text-xl font-bold opacity-90 ml-5">Musthakhdhim</h1>
            </section>

            <section>
                <img className="w-[100%] h-[15rem] object-cover" src="https://cdn.pixabay.com/photo/2021/01/18/17/05/https-pixabay-5928747_1280.jpg" />
            </section>

            <section className="pl-6">
                <div className="flex justify-between items-start mt-5 h-[5rem]">
                    <Avatar alt="musthak" className="transform -translate-y-24"
                        src="https://th.bing.com/th/id/OIP.oo4zwm-3ym1EfY1TAKcbzAHaIA?o=7&cb=ucfimgc2rm=3&rs=1&pid=ImgDetMain&o=7&rm=3"
                        sx={{ width: "10rem", height: "10rem", border: "4px solid white" }} />

                    {true ?
                        <Button onClick={handleOpenProfileModel} variant="contained" sx={{ borderRadius: "20px" }}>Edit Profile</Button> :
                        <Button onClick={handleFollowUser} variant="contained" sx={{ borderRadius: "20px" }}>{true ? "Follow" : "Unfollow"}</Button>
                    }
                </div>

                <div>
                    <div className="flex items-center">
                        <h1 className="font-bold text-lg">Musthakhdhim</h1>
                        {true && (
                            <img alt="verifed"
                                className="ml-2 w-5 h-5"
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/2048px-Twitter_Verified_Badge.svg.png" />
                        )}
                    </div>
                    <h1 className="text-gray-500 text-left">@Musthak</h1>
                </div>
                <div className="mt-2 space-y-3 text-left">
                    <p >Hello good to meet you here</p>
                    <div className="py-1 flex space-x-5">
                        <div className="flex items-center text-gray-500">
                            <BusinessCenterIcon />
                            <p className="ml-2">Education</p>
                        </div>

                        <div className="flex items-center text-gray-500">
                            <LocationOnIcon />
                            <p className="ml-2">India</p>
                        </div>

                        <div className="flex items-center text-gray-500">
                            <CalendarMonthIcon />
                            <p className="ml-2">Joined 2022</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-5">
                        <div className="flex space-x-1 font-semibold">
                            <span>544</span>
                            <span className="text-gray-500">Followers</span>
                        </div>

                        <div className="flex items-center space-x-1 font-semibold">
                            <span>289</span>
                            <span className="text-gray-500">Following</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-5">
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={tabValue}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleTabChange} aria-label="lab API tabs example">
                                <Tab label="posts" value="1" />
                                <Tab label="Replies" value="2" />
                                <Tab label="Media" value="3" />
                                <Tab label="Likes" value="4" />
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            {[1,1,1,1,1].map((item)=><PostCard/>)}
                        </TabPanel>
                        <TabPanel value="2">Users replies</TabPanel>
                        <TabPanel value="3">Media</TabPanel>
                        <TabPanel value="4">Likes</TabPanel>
                    </TabContext>
                </Box>
            </section>

            <section>
                <ProfileModel handleClose={handleClose} open={openProfileModal}/>
            </section>
        </div>
    )
}