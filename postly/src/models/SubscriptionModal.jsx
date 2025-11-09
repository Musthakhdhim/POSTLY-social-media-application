import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'
import { useState } from 'react';
import  FiberManualRecordIcon  from '@mui/icons-material/FiberManualRecord';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: 'none',
    outline: "none",
    boxShadow: 24,
    p: 4,
    borderRadius: 4
};

const features=["post longer videos and 1080p video uploads","Prioritized rankings in searches and uploads","No ads between scrolling",
    "bold and italic text in your tweets"
]

export default function SubscriptionModal({handleClose,open}) {
    const [plan ,setplan]=useState("Annually")


    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className='flex items-center space-x-3'>
                        <IconButton onClick={handleClose} aria-label='delete'>
                            <CloseIcon />

                        </IconButton>
                    </div>
                    <div className='flex justify-center py-10'>
                        <div className='w-[80%] space-y-10'>
                            <div className='p-5 rounded-md flex items-center justify-between shadow-lg'>
                                <h1 className='text-xl pr-5'>Subscribe now to get verfied</h1>
                                <img className='w-24 h-24 '
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR57zze2_OjcbttjmmwvDo-Iz1Pn2pBk-CdFQ&s"/>
                            </div>

                            <div className='flex justify-between border rounded-full px-5 py-3  border-gray-400'>
                                <div>
                                    <span onClick={()=>setplan("Annually")} className={`${plan==="Annually"?"text-black":"text-gray-400"} cursor-pointer`}>Annually</span>
                                    <span className='text-green-500 text-sm ml-5'>Save 12%</span>
                                </div>
                                <p onClick={()=>setplan("monthly")} className={`${plan==="monthly"?"text-black":"text-gray-400"} cursor-pointer`}>
                                    Monthly
                                </p>
                            </div>

                            <div className='space-y-3 '>
                                {features.map((item)=><div className="flex items-center space-x-5">
                                    <FiberManualRecordIcon sx={{width:"7px",height:"7px"}}/>
                                    <p className='text-xs'>{item}</p>
                                </div>
                            )}
                            </div>

                            <div className='cursor-pointer flex justify-center bg-gray-700 text-white rounded-full px-5 py-3'>
                                <span className='line-through italic'>₹8,900.00</span>
                                <span className='px-5'>₹ 5,800.00</span>
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
