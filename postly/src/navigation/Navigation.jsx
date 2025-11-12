import { useNavigate } from "react-router-dom";
import { navigationMenu } from "./Navigation";
import { Avatar } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import store from "../store/Store";
import { logout } from "../store/Auth/Action";

export default function Navigation() {

    const navigate = useNavigate()
    const { auth } = useSelector(store => store)
    const dispatch = useDispatch()



    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        console.log("logout")
        handleClose()
        dispatch(logout())
        navigate("/signin");
    }
    return (
        <div className="h-screen top-0 pt-5">
            <div>
                {/* logo
                <div className="py-5">
                </div> */}
                <div className="space-y-4">
                    {navigationMenu.map((item)=>
                        <div className="cursor-pointer flex space-x-3 item-center"
                        onClick={()=> item.title==="Profile"?navigate(`/profile/${5}`):navigate(item.path)}>
                            {item.icon}
                            <p className="text-s">{item.title}</p>
                        </div>
                    )}
                </div>
                <div className="py-7">
                    <Button variant="contained" sx={{width:"100%", borderRadius:"29px", color:"white", py:"15px", bgcolor:"Green"}}>Post</Button>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <Avatar src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_960_720.png"/>
                    <div>
                        <p>{auth.user?.username}</p>
                        <span className="opacity-70">@{auth.user?.username}</span>
                    </div>
                    <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                      <MoreHorizIcon/>

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
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>

                    </Menu>
                </div>
            </div>
        </div>

        
    )
}


























// <div className="h-screen flex flex-col justify-between bg-white border-r border-gray-200">
        //     {/* Top Section */}
        //     <div className="flex flex-col overflow-y-auto px-4 py-5">
        //         {/* Logo */}
        //         <div className="mb-6">
        //             <h1 className="text-2xl font-bold text-green-600">Postly</h1>
        //         </div>

        //         {/* Navigation Menu */}
        //         <nav className="space-y-4">
        //             {navigationMenu.map((item) => (
        //                 <div
        //                     key={item.title}
        //                     className="cursor-pointer flex items-center space-x-3 hover:bg-gray-100 rounded-lg px-3 py-2 transition"
        //                     onClick={() =>
        //                         item.title === "Profile"
        //                             ? navigate(`/profile/${auth.user?.id}`)
        //                             : navigate(item.path)
        //                     }
        //                 >
        //                     <span className="text-xl">{item.icon}</span>
        //                     <p className="text-base font-medium">{item.title}</p>
        //                 </div>
        //             ))}
        //         </nav>

        //         {/* Post Button */}
        //         <div className="mt-6">
        //             <Button
        //                 variant="contained"
        //                 sx={{
        //                     width: "100%",
        //                     borderRadius: "30px",
        //                     color: "white",
        //                     py: "12px",
        //                     bgcolor: "green",
        //                     fontWeight: "bold",
        //                 }}
        //             >
        //                 Post
        //             </Button>
        //         </div>
        //     </div>

        //     {/* Bottom Profile Section */}
        //     <div className="border-t border-gray-200 px-4 py-3 flex items-center justify-between">
        //         <div className="flex items-center space-x-3">
        //             <Avatar
        //                 src={auth.user?.image || "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_960_720.png"}
        //                 sx={{ width: 40, height: 40 }}
        //             />
        //             <div>
        //                 <p className="font-semibold">{auth.user?.username}</p>
        //                 <span className="text-gray-500 text-sm">@{auth.user?.username}</span>
        //             </div>
        //         </div>
        //         <Button
        //             id="basic-button"
        //             aria-controls={open ? "basic-menu" : undefined}
        //             aria-haspopup="true"
        //             aria-expanded={open ? "true" : undefined}
        //             onClick={handleClick}
        //         >
        //             <MoreHorizIcon />
        //         </Button>
        //         <Menu
        //             id="basic-menu"
        //             anchorEl={anchorEl}
        //             open={open}
        //             onClose={handleClose}
        //             slotProps={{
        //                 list: {
        //                     "aria-labelledby": "basic-button",
        //                 },
        //             }}
        //         >
        //             <MenuItem onClick={handleLogout}>Logout</MenuItem>
        //         </Menu>
        //     </div>
        // </div>


        // <div className="h-screen flex flex-col justify-between bg-white border-r border-gray-200 px-4 py-5">
        //     {/* Top Section */}
        //     <div>
        //         {/* Logo */}
        //         <div className="mb-6">
        //             <h1 className="text-2xl font-bold text-green-600">Postly</h1>
        //         </div>

        //         {/* Navigation Menu */}
        //         <nav className="space-y-4">
        //             {navigationMenu.map((item) => (
        //                 <div
        //                     key={item.title}
        //                     className="cursor-pointer flex items-center space-x-3 hover:bg-gray-100 rounded-lg px-3 py-2 transition"
        //                     onClick={() =>
        //                         item.title === "Profile"
        //                             ? navigate(`/profile/${auth.user?.id}`)
        //                             : navigate(item.path)
        //                     }
        //                 >
        //                     <span className="text-xl">{item.icon}</span>
        //                     <p className="text-base font-medium">{item.title}</p>
        //                 </div>
        //             ))}
        //         </nav>

        //         {/* Post Button */}
        //         <div className="mt-6">
        //             <Button
        //                 variant="contained"
        //                 sx={{
        //                     width: "100%",
        //                     borderRadius: "30px",
        //                     color: "white",
        //                     py: "12px",
        //                     bgcolor: "green",
        //                     fontWeight: "bold",
        //                 }}
        //             >
        //                 Post
        //             </Button>
        //         </div>
        //     </div>

        //     {/* Bottom Profile Section */}
        //     <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
        //         <div className="flex items-center space-x-3">
        //             <Avatar
        //                 src={auth.user?.image || "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_960_720.png"}
        //                 sx={{ width: 40, height: 40 }}
        //             />
        //             <div>
        //                 <p className="font-semibold">{auth.user?.username}</p>
        //                 <span className="text-gray-500 text-sm">@{auth.user?.username}</span>
        //             </div>
        //         </div>
        //         <Button
        //             id="basic-button"
        //             aria-controls={open ? "basic-menu" : undefined}
        //             aria-haspopup="true"
        //             aria-expanded={open ? "true" : undefined}
        //             onClick={handleClick}
        //         >
        //             <MoreHorizIcon />
        //         </Button>
        //         <Menu
        //             id="basic-menu"
        //             anchorEl={anchorEl}
        //             open={open}
        //             onClose={handleClose}
        //             slotProps={{
        //                 list: {
        //                     "aria-labelledby": "basic-button",
        //                 },
        //             }}
        //         >
        //             <MenuItem onClick={handleLogout}>Logout</MenuItem>
        //         </Menu>
        //     </div>
        // </div>