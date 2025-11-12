import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import ImageIcon from "@mui/icons-material/Image";
import { useFormik } from 'formik';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTweetReply, findTwitsById } from '../store/Post/Action';


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

export default function ReplyModal({handleClose, open, item}) {
    const navigate = useNavigate()
    const [uploadingImage, setUploadingImage] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const dispatch=useDispatch()

    // const handleSubmit = (values) => {
    //     dispatch(createTweetReply(values))
    //     console.log("handle submit", values)
    // }

    
    const handleSubmit = async (values) => {
        await dispatch(createTweetReply(values));
        dispatch(findTwitsById(item.twitId)); // refresh post details
        handleClose();
    };


    const formik = useFormik({
        initialValues: {
            content: "",
            image: "",
            twitId: item?.twitId
        },
        onSubmit: handleSubmit
    })

    const handleSelectImage = (event) => {
        setUploadingImage(true);
        const imgFile = event.target.files[0];
        if (imgFile) {
            formik.setFieldValue("image", imgFile);
            setSelectedImage(URL.createObjectURL(imgFile));
        }
        setUploadingImage(false);
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="flex space-x-5 mb-5">
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


                            </div>

                            <div className="mt-1">
                                <div onClick={() => navigate(`/post/${3}`)} className="cursor-pointer">
                                    <p className="mb-2 text-left"> look amazing</p>

                                </div>

                            </div>
                        </div>
                    </div>
                    
                    <section className="pb-6 ">
                        <div className="flex space-x-5">
                            <Avatar
                                alt="username"
                                src=""
                            />
                            <div className="w-full">
                                <form onSubmit={formik.handleSubmit} className="space-y-4">
                                    {/* Input Field */}
                                    <div>
                                        <input
                                            type="text"
                                            name="content"
                                            placeholder="What's happening?"
                                            className="w-full text-xl bg-transparent border-none outline-none placeholder-gray-500"
                                            {...formik.getFieldProps("content")}
                                        />
                                        {formik.errors.content && formik.touched.content && (
                                            <span className="text-red-500 text-sm">
                                                {formik.errors.content}
                                            </span>
                                        )}
                                    </div>

                                    {/* Image Preview */}
                                    {selectedImage && (
                                        <div className="mt-3">
                                            <img
                                                src={selectedImage}
                                                alt="Selected"
                                                className="rounded-lg max-h-60 object-cover"
                                            />
                                        </div>
                                    )}

                                    {/* Action Buttons */}
                                    <div className="flex justify-between items-center mt-4">
                                        <div className="flex space-x-5 items-center">
                                            <label className="flex items-center space-x-2 cursor-pointer">
                                                <ImageIcon className="text-green-600" />
                                                <input
                                                    type="file"
                                                    name="imageFile"
                                                    className="hidden"
                                                    onChange={handleSelectImage}
                                                />
                                            </label>
                                            <FmdGoodIcon className="text-green-600" />
                                            <TagFacesIcon className="text-green-600" />
                                        </div>

                                        <Button
                                            variant="contained"
                                            type="submit"
                                            sx={{
                                                borderRadius: "20px",
                                                color: "white",
                                                paddingY: "8px",
                                                paddingX: "20px",
                                                bgcolor: "green",
                                                textTransform: "none",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            Post
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </section>
                </Box>
            </Modal>
        </div>
    );
}
