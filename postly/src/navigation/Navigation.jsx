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

export default function Navigation(){

    const navigate=useNavigate()  
    const {auth}=useSelector(store=>store)
    const dispatch=useDispatch()



    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout=()=>{
        console.log("logout")
        handleClose()
        dispatch(logout())
    }
    return (
        <div className="h-screen sticky top-0">
            <div>
                {/* logo */}
                <div className="py-5">

                </div>
                <div className="space-y-6">
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
                        <span className="opacity-70">@{auth.user?.username.split(" ").join("_").toLowerCase()}</span>
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