import { Button, Grid } from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import AuthModal from "./AuthModal";
import { useState } from "react";

export default function Authentication(){

    const [openAuthModal, setOpenAuthModal] = useState(false);
  const handleOpenAuthModal = () => setOpenAuthModal(true);
  const handleCloseAuthModal = () => setOpenAuthModal(false);

    return (
        <div>
            <Grid className="overflow-y-hidden" container>
                <Grid className="hidden lg:block" item lg={7}>
                    {/* <img src="https://static.wixstatic.com/media/21fe08_0ed4fc09350b44b197ab2c62d1b25ce7~mv2.gif" className="w-full h-screen" alt="front-image"/> */}

                    {/* logo */}
                    <div className="absolute top-[26%] left-[19%]">

                    </div>
                </Grid>

                <Grid className="px-10" lg={5} xs={12}>
                    <div>
                        <h1 className="mt-10 font-bold text-7xl">What's Happening Now</h1>
                        <h1 className="font-bold text-3xl py-16">Join Postly Today</h1>

                        <div className="w-[60%] ">
                            <div className="w-full">
                                <GoogleLogin width={330}/>
                                <p className="py-5 text-center">OR</p>

                                <Button
                                onClick={handleOpenAuthModal} 
                                fullWidth variant="contained" size="large" sx={{
                                    borderRadius:"29px",
                                    py:"7px",
                                
                                }}>Create Account</Button>

                                <p className="text-sm mt-2">By signing up, you agree to the terms of service 
                                    and privacy policy.
                                </p>
                            </div>

                            <div className="mt-10 ">
                                <h1 className="font-bold text-xl mb-5">Already have account?</h1>
                                <Button fullWidth variant="outlined"
                                onClick={handleOpenAuthModal} 
                                size="large" sx={{
                                    borderRadius:"29px",
                                    py:"7px",
                                
                                }}>login</Button>
                            </div>
                        </div>
                        
                    </div>
                </Grid>
            </Grid>

            <AuthModal open={openAuthModal} handleClose={handleCloseAuthModal}/>
        </div>
    )
}