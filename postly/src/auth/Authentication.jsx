import { Button, Grid } from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import AuthModal from "./AuthModal";
import { useState } from "react";

export default function Authentication() {

    const [openAuthModal, setOpenAuthModal] = useState(false);
    const handleOpenAuthModal = () => setOpenAuthModal(true);
    const handleCloseAuthModal = () => setOpenAuthModal(false);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md text-center">
                {/* Heading */}
                <h1 className="font-bold text-4xl mb-4">What's Happening Now</h1>
                <h2 className="font-semibold text-xl text-gray-600 mb-8">Join Postly Today</h2>

                {/* Google Login */}
                
                <div className="mb-6 w-full">
                    <div className="w-full">
                        <GoogleLogin width="100%" />
                    </div>
                </div>


                <p className="text-gray-400 mb-6">OR</p>

                {/* Create Account Button */}
                <button
                    onClick={handleOpenAuthModal}
                    className="w-full bg-blue-500 text-white rounded-full py-3 font-semibold hover:bg-blue-600 transition mb-4"
                >
                    Create Account
                </button>

                <p className="text-xs text-gray-500 mb-8">
                    By signing up, you agree to the terms of service and privacy policy.
                </p>

                {/* Already have account */}
                <h3 className="font-semibold text-lg mb-4">Already have account?</h3>
                <button
                    onClick={handleOpenAuthModal}
                    className="w-full border border-blue-500 text-blue-500 rounded-full py-3 font-semibold hover:bg-blue-50 transition"
                >
                    Login
                </button>
            </div>

            <AuthModal open={openAuthModal} handleClose={handleCloseAuthModal} />
        </div>
    )
}

































































// <div>
        //     <Grid className="overflow-y-hidden" container>
        //         <Grid className="hidden lg:block" item lg={7}>
        //             {/* <img src="https://static.wixstatic.com/media/21fe08_0ed4fc09350b44b197ab2c62d1b25ce7~mv2.gif" className="w-full h-screen" alt="front-image"/> */}

        //             {/* logo */}
        //             <div className="absolute top-[26%] left-[19%]">

        //             </div>
        //         </Grid>

        //         <Grid className="px-10" lg={5} xs={12}>
        //             <div>
        //                 <h1 className="mt-10 font-bold text-7xl">What's Happening Now</h1>
        //                 <h1 className="font-bold text-3xl py-16">Join Postly Today</h1>

        //                 <div className="w-[60%] ">
        //                     <div className="w-full">
        //                         <GoogleLogin width={330} />
        //                         <p className="py-5 text-center">OR</p>

        //                         <Button
        //                             onClick={handleOpenAuthModal}
        //                             fullWidth variant="contained" size="large" sx={{
        //                                 borderRadius: "29px",
        //                                 py: "7px",

        //                             }}>Create Account</Button>

        //                         <p className="text-sm mt-2">By signing up, you agree to the terms of service
        //                             and privacy policy.
        //                         </p>
        //                     </div>

        //                     <div className="mt-10 ">
        //                         <h1 className="font-bold text-xl mb-5">Already have account?</h1>
        //                         <Button fullWidth variant="outlined"
        //                             onClick={handleOpenAuthModal}
        //                             size="large" sx={{
        //                                 borderRadius: "29px",
        //                                 py: "7px",

        //                             }}>login</Button>
        //                     </div>
        //                 </div>

        //             </div>
        //         </Grid>
        //     </Grid>

        //     <AuthModal open={openAuthModal} handleClose={handleCloseAuthModal} />
        // </div>

        // <div className="flex flex-col lg:flex-row min-h-screen overflow-hidden">
        //     {/* Left Image Section */}
        //     <div className="hidden lg:block lg:w-7/12 relative">
        //         <img
        //             src="https://static.wixstatic.com/media/21fe08_0ed4fc09350b44b197ab2c62d1b25ce7~mv2.gif"/>

        //         <div className="absolute top-[26%] left-[19%]">
        //             {/* Add logo or text here */}
        //         </div>
        //     </div>

        //     {/* Right Form Section */}
        //     <div className="flex-1 px-6 lg:px-10 flex flex-col justify-center">
        //         <h1 className="mt-10 font-bold text-5xl lg:text-7xl">What's Happening Now</h1>
        //         <h2 className="font-bold text-2xl lg:text-3xl py-10">Join Postly Today</h2>

        //         <div className="w-full lg:w-[60%]">
        //             {/* Google Login */}
        //             <div className="w-full">
        //                 <GoogleLogin width={330} />
        //                 <p className="py-5 text-center text-gray-500">OR</p>

        //                 {/* Create Account Button */}
        //                 <button
        //                     onClick={handleOpenAuthModal}
        //                     className="w-full bg-blue-500 text-white rounded-full py-3 font-semibold hover:bg-blue-600 transition"
        //                 >
        //                     Create Account
        //                 </button>

        //                 <p className="text-sm mt-2 text-gray-600">
        //                     By signing up, you agree to the terms of service and privacy policy.
        //                 </p>
        //             </div>

        //             {/* Already have account */}
        //             <div className="mt-10">
        //                 <h3 className="font-bold text-xl mb-5">Already have account?</h3>
        //                 <button
        //                     onClick={handleOpenAuthModal}
        //                     className="w-full border border-blue-500 text-blue-500 rounded-full py-3 font-semibold hover:bg-blue-50 transition"
        //                 >
        //                     Login
        //                 </button>
        //             </div>
        //         </div>
        //     </div>
        // </div>

        // <div className="flex flex-col lg:flex-row min-h-screen">
        //     {/* Left Image Section */}
        //     <div className="hidden lg:flex lg:w-1/2 justify-center items-center bg-gray-100">
        //         {/* <img
        //             src="https://static.wixstatic.com/media/21fe08_0ed4fc09350b44b197ab2c62d1b25ce7~mv2.gif"
        //             alt="Illustration"
        //             className="max-w-full h-auto object-contain"
        //         /> */}
        //         <div className="w-full max-w-md text-center">
        //             <h1 className="font-bold text-4xl lg:text-5xl mb-6">What's Happening Now</h1>
        //             <h2 className="font-bold text-xl lg:text-2xl mb-8">Join Postly Today</h2>

        //             {/* Google Login */}
        //             <div className="mb-6">
        //                 <GoogleLogin width={330} />
        //             </div>

        //             <p className="text-gray-500 mb-6">OR</p>

        //             {/* Create Account Button */}
        //             <button
        //                 onClick={handleOpenAuthModal}
        //                 className="w-full bg-blue-500 text-white rounded-full py-3 font-semibold hover:bg-blue-600 transition mb-4"
        //             >
        //                 Create Account
        //             </button>

        //             <p className="text-sm text-gray-600 mb-8">
        //                 By signing up, you agree to the terms of service and privacy policy.
        //             </p>

        //             {/* Already have account */}
        //             <h3 className="font-semibold text-lg mb-4">Already have account?</h3>
        //             <button
        //                 onClick={handleOpenAuthModal}
        //                 className="w-full border border-blue-500 text-blue-500 rounded-full py-3 font-semibold hover:bg-blue-50 transition"
        //             >
        //                 Login
        //             </button>
        //         </div>
        //     </div>

        //     <AuthModal open={openAuthModal} handleClose={handleCloseAuthModal} />
        // </div>