import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useFormik } from 'formik';
import { Avatar, IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { updateUserProfile } from '../store/Auth/Action';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    p: 4,
    outline: "none",
    borderRadius: 4
};

export default function ProfileModel({ open, handleClose }) {
    // const [open, setOpen] = React.useState(false);

    // const [uploading, setUploading] = React.useState(false)

    // const handleSubmit = (values) => {
    //     console.log("handle submit",values)
    // }

    // const handleImageChange = (event) => {
    //     console.log("handle image change")
    //     setUploading(true)

    //     const { name } = event.target
    //     const file = event.target.files[0]

    //     formik.setFieldValue(name, file);
    //     setUploading(false)
    // }
    // const formik = useFormik({
    //     initialValues: {
    //         fullName: "",
    //         location: "",
    //         bio: "",
    //         backgroundImage: "",
    //         image: ""
    //     },
    //     onSubmit: handleSubmit
    // })

    // ====================================


    const dispatch = useDispatch();
    const [previewImage, setPreviewImage] = useState(null);
    const [previewBackground, setPreviewBackground] = useState(null);

    const handleSubmit = async (values) => {
        const reqData = {
            fullName: values.fullName,
            bio: values.bio,
            location: values.location,
            image: values.image,
            backgroundImage: values.backgroundImage,
        };
        await dispatch(updateUserProfile(reqData));
        handleClose();
    };

    const handleImageChange = (event) => {
        const { name } = event.target;
        const file = event.target.files[0];
        if (!file) return;

        formik.setFieldValue(name, file);
        if (name === "image") setPreviewImage(URL.createObjectURL(file));
        if (name === "backgroundImage") setPreviewBackground(URL.createObjectURL(file));
    };

    const formik = useFormik({
        initialValues: {
            fullName: "",
            location: "",
            bio: "",
            backgroundImage: "",
            image: "",
        },
        onSubmit: handleSubmit,
    });
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form onSubmit={formik.handleSubmit}>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center space-x-3'>
                                <IconButton onClick={handleClose} aria-label='delete'>
                                    <CloseIcon />

                                </IconButton>
                                <p className=''>Edit Profile</p>
                            </div>
                            <Button type='submit'>Save</Button>
                        </div>
                        <div className='hideScrollBar overflow-y-scroll overflow-x-hidden h-[80vh] space-y-3'>
                            <React.Fragment>
                                <div className='w-full'>
                                    <div className='relative'>
                                        <img className='w-full h-[12rem] object-cover object-center'
                                            // src='https://cdn.pixabay.com/photo/2021/01/18/17/05/https-pixabay-5928747_1280.jpg' 
                                            src={previewBackground || "https://th.bing.com/th/id/OIP._3fA2Ec3_27KbL-BTYcSEAHaEK?o=7&cb=ucfimgc2rm=3&rs=1&pid=ImgDetMain&o=7&rm=3"}
                                            />
                                        <input type="file"
                                            className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
                                            name="backgroundImage" onChange={handleImageChange} />
                                    </div>

                                </div>

                                <div className='w-full transform -translate-y-20 ml-4 h-[6rem]'>
                                    <div className='relative'>
                                        <Avatar
                                            // src="https://th.bing.com/th/id/OIP.oo4zwm-3ym1EfY1TAKcbzAHaIA?o=7&cb=ucfimgc2rm=3&rs=1&pid=ImgDetMain&o=7&rm=3"
                                            src={previewImage || "/default-avatar.png"}
                                            sx={{ width: "10rem", height: "10rem", border: "4px solid white" }} />

                                        <input type='file'
                                            className='absolute top-0 left-0 w-[10rem] h-full opacity-0 cursor-pointer'
                                            onChange={handleImageChange}
                                            name='image'
                                        />
                                    </div>
                                </div>

                            </React.Fragment>

                            <div className='space-y-3'>
                                <TextField fullWidth id='fullName' name='fullName' label="Full name"
                                    value={formik.values.fullName}
                                    onChange={formik.handleChange}
                                    error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                                    helperText={formik.touched.fullName && formik.errors.fullName} />
                            </div>

                            <div className='space-y-3'>
                                <TextField fullWidth
                                    multiline
                                    id='bio'
                                    rows={4}
                                    name='bio'
                                    label="bio"
                                    value={formik.values.bio}
                                    onChange={formik.handleChange}
                                    error={formik.touched.bio && Boolean(formik.errors.bio)}
                                    helperText={formik.touched.bio && formik.errors.bio} />
                            </div>

                            <div className='space-y-3'>
                                <TextField fullWidth
                                    id='location'
                                    name='location'
                                    label="location"
                                    value={formik.values.location}
                                    onChange={formik.handleChange}
                                    error={formik.touched.location && Boolean(formik.errors.location)}
                                    helperText={formik.touched.location && formik.errors.location} />
                            </div>

                            <div className='my-3'>
                                <p className='text-lg'>Birth date .Edit</p>
                                <p className='text-2xl'>October 26, 3000</p>
                            </div>
                            <p className='py-3 text-lg'>Edit professional Profile</p>

                        </div>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}