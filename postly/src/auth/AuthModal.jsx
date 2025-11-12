import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import SigninForm from './SigninForm';
import SignupForm from './SignupForm';
import { useLocation, useNavigate } from 'react-router-dom';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    outline: "none"
};

export default function AuthModal({ open, handleClose }) {

    const location = useLocation()
    const navigate = useNavigate()

    const handleNavigate = () => {
        const path = location.pathname === "/signup" ? "/signin" : "/signup"
        navigate(path)
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    
                    <h1 className="text-center font-bold text-3xl mb-6">
                        Create your account
                    </h1>

                    {/* Form Component */}
                    <div className="space-y-6">
                        {location.pathname === "/signup" ? <SignupForm handleCloseAuthModal={handleClose}/> : <SigninForm handleCloseAuthModal={handleClose}/>}
                    </div>

                    {/* Text Below Form */}
                    <h6 className="text-center mt-6 mb-4 font-semibold text-gray-500">
                        {location.pathname === "/signup"
                            ? "Already have Account?"
                            : "If you don't have an account"}
                    </h6>

                    {/* Button */}
                    <Button
                        variant="outlined"
                        onClick={handleNavigate}
                        sx={{ borderRadius: "29px", py: "15px" }}
                        fullWidth
                    >
                        {location.pathname === "/signup" ? "SIGNIN" : "SIGNUP"}
                    </Button>
                </Box>
            </Modal>
        </div>
    );
}



















{/* <h1 className='text-center font-bold text-3xl pb-10 '>
                        Create your account
                    </h1>        
                    {location.pathname==="/signup"?<SignupForm/>:<SigninForm/>}    
                    <h6 className='text-center py-5 font-semibold text-gray-500'>
                        {location.pathname==="/signup"?"Already have Account":"if you don't have account"}   
                    </h6>        

                    <Button variant='outlined' onClick={handleNavigate}
                    sx={{borderRadius:"29px", py:"15px"}} fullWidth>
                        {location.pathname==="/signup"?"signin":"signup"} 
                    </Button> */}