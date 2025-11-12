import ImageIcon from "@mui/icons-material/Image";
import { Avatar, Button } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import PostCard from "./PostCard";
import { useDispatch, useSelector } from "react-redux";
import { createTweets, getAllTweets } from "../store/Post/Action";
import store from "../store/Store";

const validationSchema = Yup.object().shape({
  content: Yup.string().required("Post is required"),
});

export default function Middle() {
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const { twit } = useSelector(store => store)
    const { auth } = useSelector(store => store)

  console.log("twit", twit)

  const dispatch = useDispatch()

  // const handleSubmit = (values) => {
  //   console.log("values ", values);
  // };


  const handleSubmit = (values) => {
    const formData = new FormData();

    // Append JSON as Blob for backend @RequestPart
    const jsonBlob = new Blob([JSON.stringify({ content: values.content })], {
      type: "application/json",
    });
    formData.append("req", jsonBlob);

    // Append image if selected
    if (values.image) {
      formData.append("image", values.image);
    }

    // Dispatch Redux action
    dispatch(createTweets(formData));

    // Reset form
    formik.resetForm();
    setSelectedImage(null);
  };


  useEffect(() => {
    dispatch(getAllTweets())
  }, [twit.like, twit.retwit, twit.totalReplies])

  const formik = useFormik({
    initialValues: {
      content: "",
      image: "",
    },
    onSubmit: handleSubmit,
    validationSchema,
  });

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
    <div className="space-y-4">
      {/* Header */}
      {/* <section>
        <h1 className="pb-5 text-xl font-bold opacity-90 text-left">Home</h1>
      </section> */}

      {/* Post Form */}
      <section className="pb-4 pt-5 border-b border-gray-300">
        <div className="flex space-x-5">
          <Avatar
            alt="username"
            src={auth.user?.image}
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

      {/* Posts List */}
      <section className="space-y-4">
        {twit.twits.map((item, index) => (
          <PostCard item={item} key={index} />
        ))}
      </section>
    </div>
  );
}